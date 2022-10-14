const removeCookies = (res) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
};

module.exports = removeCookies;
