import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import burgerMenuButton from '../../assets/icons/MenuIconBlack.svg';
import locationIcon from '../../assets/icons/LocationIcon.svg';

const Header = ({ openMenu }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <input
          className={styles.menuButton}
          onClick={openMenu}
          type="image"
          src={burgerMenuButton}
          alt="menu"
        />
        <Link className={styles.linkToMain} to="/">
          <p className={styles.subject}>Need for drive</p>
        </Link>
      </div>
      <div className={styles.location}>
        <img className={styles.locationIcon} src={locationIcon} alt="location" />
        <p className={styles.subject}>Ульяновск</p>
      </div>
    </header>
  );
};

export default Header;
