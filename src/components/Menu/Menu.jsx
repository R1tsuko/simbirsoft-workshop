import s from './Menu.module.scss';
import closeMenuIcon from '../../assets/icons/CloseMenu.svg';
import facebookIcon from '../../assets/icons/FacebookIcon.svg';
import instagramIcon from '../../assets/icons/InstagramIcon.svg';
import telegramIcon from '../../assets/icons/TelegramIcon.svg';
import LanguageButton from '../LanguageButton/LanguageButton';

const Menu = ({ closeMenu, isOpened }) => {
  return (
    <div className={isOpened ? `${s.menuContainer} ${s.active}` : s.menuContainer}>
      <div className={s.blur} />
      <div className={s.menuContent}>
        <div className={s.menuButtonWrapper}>
          <input
            className={s.menuButton}
            onClick={closeMenu}
            type="image"
            src={closeMenuIcon}
            alt="close"
          />
        </div>

        <nav className={s.nav}>
          <ul>
            <li>
              <a href="/#" className={s.navLink}>
                ПАРКОВКА
              </a>
            </li>
            <li>
              <a href="/#" className={s.navLink}>
                СТРАХОВАНИЕ
              </a>
            </li>
            <li>
              <a href="/#" className={s.navLink}>
                БЕНЗИН
              </a>
            </li>
            <li>
              <a href="/#" className={s.navLink}>
                ОБСЛУЖИВАНИЕ
              </a>
            </li>
          </ul>
        </nav>

        <div className={s.socLinks}>
          <a className={s.socLink} href="/#">
            <img src={telegramIcon} alt="telegram" />
          </a>
          <a className={s.socLink} href="/#">
            <img src={facebookIcon} alt="facebook" />
          </a>
          <a className={s.socLink} href="/#">
            <img src={instagramIcon} alt="instagram" />
          </a>
        </div>

        <div className={s.languageButtonWrapper}>
          <LanguageButton />
        </div>
      </div>
    </div>
  );
};

export default Menu;
