class succssResponse {
    constructor(statusCode,message,error,data) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data = data;
    }
}

module.exports = {succssResponse}

