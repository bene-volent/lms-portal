import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, concat, map, Observable, of, take } from 'rxjs';
import { FormBuilderService } from './form-builder.service';
import { Table, TableData, TableDataResponse, TableDataRow, TableDataRowResponse, TableResponse, TablesResponse } from '../models/table.model';


class LRUCache<K, V> {
  private cache: Map<K, V> = new Map<K, V>();
  private keys: K[] = [];

  constructor(private capacity: number) { }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      this.keys = this.keys.filter(k => k !== key);
      this.keys.unshift(key);
      return this.cache.get(key);
    }
    return undefined;
  }

  put(key: K, value: V) {
    if (this.cache.has(key)) {
      this.keys = this.keys.filter(k => k !== key);
    } else if (this.keys.length >= this.capacity) {
      const lastKey = this.keys.pop();
      if (lastKey)
        this.cache.delete(lastKey);
    }
    this.keys.unshift(key);
    this.cache.set(key, value);
  }
}



interface DummyData {
  [key: string]: any[];
}

const dummyData: { tables: Table[], data: DummyData } = {
  tables: [
    {
      name: 'Users',
      attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'role_id'],
      types: ['integer', 'string', 'string', 'string', 'string', 'integer'],
      required: [true, true, true, true, false, true],
      totalRecords: 10
    },
    {
      name: 'Roles',
      attributes: ['id', 'role_name', 'role_description'],
      types: ['integer', 'string', 'text'],
      required: [true, true, false],
      totalRecords: 5
    },
    {
      name: 'Products',
      attributes: ['id', 'name', 'price', 'category'],
      types: ['integer', 'string', 'mony', 'string'],
      required: [true, true, true, true],
      totalRecords: 6
    },
    {
      name: 'Orders',
      attributes: ['id', 'user_id', 'product_id', 'quantity'],
      types: ['integer', 'integer', 'integer', 'integer'],
      required: [true, true, true, true],
      totalRecords: 5
    },
    {
      name: 'Categories',
      attributes: ['id', 'category_name', 'photo', 'date', 'time'],
      types: ['integer', 'string', 'bytea', 'date', 'timestampz'],
      required: [true, true, false, false, false],
      totalRecords: 5
    }
  ],
  data: {
    Users: [
      { id: 1, username: 'john_doe', email: 'john@example.com', first_name: 'John', last_name: 'Doe', role_id: 1 },
      { id: 2, username: 'jane_doe', email: 'jane@example.com', first_name: 'Jane', last_name: 'Doe', role_id: 2 },
      { id: 3, username: 'jim_beam', email: 'jim@example.com', first_name: 'Jim', last_name: 'Beam', role_id: 3 },
      { id: 4, username: 'jack_daniels', email: 'jack@example.com', first_name: 'Jack', last_name: 'Daniels', role_id: 4 },
      { id: 5, username: 'johnny_walker', email: 'johnny@example.com', first_name: 'Johnny', last_name: 'Walker', role_id: 5 },
      { id: 6, username: 'alice_smith', email: 'alice@example.com', first_name: 'Alice', last_name: 'Smith', role_id: 1 },
      { id: 7, username: 'bob_johnson', email: 'bob@example.com', first_name: 'Bob', last_name: 'Johnson', role_id: 2 },
      { id: 8, username: 'charlie_brown', email: 'charlie@example.com', first_name: 'Charlie', last_name: 'Brown', role_id: 3 },
      { id: 9, username: 'david_wilson', email: 'david@example.com', first_name: 'David', last_name: 'Wilson', role_id: 4 },
      { id: 10, username: 'eve_davis', email: 'eve@example.com', first_name: 'Eve', last_name: 'Davis', role_id: 5 }
    ],
    Roles: [
      { id: 1, role_name: 'superadmin', role_description: 'Super Administrator' },
      { id: 2, role_name: 'admin', role_description: 'Administrator' },
      { id: 3, role_name: 'data entry operator', role_description: 'Data Entry Operator' },
      { id: 4, role_name: 'data approver', role_description: 'Data Approver' },
      { id: 5, role_name: 'user', role_description: 'User' }
    ],
    Products: [
      { id: 1, name: 'Product1', price: 100.00, category: 'Category1' },
      { id: 2, name: 'Product2', price: 200.00, category: 'Category2' },
      { id: 3, name: 'Product3', price: 300.00, category: 'Category3' },
      { id: 4, name: 'Product4', price: 400.00, category: 'Category4' },
      { id: 5, name: 'Product5', price: 500.00, category: 'Category5' },
      { id: 6, name: 'Product6', price: 600.00, category: 'Category6' }
    ],
    Orders: [
      { id: 1, user_id: 1, product_id: 1, quantity: 2 },
      { id: 2, user_id: 2, product_id: 2, quantity: 1 },
      { id: 3, user_id: 3, product_id: 3, quantity: 4 },
      { id: 4, user_id: 4, product_id: 4, quantity: 3 },
      { id: 5, user_id: 5, product_id: 5, quantity: 5 }
    ],
    Categories: [
      { id: 1, category_name: 'Category1', photo: 'path/to/photo1.jpg', date: '2024-01-01', time: '2024-01-01T10:00:00' },
      { id: 2, category_name: 'Category2', photo: 'path/to/photo2.jpg', date: '2024-01-02', time: '2024-01-02T11:00:00' },
      { id: 3, category_name: 'Category3', photo: 'path/to/photo3.jpg', date: '2024-01-03', time: '2024-01-03T12:00:00' },
      { id: 4, category_name: 'Category4', photo: 'path/to/photo4.jpg', date: '2024-01-04', time: '2024-01-04T13:00:00' },
      { id: 5, category_name: 'Category5', photo: 'path/to/photo5.jpg', date: '2024-01-05', time: '2024-01-05T14:00:00' }
    ]
  }
};


