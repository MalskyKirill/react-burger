export interface IRequest {
  method: string,
  headers: {
    'Content-Type': string,
    authorization?: string
  },
  body?: string
}

export interface IError {
  success: boolean;
	message?: string
}
