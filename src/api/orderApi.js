import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api/db/',
  headers: { 'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b' },
});

export const fetchPoints = async () => {
  return instance.get('point');
};

export const fetchCities = async () => {
  return instance.get('city');
};
