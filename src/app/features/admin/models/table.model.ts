import { Response } from "@core/models/response.model";

export interface Table {
  name: string;
  attributes: string[];
  types: string[];
  required: boolean[];
  totalRecords?: number;
}

export type TableData = any[];
export type TableDataRow = any;

export interface TablesResponse extends Response{
  tables: Table[]
}

export interface TableResponse extends Response{
  table: Table
}

export interface TableDataResponse extends Response{
  data: TableData
}

export interface TableDataRowResponse extends Response{
  data: TableDataRow
}