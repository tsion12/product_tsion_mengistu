import { Dialog, DialogBody } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

type PropTypes = {
  open: boolean;
  children: ReactNode;
  size?: size;
  handleOpen: () => void;
};

const CenterModal = ({ handleOpen, open, children, size }: PropTypes) => {
  return (
    <Dialog
      size={size}
      className="border-4 overflow-hidden border-task-primary/20 h-max"
      open={open}
      handler={handleOpen}>
      <DialogBody
        className={`${
          size === "md" || size === "sm" ? "h-max" : "h-[90vh]"
        } overflow-scroll  w-full flex flex-col items-center gap-4 `}>
        {children}
      </DialogBody>
    </Dialog>
  );
};

export default CenterModal;
