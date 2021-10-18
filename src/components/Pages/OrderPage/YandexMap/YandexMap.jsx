import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import {
  getLocationDataCoords,
  pickPoint,
  selectCitiesCoords,
  selectIsLocationDataFetching,
  selectPickedCity,
  selectPickedPoint,
  selectPointsCoords,
} from '../../../../store/slices/locationSlice';
import mapIcon from '../../../../assets/icons/MapIcon.svg';

const DEFAULT_ZOOM = 5;
const CITY_ZOOM = 11;
const POINT_ZOOM = 17;
const defaultMapState = { center: [55.032286, 51.673704], zoom: DEFAULT_ZOOM };

const YandexMap = () => {
  const pointsCoords = useSelector(selectPointsCoords);
  const citiesCoords = useSelector(selectCitiesCoords);
  const isLocationDataFetching = useSelector(selectIsLocationDataFetching);
  const pickedCity = useSelector(selectPickedCity);
  const pickedPoint = useSelector(selectPickedPoint);
  const dispatch = useDispatch();
  const [mapState, setMapState] = useState(defaultMapState);
  const [ymapsApi, setYmapsApi] = useState(null);

  useEffect(() => {
    if (pickedCity && !pickedPoint) {
      setMapState({
        center: citiesCoords.find((coords) => coords.cityId === pickedCity.id).coords,
        zoom: CITY_ZOOM,
      });
    }
  }, [pickedCity]);

  useEffect(() => {
    if (pickedPoint) {
      setMapState({
        center: pointsCoords.find((coords) => coords.pointId === pickedPoint.id).coords,
        zoom: POINT_ZOOM,
      });
    }
  }, [pickedPoint]);

  useEffect(() => {
    if (!isLocationDataFetching && ymapsApi) {
      dispatch(getLocationDataCoords(ymapsApi));
    }
  }, [isLocationDataFetching, ymapsApi]);

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
      <Map onLoad={onMapLoad} state={mapState} modules={['geocode']} width="100%" height="100%">
        {pointsCoords.map((coords) => (
          <Placemark
            key={coords.pointId}
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
