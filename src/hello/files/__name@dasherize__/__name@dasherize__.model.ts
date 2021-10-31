export interface <%= classify(name) %> {
  someProperty: string;
}

export interface ServerResponse<T> {
  success: boolean;
  data: T;
}