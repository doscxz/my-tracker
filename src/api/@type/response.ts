type Code = 'ERROR' | 'SUCCESS';
export type Response<T extends object> = {
  code: Code;
  data: T;
};
