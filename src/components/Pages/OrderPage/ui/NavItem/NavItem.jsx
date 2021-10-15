import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavItem.module.scss';

const NavItem = ({ to, text, accessible }) => {
  return (
    <NavLink
      className={classNames(styles.navlink, {
        [styles.accessible]: accessible,
      })}
      activeClassName={styles.active}
      to={to}
    >
      {text}
    </NavLink>
  );
};

export default NavItem;
