import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import CheckBox from '../../ui/CheckBox/CheckBox';
import DateInput from '../../ui/DateInput/DateInput';
import RadioButton from '../../ui/RadioButton/RadioButton';
import {
  getRates,
  selectColors,
  selectControlsState,
  selectRates,
  selectRentEnd,
  selectRentStart,
  setControlsState,
  pickRate,
  setRentEnd,
  setRentStart,
} from '../../../../../store/slices/extraSlice';
import { DEFAULT_COLOR } from '../../../../../utils/constants';
import styles from './ExtraTab.module.scss';
import { findByField } from '../../../../../utils/helpers';

const ExtraTab = () => {
  const controlsState = useSelector(selectControlsState);
  const rentStart = useSelector(selectRentStart);
  const rentEnd = useSelector(selectRentEnd);
  const colors = useSelector(selectColors);
  const rates = useSelector(selectRates);
  const dispatch = useDispatch();

  const controlsHandler = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    if (name === 'rate') {
      dispatch(pickRate(findByField(rates, 'id', value)));
    }
    dispatch(setControlsState({ ...controlsState, [name]: value }));
  };

  const onDatePick = (actionCreator) => (date) => dispatch(actionCreator(date?.getTime()));

  useEffect(() => {
    dispatch(getRates());
  }, []);

  return (
    <div className={styles.tabContainer}>
      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Цвет</h2>
        <div className={classNames(styles.controlsContainer, styles.colorControls)}>
          <RadioButton
            labelText={DEFAULT_COLOR}
            onChange={controlsHandler}
            name="color"
            value={DEFAULT_COLOR}
            checked={controlsState.color === DEFAULT_COLOR}
          />
          {colors.map((color) => (
            <RadioButton
              labelText={color}
              onChange={controlsHandler}
              name="color"
              value={color}
              checked={controlsState.color === color}
              key={color}
            />
          ))}
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Дата аренды</h2>

        <div className={styles.dateInputsContainer}>
          <DateInput
            labelText="С"
            placeholder="Введите дату и время"
            pickedDate={rentStart}
            onPickDate={onDatePick(setRentStart)}
            minDate={new Date()}
            maxDate={rentEnd}
          />
          <div className={styles.rentEndInputWrapper}>
            <DateInput
              labelText="По"
              placeholder="Введите дату и время"
              pickedDate={rentEnd}
              onPickDate={onDatePick(setRentEnd)}
              minDate={rentStart || new Date()}
            />
          </div>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Тариф</h2>

        <div className={styles.controlsContainer}>
          {rates.map((rate) => (
            <RadioButton
              labelText={`${rate.rateTypeId.name}, ${rate.price}₽/${rate.rateTypeId.unit}`}
              onChange={controlsHandler}
              name="rate"
              value={rate.id}
              checked={controlsState.rate === rate.id}
            />
          ))}
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Доп услуги</h2>

        <div className={styles.controlsContainer}>
          <CheckBox
            labelText="Полный бак, 500р"
            onChange={controlsHandler}
            name="isFullTank"
            checked={controlsState.isFullTank}
          />
          <CheckBox
            labelText="Детское кресло, 200р"
            onChange={controlsHandler}
            name="isNeedChildChair"
            checked={controlsState.isNeedChildChair}
          />
          <CheckBox
            labelText="Правый руль, 1600р"
            onChange={controlsHandler}
            name="isRightWheel"
            checked={controlsState.isRightWheel}
          />
        </div>
      </section>
    </div>
  );
};

export default ExtraTab;
