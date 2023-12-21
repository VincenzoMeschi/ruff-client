import "./movie.scss";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Loading from "../../pages/Loading/Loading";

const Movie = () => {
	// const { id } = useParams();
	// const [movie, setMovie] = useState(null);

	// useEffect(() => {
	// 	const getMovie = async () => {
	// 		const res = await fetch(`/api/movies/${id}`);
	// 		const data = await res.json();
	// 		setMovie(data);
	// 	};

	// 	getMovie();
	// }, [id]);

	// if (!movie) {
	//   return <Loading />;
	// }

	return (
		<div>
			{/* <h1>{movie.title}</h1> */}
			{/* Render other movie details */}
		</div>
	);
};

export default Movie;
