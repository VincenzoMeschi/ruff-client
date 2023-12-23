import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from "react-router-dom";
import Private from "./components/Private/Private";
import { useState } from "react";

import "./App.scss";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";

function App() {
	let { movieId } = useParams();
	return (
		<div className="App">
			<Router basename="/">
				<Routes>
					<Route path="/login" element={<Auth />} />
					<Route element={<Private />}>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/watch/:movieId"
							element={<Watch movieId={movieId} />}
						/>
					</Route>
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
