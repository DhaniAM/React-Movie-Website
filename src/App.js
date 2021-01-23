import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import Video from "./components/Video";
import Item from "./components/Item";
import nextId from "react-id-generator";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	const [query, setQuery] = useState("");
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const [popularList, setPopularList] = useState([]);
	const [popularPage, setPopularPage] = useState(1);

	const [topRatedList, setTopRatedList] = useState([]);
	const [topPage, setTopPage] = useState(1);

	const [nowPlayingList, setNowPlayingList] = useState([]);
	const [nowPlayPage, setNowPlayPage] = useState(1);

	useEffect(() => {
		const popular = async () => {
			try {
				let api = await fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=acac9a96a1888da7d39bf69a8c3a51d6&language=en-US&page=${popularPage}`
				);
				let data = await api.json();
				setPopularList(data.results);
				// console.log(data.results);
				return data.results;
			} catch (err) {
				console.log(err);
			}
		};
		popular();
	}, [popularPage]);

	useEffect(() => {
		const topRated = async () => {
			try {
				let api = await fetch(
					`https://api.themoviedb.org/3/movie/top_rated?api_key=acac9a96a1888da7d39bf69a8c3a51d6&language=en-US&page=${topPage}`
				);
				let data = await api.json();
				setTopRatedList(data.results);
				// console.log(data.results);
				return data.results;
			} catch (err) {
				console.log(err);
			}
		};
		topRated();
	}, [topPage]);

	useEffect(() => {
		const nowPlaying = async () => {
			try {
				let api = await fetch(
					`https://api.themoviedb.org/3/movie/now_playing?api_key=acac9a96a1888da7d39bf69a8c3a51d6&language=en-US&page=${nowPlayPage}`
				);
				let data = await api.json();
				setNowPlayingList(data.results);
				// console.log(data.results);
				return data.results;
			} catch (err) {
				console.log(err);
			}
		};
		nowPlaying();
	}, [nowPlayPage]);

	useEffect(() => {
		const search = async () => {
			try {
				let api = await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=acac9a96a1888da7d39bf69a8c3a51d6&language=en-US&query=${query}&page=1&include_adult=false`
				);
				let data = await api.json();
				setSearchResult(data.results);
				// console.log(data.results);
				return data.results;
			} catch (err) {
				console.log(err);
			}
		};
		search();
	}, [query, searchText]);

	return (
		<div className='App'>
			<Router>
				<Header
					query={query}
					setQuery={setQuery}
					setSearchText={setSearchText}
				/>
				<Switch>
					{/* Homepage */}
					<Route
						exact
						path='/'
						render={() => (
							<>
								<Section
									key={nextId()}
									sectionName='Most Popular Movies'
									id='Most Popular Movies'
									data={popularList}
									popularPage={popularPage}
									setPopularPage={setPopularPage}
								/>
								<Section
									key={nextId()}
									sectionName='Top Rated Movies'
									id='Top Rated Movies'
									data={topRatedList}
									topPage={topPage}
									setTopPage={setTopPage}
								/>
								<Section
									key={nextId()}
									sectionName='Now Playing'
									id='Now Playing'
									data={nowPlayingList}
									nowPlayPage={nowPlayPage}
									setNowPlayPage={setNowPlayPage}
								/>
							</>
						)}
					/>

					{/* Search */}
					<Route
						exact
						path='/search/:key'
						render={() => (
							<div className='search-section'>
								{query !== "" && searchResult !== undefined
									? searchResult.map(item => (
											<Link to={`/${item.id}`}>
												<Video
													key={item.id}
													title={item.title}
													overview={item.overview}
													pic={item.poster_path}
													rating={item.vote_average}
													releaseDate={
														item.release_date
													}
												/>
											</Link>
									  ))
									: null}
							</div>
						)}
					/>

					{/* Each movie */}
					<Route exact path='/:id' component={Item} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
