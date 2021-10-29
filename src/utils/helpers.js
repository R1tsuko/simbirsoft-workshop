import {
  DEFAULT_COLOR,
  MS_IN_DAY,
  MS_IN_HOUR,
  MS_IN_MIN,
  MS_IN_MONTH,
  MS_IN_WEEK,
} from './constants';

export const findByField = (arr, field, value) => arr.find((el) => el[field] === value);

export const clearExtraSlice = (state) => {
  state.colors = [];
  state.rentStart = null;
  state.rentEnd = null;
  state.controlsState = {
    color: DEFAULT_COLOR,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
    rate: null,
  };
};

const formatMsInDaysAndHours = (ms) => {
  const days = Math.floor(ms / MS_IN_DAY);
  const hours = ((ms % MS_IN_DAY) / MS_IN_HOUR).toFixed(1);
  return (days ? `${days} д ` : '') + (hours ? `${hours} ч` : '');
};

export const prepareOrderDataForView = ({
  city,
  point,
  car,
  color,
  dateFrom,
  dateTo,
  rate,
  price,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
}) => ({
  items: [
    ...(city && point
      ? [
          {
            name: 'Пункт выдачи',
            text: `${city.name}, ${point.address}`,
          },
        ]
      : []),

    ...(car ? [{ name: 'Модель', text: car.name }] : []),
    ...(color !== DEFAULT_COLOR ? [{ name: 'Цвет', text: color }] : []),
    ...(dateFrom && dateTo
      ? [{ name: 'Длительность аренды', text: formatMsInDaysAndHours(dateTo - dateFrom) }]
      : []),
    ...(rate
      ? [
          {
            name: 'Тариф',
            text: `${rate.rateTypeId.name}, ${rate.price} ₽/${rate.rateTypeId.unit}`,
          },
        ]
      : []),
    ...(isFullTank ? [{ name: 'Полный бак', text: 'Да' }] : []),
    ...(isNeedChildChair ? [{ name: 'Детское кресло', text: 'Да' }] : []),
    ...(isRightWheel ? [{ name: 'Правый руль', text: 'Да' }] : []),
  ],
  price,
});

export const chooseTimeModifier = (timeUnitName) => {
  switch (timeUnitName) {
    case 'мин':
      return MS_IN_MIN;
    case 'сутки':
      return MS_IN_DAY;
    case '7 дней':
      return MS_IN_WEEK;
    case '30 дней':
      return MS_IN_MONTH;
    default:
      return null;
  }
};
