import client from './client';

export const getSkills = ({ server, nickname }) =>
  client.get(`/api/skills/${server}/${nickname}`);

export const getItemPrice = ({ server, itemName }) =>
  client.get(`/api/auction/price/${server}/${itemName}`);

export const getItemPriceTab1 = ({ server, itemName }) =>
  client.get(`/api/auction/tab1/${server}/${itemName}`);
