import { ProductValues } from "@/app/components/add-products-modal";
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const getAllProducts = async (
  search: string,
  limit: number = 9,
  skip: number = 0
) => {
  const { data } = await api.get(
    `/search?q=${search}&limit=${limit}&skip=${skip}`
  );
  return data;
};
export const addProduct = async (values: ProductValues) => {
  const { data } = await api.post("/add", values);
  return data;
};

export const updateProduct = async (values: ProductValues) => {
  const { data } = await api.put(`/${values.id}`, values);
  return data;
};
export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};
