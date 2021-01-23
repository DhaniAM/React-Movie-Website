import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ query, setQuery, setSearchText }) => {
	// Search
	const queryHandler = e => {
		setQuery(e.target.value);
	};

	const searchTextHandler = () => {
		if (query !== "") {
			setSearchText(query);
		}
	};

	return (
		<div className='header'>
			<Link to='/'>
				<div className='logo'>
					<span>Da</span>movie
				</div>
			</Link>
			<div className='search'>
				<input
					type='text'
					name=''
					className='search-input'
					placeholder='Search movies...'
					onChange={queryHandler}
				/>
				<Link to={query !== "" ? `/search/${query}` : `/`}>
					<button
						className='search-btn'
						onClick={() => {
							searchTextHandler();
						}}
					>
						<i className='fas fa-search'></i>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Header;
