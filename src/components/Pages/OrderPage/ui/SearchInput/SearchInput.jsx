import { useState } from 'react';
import Input from '../Input/Input';
import styles from './SearchInput.module.scss';

const SearchInput = ({ labelText, placeholder, searchData }) => {
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
    <div className={styles.inputContainer}>
      <Input
        labelText={labelText}
        placeholder={placeholder}
        onFocus={onInputFocus}
        onChange={onInputChange}
        onBlur={onInputBlur}
        value={inputText}
        type="search"
      />
      {isFocused ? (
        <div className={styles.searchItemsContainer}>
          {searchData.map((el, ind) =>
            checkSearchMatch(el) ? (
              <div
                className={styles.searchItem}
                key={el}
                onMouseDown={onSearchItemClick}
                eslint-disable-next-line
                // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                role="option"
                tabIndex={ind + 1}
              >
                {el}
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};
export default SearchInput;
