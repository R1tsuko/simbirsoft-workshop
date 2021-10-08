import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ text, orderPage, disabled }) => {
  return (
    <button
      className={classNames(styles.action, {
        [styles.orderPage]: orderPage,
      })}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
