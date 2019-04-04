import axios, {AxiosPromise} from 'axios';
import {ShopModel} from "./models/Shop-model";

const baseUrl = 'http://localhost:8080';

export const getAllShops = (): Promise<Array<ShopModel>> => {
    return axios.get<Array<ShopModel>>(baseUrl + '/api/shops').then((res) => res.data || []);
};

export const removeShop = (id: number): AxiosPromise<string> => {
    return axios.delete(baseUrl + '/api/shop/delete/' + id);
};

export const addShop = (shop: ShopModel): AxiosPromise<string> => {
  return axios.post(baseUrl + '/api/shop/add/', shop);
};

export const editShop = (shop: ShopModel): AxiosPromise<string> => {
  return axios.put(baseUrl + '/api/shop/update/', shop);
};
