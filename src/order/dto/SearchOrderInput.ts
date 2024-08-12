import { PaginationInput } from "src/util/pagination/pagination.input";

export class SearchOrderInput implements PaginationInput {
    pageNumber: number;
    size: number;
    distribution_id: number;
}