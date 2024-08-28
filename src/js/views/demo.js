import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/demo.css";

export const Demo = () => {
    const { type, id } = useParams();  // obtengo 'type' y 'id' de la URL
    const [details, setDetails] = useState(null);  // Estado para almacenar los detalles
    const [error, setError] = useState(null);  // Estado para manejar errores
    const [description, setDescription] = useState(""); // Estado para almacenar la descripción

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
                // Detecta si la respuesta es HTML en lugar de JSON
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
                    setDescription(data.result.description)
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
        return <div className="text-center">Error: {error}</div>;  // Muestra un mensaje de error si algo falla
    }

    if (!details) {
        return <div className="text-center">Loading...</div>;  // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="demoContainer container-fluid">
            <h1 className="text-center mb-4">{details.name}</h1> 
            <div className="row grupo">
                <div className="col-12 col-md-6 mb-4 d-flex justify-content-center">
                    <img
                        className="img-fluid"
                        src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${id}.jpg`}
                        alt={details.name}
                        onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Star_Wars_Yellow_Logo.svg/1268px-Star_Wars_Yellow_Logo.svg.png"}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <div className="informacionDetallada mb-4">
                        <ul className="list-unstyled">
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
                </div>
            </div>
            <div className="puntosDescriptivos row">

                <div className="textoConInformacion col-12">
                    <p className="descriptionPoco">{description}</p>

                </div>
            </div>
        </div >
    );
};
