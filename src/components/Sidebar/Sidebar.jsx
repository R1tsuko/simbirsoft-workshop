import Styles from './Sidebar.module.scss';
import menuButton from '../../assets/icons/MenuIconWhite.svg';
import LanguageButton from '../LanguageButton/LanguageButton';

const Sidebar = ({ openMenu }) => {
  return (
    <div className={Styles.sidebar}>
      <input
        className={Styles.menuButton}
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
