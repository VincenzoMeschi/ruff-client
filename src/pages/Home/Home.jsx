import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Loading from "../Loading/Loading";
import List from "../../components/List/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
	const [lists, setLists] = useState([]);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		const getLists = async () => {
			const baseURL = "http://localhost:8080/api";
			try {
				setFetching(true);
				const res = await axios.get(baseURL + "/lists", {
					headers: {
						authorization: localStorage.getItem("authorization"),
					},
				});
				setLists(res.data);
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
				<List key={index} listIndex={index + "a"} list={list} />
			))}
		</div>
	);
};

export default Home;
