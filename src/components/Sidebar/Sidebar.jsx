import LanguageButton from '../LanguageButton/LanguageButton';
import styles from './Sidebar.module.scss';
import menuButton from '../../assets/icons/MenuIconWhite.svg';

const Sidebar = ({ openMenu }) => {
  return (
    <div className={styles.sidebar}>
      <input
        className={styles.menuButton}
        onClick={openMenu}
        type="image"
        src={menuButton}
        alt="menu"
      />
      <LanguageButton />
    </div>
  );
};

export default Sidebar;
