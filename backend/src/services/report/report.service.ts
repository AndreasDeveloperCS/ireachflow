import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from 'src/models/email.model';
import { PaginatedResource, Pagination } from 'src/helpers/pagination';
import { getOrder, getWhere } from 'src/helpers/orm';
import { Filtering } from 'src/helpers/filtering';
import { Sorting } from 'src/helpers/sorting';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Email.name)
        private readonly emailModel: Model<EmailDocument>,
        @InjectRepository(Email)
        private readonly emailRepository: Repository<Email>,
    ) { }

   public async getReport(
        { page, limit, size, offset }: Pagination,
        sort?: Sorting,
        filter?: Filtering,
    ): Promise<PaginatedResource<Partial<Email>>> {
        const where = getWhere(filter);
        const order = getOrder(sort);

        const [languages, total] = await this.emailRepository.findAndCount({
            where,
            order,
            take: limit,
            skip: offset,
        });

        return {
            totalItems: total,
            items: languages,
            page,
            size
        };
    }
}
