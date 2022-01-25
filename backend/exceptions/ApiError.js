module.exports = class ApiError extends Error {
    status;
    error;

    constructor(status, message, error = []) {
        super(message);
        this.status = status
        this.error = error
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized')
    }
    //TODO add BadRequest

}