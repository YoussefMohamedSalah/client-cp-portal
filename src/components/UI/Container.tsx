import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: Props) => {
  return <div className={`${className ? className : ""} container-xxl`}>{children}</div>;
};

export default Container;
