import { TravelMode } from "components/MainPage/types";
import styles from "styles/RadioGroupTravelMode.module.css";

function RadioGroupTravelMode({
  radioTravelMode,
  radioHandler,
}: {
  radioTravelMode: TravelMode;
  radioHandler(e: React.ChangeEvent<HTMLInputElement>): void;
}) {
  return (
    <div className={styles.radioContainer}>
      <label className={styles.radioLabel}>
        {TravelMode.TRANSIT}{" "}
        <input
          type="radio"
          value={TravelMode.TRANSIT}
          title={TravelMode.TRANSIT}
          checked={radioTravelMode === TravelMode.TRANSIT}
          onChange={radioHandler}
        />
      </label>
      <label className={styles.radioLabel}>
        {TravelMode.DRIVING}{" "}
        <input
          type="radio"
          value={TravelMode.DRIVING}
          title={TravelMode.DRIVING}
          checked={radioTravelMode === TravelMode.DRIVING}
          onChange={radioHandler}
        />
      </label>
      <label className={styles.radioLabel}>
        {TravelMode.WALKING}{" "}
        <input
          type="radio"
          value={TravelMode.WALKING}
          title={TravelMode.WALKING}
          checked={radioTravelMode === TravelMode.WALKING}
          onChange={radioHandler}
        />
      </label>
    </div>
  );
}

export default RadioGroupTravelMode;
