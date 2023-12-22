import "./navbar.scss";
import { useState, useEffect } from "react";
import { authGetCurrentUserInfo } from "../../auth/auth";
import Loading from "../../pages/Loading/Loading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const logo =
	"https://firebasestorage.googleapis.com/v0/b/ruff-3fe3b.appspot.com/o/site_assets%2FRuff_Logo-min.svg?alt=media&token=7df87bf5-37b6-4a80-91cb-fb1b3451b07f";

const Navbar = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const user = await authGetCurrentUserInfo();
			setUser(user);
		};

		getUser();
	}, []);

	if (user === null) {
		return <Loading />;
	}

	return (
		<div className="nav">
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
									<button className="logoutButtonNav">
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
