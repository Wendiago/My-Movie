import styles from "./loading.module.css";

export const SolarSystem = () => (
  <div className={styles.spinnerBox}>
    <div className={`${styles.blueOrbit} ${styles.leo}`}></div>
    <div className={`${styles.greenOrbit} ${styles.leo}`}></div>
    <div className={`${styles.redOrbit} ${styles.leo}`}></div>
    <div className={`${styles.whiteOrbit} ${styles.w1} ${styles.leo}`}></div>
    <div className={`${styles.whiteOrbit} ${styles.w2} ${styles.leo}`}></div>
    <div className={`${styles.whiteOrbit} ${styles.w3} ${styles.leo}`}></div>
  </div>
);
