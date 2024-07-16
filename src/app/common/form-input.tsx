import { useField } from "formik";
import { ReactNode } from "react";

type PropTypes = {
  icon?: ReactNode;
  name: string;
  type?: string;
  placeholder: string;
  min?: string;
  max?: string;
};

const FormInput = (props: PropTypes) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className="bg-gray-50 border border-[#B1C9E3] text-gray-800 placeholder:text-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
      />
      {meta.touched && meta.error && (
        <p className="text-red-500">{meta.error?.[0]}</p>
      )}
    </>
  );
};

export default FormInput;
