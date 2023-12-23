import "./hero.scss";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";

const Hero = (props) => {
	const navigate = useNavigate();

	const handlePlay = () => {
		navigate("/watch/6583f01b29854a976546640e");
	};

	return (
		<div className="heroBG">
			<div className="heroVignette"></div>
			<div className="heroContainer">
				<div className="heroContent">
					<div className="heroSpacer"></div>
					<h1>The Dark Knight</h1>
					<ul className="extraInfo">
						<li>Action, Crime</li>
						<li>2008</li>
						<li>2h 32m</li>
					</ul>
					<p>
						When the menace known as the Joker wreaks havoc and
						chaos on the people of Gotham, Batman must accept one of
						the greatest psychological and physical tests of his
						ability to fight injustice.
					</p>
					<div className="heroButtons">
						<button className="heroButton" onClick={handlePlay}>
							<PlayCircleOutlineIcon className="heroButtonIcon" />
							Play
						</button>
						<button className="heroButton heroButtonAlternate">
							<PlaylistAddIcon className="heroButtonIcon" />
							Add to List
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
