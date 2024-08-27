import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/demo.css";

export const Demo = () => {
	const { type, id } = useParams();  // Obtenemos 'type' y 'id' de la URL
	const [details, setDetails] = useState(null);  // Estado para almacenar los detalles
	const [error, setError] = useState(null);  // Estado para manejar errores
	const [imageURL, setImageURL] = useState("");

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


	if (type == "people") {
		setImageURL(`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`);
	} else {
		setImageURL(`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`);
	}
	return (
		<div className="demoContainer">
			<h1 className="text-center">{details.name}</h1>  {/* Muestra el nombre del elemento */}
			<div className="grupo row">
				<img
					className="col-6 imagenDemo"
					src={imageURL}  // URL de la imagen
					onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Star_Wars_Yellow_Logo.svg/1268px-Star_Wars_Yellow_Logo.svg.png"}
				/>



				<div className="col-6 informacionDetallada">
					<ul>
						{Object.entries(details).map(([key, value]) => (
							<li key={key}>
								<strong>
									{key.replace("_", " ")}:
								</strong>
								{value}
							</li>
						))}
					</ul>
				</div>
				<div className="puntosDescriptivos row">
					<div className="col-12 textoConInformacion">
						<p>Hola! Aquí debería estar la información de cada elemento.</p>
					</div>
				</div>
			</div>
		</div >
	);
};