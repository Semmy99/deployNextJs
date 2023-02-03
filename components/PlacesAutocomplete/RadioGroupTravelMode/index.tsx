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
        Общественный транспорт
        <input
          type="radio"
          value={TravelMode.TRANSIT}
          title={"Общественный транспорт"}
          checked={radioTravelMode === TravelMode.TRANSIT}
          onChange={radioHandler}
        />
      </label>
      <label className={styles.radioLabel}>
        На авто
        <input
          type="radio"
          value={TravelMode.DRIVING}
          title={"На авто"}
          checked={radioTravelMode === TravelMode.DRIVING}
          onChange={radioHandler}
        />
      </label>
      <label className={styles.radioLabel}>
        Пешком
        <input
          type="radio"
          value={TravelMode.WALKING}
          title={"Пешком"}
          checked={radioTravelMode === TravelMode.WALKING}
          onChange={radioHandler}
        />
      </label>
    </div>
  );
}

export default RadioGroupTravelMode;
