import { FilterParams } from "../utils/filterParams";

export class BlogParams extends FilterParams {
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}