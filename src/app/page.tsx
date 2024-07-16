"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "./components/loading";
import { deleteProduct, getAllProducts } from "@/api/get-movies";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  CardFooter,
  Rating,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import AddProductsModal from "./components/add-products-modal";
import toast from "react-hot-toast";
import CenterModal from "./common/center-modal";
import Pagination from "./common/pagination";
import { AiOutlineSearch } from "react-icons/ai";
import ProductDetailsModal from "./components/product-detail-page";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string[];
  images: string;
  category: string;
  warrantyInformation: string;
  thumbnail: string;

  reviews: {
    id: number;
    reviewerName: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700">
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default function Home() {
  const [openSideModal, setOpenSideModal] = useState<ProductType | boolean>(
    false
  );
  const [openCenterModal, setOpenCenterModal] = useState<ProductType | boolean>(
    false
  );

  const [details, setDetails] = useState<ProductType | boolean>(false);

  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState("");
  const handlePagination = (value: number) => {
    setActivePage(value);
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => await getAllProducts(search, 6, 6 * (activePage - 1)),
    queryKey: ["products", search, activePage],
  });
  const { mutate: deleteProd, isPending: deleteLoading } = useMutation({
    mutationKey: ["deleteProd"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      setOpenCenterModal(false);
      refetch();
    },
    onError: () => {
      setOpenCenterModal(false);
      toast.error("Failed to delete product");
    },
  });
  const onDelete = async (id: number) => {
    deleteProd(id);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;

  console.log("render", data.products);
  return (
    <>
      {" "}
      {openSideModal && (
        <AddProductsModal
          refetch={refetch}
          setOpenSideModal={setOpenSideModal}
          data={typeof openSideModal === "boolean" ? undefined : openSideModal}
        />
      )}
      {details && (
        <ProductDetailsModal
          open={typeof details !== "boolean" ? !details : false}
          handleOpen={() => setDetails(false)}
          data={details as ProductType}
        />
      )}
      {openCenterModal && (
        <CenterModal
          size={"sm"}
          open={typeof openCenterModal !== "boolean" ? !openCenterModal : false}
          handleOpen={() => setOpenCenterModal(false)}>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-xl font-bold text-base-main">
              {" "}
              Are you sure you want to delete this Product?
              <div className="flex flex-col my-5 gap-2 text-red-600 items-center justify-center">
                {" "}
                <p>
                  {" "}
                  Title:{" "}
                  {typeof openCenterModal !== "boolean" &&
                    openCenterModal?.title}
                </p>
                <p>
                  Description
                  {typeof openCenterModal !== "boolean" &&
                    openCenterModal?.description}
                </p>
              </div>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setOpenCenterModal(false);
                }}
                className="bg-[#0C53A1] flex items-center justify-center space-x-2 text-white px-4 py-2 text-sm w-20 rounded-lg">
                <p>No</p>
              </button>
              <button
                disabled={deleteLoading}
                onClick={() => {
                  if (typeof openCenterModal !== "boolean") {
                    onDelete(openCenterModal.id);
                  }
                  setOpenCenterModal(false);
                }}
                className="bg-[#FF0000] flex items-center justify-center space-x-2 text-white px-4 py-2 text-sm w-20 rounded-lg">
                <p>{deleteLoading ? "Loading..." : "Delete"}</p>{" "}
              </button>
            </div>
          </div>
        </CenterModal>
      )}
      <div className="container mx-auto">
        <h1 className="p-5 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center font-bold text-4xl">
          My products
        </h1>
        <div className="w-full flex flex-col gap-4 md:flex-row item md:justify-between my-4">
          <div className="flex w-full items-center justify-between mt-4">
            <div className="relative ">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md py-2 px-4 bg-[#C9C9C91F] focus:outline-none focus:ring-2 focus:ring-primary-500 w-96 mx-auto"
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
              />
              <span
                onClick={
                  typing.length > 2
                    ? () => setSearch(typing)
                    : () => setSearch("")
                }
                className="absolute right-3 top-2.5">
                <AiOutlineSearch className="text-gray-400" />
              </span>
            </div>
          </div>
          <Button
            className="md:w-64 w-full"
            onClick={() => setOpenSideModal(true)}
            ripple={true}>
            + Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[70vh] md:h-[75vh] overflow-y-auto gap-10 p-10">
          {data?.products?.map((product: ProductType) => {
            return (
              <Card
                key={product.id}
                color="transparent"
                shadow={true}
                className="w-full max-w-[26rem]   shadow-white shadow-sm">
                <CardHeader
                  onClick={() => setDetails(product)}
                  color="blue-gray"
                  className="relative h-24 hover:scale-105 cursor-pointer">
                  <img
                    src={
                      product.thumbnail
                        ? product.thumbnail
                        : "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    }
                    alt=""
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="red">
                    {product.title}
                  </Typography>
                  <Typography className="h-28 overflow-y-auto">
                    {product.description}
                  </Typography>
                  <div className="flex w-full items-center justify-between gap-0.5">
                    <div className="flex items-center justify-between">
                      <div className="5 flex items-center gap-0">
                        <StarIcon />

                        {product.rating}
                      </div>
                    </div>
                    <Typography color="white" className="text-lg font-bold">
                      {product.price} $
                    </Typography>
                  </div>
                  <div className="w-full  flex items-center justify-between">
                    <Typography color="gray">#{product.tags}</Typography>
                    <p
                      onClick={() => setDetails(product)}
                      className=" text-lg text-blue-800 hover:underline cursor-pointer ">
                      {" "}
                      details
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="flex gap-2 w-full items-center justify-center ">
                    <Button
                      onClick={() => {
                        setOpenCenterModal(product);
                        console.log(product);
                      }}
                      color="red"
                      ripple={true}
                      className="w-full">
                      DELETE
                    </Button>
                    <Button
                      onClick={() => setOpenSideModal(product)}
                      color="blue"
                      ripple={true}
                      className="w-full">
                      EDIT
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="w-full flex justify-end mt-4">
          <Pagination
            handlePagination={handlePagination}
            total={data?.products?.length}
            activePage={activePage}
          />
        </div>
      </div>
    </>
  );
}
