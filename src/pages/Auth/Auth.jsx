import "./auth.scss";
import { useState } from "react";

import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleAuth = () => {
		setIsLogin(!isLogin);
	};
	return (
		<div className="authContainer">
			<div className="authGradient">
				<div className="authBox">
					{isLogin ? (
						<Login toggleAuth={toggleAuth} />
					) : (
						<Register toggleAuth={toggleAuth} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
