import React from "react";
import InfoSideBlock, { keyType } from "./InfoSideBlock";
import styles from "styles/InfoBlock.module.css";
import { imagesGeoType, wikiDataType } from "store/MainPageStore";
const mockImgs = [
  "/mainBG2.jpg",
  "/mainBG3.jpg",
  "/mainBG4.jpg",
  "/mainBG3.jpg",
];

function InfoBlock({
  wikiData,
  r1,
  r2,
  imagesGeo,
}: {
  wikiData: wikiDataType;
  r1?: string;
  r2?: string;
  imagesGeo: imagesGeoType;
}) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [activeModalKey, setActiveModalKey] = React.useState<keyType | "">("");

  const openImageViewer = React.useCallback((key: keyType, index: number) => {
    setActiveModalKey(key);
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  // const allImgsLink = React.useMemo(() => {
  //   const imagesLink: string[] = [];
  //   if (imagesGeo)
  //     Object.keys(imagesGeo).forEach((key) => {
  //       imagesGeo[key as keyof typeof imagesGeo].forEach((p) => {
  //         if (p) imagesLink.push(p);
  //       });
  //     });
  //   return imagesLink;
  // }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    setActiveModalKey("");
  };

  return (
    <div className={`${styles.infoBlockContainer} ${styles.commonContainer}`}>
      <InfoSideBlock
        openImageViewer={openImageViewer}
        imgs={imagesGeo?.from}
        descr={wikiData?.from?.infoCity}
        cityName={r1}
        closeImageViewer={closeImageViewer}
        imageModalKey="from"
        activeModalKey={activeModalKey}
        isViewerOpen={isViewerOpen}
        currentImage={currentImage}
      />

      <InfoSideBlock
        openImageViewer={openImageViewer}
        imgs={imagesGeo?.to}
        descr={wikiData?.to?.infoCity}
        cityName={r2}
        closeImageViewer={closeImageViewer}
        imageModalKey="to"
        currentImage={currentImage}
        activeModalKey={activeModalKey}
        isViewerOpen={isViewerOpen}
      />
    </div>
  );
}

export default InfoBlock;
