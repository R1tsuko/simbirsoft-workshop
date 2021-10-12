import classNames from 'classnames';
import styles from './CheckBox.module.scss';

const CheckBox = ({ labelText, checked, onChange, name }) => {
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
        type="checkbox"
        checked={checked}
        name={name}
      />
      <div className={styles.control}>
        <svg
          className={styles.checkedIcon}
          width="13"
          height="10"
          viewBox="0 0 13 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
          />
        </svg>
      </div>

      {labelText}
    </label>
  );
};

export default CheckBox;
