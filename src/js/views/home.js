import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);  // Usar el contexto para acceder al store y actions

	useEffect(() => {
		// Cargar datos al montar el componente
		actions.loadPeople();
		actions.loadPlanets();
		actions.loadVehicles();
	}, []);  // Dependencias vacías para que se ejecute solo al montar el componente

	const handleErrorimagen = (e) => {
		e.target.src = "https://www.goodvinilos.com/61003/vinilo-logo-star-wars.jpg";
	};

	return (
		<div className="homeContainer">
			<h1 className="text-center">Star Wars Blog</h1>

			{/* Sección de Personajes */}
			<h2 className="titulosPrincipales">Personajes:</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{store.characters.map(person => (
					<div key={person.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
								alt={person.name}
							/>
							<div className="card-body">
								<h5 className="card-title">{person.name}</h5>
								<p>Eye Color: {person.details?.eye_color}</p> {/* Añadir detalles */}
								<div className="botonesCard">
									<Link to={`/demo/people/${person.uid}`} className="saberMas btn btn-warning">
										Saber más!
									</Link>
									<button type="button" className="likes btn btn-danger">
										<i className="fas fa-heart heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Sección de Planetas */}
			<h2 className="titulosPrincipales">Planetas:</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{store.planets.map(planet => (
					<div key={planet.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
								alt={planet.name}
							/>
							<div className="card-body">
								<h5 className="card-title">{planet.name}</h5>
								<p>Climate: {planet.details?.climate}</p> {/* Añadir detalles */}
								<div className="botonesCard">
									<Link to={`/demo/planets/${planet.uid}`} className="saberMas btn btn-warning">
										Saber más!
									</Link>
									<button type="button" className="likes btn btn-danger">
										<i className="fas fa-heart heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Sección de Vehículos */}
			<h2 className="titulosPrincipales">Vehículos:</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{store.vehicles.map(vehicle => (
					<div key={vehicle.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
								alt={vehicle.name}
							/>
							<div className="card-body">
								<h5 className="card-title">{vehicle.name}</h5>
								<p>Model: {vehicle.details?.model}</p> {/* Añadir detalles */}
								<div className="botonesCard">
									<Link to={`/demo/vehicles/${vehicle.uid}`} className="saberMas btn btn-warning">
										Saber más!
									</Link>
									<button type="button" className="likes btn btn-danger">
										<i className="fas fa-heart heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
