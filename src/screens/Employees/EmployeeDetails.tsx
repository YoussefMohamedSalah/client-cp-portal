import React from "react";

interface Props {
  id?: string;
}

const EmployeeDetails = ({ id }: Props) => {
  return <div>{id}</div>;
};

export default EmployeeDetails;
