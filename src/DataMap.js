import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

import "./DataMap.css";

class DataMap extends Component {
	state = {
		pois: [],
		lat: 51.505,
		lng: -0.09,
		zoom: 13
	};
	render() {
		const { pois } = this.state;
		if (!pois.length) {
			return null;
		}
		return (
			<Map center={[pois[0].lat, pois[0].lon]} zoom={this.state.zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				{this.renderPois()}
			</Map>
		);
	}

	renderPois() {
		return this.state.pois.map(point => (
			<Marker key={point.poi_id} position={[point.lat, point.lon]} />
		));
	}

	componentDidMount() {
		this.fetchPois();
	}

	async fetchPois() {
		const response = await fetch("poi");
		const pois = await response.json();
		this.setState({ pois });
	}
}

export default DataMap;
