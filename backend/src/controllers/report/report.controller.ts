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

const SORTABLE_FIELDS = [
  'messageId',
  'mainSourceAddress',
  'mainTargetAddress',
  'isOpened',
  'emailSentDate',
  'isOpenedDate',
  'response',
  'envelopeTime',
  'messageTime',
  'messageSize',
];

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async get(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(SORTABLE_FIELDS) sort?: Sorting,
    @FilteringParams(SORTABLE_FIELDS) filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Email>>> {
    return await this.reportService.getReport(paginationParams, sort, filter);
  }
}
