import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Watch(props) {
	const [movie, setMovie] = useState("");
	const [fetching, setFetching] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		setMovie(props.movieId);
	}, [props.movieId]);

	useEffect(() => {
		const getMovie = async () => {
			const baseURL = "http://localhost:8080/api";
			try {
				setFetching(true);
				const res = await axios.get(baseURL + "/movies/find/" + movie, {
					headers: {
						authorization: localStorage.getItem("authorization"),
					},
				});
				setMovie(res.data);
				setFetching(false);
			} catch (err) {
				setFetching(false);
				console.log(err);
			}
		};
		getMovie();
	}, [movie]);

	const handleClick = () => {
		navigate("/");
	};

	if (fetching) {
		return <Loading />;
	}

	return (
		<div className="watch">
			<div className="back" onClick={handleClick}>
				<ArrowBackOutlined />
				Home
			</div>
			<video
				className="videoplayer"
				autoPlay
				controls
				src={movie.video}
			/>
		</div>
	);
}
