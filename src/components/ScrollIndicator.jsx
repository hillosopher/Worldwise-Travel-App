import styles from "./ScrollIndicator.module.css";

function ScrollIndicator({ direction }) {
  return direction === "down" ? (
    <div className={styles.arrowDiv}>
      <div className={`${styles.arrow} ${styles.up}`}>&uarr;</div>
    </div>
  ) : (
    <div className={`${styles.arrowDiv} ${styles.down}`}>
      <div className={styles.arrow}>&darr;</div>
    </div>
  );
}

export default ScrollIndicator;
