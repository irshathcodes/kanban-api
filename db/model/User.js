const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide name"],
		minlength: 3,
		maxlength: 40,
	},
	email: {
		type: String,
		required: [true, "please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minlength: 6,
	},
});

UserSchema.pre("save", async function () {
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);
};

UserSchema.methods.comparePassword = async function (passwordString) {
	const isMatch = await bcryptjs.compare(passwordString, this.password);
	return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
