export class PaginationModel {
  pageNumber: any = 1;
  pageSize: any = 10;

  constructor(pageNumber?: number, pageSize?: number) {
    if (pageNumber == undefined) {
      pageNumber = this.pageNumber;
    }
    if (pageSize == undefined) {
      pageSize = this.pageSize;
    }

    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
