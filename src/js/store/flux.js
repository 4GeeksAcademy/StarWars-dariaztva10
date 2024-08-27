const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [],
			people: [],
			planets: [],
			vehicles: []
		},
		actions: {
			// Acción para cargar personajes
			loadPeople: () => {
				fetch("https://www.swapi.tech/api/people")
					.then(response => response.json())
					.then(data => {
						// Procesar detalles adicionales de cada personaje
						const characterPromises = data.results.map(person =>
							fetch(person.url)
								.then(res => res.json())
								.then(detailsData => ({
									...person,
									details: detailsData.result.properties // Añadir detalles
								}))
						);
						return Promise.all(characterPromises);
					})
					.then(charactersWithDetails => {
						setStore({ people: charactersWithDetails }); // Guardar personajes en el store
					})
					.catch(error => console.error("Error al cargar personajes:", error));
			},

			// Acción para cargar planetas
			loadPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(response => response.json())
					.then(data => {
						const planetsPromises = data.results.map(planet =>
							fetch(planet.url)
								.then(res => res.json())
								.then(detailsData => ({
									...planet,
									details: detailsData.result.properties // Añadir detalles
								}))
						);
						return Promise.all(planetsPromises);
					})
					.then(planetsWithDetails => {
						setStore({ planets: planetsWithDetails }); // Guardar planetas en el store
					})
					.catch(error => console.error("Error al cargar planetas:", error));
			},

			// Acción para cargar vehículos
			loadVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles")
					.then(response => response.json())
					.then(data => {
						const vehiclesPromises = data.results.map(vehicle =>
							fetch(vehicle.url)
								.then(res => res.json())
								.then(detailsData => ({
									...vehicle,
									details: detailsData.result.properties // Añadir detalles
								}))
						);
						return Promise.all(vehiclesPromises);
					})
					.then(vehiclesWithDetails => {
						setStore({ vehicles: vehiclesWithDetails }); // Guardar planetas en el store
					})
					.catch(error => console.error("Error al cargar vehículos:", error));
			},


		}
	};
};

export default getState;
