import React from "react";

const Artist = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      key={name}
      className="flex items-center gap-2 bg-black rounded-md px-3 py-2 w-fit max-w-[175px]"
    >
      <img
        src={image}
        alt=""
        className="h-10 w-10 md:h-14 md:w-14 rounded-md"
      />

      <span className="text-white text-xs md:text-md font-semibold font-poppins">
        {name}
      </span>
    </div>
  );
};

export default Artist;
