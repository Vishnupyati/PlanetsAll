// PlanetsPage.js
import React, { useState, useEffect } from 'react';
import PlanetCard from './planetcard';
import './App.css';

function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [nextPageURL, setNextPageURL] = useState('https://swapi.dev/api/planets/?format=json');

  useEffect(() => {
    fetchPlanets(nextPageURL);
  }, [nextPageURL]);

  const fetchPlanets = (url) => {
  fetch(url)
      .then(response => response.json())
      .then(data => {
        setNextPageURL(data.next);
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
      })
      .catch(error => console.error('Error fetching planets:', error));
  };

  return (
    <div className="container">
      <h1>Star Wars Planets</h1>
      <div className="planets-container">
        {planets.map(planet => (
          <PlanetCard key={planet.name} planet={planet} />
        ))}
      </div>
      {nextPageURL && (
        <button className="load-more" onClick={() => fetchPlanets(nextPageURL)}>Load More</button>
      )}
    </div>
  );
}

export default PlanetsPage;
