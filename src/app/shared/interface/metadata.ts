export interface MetaData {
    data: any;
    meta?: Meta;
  }
  
  export interface Meta {
    totalCount:      number;
    pageSize:        number;
    currentPage:     number;
    totalPages:      number;
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
    nextPageUrl:     string;
    previousPageUrl: string;
  }