import { useField } from "formik";

type PropTypes = {
  name: string;
  placeholder: string;
  rows?: number;
};

const FormTextarea = (props: PropTypes) => {
  const [field, meta] = useField(props);

  return (
    <>
      <textarea
        rows={6}
        {...field}
        {...props}
        className="px-6 py-2  rounded-md bg-white text-black  placeholder:text-[#bec3c8]"
      />
      {meta.touched && meta.error && (
        <p className="text-red-500">{meta.error?.[0]}</p>
      )}
    </>
  );
};

export default FormTextarea;
