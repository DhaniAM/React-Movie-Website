import React, { useState } from "react";
import Video from "./Video";
import "./Section.css";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Section = ({
	sectionName,
	data,
	popularPage,
	setPopularPage,
	topPage,
	setTopPage,
	nowPlayPage,
	setNowPlayPage,
	isSearching,
	searchResult,
	id,
}) => {
	const popularPageHandler = e => {
		if (e.target.value === "next") {
			setPopularPage(popularPage + 1);
		} else if (e.target.value === "prev" && popularPage !== 1) {
			setPopularPage(popularPage - 1);
		}
	};

	const topPageHandler = e => {
		if (e.target.value === "next") {
			setTopPage(topPage + 1);
		} else if (e.target.value === "prev" && topPage !== 1) {
			setTopPage(topPage - 1);
		}
	};

	const nowPlayPageHandler = e => {
		if (e.target.value === "next") {
			setNowPlayPage(nowPlayPage + 1);
		} else if (e.target.value === "prev" && nowPlayPage !== 1) {
			setNowPlayPage(nowPlayPage - 1);
		}
	};

	return (
		<div className='section'>
			<h1 className='section-title' id={id}>
				{sectionName}
			</h1>
			<div className='video-section'>
				{data.map(item => (
					<Link to={`/${item.id}`}>
						<Video
							key={item.id}
							title={item.title}
							overview={item.overview}
							pic={item.poster_path}
							rating={item.vote_average}
							releaseDate={item.release_date}
						/>
					</Link>
				))}
			</div>

			{/* Next & Prev */}
			<div className='nav-page'>
				{/* Prev */}
				<a href={`#${id}`}>
					<button
						className='prev'
						value='prev'
						onClick={
							sectionName === "Most Popular Movies"
								? popularPageHandler
								: sectionName === "Top Rated Movies"
								? topPageHandler
								: sectionName === "Now Playing"
								? nowPlayPageHandler
								: ""
						}
					>
						Prev
					</button>
				</a>

				{/* Next */}
				<a href={`#${id}`}>
					<button
						className='next'
						value='next'
						onClick={
							sectionName === "Most Popular Movies"
								? popularPageHandler
								: sectionName === "Top Rated Movies"
								? topPageHandler
								: sectionName === "Now Playing"
								? nowPlayPageHandler
								: ""
						}
					>
						Next
					</button>
				</a>
			</div>
		</div>
	);
};

export default Section;
