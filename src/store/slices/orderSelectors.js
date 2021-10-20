export const selectIsLoading = (state) =>
  state.location.isLoading || state.car.isCategoriesFetching || state.car.isCarsFetching;

export const selectCompletedSteps = (state) => {
  const { location, car } = state;
  return { location: location.pickedPoint, car: car.pickedCar };
};

export const selectOrderData = (state) => {
  const { location, car } = state;
  return [
    ...(location.pickedPoint
      ? [
          {
            name: 'Пункт выдачи',
            text: `${location.pickedCity.name}, ${location.pickedPoint.address}`,
          },
        ]
      : []),

    ...(car.pickedCar ? [{ name: 'Модель', text: car.pickedCar.name }] : []),
  ];
};
