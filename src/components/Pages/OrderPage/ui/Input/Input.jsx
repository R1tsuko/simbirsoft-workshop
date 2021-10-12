import { forwardRef } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(
  ({ labelText, placeholder, onChange, onFocus, onBlur, value, type }, ref) => {
    return (
      <label className={styles.label} htmlFor={labelText}>
        {labelText}
        <input
          className={styles.input}
          type={type}
          id={labelText}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          ref={ref}
          autoComplete="off"
        />
      </label>
    );
  }
);
export default Input;
