require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

// Security Libraries
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

const cookieParser = require("cookie-parser");

app.set("trust proxy", 1);

app.use(helmet()); // secures http headers.
app.use(cors({ origin: process.env.CLIENT_DOMAIN, credentials: true })); // only domains specified in "origin" can access this api.
app.use(express.json()); // pulls json data from req.body, only if the content type is application/json.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(mongoSanitize());
app.use(xss()); // Takes care of cross site scripting attacks.

// Routes
app.get("/", (req, res) => {
	res.send("<h1> Todo List Api </h1>");
});
// Auth Route
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

// Todo Route
const { authenticationMiddleware } = require("./middlewares/authentication");
const todoRoute = require("./routes/todo");
app.use("/api/todo", authenticationMiddleware, todoRoute);

// Board Route
const boardRoute = require("./routes/board");
app.use("/api/board", authenticationMiddleware, boardRoute);

// User route
const userRoute = require("./routes/user");
app.use("/api/user", authenticationMiddleware, userRoute);

// Not Found Route
const notFoundMiddleware = require("./middlewares/notFound");
app.use(notFoundMiddleware);

const errorHandlerMiddleware = require("./middlewares/errorHandler");
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const localUrl = `http://localhost:${port}`;

app.listen(port, async () => {
	await connectDB(process.env.MONGO_URI);
	console.log(
		`Server is Listening on ${
			process.env.NODE_ENV === "development" ? localUrl : `${port}...`
		}`
	);
});