function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

@Injectable()
export class AdminService {
  // How will admin service work:
  // As we are sure that the tables will be available in the database, there will be no new tables created or deleted
  // Once the admin service is created, it will fetch all the tables and store them in a BehaviorSubject
  // The tables will be available in the tables$ observable
  // All requests for table information other than data will be provided in the tables$ observable
  // The data for a table will be fetched using the getTableData, getTableDataByID, getTableDataByQuery methods
  // For better caching and avoid repeated requests, the data will be stored in the service itself
  // Service will store upto 3 tables data at a time, following the strategy of LRU cache
  // The data will be stored in the format of { [table_name]: any[] }
  // The data will be fetched from the service first, if not available, then only the request will be made to the server
  // Any update to the data will be first made to the server and then the service will be updated

  // Every observable will be piped with take(1) to avoid memory leaks as the data will be fetched only once
  // The service will be provided only in the admin module and will be a singleton service



  url = 'http://localhost:3000/api/admin';


  private tables: BehaviorSubject<Table[]> = new BehaviorSubject<Table[]>([]);
  public tables$ = this.tables.asObservable();
  private tableDataLRU = new LRUCache<string, TableData>(3);



  private USING_DUMMY_DATA = true;


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilderService) {
    this.getAllTables().pipe(take(1)).subscribe({
      next: (tables) => {
        // console.log('Tables fetched:', tables);
      }
      ,
      error: (error) => {
        console.error(error);
      }
    });
  }

  getAllTables(): Observable<Table[]> {
    // return this.httpClient.get<TablesResponse>(`${this.url}/tables`);

    if (!this.USING_DUMMY_DATA) {

      const url = `${this.url}/tables`;
      return this.httpClient.get<TablesResponse>(url).pipe(
        take(1),
        map(response => {
          this.tables.next(response.tables);
          return response.tables;
        })
      );
    }

    return of({
      status: 200,
      message: 'Success',
      tables: dummyData.tables
    }).pipe(
      map(response => {
        this.tables.next(response.tables);
        return response.tables;
      })
    )
  }

  getTable(name: string): Observable<Table> {
    const nameTitle = toTitleCase(name);
    // console.log(this)
    return this.tables$.pipe(take(1), map(tables => {
      const table = tables.find(table => table.name === name || table.name === nameTitle);
      if (!table) {
        throw new Error('Table not found');
      }
      return table;
    }));
  }

  getTableDataCount(name: string): Observable<number> {
    // return this.httpClient.get<TableDataResponse>(`${this.url}/tables/${name}/data/count`);

    if (!this.USING_DUMMY_DATA) {
      const url = `${this.url}/tables/${name}/count`;
      return this.httpClient.get<{ status: number, message?: string, count: number }>(url).pipe(
        take(1),
        map(response => response.count)
      );
    }

    name = toTitleCase(name);
    return of(dummyData.data[name].length);
  }


  getTableData(name: string): Observable<any[]> {

    // return this.httpClient.get<TableDataResponse>(`${this.url}/tables/${name}/data`);

    const data = this.tableDataLRU.get(name)
    if (data) {
      return of(data);
    } else {

      // Call the server

      if (!this.USING_DUMMY_DATA) {
        const url = `${this.url}/tables/${name}/data`
        return this.httpClient.get<TableDataResponse>(url)
          .pipe(take(1), map(response => {
            this.tableDataLRU.put(name, response.data);
            return response.data;
          }));

      }

      name = toTitleCase(name);
      const data = dummyData.data[name];
      this.tableDataLRU.put(name, data);
      return of(data);
    }

  }

  // Query is a string that is used to filter the data. Comma separated list of attributes
  getTableDataByQuery(name: string, query: string): Observable<any[]> {
    // return this.httpClient.get<TableDataResponse>(`${this.url}/tables/${name}/data?query1=${query1}&...`);

    // 1. split the query appropriately. if query=first=John,last=Doe, then split by '&' and then split by '='


    const queryArray = query.split('&').map((item: string) => item.trim().split('=').map((item: string) => item.trim()));
    const cleanQuery = queryArray.map((item: string[]) => item.join('=')).join('&');

    const queryKey = queryArray.map((item: string[]) => item.join('_')).join('_');

    const data = this.tableDataLRU.get(name + ':' + queryKey)
    if (data) {
      return of(data);
    } else {
      // Call the server
      if (!this.USING_DUMMY_DATA) {
        const url = `${this.url}/tables/${name}/data?${cleanQuery}`
        return this.httpClient.get<TableDataResponse>(url)
          .pipe(take(1), map(response => {
            this.tableDataLRU.put(name + ':' + queryKey, response.data);
            return response.data;
          }));

      }

      name = toTitleCase(name);

      const data = dummyData.data[name];
      this.tableDataLRU.put(name + ':' + queryKey, data);
      return of(data);
    }

  }

  getTableDataByID(name: string, id: number): Observable<any[]> {
    // return this.httpClient.get<TableDataResponse>(`${this.url}/tables/${name}/data/${id}`);
    const data = this.tableDataLRU.get(name + ':id-' + id)
    if (data) {
      return of(data);
    } else {
      // Call the server
      if (!this.USING_DUMMY_DATA) {
        const url = `${this.url}/tables/${name}/data/${id}`
        return this.httpClient.get<TableDataResponse>(url)
          .pipe(take(1), map(response => {
            this.tableDataLRU.put(name + ':id-' + id, response.data);
            return response.data;
          }));
      }
      name = toTitleCase(name);
      const data = dummyData.data[name].find((item: any) => item.id === id);
      this.tableDataLRU.put(name + ':id-' + id, data);
      return of(data);
    }

  }


  getFormFromTable(name: string): Observable<{ form: FormGroup, table: Table }> {

    return this.formBuilder.getFormFromTable(name, this.getTable.bind(this));
  }

  addNewData(name: string, data: any): Observable<any> {

    if (!this.USING_DUMMY_DATA) {
      const url = `${this.url}/tables/${name}`;

      // 1. Ensure the data is available in the cache and is up to date
      const getData = this.getTableData(name)

      // 2. Add the new data to the server and add the new data to the cache
      const postRequest = this.httpClient.post<TableDataRowResponse>(url, data).pipe(
        take(1),
        map(response => {
          const data = this.tableDataLRU.get(name);

          if (!data) {
            this.tableDataLRU.put(name, [response.data]);
            return [response.data];
          }

          data.push(response.data);
          this.tableDataLRU.put(name, data);
          return response.data;
        })
      );

      // 3. Return a single observable that completes the getData observable first and then the completes the Post Request
      return concat(getData, postRequest); // This will ensure that the data is available in the cache before returning the data
    }
    name = toTitleCase(name);
    const id = dummyData.data[name].length + 1;
    data.id = id;
    dummyData.data[name].push(data);
    this.tableDataLRU.put(name, dummyData.data[name]);
    return of(dummyData.data[name]);
  }

  changeData(name: string, id: number, data: any): Observable<any> {

    if (!this.USING_DUMMY_DATA) {
      const url = `${this.url}/tables/${name}/${id}`;

      // 1. Ensure the data is available in the cache and is up to date
      const getData = this.getTableData(name)

      // 2. Put the update data to the server and update the data to the cache
      const putRequest = this.httpClient.put<TableDataRowResponse>(url, data).pipe(
        take(1),
        map(response => {
          const data = this.tableDataLRU.get(name);

          if (!data) {
            this.tableDataLRU.put(name, [response.data]);
            return [response.data];
          }

          const index = data.findIndex((item: any) => item.id === id);
          data[index] = response.data;
          this.tableDataLRU.put(name, data);
          return response.data;
        })
      );

      // 3. Return a single observable that completes the getData observable first and then the completes the putRequest
      return concat(getData, putRequest); // This will ensure that the data is available in the cache before returning the data
    }

    name = toTitleCase(name);
    const index = dummyData.data[name].findIndex((item: any) => item.id === id);
    dummyData.data[name][index] = data;
    this.tableDataLRU.put(name, dummyData.data[name]);
    return of(dummyData.data[name]);


  }

  deleteData(name: string, id: number): Observable<any> {

    if (!this.USING_DUMMY_DATA) {
      const url = `${this.url}/tables/${name}/${id}`;

      // 1. Ensure the data is available in the cache and is up to date
      const getData = this.getTableData(name)

      // 2. Delete the data from the server and update the cache
      const deleteRequest = this.httpClient.delete<TableDataRowResponse>(url).pipe(
        take(1),
        map(response => {
          let data = this.tableDataLRU.get(name);
          if (!data) {
            this.tableDataLRU.put(name, []);
            return [];
          }
          data = data.filter((item: any) => item.id !== id);
          this.tableDataLRU.put(name, data);
          return data;
        })
      );

      // 3. Return a single observable that completes the getData observable first and then the completes the deleteRequest
      return concat(getData, deleteRequest); // This will ensure that the data is available in the cache before returning the data
    }

    name = toTitleCase(name);
    const index = dummyData.data[name].findIndex((item: any) => item.id === id);
    dummyData.data[name].splice(index, 1);
    this.tableDataLRU.put(name, dummyData.data[name]);
    return of(dummyData.data[name]);

  }

}
