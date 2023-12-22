import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./private.scss";
import Loading from "../../pages/Loading/Loading";
import { useEffect, useState } from "react";
import { authGetCurrentUserInfo } from "../../auth/auth";

const Private = () => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = await authGetCurrentUserInfo();
			setAuth(isAuthenticated);
		};

		checkAuth();
	}, []);

	if (auth === null) {
		return <Loading />;
	}

	return auth ? (
		<div className="container">
			<Navbar />
			<Outlet />
		</div>
	) : (
		<Navigate to="/login" />
	);
};

export default Private;
