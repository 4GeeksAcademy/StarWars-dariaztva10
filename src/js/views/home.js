import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"; 


export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadPeople();
		actions.loadPlanets();
		actions.loadVehicles();
	}, []);

	const handleErrorimagen = (e) => {
		e.target.src = "https://www.goodvinilos.com/61003/vinilo-logo-star-wars.jpg";
	};

	console.log(store.fav);
	return (
		<div className="homeContainer container-fluid">
			<h1 className="text-center">Star Wars Blog</h1>

			{/* Sección de Personajes */}
			<h2 className="titulosPrincipales">Personajes:</h2>
			<div className="overflow-auto">
				<div className="d-flex flex-nowrap row">
					{store.people.map(person => (
						<div key={person.uid} className="probar col-12 col-sm-6 col-md-4 col-lg-3 mb-4 px-2">
							<div className="card">
								<img
									src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
									className="card-img-top"
									onError={handleErrorimagen}
									alt={person.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{person.name}</h5>
									<p>Eye Color: {person.details?.eye_color}</p>
									<div className="d-flex justify-content-between align-items-center botonesCard">
										<Link to={`/demo/people/${person.uid}`} className="saberMas btn btn-warning">
											Saber más!
										</Link>
										<button
											type="button"
											onClick={() => actions.addFavoritos(person.name)}
											className="likes btn btn-danger">
											<i className="fas fa-heart heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Sección de Planetas */}
			<h2 className="titulosPrincipales">Planetas:</h2>
			<div className="overflow-auto">
				<div className="d-flex flex-nowrap row">
					{store.planets.map(planet => (
						<div key={planet.uid} className="probar col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="card">
								<img
									src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
									className="card-img-top"
									onError={handleErrorimagen}
									alt={planet.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{planet.name}</h5>
									<p>Climate: {planet.details?.climate}</p>
									<div className="d-flex justify-content-between align-items-center botonesCard">
										<Link to={`/demo/planets/${planet.uid}`} className="saberMas btn btn-warning">
											Saber más!
										</Link>
										<button
											type="button"
											onClick={() => actions.addFavoritos(planet.name)}
											className="likes btn btn-danger">
											<i className="fas fa-heart heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>

					))}
				</div>
			</div>

			{/* Sección de Vehículos */}
			<h2 className="titulosPrincipales">Vehículos:</h2>
			<div className="overflow-auto">
				<div className="d-flex flex-nowrap row">
					{store.vehicles.map(vehicle => (
						<div key={vehicle.uid} className="probar col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="card">
								<img
									src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
									className="card-img-top"
									onError={handleErrorimagen}
									alt={vehicle.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{vehicle.name}</h5>
									<p>Model: {vehicle.details?.model}</p>
									<div className="d-flex justify-content-between align-items-center botonesCard">
										<Link to={`/demo/vehicles/${vehicle.uid}`} className="saberMas btn btn-warning">
											Saber más!
										</Link>
										<button
											type="button"
											onClick={()=> actions.addFavoritos(vehicle.name)}
											className="likes btn btn-danger">
											<i className="fas fa-heart heart"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
