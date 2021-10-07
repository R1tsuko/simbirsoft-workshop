import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Carousel from '../../Carousel/Carousel';
import styles from './MainPage.module.scss';
import Button from '../../commonUi/Button/Button';

const MainPage = ({ openMenu }) => {
  return (
    <div className={styles.pageContainer}>
      <Header openMenu={openMenu} />

      <main className={styles.main}>
        <section className={styles.promoHeader}>
          <h1 className={styles.title}>Каршеринг</h1>
          <p className={styles.subtitle}>Need for drive</p>
          <p className={styles.text}>Поминутная аренда авто твоего города</p>
          <Link to="/order/location">
            <div className={styles.actionWrapper}>
              <Button text="Забронировать" />
            </div>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.phone} href="tel:+79452342244">
          8 (945) 234-22-44
        </a>
        <p className={styles.companyInfo}>&#169; 2016-2019 &rdquo;Need for drive&rdquo;</p>
      </footer>

      <Carousel />
    </div>
  );
};

export default MainPage;
