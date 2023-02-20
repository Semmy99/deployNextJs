import { distanceDataI } from "hooks/useCalculateDistance";
import { imagesGeoType, wikiDataType } from "store/MainPageStore";
import styles from "styles/MainPage.module.css";
import stylesDistance from "styles/MainPageDistance.module.css";
import InfoBlock from "../InfoBlock";

function DistanceInfoBlock({
  distance,
  wikiData,
  imagesGeo,
}: {
  distance: distanceDataI | null;
  wikiData: wikiDataType;
  imagesGeo: imagesGeoType;
}) {
  return (
    <>
      <div
        className={`${styles.container} ${stylesDistance.distanceInfoBlock}`}
      >
        <div
          className={`${styles.container} ${stylesDistance.distanceInfoBlock}`}
        >
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
        </div>
      </div>
      <InfoBlock wikiData={wikiData} imagesGeo={imagesGeo} />
    </>
  );
}

export default DistanceInfoBlock;
