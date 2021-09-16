import s from "./MainPage.module.scss";
import burgerMenuButton from "../../assets/icons/BurgerMenuButton.svg";
import locationIcon from "../../assets/icons/LocationIcon.svg";

const MainPage = () => {
  return (
    <div className={s.mainPage}>
      <header className={s.header}>
        <div className={s.headerTop}>
          <img src={burgerMenuButton} alt="burger" />
          <p>Need for drive</p>
        </div>
        <div className={s.headerBottom}>
          <img src={locationIcon} alt="location" />
          <p>Ульяновск</p>
        </div>
      </header>
      <main>
        <div className={s.promoHeader}>
          <p className={s.title}>Каршеринг</p>
          <p className={s.subtitle}>Need for drive</p>
          <p className={s.text}>Поминутная аренда авто твоего города</p>
          <button className={s.action}>Забронировать</button>
        </div>
      </main>
      <footer className={s.footer}>
        <p className={s.phone}>8 (945) 234-22-44</p>
        <p className={s.companyInfo}>&#169; 2016-2019 "Need for drive"</p>
      </footer>
    </div>
  );
};

export default MainPage;
