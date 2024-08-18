import React from "react";

const Artist = ({
  name,
  image,
  href,
}: {
  name: string;
  image: string;
  href: string;
}) => {
  return (
    <a
      key={name}
      href={href}
      target="_blank"
      className="flex items-center gap-2 bg-[#fff] rounded-md px-3 py-2 w-fit max-w-[175px] shadow-md"
    >
      <img
        src={image}
        alt=""
        className="h-10 w-10 md:h-14 md:w-14 rounded-md"
      />

      <span className="text-[#17171f] text-xs md:text-md font-semibold font-poppins">
        {name}
      </span>
    </a>
  );
};

export default Artist;
