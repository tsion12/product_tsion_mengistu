import React from "react";
import { ProductType } from "../page";
import CenterModal from "../common/center-modal";
import { Button, Rating, Typography } from "@material-tailwind/react";

interface ProductdataModalProps {
  open: boolean;
  handleOpen: () => void;
  productData?: ProductType;
}

const ProductdataModal = ({
  open,
  handleOpen,
  data,
}: ProductdataModalProps) => {
  return (
    <CenterModal size="lg" open={open} handleOpen={handleOpen}>
      <section className="py-16 px-8">
        <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
          <img
            src={
              data?.images
                ? data?.images
                : "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            alt="pink blazer"
            className="h-[36rem]"
          />
          <div>
            <Typography className="mb-4" variant="h3">
              {data?.title}
            </Typography>
            <Typography variant="h5">
              {data?.price} <span className="text-gray-500">$</span>
            </Typography>
            <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
              {data?.description}
            </Typography>
            <div className="my-8 flex items-center gap-2">
              <Rating value={5} className="text-amber-500" />
              <Typography className="!text-sm font-bold !text-gray-700">
                {data.rating}
                (100 reviews)
              </Typography>
            </div>
            <Typography color="blue-gray" variant="h6">
              Category :
              <span className="text-base font-normal leading-[27px] !text-gray-500">
                {data?.category}
              </span>
            </Typography>
            <Typography color="blue-gray" variant="h6">
              Warranty Information :{" "}
              <span className="text-base font-normal leading-[27px] !text-gray-500">
                {data?.warrantyInformation}
              </span>
            </Typography>
            <div className="my-8 mt-3 flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-gray-900 bg-blue-gray-600 "></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100 "></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900 "></div>
            </div>
            <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
              <Button color="gray" className="w-52">
                Add to Cart
              </Button>
            </div>
          </div>
          <p>
            {" "}
            <p key={data.id}>
              Reviews :{" "}
              {data?.reviews.map((review) => {
                return (
                  <figure key={review.ids} className="w-full">
                    <div className="flex items-center mb-4 text-yellow-300">
                      <svg
                        className="w-5 h-5 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-5 h-5 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-5 h-5 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-5 h-5 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <blockquote>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {review.comment}
                      </p>
                    </blockquote>
                    <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                        alt="profile picture"
                      />
                      <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                        <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                          {review.reviewerName}{" "}
                        </cite>
                        <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                          {review.date}
                        </cite>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </p>
          </p>
        </div>
      </section>
    </CenterModal>
  );
};

export default ProductdataModal;
