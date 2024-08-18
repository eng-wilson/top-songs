import React from "react";

// import { Container } from './styles';

const Title = ({ title }: { title: string }) => {
  return (
    <span className="text-[#17171f] text-[40px] md:text-[48px] font-black w-[40px] text-center font-poppins">
      {title}
    </span>
  );
};

export default Title;
