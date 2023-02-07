import { TravelMode } from "components/MainPage/types";
// import Image from "next/image";
import styles from "styles/RadioGroupTravelMode.module.css";
import Car from "../../../../public/car.svg";
import Bus from "../../../../public/bus.svg";
import Pedestrian from "../../../../public/pedestrian.svg";

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
        {/* <Image
          src="/bus.svg"
          alt="Фоновое изображение"
          width={20}
          height={20}
          // style={{
          //   objectFit: "cover",
          //   zIndex: "-1",
          // }}
          quality="100"
          placeholder="empty"
          // blurDataURL="/"
        /> */}
        {/* Общественный транспорт */}
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
        {/* На авто */}
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
        {/* Пешком */}
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
      {/* <label className={styles.radioLabel}>
        Общественный транспорт
        <input
          type="radio"
          value={TravelMode.TRANSIT}
          title={"Общественный транспорт"}
          checked={radioTravelMode === TravelMode.TRANSIT}
          onChange={radioHandler}
          // style={{
          //   opacity: 0,
          //   position: "absolute",
          //   zIndex: "-100",
          // }}
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
      </label> */}
    </div>
  );
}

export default RadioGroupTravelMode;
