export type IResponse = {
  status?: boolean;
  message: string;
  data?: any;
  statusCode?: number;
};

export type IErrorResponse = {
  status?: boolean;
  message: string;
  errors: any[];
  statusCode?: number;
};
