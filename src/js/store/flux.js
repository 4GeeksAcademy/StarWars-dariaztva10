const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [],
			characters: [],
			planets: [],
			vehicles: []
		},
		actions: {
			// Acción para cargar personajes
			loadPeople: () => {
				fetch("https://www.swapi.tech/api/people")
					.then(response => response.json())
					.then(data => { //data es el objeto de respuesta que obtengo después de que la primera solicitud fetch se resuelve
						const characterPromises = data.results.map(person => //data.results es un array con todos los personajes obtenidos. Se usa map para recorrer cada elemento (personaje) en ese array.
							fetch(person.url) 
								.then(res => res.json())
								.then(detailsData => ({ //detailsData es el objeto JSON que contiene los detalles del personaje
									...person, //El código crea un nuevo objeto usando el operador de propagación, (toma todas las propiedades originales del personaje y las inmcluye en el nuevo objeto.)
									details: detailsData.result.properties // se añade una nueva propiedad details que contiene las properties obtenidas en detailsData.result. Estas properties incluyen los detalles adicionales
								}))
						);
						return Promise.all(characterPromises);
					})
					.then(charactersWithDetails => {
						setStore({ characters: charactersWithDetails }); // Guardar personajes en el store
					})
					.catch(error => console.error("Error al cargar personajes:", error));
			},

			// Acción para cargar planetas
			loadPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(response => response.json())
					.then(data => {
						setStore({ planets: data.results }); // Guardar planetas en el store
					})
					.catch(error => console.error("Error al cargar planetas:", error));
			},

			// Acción para cargar vehículos
			loadVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles")
					.then(response => response.json())
					.then(data => {
						setStore({ vehicles: data.results }); // Guardar vehículos en el store
					})
					.catch(error => console.error("Error al cargar vehículos:", error));
			},


		}
	};
};

export default getState;
