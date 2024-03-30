import React from "react";

import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { formatNumber } from "../../utils";

import type { ICountry } from "../../types/Country";

import "./Map.scss";

const markerIcon = new Icon({
  iconUrl: require("../../assets/location-pin.png"),
  iconSize: [50, 50],
});

interface IProps {
  countries: ICountry[] | undefined;
}

const Map: React.FC<IProps> = ({ countries }) => {
  return (
    <MapContainer center={[10, 20]} zoom={3} scrollWheelZoom={false} id="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {countries?.map((country: ICountry) => (
          <Marker
            position={country?.latlng}
            icon={markerIcon}
            key={country.cca3}
          >
            <Popup>
              <b>{country?.name?.common}</b>
              <br />
              <b>Population</b>: {formatNumber(country?.population)}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
