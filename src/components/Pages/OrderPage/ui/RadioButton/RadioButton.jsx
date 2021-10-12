import classNames from 'classnames';
import styles from './RadioButton.module.scss';

const RadioButton = ({ labelText, onChange, checked, name, value }) => {
  return (
    <label
      className={classNames(styles.label, {
        [styles.checked]: checked,
      })}
      htmlFor={labelText}
    >
      <input
        className={styles.input}
        onChange={onChange}
        id={labelText}
        type="radio"
        value={value}
        checked={checked}
        name={name}
      />
      <div className={styles.control} />
      {labelText}
    </label>
  );
};

export default RadioButton;
