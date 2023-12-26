import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Watch() {
	const [movie, setMovie] = useState(null);
	const [fetching, setFetching] = useState(true);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		if (params.movieId) {
			fetchMovie(params.movieId);
		}
	}, [params.movieId]);

	const fetchMovie = async (movieId) => {
		const baseURL = "http://api.rufftv.com/api";
		try {
			setFetching(true);
			const res = await axios.get(baseURL + "/movies/find/" + movieId, {
				headers: {
					authorization: localStorage.getItem("authorization"),
				},
			});
			setMovie(res.data);
			setFetching(false);
		} catch (err) {
			console.log(err);
			setFetching(false);
		}
	};

	const handleClick = () => {
		navigate("/");
	};

	return fetching ? (
		<Loading />
	) : (
		<div className="watch">
			<div className="back" onClick={handleClick}>
				<ArrowBackOutlined />
				Home
			</div>
			{movie && (
				<video
					className="videoplayer"
					autoPlay
					controls
					lazy
					src={movie.video}
				/>
			)}
		</div>
	);
}
