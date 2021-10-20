import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api/db/',
  headers: { 'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b' },
});

export const fetchPoints = async () => {
  const response = await instance.get('point');
  return response.data.data;
};

export const fetchCities = async () => {
  const response = await instance.get('city');
  return response.data.data;
};

export const fetchCarCategories = async () => {
  const response = await instance.get('category');
  return response.data.data;
};

export const fetchCars = async () => {
  const response = await instance.get('car');
  return response.data.data;
};
