import "./navbar.scss";
import { useState, useEffect } from "react";
import { authGetCurrentUserInfo, authLogout } from "../../auth/auth";
import Loading from "../../pages/Loading/Loading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logo from "../../assets/Ruff_Logo-min.svg";

const Navbar = () => {
	const [user, setUser] = useState(null);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			const user = await authGetCurrentUserInfo();
			setUser(user);
		};

		getUser();
	}, []);

	const handleScroll = () => {
		const offset = window.scrollY;
		setScrolled(offset > 0); // Set true if scrolled down, false if at the top
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	if (user === null) {
		return <Loading />;
	}

	return (
		<div className={`nav ${scrolled ? `scrolled` : ``}`}>
			<div className="navContainer">
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				<div className="userInfo">
					<div className="userImage">
						<img src={user.profilePic} alt="" />
					</div>
					<div className="userDropdown">
						<div className="userDropdownIcon">
							<ArrowDropDownIcon />
						</div>
						<div className="userDropdownContent">
							<div className="userDropdownInfo">
								<img src={user.profilePic} alt="" />
								<h4>{user.username}</h4>
							</div>
							<ul>
								<li>
									<button>
										<Person2OutlinedIcon className="dropdownIcon" />
										Profile
									</button>
								</li>
								<li>
									<button>
										<SettingsOutlinedIcon className="dropdownIcon" />
										Settings
									</button>
								</li>
								<li>
									<button
										className="logoutButtonNav"
										onClick={authLogout}>
										<LogoutOutlinedIcon className="dropdownIcon" />
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
