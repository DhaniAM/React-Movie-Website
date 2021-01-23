import React, { useEffect, useState } from "react";
import "./Item.css";

const Item = ({ match }) => {
	const [itemDetail, setItemDetail] = useState([]);
	const [itemGenres, setGenres] = useState([]);

	useEffect(() => {
		getMovie();
		console.log("getting movie");
	}, []);

	const getMovie = async () => {
		try {
			let api = await fetch(
				`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=acac9a96a1888da7d39bf69a8c3a51d6&language=en-US`
			);
			let data = await api.json();
			setItemDetail(data);
			setGenres(data.genres);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='item'>
			<div
				className='item-poster'
				style={{
					backgroundImage: `url("https://image.tmdb.org/t/p/w500/${itemDetail.poster_path}")`,
				}}
			></div>
			<div className='item-content'>
				<div
					className='item-backdrop'
					style={{
						backgroundImage: `url("https://image.tmdb.org/t/p/w500/${itemDetail.backdrop_path}")`,
					}}
				></div>
				<h1 className='item-title'>{itemDetail.title}</h1>
				<div className='item-wrap'>
					<div className='item-wrap-left'>
						<div className='item-genres-wrap'>
							{itemGenres.map(genre => (
								<p className='item-genres'>{genre.name}</p>
							))}
						</div>
						<h2 className='item-tagline'>{itemDetail.tagline}</h2>
						<p className='item-overview'>{itemDetail.overview}</p>
					</div>
					<div className='item-wrap-right'>
						<p className='item-rating'>{itemDetail.vote_average}</p>
						<p className='item-runtime'>
							<strong>{itemDetail.runtime}</strong> minutes
						</p>
						<p className='item-release-date'>
							Release date:{" "}
							<strong>{itemDetail.release_date}</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
