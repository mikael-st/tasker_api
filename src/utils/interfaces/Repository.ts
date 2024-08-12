export interface Repository {
  create(data: any): Promise<any>;
  list(query?: any): Promise<any>;
  find(key: string): Promise<any>;
  edit(id: string, update: any): Promise<any>;
  delete(id: string): Promise<any>;
}