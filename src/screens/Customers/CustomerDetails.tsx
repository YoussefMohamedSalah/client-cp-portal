import React from "react";

interface Props {
  id?: string;
}

const CustomerDetails = ({ id }: Props) => {
  return <div>details page {id}</div>;
};

export default CustomerDetails;
