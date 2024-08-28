// Define la función `getState` que recibe un objeto con funciones para obtener el store, las acciones y para actualizar el store.
const getState = ({ getStore, getActions, setStore }) => {
	return {
		// Define el estado inicial de la aplicación
		store: {
			demo: [],       
			people: [],     // Propiedad people para almacenar datos de personajes
			planets: [],    // Propiedad planets para almacenar datos de planetas
			vehicles: [],    // Propiedad vehicles para almacenar datos de vehículos
			fav: JSON.parse(localStorage.getItem("fav")) || []			// Propiedad fav para almacenar los favoritos
		},
		actions: {
			// Acción para cargar los personajes desde la API
			loadPeople: () => {
				// Hace una solicitud a la API para obtener la lista de personajes
				fetch("https://www.swapi.tech/api/people")
					.then(response => {
						// Verifica si la respuesta fue exitosa
						if (!response.ok) {
							// Lanza un error si la respuesta no fue exitosa
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						// Convierte la respuesta a formato JSON
						return response.json();
					})
					.then(data => {
						// Crea una lista de promesas para obtener los detalles de cada personaje
						const characterPromises = data.results.map(person =>
							// Hace una solicitud para obtener detalles adicionales de cada personaje
							fetch(person.url)
								.then(res => {
									// Verifica si la solicitud para obtener detalles fue exitosa
									if (!res.ok) {
										// Lanza un error si la respuesta no fue exitosa
										throw new Error(`HTTP error! status: ${res.status}`);
									}
									// Convierte la respuesta a formato JSON
									return res.json();
								})
								.then(detailsData => ({
									// Combina los datos del personaje con los detalles adicionales
									...person,
									details: detailsData.result.properties
								}))
						);
						// Espera a que todas las promesas se resuelvan y devuelve el resultado
						return Promise.all(characterPromises);
					})
					.then(charactersWithDetails => {
						// Actualiza el store con la lista de personajes y sus detalles
						setStore({ people: charactersWithDetails });
					})
					.catch(error => console.error("Error al cargar personajes:", error));
			},

			// Acción para cargar los planetas desde la API
			loadPlanets: () => {
				// Hace una solicitud a la API para obtener la lista de planetas
				fetch("https://www.swapi.tech/api/planets")
					.then(response => {
						// Verifica si la respuesta fue exitosa
						if (!response.ok) {
							// Lanza un error si la respuesta no fue exitosa
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						// Convierte la respuesta a formato JSON
						return response.json();
					})
					.then(data => {
						// Crea una lista de promesas para obtener los detalles de cada planeta
						const planetsPromises = data.results.map(planet =>
							// Hace una solicitud para obtener detalles adicionales de cada planeta
							fetch(planet.url)
								.then(res => {
									// Verifica si la solicitud para obtener detalles fue exitosa
									if (!res.ok) {
										// Lanza un error si la respuesta no fue exitosa
										throw new Error(`HTTP error! status: ${res.status}`);
									}
									// Convierte la respuesta a formato JSON
									return res.json();
								})
								.then(detailsData => ({
									// Combina los datos del planeta con los detalles adicionales
									...planet,
									details: detailsData.result.properties
								}))
						);
						// Espera a que todas las promesas se resuelvan y devuelve el resultado
						return Promise.all(planetsPromises);
					})
					.then(planetsWithDetails => {
						// Actualiza el store con la lista de planetas y sus detalles
						setStore({ planets: planetsWithDetails });
					})
					.catch(error => console.error("Error al cargar planetas:", error));
			},

			// Acción para cargar los vehículos desde la API
			loadVehicles: () => {
				// Hace una solicitud a la API para obtener la lista de vehículos
				fetch("https://www.swapi.tech/api/vehicles")
					.then(response => {
						// Verifica si la respuesta fue exitosa
						if (!response.ok) {
							// Lanza un error si la respuesta no fue exitosa
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						// Convierte la respuesta a formato JSON
						return response.json();
					})
					.then(data => {
						// Crea una lista de promesas para obtener los detalles de cada vehículo
						const vehiclesPromises = data.results.map(vehicle =>
							// Hace una solicitud para obtener detalles adicionales de cada vehículo
							fetch(vehicle.url)
								.then(res => {
									// Verifica si la solicitud para obtener detalles fue exitosa
									if (!res.ok) {
										// Lanza un error si la respuesta no fue exitosa
										throw new Error(`HTTP error! status: ${res.status}`);
									}
									// Convierte la respuesta a formato JSON
									return res.json();
								})
								.then(detailsData => ({
									// Combina los datos del vehículo con los detalles adicionales
									...vehicle,
									details: detailsData.result.properties
								}))
						);
						// Espera a que todas las promesas se resuelvan y devuelve el resultado
						return Promise.all(vehiclesPromises);
					})
					.then(vehiclesWithDetails => {
						// Actualiza el store con la lista de vehículos y sus detalles
						setStore({ vehicles: vehiclesWithDetails });
					})
					.catch(error => console.error("Error al cargar vehículos:", error));
			},
			addFavoritos: (nombreFav) => {
				const store = getStore();
				let updatedFav;
				// Verifica si el nombreFav ya está en la lista de favoritos
				if (store.fav.includes(nombreFav)) {
					// Si está, lo elimina de la lista
					updatedFav = store.fav.filter((repetido) => repetido !== nombreFav);
				} else {
					// Si no está, lo agrega a la lista
					updatedFav =  [...store.fav, nombreFav] ;
				}
				setStore({ fav: updatedFav });
                localStorage.setItem("fav", JSON.stringify(updatedFav)); // Guardar favoritos en localStorage
			}
		}
	};
};

// Exporta la función `getState` como la exportación por defecto del módulo
export default getState;
