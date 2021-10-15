import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchPoints } from '../../api/orderApi';
import fetchCoordsByAddress from '../../api/ymapsApi';

const initialState = {
  cities: [],
  points: [],
  pointsCoords: [],
  citiesCoords: [],
  pickedCity: null,
  pickedPoint: null,
  isPointsFetching: false,
  isCitiesFetching: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// The value we return becomes the `fulfilled` action payload

export const getCities = createAsyncThunk('order/fetchCities', async () => {
  const response = await fetchCities();
  return response.data.data;
});
export const getPoints = createAsyncThunk('order/fetchPoints', async () => {
  const response = await fetchPoints();
  return response.data.data;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    pickCity: (state, action) => {
      const pickedCity = state.cities.find((city) => city.id === action.payload);
      state.pickedCity = pickedCity;
      state.pickedPoint = null;
    },
    pickPoint: (state, action) => {
      const pickedPoint = state.points.find((point) => point.id === action.payload);
      state.pickedPoint = pickedPoint;
      if (pickedPoint) {
        state.pickedCity = state.cities.find((city) => city.id === pickedPoint.cityId.id);
      }
    },
    setPointsCoords: (state, action) => {
      state.pointsCoords = action.payload;
    },
    setCitiesCoords: (state, action) => {
      state.citiesCoords = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.isCitiesFetching = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.isCitiesFetching = false;
      })
      .addCase(getPoints.pending, (state) => {
        state.isPointsFetching = true;
      })
      .addCase(getPoints.fulfilled, (state, action) => {
        state.isPointsFetching = false;
        state.points = action.payload;
      });
  },
});

const { setPointsCoords, setCitiesCoords } = orderSlice.actions;
export const { pickCity, pickPoint } = orderSlice.actions;

export const selectCities = (state) => state.order.cities;
export const selectCitiesCoords = (state) => state.order.citiesCoords;
export const selectPoints = (state) => state.order.points.filter((el) => el.cityId);
export const selectPointsCoords = (state) => state.order.pointsCoords;
export const selectPickedCity = (state) => state.order.pickedCity;
export const selectPickedPoint = (state) => state.order.pickedPoint;
export const selectIsPointsFetching = (state) => state.order.isPointsFetching;
export const selectIsCitiesFetching = (state) => state.order.isCitiesFetching;

export const selectCompletedSteps = (state) => {
  const { order } = state;
  return { location: order.pickedPoint };
};

export const getPointsCoords = (ymaps) => async (dispatch, getState) => {
  const points = selectPoints(getState());
  const fetchingCoords = [];

  points.forEach((point) =>
    fetchingCoords.push(fetchCoordsByAddress(ymaps, `${point.cityId.name} ${point.address}`))
  );

  dispatch(
    setPointsCoords(
      (await Promise.all(fetchingCoords)).map((coords, ind) => ({
        coords,
        pointId: points[ind].id,
      }))
    )
  );
};
export const getCitiesCoords = (ymaps) => async (dispatch, getState) => {
  const cities = selectCities(getState());
  const fetchingCoords = [];

  cities.forEach((city) => fetchingCoords.push(fetchCoordsByAddress(ymaps, `${city.name}`)));

  dispatch(
    setCitiesCoords(
      (await Promise.all(fetchingCoords)).map((coords, ind) => ({
        coords,
        cityId: cities[ind].id,
      }))
    )
  );
};

export default orderSlice.reducer;
