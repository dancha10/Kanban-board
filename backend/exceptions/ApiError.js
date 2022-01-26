module.exports = class ApiError extends Error {
    status;
    error;

    constructor(status, message, error = []) {
        super(message);
        this.status = status
        this.error = error
    }

    static Unauthorized() {
        return new ApiError(401, 'User is not authorized')
    }

    static NotFound(message) {
        return new ApiError(404, `${message} not founded`)
    }

    static BadRequest(status, message) {
        return new ApiError(status, message)
    }

}