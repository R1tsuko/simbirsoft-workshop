export const selectIsLocationDataLoaded = (state) =>
  state.location.pointsCoords.length !== 0 && state.location.citiesCoords.length !== 0;

export const selectIsCarDataLoaded = (state) =>
  state.car.cars.length !== 0 && state.car.categories.length !== 0;

export const selectCompletedSteps = (state) => {
  const { location, car } = state;
  return { location: location.pickedPoint, car: car.pickedCar };
};

export const selectOrderData = (state) => {
  const { location, car } = state;
  return {
    locationOrderData: [
      ...(location.pickedPoint
        ? [
            {
              name: 'Пункт выдачи',
              text: `${location.pickedCity.name}, ${location.pickedPoint.address}`,
            },
          ]
        : []),
    ],
    carOrderData: [...(car.pickedCar ? [{ name: 'Модель', text: car.pickedCar.name }] : [])],
  };
};
