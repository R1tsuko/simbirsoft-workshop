import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({
  text,
  linkTo,
  disabled,
  canceling,
  onClick,
  width,
  expandOnSmallScreen,
  roundedOnSmallScreen,
}) => {
  return (
    <button
      className={classNames(styles.action, {
        [styles.expandable]: expandOnSmallScreen,
        [styles.canceling]: canceling,
        [styles.rounded]: roundedOnSmallScreen,
      })}
      style={{ width }}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {linkTo ? <Link className={styles.link} to={linkTo} /> : null}
      {text}
    </button>
  );
};

export default Button;
