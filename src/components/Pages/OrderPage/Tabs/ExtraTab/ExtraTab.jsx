import { useState } from 'react';
import classNames from 'classnames';
import CheckBox from '../../ui/CheckBox/CheckBox';
import DateInput from '../../ui/DateInput/DateInput';
import RadioButton from '../../ui/RadioButton/RadioButton';
import styles from './ExtraTab.module.scss';

const addServicesControlsData = [
  { id: 0, labelText: 'Полный бак, 500р', controlName: 'fullTank' },
  { id: 1, labelText: 'Детское кресло, 200р', controlName: 'babyChair' },
  { id: 2, labelText: 'Правый руль, 1600р', controlName: 'rightHand' },
];

const tariffControlsData = [
  { id: 0, labelText: 'Поминутно, 7₽/мин', controlName: 'tariff' },
  { id: 1, labelText: 'На сутки, 1999 ₽/сутки', controlName: 'tariff' },
];

const colorControlsData = [
  { id: 0, labelText: 'Любой', controlName: 'color' },
  { id: 1, labelText: 'Красный', controlName: 'color' },
  { id: 2, labelText: 'Голубой', controlName: 'color' },
];

const defaultControlsState = {
  fullTank: false,
  babyChair: false,
  rightHand: false,
  tariff: null,
  color: 0,
};

const ExtraTab = () => {
  const [controlsState, setControlsState] = useState(defaultControlsState);

  const controlsHandler = (e) => {
    const { target } = e;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'radio') {
      value = +value;
    }
    const { name } = target;

    setControlsState({ ...controlsState, [name]: value });
  };

  return (
    <div className={styles.tabContainer}>
      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Цвет</h2>

        <div className={classNames(styles.controlsContainer, styles.colorControls)}>
          {colorControlsData.map((el) => (
            <RadioButton
              labelText={el.labelText}
              onChange={controlsHandler}
              name={el.controlName}
              value={el.id}
              checked={controlsState.color === el.id}
            />
          ))}
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Дата аренды</h2>

        <div className={styles.controlsContainer}>
          <DateInput labelText="С" />
          <DateInput labelText="По" />
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Тариф</h2>

        <div className={styles.controlsContainer}>
          {tariffControlsData.map((el) => (
            <RadioButton
              labelText={el.labelText}
              onChange={controlsHandler}
              name={el.controlName}
              value={el.id}
              checked={controlsState.tariff === el.id}
            />
          ))}
        </div>
      </section>

      <section className={styles.controlsSection}>
        <h2 className={styles.title}>Доп услуги</h2>

        <div className={styles.controlsContainer}>
          {addServicesControlsData.map((el) => (
            <CheckBox
              labelText={el.labelText}
              onChange={controlsHandler}
              name={el.controlName}
              checked={controlsState[el.controlName]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraTab;
