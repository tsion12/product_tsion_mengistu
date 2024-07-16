import React, { Dispatch, SetStateAction, useRef } from "react";
import { ProductType } from "../page";
import { set, z } from "zod";
import { Form, Formik } from "formik";
import { addProduct, updateProduct } from "@/api/get-movies";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import FormInput from "../common/form-input";
import FormTextarea from "../common/form-text-area";
import { useMutation } from "@tanstack/react-query";
import { Chip } from "@material-tailwind/react";

type PropType = {
  data?: ProductType;
  setOpenSideModal: Dispatch<SetStateAction<boolean | ProductType>>;
  refetch: () => void;
};
export interface ProductValues {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string;
}
const validationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required and must be greater than 0"),
  rating: z.number().min(1, "Rating is required "),
  tags: z.string().min(1, "Tags must have at least one element"),
});

const validate = (values: ProductValues) => {
  try {
    validationSchema.parse(values);
    return {};
  } catch (error: unknown) {
    return (error as any).formErrors.fieldErrors;
  }
};

const AddProductsModal = ({ setOpenSideModal, refetch, data }: PropType) => {
  const modalRef = useRef(null);
  const { mutate: addPro, isPending } = useMutation({
    mutationFn: addProduct,
  });

  const { mutate: updateProd, isPending: updateLoading } = useMutation({
    mutationKey: ["updateProd"],
    mutationFn: updateProduct,
  });

  const handleClickOutside = () => {
    // Your custom logic here
    setOpenSideModal(false);
  };

  const onSubmit = (values: ProductValues) => {
    addPro(values, {
      onSuccess: (newProduct) => {
        refetch();
        toast.success(`Product ${newProduct.id} successfully added`);
        handleClickOutside();
      },
      onError: (error) => {
        toast.error("Error adding product");
      },
    });
  };

  const onUpdate = (values: ProductValues) => {
    updateProd(values, {
      onSuccess: () => {
        refetch();
        toast.success("Product successfully updated");
        handleClickOutside();
        setOpenSideModal(false);
      },
      onError: () => {
        toast.error("Error updating product");
      },
    });
  };

  //   useOnClickOutside(modalRef, handleClickOutside);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end transition-all duration-200 ease-in-out bg-black/80">
      <Formik
        initialValues={{
          id: data?.id || 0,
          title: data?.title || "",
          description: data?.description || "",
          price: data?.price || 0,
          rating: data?.rating || 0,
          tags: data?.tags.join(", ") || "",
        }}
        validate={validate}
        onSubmit={data ? onUpdate : onSubmit}>
        {(formikProps) => (
          <Form>
            <div
              ref={modalRef}
              className="fixed inset-y-0 right-0  px-8 py-8 bg-[#301934] rounded-md shadow-lg w-full md:w-[60%] lg:w-[30%]">
              <div className="flex w-full flex-col items-start relative">
                <div className="flex w-full items-start mt-5 mb-5">
                  <MdCancel
                    onClick={() => {
                      setOpenSideModal(false);
                    }}
                    className="absolute -top-3 text-3xl text-red-300 cursor-pointer"
                  />
                  <div className="flex flex-col w-full items-center justify-center gap-2">
                    <div className="font-semibold text-white text-3xl">
                      {data ? "Edit Product" : "Add Product"}
                    </div>
                    <p className="text-[#84818A] text-sm">
                      Fill in the form below to add a new product
                    </p>
                  </div>
                </div>

                <div className="w-full text-white ">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-8">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">Title</p>
                      <FormInput name="title" placeholder="title" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="font-bold">Description</p>
                    <FormTextarea
                      name="description"
                      placeholder="description"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Price</p>
                    <FormInput type="number" name="price" placeholder="price" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Rating</p>
                    <FormInput
                      type="number"
                      name="rating"
                      placeholder="rating"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Tags</p>
                    <FormInput name="tags" placeholder="tags" />
                  </div>
                  <div className="flex gap-2">
                    {formikProps?.values?.tags?.split(",")?.map((item) => (
                      <Chip
                        key={`tag-item-${item?.trim()}`}
                        value={item.trim()}
                        className="rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end w-full mt-8">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-gradient-to-r from-indigo-600 to-pink-500 flex items-center justify-center space-x-2 text-white px-4 py-2 text-sm w-60 rounded-lg">
                    {data
                      ? updateLoading
                        ? "Updating..."
                        : "Update"
                      : isPending
                      ? "Submitting..."
                      : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductsModal;
