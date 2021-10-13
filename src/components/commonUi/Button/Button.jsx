import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ text, orderPage, disabled, canceling, linkTo }) => {
  return (
    <Link className={styles.link} to={linkTo}>
      <button
        className={classNames(styles.action, {
          [styles.orderPage]: orderPage,
          [styles.canceling]: canceling,
        })}
        type="button"
        disabled={disabled}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
