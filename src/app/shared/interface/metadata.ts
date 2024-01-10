export interface MetaData {
  data: any;
  metadata: Meta;
}

export interface Meta {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}

export const metaDataLength: number[] = [10,25,50,100];

export const newMetaData = { data: [], metadata: { totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false, nextPageUrl: '', previousPageUrl: '' } };