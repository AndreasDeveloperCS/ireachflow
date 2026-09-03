import { IsNull, Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, ILike, In } from "typeorm";
import { SortOrder } from "mongoose";
import { FilterRule, Filtering } from "./filtering";
import { Sorting } from "./sorting";


export const getOrder = (sort: Sorting) => sort ? { [sort.property]: sort.direction } : {};

export const getMongoOrder = (sort: Sorting): Record<string, SortOrder> =>
    sort ? { [sort.property]: sort.direction === 'desc' ? -1 : 1 } : {};

const numericPattern = /^-?\d+(\.\d+)?$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}(T.*)?$/;

const parseMongoFilterValue = (value: string): string | boolean | number | Date => {
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    if (numericPattern.test(value))
        return Number(value);
    if (isoDatePattern.test(value)) {
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime()))
            return parsedDate;
    }
    return value;
}

const escapeRegex = (value: string): string =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getMongoWhere = (filter: Filtering) => {
    if (!filter)
        return {};

    const normalizedValue = filter.value == null ? '' : String(filter.value);
    const parsedValue = parseMongoFilterValue(normalizedValue);

    if (filter.rule == FilterRule.IS_NULL)
        return { [filter.property]: { $eq: null } };
    if (filter.rule == FilterRule.IS_NOT_NULL)
        return { [filter.property]: { $ne: null } };
    if (filter.rule == FilterRule.EQUALS)
        return { [filter.property]: parsedValue };
    if (filter.rule == FilterRule.NOT_EQUALS)
        return { [filter.property]: { $ne: parsedValue } };
    if (filter.rule == FilterRule.GREATER_THAN)
        return { [filter.property]: { $gt: parsedValue } };
    if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS)
        return { [filter.property]: { $gte: parsedValue } };
    if (filter.rule == FilterRule.LESS_THAN)
        return { [filter.property]: { $lt: parsedValue } };
    if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS)
        return { [filter.property]: { $lte: parsedValue } };
    if (filter.rule == FilterRule.LIKE)
        return { [filter.property]: { $regex: escapeRegex(normalizedValue), $options: 'i' } };
    if (filter.rule == FilterRule.NOT_LIKE)
        return { [filter.property]: { $not: { $regex: escapeRegex(normalizedValue), $options: 'i' } } };
    if (filter.rule == FilterRule.IN)
        return { [filter.property]: { $in: normalizedValue.split(',').map(item => parseMongoFilterValue(item)) } };
    if (filter.rule == FilterRule.NOT_IN)
        return { [filter.property]: { $nin: normalizedValue.split(',').map(item => parseMongoFilterValue(item)) } };
    return {};
}

export const getWhere = (filter: Filtering) => {
    if (!filter) 
        return {};
    
    if (filter.rule == FilterRule.IS_NULL) 
        return { [filter.property]: IsNull() };
    if (filter.rule == FilterRule.IS_NOT_NULL) 
        return { [filter.property]: Not(IsNull()) };
    if (filter.rule == FilterRule.EQUALS) 
        return { [filter.property]: filter.value };
    if (filter.rule == FilterRule.NOT_EQUALS) 
        return { [filter.property]: Not(filter.value) };
    if (filter.rule == FilterRule.GREATER_THAN) 
        return { [filter.property]: MoreThan(filter.value) };
    if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS)
        return { [filter.property]: MoreThanOrEqual(filter.value) };
    if (filter.rule == FilterRule.LESS_THAN) 
        return { [filter.property]: LessThan(filter.value) };
    if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) 
        return { [filter.property]: LessThanOrEqual(filter.value) };
    if (filter.rule == FilterRule.LIKE) 
        return { [filter.property]: ILike(`%${filter.value}%`) };
    if (filter.rule == FilterRule.NOT_LIKE) 
        return { [filter.property]: Not(ILike(`%${filter.value}%`)) };
    if (filter.rule == FilterRule.IN) 
        return { [filter.property]: In(filter.value.split(',')) };
    if (filter.rule == FilterRule.NOT_IN) 
        return { [filter.property]: Not(In(filter.value.split(','))) };
}