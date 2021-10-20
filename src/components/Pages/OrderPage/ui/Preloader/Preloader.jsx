import styles from './Preloader.module.scss';

const Preloader = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles.preloaderWrapper}>
      <div className={styles.preloaderContainer}>
        <div className={styles.preloader} />
      </div>
    </div>
  ) : null;
};

export default Preloader;
