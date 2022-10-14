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

const cookieParser = require("cookie-parser");

app.set("trust proxy", 1);

app.use(helmet()); // secures http headers.
app.use(cors()); // enables to access this api from different domains.
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

// User route
const userRoute = require("./routes/user");
app.use("/api/user", authenticationMiddleware, userRoute);

// Not Found Route
const notFoundMiddleware = require("./middlewares/notFound");
app.use(notFoundMiddleware);

const errorHandlerMiddleware = require("./middlewares/errorHandler");
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
	await connectDB(process.env.MONGO_URI);
	console.log(`Server is Listening on port ${port}...`);
});
