import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
      <p>
        Position: {lat} {lng}{" "}
      </p>
      <button
        onClick={() => {
          setSearchParams({ lng: 28, lat: 42 });
        }}
      >
        Change Position
      </button>
    </div>
  );
}

export default Map;
