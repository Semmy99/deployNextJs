import styles from "styles/SceletonText.module.css";

function SceletonText() {
  return (
    <div
      className={`${styles["o-vertical-spacing"]} ${styles["o-vertical-spacing--l"]}`}
    >
      <div className={`${styles["o-media__body"]}`}>
        <div className={`${styles["o-vertical-spacing"]}`}>
          <h3 className={`${styles["blog-post__headline"]}`}>
            <span
              className={`${styles["skeleton-box"]}`}
              style={{ width: "90%" }}
            />
          </h3>
          <p>
            <span
              className={`${styles["skeleton-box"]}`}
              style={{ width: "90%" }}
            />
            <span
              className={`${styles["skeleton-box"]}`}
              style={{ width: "90%" }}
            />
            <span
              className={`${styles["skeleton-box"]}`}
              style={{ width: "90%" }}
            />
            <span
              className={`${styles["skeleton-box"]}`}
              style={{ width: "90%" }}
            />
          </p>
          <div className={styles["blog-post__meta"]}>
            <span className={styles["skeleton-box"]} style={{ width: "90%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceletonText;
