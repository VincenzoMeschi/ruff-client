import "./login.scss";
import { useState } from "react";
import { authLogin } from "../../auth/auth";
import { Alert, Collapse } from "@mui/material";

const Login = (props) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [incorrectLogin, setIncorrectLogin] = useState(false);
	const [countAttempts, setCountAttemps] = useState(0);
	const [resMessage, setResMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const handleCorrectLogin = (res) => {
			setIncorrectLogin(false);
			window.localStorage.setItem(
				"authorization",
				"Bearer " + res.data.accessToken
			);
			window.localStorage.setItem("userId", res.data._id);
			window.location.href = "/";
		};
		const handleIncorrectLogin = (err) => {
			setIncorrectLogin(true);
			setCountAttemps(countAttempts + 1);
			console.log(err);
			setResMessage(err.response.data);
		};

		// Check email and password in database
		authLogin(data.get("email"), data.get("password"))
			.then(handleCorrectLogin)
			.catch(handleIncorrectLogin);
	};

	const handleRegister = () => {
		props.toggleAuth();
	};

	return (
		<div className="loginBox">
			<div className="loginBoxHeader">
				<h1 className="loginBoxHeaderTitle">Login</h1>
			</div>
			<div className="loginBoxBody">
				<form className="loginBoxBodyForm" onSubmit={handleSubmit}>
					<div className="loginBoxBodyFormInput">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email Address"
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className="loginBoxBodyFormInput">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
						/>
					</div>
					<div className="alertIncorrect">
						<Collapse in={incorrectLogin}>
							<Alert id="incorrectPassword" severity="error">
								{resMessage}{" "}
								<strong>
									{"Attempts: (" + countAttempts + ")"}
								</strong>
							</Alert>
						</Collapse>
					</div>
					<div className="loginBoxBodyFormSubmit">
						<button type="submit">Sign In</button>
					</div>
				</form>
				<p>
					New to Ruff?{" "}
					<button onClick={handleRegister}>Sign up now</button>
				</p>
			</div>
		</div>
	);
};

export default Login;
