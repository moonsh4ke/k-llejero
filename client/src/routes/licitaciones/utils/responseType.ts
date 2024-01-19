export interface IResponse<T> {
    statusCode: number,
    isSuccessful: boolean,
    Message: string,
    Data: T
}