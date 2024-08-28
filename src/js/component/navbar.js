import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<img
					className="iconStarWars"
					src="https://www.officialpsds.com/images/thumbs/Star-Wars-Logo-psd35718.png"
					alt="Star Wars Logo"
				/>
			</Link>
			<div className="ml-auto">
				<button
					type="button"
					className="favoritos btn btn-warning position-relative"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					Favoritos
					<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
						{store.fav.length}
						<span className="visually-hidden">Número de favoritos</span>
					</span>
				</button>
			</div>

			{/* Modal para mostrar los favoritos */}
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Aquí están tus favoritos:</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<ul>
								{store.fav.map((item, index) => (
									<li
										className="liEnFavoritos"
										key={index}>
										{item}
										<button
											type="button"
											className="eliminarFavorito btn btn-danger btn-sm ms-2"
											onClick={() => actions.addFavoritos(item)}
										>
											<i className="fas fa-times"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="modal-footer">
							<p>¡Tienes {store.fav.length} favoritos!</p>
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
