import s from './MainPage.module.scss';
import burgerMenuButton from '../../assets/icons/MenuIconBlack.svg';
import locationIcon from '../../assets/icons/LocationIcon.svg';

const MainPage = ({ openMenu }) => {
  return (
    <div className={s.pageContainer}>
      <header className={s.header}>
        <div className={s.title}>
          <input
            className={s.menuButton}
            onClick={openMenu}
            type="image"
            src={burgerMenuButton}
            alt="menu"
          />
          <p className={s.subject}>Need for drive</p>
        </div>
        <div className={s.location}>
          <img className={s.locationIcon} src={locationIcon} alt="location" />
          <p className={s.subject}>Ульяновск</p>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.promoHeader}>
          <p className={s.title}>Каршеринг</p>
          <p className={s.subtitle}>Need for drive</p>
          <p className={s.text}>Поминутная аренда авто твоего города</p>
          <button className={s.action} type="button">
            Забронировать
          </button>
        </div>
      </main>

      <footer className={s.footer}>
        <a className={s.phone} href="tel:+79452342244">
          8 (945) 234-22-44
        </a>
        <p className={s.companyInfo}>&#169; 2016-2019 &rdquo;Need for drive&rdquo;</p>
      </footer>

      <div className={s.sliderStub} />
    </div>
  );
};

export default MainPage;
