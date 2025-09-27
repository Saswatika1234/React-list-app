import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};
