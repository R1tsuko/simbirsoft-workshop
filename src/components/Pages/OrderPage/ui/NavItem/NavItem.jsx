import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavItem.module.scss';

const NavItem = ({ to, text, accessible }) => {
  return (
    <div className={styles.linkContainer}>
      <div className={styles.disabler} />
      <NavLink
        className={classNames(styles.navlink, {
          [styles.accessible]: accessible,
        })}
        activeClassName={styles.active}
        to={to}
      >
        {text}
      </NavLink>
    </div>
  );
};

export default NavItem;
