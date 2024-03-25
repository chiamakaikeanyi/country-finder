import React from "react";

import { Icon } from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { formatNumber } from "../../utils";

import type { ICountry } from "types/Country";

import "./Map.scss";

const markerIcon = new Icon({
  iconUrl: require("../../assets/location-pin.png"),
  iconSize: [50, 50],
});

const Map = (props: { filteredCountries: ICountry[] | undefined }) => {
  return (
    <MapContainer center={[10, 20]} zoom={3} scrollWheelZoom={false} id="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.filteredCountries?.map((country: ICountry) => (
        <Marker position={country?.latlng} icon={markerIcon} key={country.cca3}>
          <Popup>
            <b>{country?.name?.common}</b>
            <br />
            <b>Population</b>: {formatNumber(country?.population)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

Map.propTypes = {
  filteredCountries: PropTypes.array,
};

export default Map;
