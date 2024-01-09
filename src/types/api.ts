export interface IRequest {
  method: string,
  headers: {
    'Content-Type': string,
    authorization?: string
  },
  body?: string
}
