import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<img className="iconStarWars" src="https://www.officialpsds.com/images/thumbs/Star-Wars-Logo-psd35718.png"></img>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button type="button" className="favoritos btn btn-warning position-relative" data-bs-toggle="modal" data-bs-target="#exampleModal">
						Favoritos
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							0
							<span className="visually-hidden"></span>
						</span>

					</button>
					<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="exampleModalLabel">Aquí están tus favoritos</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									...

								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cierra</button>
									<button type="button" className="btn btn-warning">Guarda</button>
								</div>
							</div>
						</div>
					</div>

				</Link>
			</div>
		</nav>
	);
};
