import React from "react";
import InfoSideBlock, { keyType } from "./InfoSideBlock";
import styles from "styles/InfoBlock.module.css";
import { useRouter } from "next/router";
import { imagesGeoType, wikiDataType } from "store/MainPageStore";
import { useStore } from "components/StoreProvider";

function InfoBlock({
  wikiData,
  imagesGeo,
}: {
  wikiData: wikiDataType;
  imagesGeo: imagesGeoType;
}) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [activeModalKey, setActiveModalKey] = React.useState<keyType | "">("");

  const {
    MainPageStore: { queryParams },
  } = useStore();

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
    <div className={styles.infoBlockBg}>
      <div className={`${styles.infoBlockContainer} ${styles.commonContainer}`}>
        <InfoSideBlock
          openImageViewer={openImageViewer}
          imgs={imagesGeo?.from}
          descr={wikiData?.from?.infoCity}
          cityName={queryParams?.r1 || ""}
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
          cityName={queryParams?.r2 || ""}
          closeImageViewer={closeImageViewer}
          imageModalKey="to"
          currentImage={currentImage}
          activeModalKey={activeModalKey}
          isViewerOpen={isViewerOpen}
        />
      </div>
    </div>
  );
}

export default InfoBlock;
