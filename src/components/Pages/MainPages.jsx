import styles from './MainPage.module.scss';
import burgerMenuButton from '../../assets/icons/MenuIconBlack.svg';
import locationIcon from '../../assets/icons/LocationIcon.svg';

const MainPage = ({ openMenu }) => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.title}>
          <input
            className={styles.menuButton}
            onClick={openMenu}
            type="image"
            src={burgerMenuButton}
            alt="menu"
          />
          <p className={styles.subject}>Need for drive</p>
        </div>
        <div className={styles.location}>
          <img className={styles.locationIcon} src={locationIcon} alt="location" />
          <p className={styles.subject}>Ульяновск</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.promoHeader}>
          <p className={styles.title}>Каршеринг</p>
          <p className={styles.subtitle}>Need for drive</p>
          <p className={styles.text}>Поминутная аренда авто твоего города</p>
          <button className={styles.action} type="button">
            Забронировать
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a className={styles.phone} href="tel:+79452342244">
          8 (945) 234-22-44
        </a>
        <p className={styles.companyInfo}>&#169; 2016-2019 &rdquo;Need for drive&rdquo;</p>
      </footer>

      <div className={styles.sliderStub} />
    </div>
  );
};

export default MainPage;
