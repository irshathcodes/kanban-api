const removeCookies = (res) => {
	res.cookie("accessToken", "logout", {
		expires: new Date(Date.now()),
		signed: true,
		httpOnly: true,
		sameSite: "None",
		secure: process.env.NODE_ENV === "production",
	});
	res.cookie("refreshToken", "logout", {
		expires: new Date(Date.now()),
		signed: true,
		httpOnly: true,
		sameSite: "None",
		secure: process.env.NODE_ENV === "production",
	});
};

module.exports = removeCookies;
