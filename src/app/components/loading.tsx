"use client";

import { Button } from "@material-tailwind/react";

const Loading = ({}) => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center gap-4">
      <Button className="text-lg text-pink-200" loading={true}>
        Loading
      </Button>
    </div>
  );
};

export default Loading;
