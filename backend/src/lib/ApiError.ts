export class ApiError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  static badRequset(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message);
  }
}
