import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from 'src/models/email.model';
import { PaginatedResource, Pagination } from 'src/helpers/pagination';
import { getMongoOrder, getMongoWhere } from 'src/helpers/orm';
import { Filtering } from 'src/helpers/filtering';
import { Sorting } from 'src/helpers/sorting';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Email.name)
        private readonly emailModel: Model<EmailDocument>,
    ) { }

   public async getReport(
        { page, limit, size, offset }: Pagination,
        sort?: Sorting,
        filter?: Filtering,
    ): Promise<PaginatedResource<Partial<Email>>> {
        const where = getMongoWhere(filter);
        const order = getMongoOrder(sort);

        const [items, total] = await Promise.all([
            this.emailModel.find(where).sort(order).skip(offset).limit(limit).exec(),
            this.emailModel.countDocuments(where).exec(),
        ]);

        return {
            totalItems: total,
            items,
            page,
            size
        };
    }
}
