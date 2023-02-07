import { distanceDataI } from "hooks/useCalculateDistance";
import { imagesGeoType, wikiDataType } from "store/MainPageStore";
import styles from "styles/Home.module.css";
import stylesDistance from "styles/MainPageDistance.module.css";
import InfoBlock from "../InfoBlock";

function DistanceInfoBlock({
  distance,
  wikiData,
  r1,
  r2,
  imagesGeo,
}: {
  distance: distanceDataI | null;
  wikiData: wikiDataType;
  r1?: string;
  r2?: string;
  imagesGeo: imagesGeoType;
}) {
  return (
    <div className={`${styles.container} ${stylesDistance.distanceInfoBlock}`}>
      <h2 className={`${stylesDistance.distanceSubHeader}`}>
        Информация о маршруте
      </h2>
      <div className={`${stylesDistance.distanceFieldContainer}`}>
        <div className={`${stylesDistance.distanceFieldBlock}`}>
          <p className={`${stylesDistance.distanceFieldHeader}`}>КМ</p>
          <p className={`${stylesDistance.distanceVal}`}>
            {" "}
            {Math.floor(distance?.km || 0) || "-"}{" "}
          </p>
        </div>
        <div className={`${stylesDistance.distanceFieldBlock}`}>
          <p className={`${stylesDistance.distanceFieldHeader}`}>МИЛИ</p>
          <p className={`${stylesDistance.distanceVal}`}>
            {" "}
            {Math.floor(distance?.mile || 0) || "-"}{" "}
          </p>
        </div>
        <div className={`${stylesDistance.distanceFieldBlock}`}>
          <p className={`${stylesDistance.distanceFieldHeader}`}>ВРЕМЯ</p>
          <p className={`${stylesDistance.distanceVal}`}>
            {" "}
            {distance?.txt || "-"}{" "}
          </p>
        </div>
      </div>

      <InfoBlock wikiData={wikiData} r1={r1} r2={r2} imagesGeo={imagesGeo} />
    </div>
  );
}

export default DistanceInfoBlock;
