const errorHandler = (err, req, res, next) => {
	let CustomError = {
		statusCode: err.statusCode || 500,
		message: err.message || "Something went wrong. please try again later ):",
	};

	// If client sents invalid / wrong id parameters this error shows up.
	if (err.name && err.name === "CastError") {
		CustomError.statusCode = 404;
		CustomError.message = `cannot find todo with id: ${err.value}`;
	}

	// If client sents registered emails for sign up, this error shows up.
	if (err.code === 11000) {
		CustomError.statusCode = 400;
		CustomError.message = `Cannot register, Because you have already registered with this email : ${err.keyValue.email} please sign in.`;
	}
	res.status(CustomError.statusCode).json({ msg: CustomError.message });
};

module.exports = errorHandler;
