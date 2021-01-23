import React from "react";
import "./Video.css";

const Video = ({ title, overview, pic, rating, releaseDate }) => {
	return (
		<div className='video'>
			<div
				className='thumbnail'
				style={{
					backgroundImage: `url("https://image.tmdb.org/t/p/w400/${pic}")`,
				}}
			></div>
			<h1 className='title'>{title}</h1>
			<p className='rating'>
				Rating: <strong>{rating}</strong>
			</p>
			<p className='release-date'>
				Release date: <strong>{releaseDate}</strong>
			</p>
		</div>
	);
};

export default Video;
