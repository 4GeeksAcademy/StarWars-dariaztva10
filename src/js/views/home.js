import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		fetch("https://www.swapi.tech/api/people")
			.then(response => response.json())
			.then(data => setPeople(data.results))
			.then(error => console.error(error));

		fetch("https://www.swapi.tech/api/planets")
			.then(response => response.json())
			.then(data => setPlanets(data.results))
			.then(error => console.error(error));

		fetch("https://www.swapi.tech/api/vehicles")
			.then(response => response.json())
			.then(data => setVehicles(data.results))
			.then(error => console.error(error));

	}, []);

	const handleErrorimagen = (e) => {
		e.target.src = "https://www.goodvinilos.com/61003/vinilo-logo-star-wars.jpg";
	};
	return (
		<div className="container">
			<h1 className="text-center ">Star Wars Blog</h1>
			{/* Personajes */}
			<h2>Personajes</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{people.map(person => (
					<div key={person.uid} className="probar col-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
							/>
							<div className="card-body">
								<h5 className="card-title">{person.name}</h5>
								<Link to={`/demo/people/${person.uid}`} className="btn btn-primary">
									View Details
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Planetas */}
			<h2>Planetas</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{planets.map(planets => (
					<div key={planets.uid} className="probar col-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/planets/${planets.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
							/>
							<div className="card-body">
								<h5 className="card-title">{planets.name}</h5>
								<Link to={`/demo/planets/${planets.uid}`} className="btn btn-primary">
									View Details
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Vehiculos */}
			<h2>Vehiculos</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{vehicles.map(vehicles => (
					<div key={vehicles.uid} className="probar col-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicles.uid}.jpg`}
								className="card-img-top cardeta"
								onError={handleErrorimagen}
							/>
							<div className="card-body">
								<h5 className="card-title">{vehicles.name}</h5>
								<Link to={`/demo/vehicles/${vehicles.uid}`} className="btn btn-primary">
									View Details
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
};
