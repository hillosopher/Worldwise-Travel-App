import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useState, useEffect } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const formatShortDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth < 900);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>
          {isMobile ? formatShortDate(date) : formatDate(date)}
        </time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
