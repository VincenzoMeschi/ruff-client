import "./listItem.scss";
import {
	PlayArrow,
	Add,
	ThumbUpAltOutlined,
	ThumbDownOutlined,
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ListItem({ index, listIndex, movieId, movies }) {
	const [hoverTimeout, setHoverTimeout] = useState(null);
	const [movie, setMovie] = useState(null);
	const [title, setTitle] = useState("Loading...");
	const [desc, setDesc] = useState("Loading...");
	const [img, setImg] = useState("Loading...");
	const [video, setVideo] = useState("Loading...");
	const [year, setYear] = useState("Loading...");
	const [time, setTime] = useState("Loading...");

	const videoRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const selectedmovie = movies.filter((movie) => {
			return movie._id === movieId;
		});
		setMovie(selectedmovie[0]);
		console.log("ListItem.jsx: selectedmovie: ", selectedmovie[0]);
	}, [movieId, movies]);

	useEffect(() => {
		if (movie) {
			setTitle(movie.title);
			setDesc(movie.desc);
			setImg(movie.img);
			setVideo(movie.video);
			setYear(movie.year);
			setTime(movie.limit);
		}
	}, [movie]);

	const handleMouseEnter = () => {
		const listitem = document.getElementById(
			`listItem-${index}-${listIndex}`
		);
		const timeout = setTimeout(() => {
			listitem.classList.add("postHover");
			videoRef.current.currentTime = 10;
			videoRef.current.play();
		}, 750);
		setHoverTimeout(timeout);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout);
		document
			.getElementById(`listItem-${index}-${listIndex}`)
			.classList.remove("postHover");
		videoRef.current.pause();
		videoRef.current.currentTime = 0;
	};

	const handleVideoClick = () => {
		navigate(`/watch/${movie._id}`);
	};

	useEffect(() => {
		return () => {
			if (hoverTimeout) {
				clearTimeout(hoverTimeout);
			}
		};
	}, [hoverTimeout]);

	return (
		<div
			className="listItemWrapper"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div id={`listItem-${index}-${listIndex}`} className="listItem">
				<h3 className="itemTitleOverlay">{title}</h3>
				<img src={img} alt="" />
				<video
					ref={videoRef}
					src={video}
					autoPlay={false}
					onClick={handleVideoClick}
					loop
				/>
				<div className="itemInfo">
					<div className="icons">
						<PlayArrow className="icon" />
						<Add className="icon" />
						<ThumbUpAltOutlined className="icon" />
						<ThumbDownOutlined className="icon" />
					</div>
					<div className="itemInfoTop">
						<span>{time}</span>
						<span className="limit">+16</span>
						<span>{year}</span>
					</div>
					<div className="desc">{desc}</div>
					<div className="genre">Action</div>
				</div>
			</div>
		</div>
	);
}
