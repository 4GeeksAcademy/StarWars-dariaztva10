import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	// Estados para almacenar los datos de personajes, planetas y vehículos
	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	// useEffect para realizar las solicitudes a la API y actualizar el estado
	useEffect(() => {
		// Fetch para obtener datos de personajes
		fetch("https://www.swapi.tech/api/people")
			.then(response => response.json())
			.then(data => {
				console.log("Datos de personajes:", data.results); // Verifica los datos obtenidos
				setPeople(data.results);
			})
			.catch(error => console.error("Error al obtener personajes:", error));

		// Fetch para obtener datos de planetas
		fetch("https://www.swapi.tech/api/planets")
			.then(response => response.json())
			.then(data => {
				console.log("Datos de planetas:", data.results); // Verifica los datos obtenidos
				setPlanets(data.results);
			})
			.catch(error => console.error("Error al obtener planetas:", error));

		// Fetch para obtener datos de vehículos
		fetch("https://www.swapi.tech/api/vehicles")
			.then(response => response.json())
			.then(data => {
				console.log("Datos de vehículos:", data.results); // Verifica los datos obtenidos
				setVehicles(data.results);
			})
			.catch(error => console.error("Error al obtener vehículos:", error));

	}, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

	// Función para manejar errores al cargar imágenes
	const handleErrorimagen = (e) => {
		console.log('Imagen fallida:', e.target.src); // Imprime la URL de la imagen que falló
		e.target.src = "https://www.goodvinilos.com/61003/vinilo-logo-star-wars.jpg"; // Imagen por defecto
	};

	return (
		<div className="homeContainer">
			<h1 className="text-center">Star Wars Blog</h1>

			{/* Sección de Personajes */}
			<h2 className="titulosPrincipales">Personajes:</h2>
			<div className="row d-flex flex-nowrap overflow-auto">
				{people.map(person => (
					<div key={person.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}// URL para la imagen del personaje
								className="card-img-top cardeta"
								onError={handleErrorimagen} // Manejador de error para la imagen
								alt={person.name} // Texto alternativo para la imagen
							/>
							<div className="card-body">
								<h5 className="card-title">{person.name}</h5>
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
				{planets.map(planet => (
					<div key={planet.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} // URL para la imagen del planeta
								className="card-img-top cardeta"
								onError={handleErrorimagen} // Manejador de error para la imagen
								alt={planet.name} // Texto alternativo para la imagen
							/>
							<div className="card-body">
								<h5 className="card-title">{planet.name}</h5>
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
				{vehicles.map(vehicle => (
					<div key={vehicle.uid} className="probar col-sm-6 col-md-4 col-lg-3">
						<div className="card-group">
							<img
								src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} // URL para la imagen del vehículo
								className="card-img-top cardeta"
								onError={handleErrorimagen} // Manejador de error para la imagen
								alt={vehicle.name} // Texto alternativo para la imagen
							/>
							<div className="card-body">
								<h5 className="card-title">{vehicle.name}</h5>
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
