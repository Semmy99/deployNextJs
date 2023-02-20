import Image from "next/image";
import styles from "styles/InfoBlock.module.css";
import ImageViewer from "react-simple-image-viewer";
import SceletonText from "components/SceletonText";
export type keyType = "from" | "to";

type InfoSideBlockType = {
  openImageViewer: (key: keyType, index: number) => void;
  imgs?: string[];
  descr: string;
  cityName?: string;
  isViewerOpen: boolean;
  currentImage: number;
  closeImageViewer: () => void;
  imageModalKey: keyType;
  activeModalKey: "" | keyType;
};
function InfoSideBlock({
  openImageViewer,
  imgs,
  descr,
  cityName = "ZHOPA gorod",
  isViewerOpen,
  currentImage,
  closeImageViewer,
  imageModalKey,
  activeModalKey,
}: InfoSideBlockType) {
  return (
    <>
      <div className={styles.infoBlock}>
        <div className={styles.geoContainer}>
          <div className={styles.geoDescrContainer}>
            <p className={styles.geoHeader} title={cityName}>
              {cityName}
            </p>
            {descr ? (
              <p className={styles.geoDescr}>{descr}</p>
            ) : (
              <SceletonText />
            )}
            {/* <Button title="Читать" className={styles.geoBtn} /> */}
          </div>
          <div className={styles.geoImages}>
            {imgs?.map((path, i) => {
              return (
                <div className={styles.geoImageWrap} key={i}>
                  <Image
                    className={styles.geoImage}
                    src={path}
                    // fill
                    alt="Фоновое изображение"
                    width={200}
                    height={200}
                    style={{
                      objectFit: "cover",
                      zIndex: "-1",
                    }}
                    quality="100"
                    placeholder="empty"
                    onClick={() => openImageViewer(imageModalKey, i)}
                    // blurDataURL="/"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isViewerOpen && imgs && activeModalKey === imageModalKey && (
        <ImageViewer
          src={imgs}
          currentIndex={currentImage}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
}

export default InfoSideBlock;
