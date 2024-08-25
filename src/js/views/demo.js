import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
			<div>
			Esta es mi view demo
			
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			</div>		
	);
};
