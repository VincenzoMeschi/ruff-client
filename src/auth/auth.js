import axios from "axios";

export const authLogin = async (email, password) => {
	const bodyParams = {
		email: email,
		password: password,
	};

	const baseURL = "http://api.rufftv.com/api/auth/login";

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(baseURL, bodyParams, config);

	return res;
};

export const authLogout = () => {
	window.localStorage.removeItem("authorization");
	window.location.reload();
};

export const authGetCurrentUserInfo = async () => {
	try {
		const response = await axios.get("http://api.rufftv.com/api/auth", {
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		});

		// deconstruct password from response
		const { password, ...data } = response.data;

		return data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const authRegister = async (email, password, username) => {
	const generateImage = (name) => {
		return (
			"https://ui-avatars.com/api/?size=250&background=random&name=" +
			name
		);
	};

	const img = generateImage(username);

	const bodyParams = {
		email: email,
		password: password,
		username: username,
		profilePic: img,
	};

	const baseURL = "http://api.rufftv.com/api/auth/register";

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(baseURL, bodyParams, config);

	return res ? true : false;
};
