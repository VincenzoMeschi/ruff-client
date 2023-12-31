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
	const [isHovered, setIsHovered] = useState(false);
	const [hoverTimeout, setHoverTimeout] = useState(null);
	const [playTimeout, setPlayTimeout] = useState(null);
	const [movie, setMovie] = useState(null);
	const [title, setTitle] = useState("Loading...");
	const [desc, setDesc] = useState("Loading...");
	const [img, setImg] = useState("Loading...");
	const [video, setVideo] = useState(null);
	const [year, setYear] = useState("Loading...");
	const [time, setTime] = useState("Loading...");

	const videoRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const selectedmovie = movies.filter((movie) => {
			return movie._id === movieId;
		});
		setMovie(selectedmovie[0]);
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
		setIsHovered(true);
		const listitem = document.getElementById(
			`listItem-${index}-${listIndex}`
		);
		const timeout = setTimeout(() => {
			listitem.classList.add("postHover");
			const playTimeout = setTimeout(() => {
				listitem.classList.add("postHoverPlay");
				videoRef.current.currentTime = 10;
				videoRef.current.play();
			}, 1200);
			setPlayTimeout(playTimeout);
		}, 1000);
		setHoverTimeout(timeout);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		clearTimeout(hoverTimeout);
		clearTimeout(playTimeout);
		document
			.getElementById(`listItem-${index}-${listIndex}`)
			.classList.remove("postHover");
		document
			.getElementById(`listItem-${index}-${listIndex}`)
			.classList.remove("postHoverPlay");
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
					src={isHovered ? video : ""}
					autoPlay={false}
					onClick={handleVideoClick}
					loop
					preload="none"
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
