class CustomApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

const statusCodes = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
};

module.exports = { CustomApiError, statusCodes };
