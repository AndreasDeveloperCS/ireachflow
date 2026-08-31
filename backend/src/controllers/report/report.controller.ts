import { ReportService } from 'src/services/report/report.service';
import { Controller, Get } from '@nestjs/common';
import { Sorting, SortingParams } from 'src/helpers/sorting';
import {
  PaginatedResource,
  Pagination,
  PaginationParams,
} from 'src/helpers/pagination';
import { Filtering, FilteringParams } from 'src/helpers/filtering';
import { Email } from 'src/models/email.model';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {
    console.log('ReportController', '');
  }

  @Get()
  async get(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'id', 'stateId']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'stateId']) filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Email>>> {
    console.log(paginationParams, sort, filter);
    return await this.reportService.getReport(paginationParams, sort, filter);
  }
}
