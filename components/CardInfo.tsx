import React from "react";

const CardInfo = ({
  className,
  title,
  value,
  children,
}: {
  className: string;
  title: string;
  value: number;
  children: React.ReactNode;
}) => {
  return (
    <div className={className}>
      <h1 className="mb-4">{title}</h1>
      {children}
      <h1 className="font-bold text-3xl mt-4 flex justify-end">{value}</h1>
    </div>
  );
};

export default CardInfo;
