import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/demo.css";

export const Demo = () => {
	const { type, id } = useParams();  // Obtenemos 'type' y 'id' de la URL
	const [details, setDetails] = useState(null);  // Estado para almacenar los detalles
	const [error, setError] = useState(null);  // Estado para manejar errores

	useEffect(() => {
		const url = `https://www.swapi.tech/api/${type}/${id}`;

		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Network response was not ok: ${response.statusText}`);
				}
				return response.text();  // Captura la respuesta como texto
			})
			.then(text => {
				// Detecta si la respuesta es HTML en lugar de JSON(he tenido porblemas con ello)
				if (text.startsWith("<!doctype html>")) {
					console.error("Received HTML instead of JSON:", text);
					setError("Unexpected response format. Received HTML instead of JSON.");
					return;
				}
				// Parsear el texto como JSON
				const data = JSON.parse(text);
				console.log("API response: ", data);  // Verificar la respuesta de la API
				if (data.result && data.result.properties) {
					setDetails(data.result.properties);  // Guardo las propiedades en el estado
				} else {
					console.error("Unexpected API response structure", data);
					setError("Unexpected API response structure");
				}
			})
			.catch(error => {
				console.error("Error fetching data: ", error);
				setError(error.message);  // Guardo el mensaje de error en el estado
			});
	}, [type, id]);  // Dependencias de useEffect para ejecutar la petición cuando cambien

	if (error) {
		return <div>Error: {error}</div>;  // Muestra un mensaje de error si algo falla
	}

	if (!details) {
		return <div>Loading...</div>;  // Muestra un mensaje de carga mientras se obtienen los datos
	}

	// Construye la URL de la imagen para el tipo y id específicos
	const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;
	return (
		<div className="demoContainer">
			<h1 className="text-center">{details.name}</h1>  {/* Muestra el nombre del elemento */}
			<div className="grupo row">
				<img 
					className="col-6 imagenError"
					src={imageUrl}  // URL de la imagen
					onError={(e) => e.target.src = "https://www.goodvinilos.com/61003/vinilo-logo-star-wars.jpg"}

				/>
				<div className="col-6 informacionDetallada">
					<ul>
						{/* 
    					Object.entries(details) convierte el objeto 'details' en un array de pares clave-valor.
    					Por ejemplo, si 'details' es {name: "Luke Skywalker", height: "1.72m"}, entonces:
   						 Object.entries(details) será [["name", "Luke Skywalker"], ["height", "1.72m"]].
   						*/}
						{Object.entries(details).map(([key, value]) => (
							<li key={key}>  {/* Cada ítem de la lista necesita una clave única para ayudar a React a gestionar los cambios. */}
								<strong>
									{/* 
                					Muestra la clave en negrita, reemplazando los guiones bajos con espacios para mayor legibilidad.
                					Si la clave es 'birth_year', se mostrará como 'birth year'.
                					*/}
									{key.replace("_", " ")}:
								</strong>
								{/* Muestra el valor correspondiente a la clave */}
								{value}
							</li>
						))}
					</ul>

				</div>
			</div>
		</div>
	);
};
