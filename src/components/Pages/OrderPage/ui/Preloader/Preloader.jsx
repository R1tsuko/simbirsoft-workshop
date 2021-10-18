import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloaderWrapper}>
      <div className={styles.preloaderContainer}>
        <div className={styles.preloader} />
      </div>
    </div>
  );
};

export default Preloader;
