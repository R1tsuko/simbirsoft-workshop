const fetchCoordsByAddress = async (ymaps, address) => {
  return ymaps.geocode(address, { results: 1 }).then((response) => {
    return response.geoObjects.get(0)?.geometry.getCoordinates();
  });
};

export default fetchCoordsByAddress;
