import classNames from 'classnames';
import styles from './RadioButton.module.scss';

const RadioButton = ({ labelText, onClick, checked }) => {
  return (
    <div
      className={classNames(styles.radioContainer, {
        [styles.checked]: checked,
      })}
      onClick={onClick}
      role="radio"
      aria-checked={checked}
      tabIndex="0"
      onKeyDown={onClick}
    >
      <input className={styles.radio} id={labelText} type="radio" value={checked} />
      <div className={styles.control} />
      <label className={styles.label} htmlFor={labelText}>
        {labelText}
      </label>
    </div>
  );
};

export default RadioButton;
