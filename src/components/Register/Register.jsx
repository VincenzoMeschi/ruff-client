import "./register.scss";
import { useState } from "react";
import { authRegister } from "../../auth/auth";

const Register = (props) => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const handleSuccess = () => {
			alert("User Successfully Created: Please Sign In");
			props.toggleAuth();
		};

		if (formData.password && formData.username && formData.email) {
			authRegister(
				data.get("email"),
				data.get("password"),
				data.get("username")
			)
				.then(handleSuccess)
				.catch((err) => {
					if (
						err.response.status === 409 &&
						err.response.data.message.keyPattern.email > 0
					) {
						alert("Email already exists");
						// focus email input
						document.getElementById("email").select();
						props.toggleAuth();
					} else if (
						err.response.status === 409 &&
						err.response.data.message.keyPattern.username > 0
					) {
						alert("Username already exists");
						document.getElementById("username").select();
						props.toggleAuth();
					} else {
						alert("An error occurred");
					}
				});
		} else {
			alert("Please fill out all fields");
		}
	};

	const handleLogin = () => {
		props.toggleAuth();
	};

	return (
		<div className="registerBox">
			<div className="registerBoxHeader">
				<h1 className="registerBoxHeaderTitle">Register</h1>
			</div>
			<div className="registerBoxBody">
				<form className="registerBoxBodyForm" onSubmit={handleSubmit}>
					<div className="registerBoxBodyFormInput">
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
					<div className="registerBoxBodyFormInput">
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={formData.username}
							onChange={(e) =>
								setFormData({
									...formData,
									username: e.target.value,
								})
							}
						/>
					</div>
					<div className="registerBoxBodyFormInput">
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
					<div className="alertIncorrect"></div>
					<div className="registerBoxBodyFormSubmit">
						<button type="submit">Register</button>
					</div>
				</form>
				<p>
					Already Have an Account?{" "}
					<button onClick={handleLogin}>Login</button>
				</p>
			</div>
		</div>
	);
};

export default Register;
