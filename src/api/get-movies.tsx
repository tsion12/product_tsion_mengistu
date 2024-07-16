// async function getData() {
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: "Bearer ....",
//     },
//   };

//   const response = fetch("https://dummyjson.com/products", options)
//     .then((response) => response.json())
//     .catch((err) => console.error(err));

//   return response;
// }

// export default async function getMovies() {
//   const data = await getData();
//   return data;
// }
import { ProductValues } from "@/app/components/add-products-modal";
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const getAllProducts = async () => {
  const { data } = await api.get("/");
  return data;
};

export const addProduct = async (values: ProductValues) => {
  const { data } = await api.post("/", values);
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
