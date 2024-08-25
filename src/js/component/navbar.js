import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img className="iconStarWars" src="http://www.officialpsds.com/images/thumbs/Star-Wars-Logo-psd35718.png"></img>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="favoritos btn btn-primary">Favorites</button>
				</Link>
			</div>
		</nav>
	);
};
