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

export const fetchRates = async () => {
  const response = await instance.get('rate');
  return response.data.data;
};

export const fetchOrderStatus = async () => {
  const response = await instance.get('orderStatus');
  return response.data.data;
};

export const postOrder = async (orderData) => {
  const response = await instance.post('order', orderData);
  return response.data.data;
};

export const fetchOrder = async (orderId) => {
  const response = await instance.get(`order/${orderId}`);
  return response.data.data;
};

export const putOrderStatus = async (orderId, newOrderStatusId) => {
  const response = await instance.put(`order/${orderId}`, {
    orderStatusId: { id: newOrderStatusId },
  });
  return response.data.data;
};
