import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Private from "./components/Private/Private";

import "./App.scss";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";

function App() {
	return (
		<div className="App">
			<Router basename="/">
				<Routes>
					<Route path="/login" element={<Auth />} />
					<Route element={<Private />}>
						<Route path="/" element={<Home />} />
						<Route path="/movie/:id" element={<Movie />} />
					</Route>
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
