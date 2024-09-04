import { useEffect, useRef, useState } from "react";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import ScrollIndicator from "./ScrollIndicator";

function CityList() {
  const { cities, isLoading } = useCities();
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const cityListRef = useRef(null);

  useEffect(() => {
    const container = cityListRef.current;

    // Function to check scroll position and toggle arrow visibility
    const checkScroll = () => {
      if (!container) return;

      // Can scroll down if not at the bottom
      const canScrollDownNow =
        container.scrollTop + container.clientHeight <
        container.scrollHeight - 10;
      setCanScrollDown(canScrollDownNow);

      // Can scroll up if not at the top
      const canScrollUpNow = container.scrollTop > 10;
      setCanScrollUp(canScrollUpNow);
    };

    checkScroll(); // Initial check on component mount

    if (container) {
      container.addEventListener("scroll", checkScroll);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (container) container.removeEventListener("scroll", checkScroll);
    };
  }, [cities]); // Re-run the effect if cities change

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a pin on the map." />
    );

  return (
    <>
      <div className={styles.cityListContainer}>
        {canScrollUp && <ScrollIndicator direction="down" />}
        <ul className={styles.cityList} ref={cityListRef}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </ul>
        {canScrollDown && <ScrollIndicator direction="up" />}
      </div>
    </>
  );
}

export default CityList;
