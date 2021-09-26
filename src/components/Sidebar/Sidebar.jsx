import s from './Sidebar.module.scss';
import menuButton from '../../assets/icons/MenuIconWhite.svg';
import LanguageButton from '../LanguageButton/LanguageButton';

const Sidebar = ({ openMenu }) => {
  return (
    <div className={s.sidebar}>
      <input className={s.menuButton} onClick={openMenu} type="image" src={menuButton} alt="menu" />
      <LanguageButton />
    </div>
  );
};

export default Sidebar;
