/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import {
  getCitiesCoords,
  getPointsCoords,
  pickPoint,
  selectCitiesCoords,
  selectIsCitiesFetching,
  selectIsPointsFetching,
  selectPickedCity,
  selectPickedPoint,
  selectPointsCoords,
} from '../../../../store/slices/orderSlice';
import mapIcon from '../../../../assets/icons/MapIcon.svg';

const defaultMapState = { center: [50.75, 37.57], zoom: 5 };

const YandexMap = () => {
  const pointsCoords = useSelector(selectPointsCoords);
  const citiesCoords = useSelector(selectCitiesCoords);
  const isPointsFetching = useSelector(selectIsPointsFetching);
  const isCitiesFetching = useSelector(selectIsCitiesFetching);
  const pickedCity = useSelector(selectPickedCity);
  const pickedPoint = useSelector(selectPickedPoint);
  const [mapState, setMapState] = useState(defaultMapState);
  const dispatch = useDispatch();
  const [ymapsApi, setYmapsApi] = useState(null);

  useEffect(() => {
    if (pickedCity && !pickedPoint) {
      setMapState({
        center: citiesCoords.find((coords) => coords.cityId === pickedCity.id).coords,
        zoom: 11,
      });
    }
  }, [pickedCity]);

  useEffect(() => {
    if (pickedPoint) {
      setMapState({
        center: pointsCoords.find((coords) => coords.pointId === pickedPoint.id).coords,
        zoom: 17,
      });
    }
  }, [pickedPoint]);

  useEffect(() => {
    if (!isPointsFetching && ymapsApi) {
      dispatch(getPointsCoords(ymapsApi));
    }
  }, [isPointsFetching, ymapsApi]);

  useEffect(() => {
    if (!isCitiesFetching && ymapsApi) {
      dispatch(getCitiesCoords(ymapsApi));
    }
  }, [isCitiesFetching, ymapsApi]);

  const onMapLoad = (ymaps) => {
    setYmapsApi(ymaps);
  };
  const onPlacemarkClick = (pointId) => () => {
    dispatch(pickPoint(pointId));
  };

  return (
    <YMaps
      query={{
        apikey: '25b8e0a6-db8c-4fbc-a25f-dfa0b57a226c',
      }}
    >
      <Map
        onLoad={onMapLoad}
        defaultMapState={defaultMapState}
        state={mapState}
        modules={['geocode']}
        width="100%"
        height="100%"
      >
        {pointsCoords.map((coords) => (
          <Placemark
            geometry={coords.coords}
            onClick={onPlacemarkClick(coords.pointId)}
            options={{ iconLayout: 'default#image', iconImageHref: mapIcon }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
