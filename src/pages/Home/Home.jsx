import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Loading from "../Loading/Loading";
import List from "../../components/List/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
	const [lists, setLists] = useState([]);
	const [movies, setMovies] = useState([]);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		const getLists = async () => {
			const baseURL = "http://api.rufftv.com/api";
			try {
				const listres = await axios.get(baseURL + "/lists", {
					headers: {
						authorization: localStorage.getItem("authorization"),
					},
				});
				const movieres = await axios.get(baseURL + "/movies", {
					headers: {
						authorization: localStorage.getItem("authorization"),
					},
				});
				setMovies(movieres.data);
				setLists(listres.data);
				setFetching(false);
			} catch (err) {
				setFetching(false);
				console.log(err);
			}
		};
		getLists();
	}, []);

	if (fetching) {
		return <Loading />;
	}

	return (
		<div className="home">
			<Navbar />
			<Hero />
			{lists.map((list, index) => (
				<List
					key={index}
					listIndex={index + "a"}
					list={list}
					movies={movies}
				/>
			))}
		</div>
	);
};

export default Home;
