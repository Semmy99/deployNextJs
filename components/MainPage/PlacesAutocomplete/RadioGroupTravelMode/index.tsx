import { TravelMode } from "components/MainPage/types";
// import Image from "next/image";
import styles from "styles/RadioGroupTravelMode.module.css";
import Car from "../../../../public/car.svg";
import Bus from "../../../../public/bus.svg";
import Pedestrian from "../../../../public/pedestrian.svg";
import Plane from "../../../../public/plane.svg";

function RadioGroupTravelMode({
  radioTravelMode,
  radioHandler,
}: {
  radioTravelMode: TravelMode;
  radioHandler(e: React.ChangeEvent<HTMLInputElement>): void;
}) {
  return (
    <div className={styles.radioContainer}>
      <label
        className={`${styles.radioLabel} ${
          radioTravelMode === TravelMode.TRANSIT ? styles.active : ""
        }`}
      >
        <Bus width={30} height={30} />
        <input
          type="radio"
          value={TravelMode.TRANSIT}
          title={"Общественный транспорт"}
          checked={radioTravelMode === TravelMode.TRANSIT}
          onChange={radioHandler}
          className={styles.radioTravel}
        />
      </label>
      <label
        className={`${styles.radioLabel} ${
          radioTravelMode === TravelMode.DRIVING ? styles.active : ""
        }`}
      >
        <Car width={30} height={30} />
        <input
          type="radio"
          value={TravelMode.DRIVING}
          title={"На авто"}
          checked={radioTravelMode === TravelMode.DRIVING}
          onChange={radioHandler}
          className={styles.radioTravel}
        />
      </label>
      <label
        className={`${styles.radioLabel} ${
          radioTravelMode === TravelMode.WALKING ? styles.active : ""
        }`}
      >
        <Pedestrian width={30} height={30} />
        <input
          type="radio"
          value={TravelMode.WALKING}
          title={"Пешком"}
          checked={radioTravelMode === TravelMode.WALKING}
          onChange={radioHandler}
          className={styles.radioTravel}
        />
      </label>
      <label
        className={`${styles.radioLabel} ${
          radioTravelMode === TravelMode.PLANE ? styles.active : ""
        }`}
      >
        <Plane width={30} height={30} />
        <input
          type="radio"
          value={TravelMode.PLANE}
          title={"Самолет"}
          checked={radioTravelMode === TravelMode.PLANE}
          onChange={radioHandler}
          className={styles.radioTravel}
        />
      </label>
    </div>
  );
}

export default RadioGroupTravelMode;
