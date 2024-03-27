interface err {
  errorCode: number;
  errorMessage: string;
}

export interface res {
  success: boolean;
  error: err;
  data: string;
}
