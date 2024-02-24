import React, { useState, useEffect } from 'react';

function PlanetCard({ planet }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents(planet.residents);
  }, [planet.residents]);

  const fetchResidents = (residentURLs) => {
    Promise.all(residentURLs.map(url => fetch(url).then(response => response.json())))
      .then(residentsData => setResidents(residentsData))
      .catch(error => console.error('Error fetching residents:', error));
  };

  return (
    <div className="card">
        
      <h2>{planet.name}</h2>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Population:</strong> {planet.population}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <h3>Residents:</h3>
      <ul>
        {residents.map(resident => (
          <li key={resident.name}>
            <strong>Name:</strong> {resident.name}<br />
            <strong>Height:</strong> {resident.height}<br />
            <strong>Mass:</strong> {resident.mass}<br />
            <strong>Gender:</strong> {resident.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetCard;
