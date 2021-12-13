const errorHandler = (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || 500,
		message: err.message || "Something went wrong. please try again later ):",
	};

	// If client sents invalid / wrong id parameters this error shows up.
	if (err.name && err.name === "CastError") {
		customError.statusCode = 404;
		customError.message = `cannot find todo with id: ${err.value}`;
	}

	// If client sents registered emails for sign up, this error shows up.
	if (err.code === 11000) {
		customError.statusCode = 400;
		customError.message = `Cannot register, Because you have already registered with this email : ${err.keyValue.email} please sign in.`;
	}
	res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandler;
