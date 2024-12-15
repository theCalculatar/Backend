export default class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.error = message;
    this.code = code;
  }
}
