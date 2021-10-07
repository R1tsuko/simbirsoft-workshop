import { useState } from 'react';
import styles from './Input.module.scss';

const Input = ({ inputId, labelText, placeholder, searchData }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState('');

  const onInputFocus = () => setIsFocused(true);
  const onInputBlur = () => setIsFocused(false);
  const onInputChange = (e) => setInputText(e.target.value);

  const checkSearchMatch = (string) => string.toLowerCase().includes(inputText.toLowerCase());
  const onSearchItemClick = (e) => {
    setInputText(e.target.childNodes[0].data);
  };

  return (
    <div>
      <label className={styles.label} htmlFor={inputId}>
        {labelText}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="search"
          id={inputId}
          placeholder={placeholder}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onInputChange}
          value={inputText}
        />
        {isFocused ? (
          <div className={styles.searchItemsContainer}>
            {searchData.map((el, ind) =>
              checkSearchMatch(el) ? (
                <div
                  className={styles.searchItem}
                  key={el}
                  onMouseDown={onSearchItemClick}
                  // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                  role="option"
                  tabIndex={ind}
                >
                  {el}
                </div>
              ) : null
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Input;
