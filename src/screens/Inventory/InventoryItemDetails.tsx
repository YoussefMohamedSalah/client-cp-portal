import React, { lazy } from "react";
import { useGetSingleItemQuery } from "api/InventoryItem/getSingleItem";

const Loading = lazy(() => import("../../components/UI/Loading"));

interface Props {
  id: string;
}

const InventoryItemDetails: React.FC<Props> = ({ id }) => {
  let {
    data: itemData,
    error: itemError,
    isLoading: itemIsLoading,
  } = useGetSingleItemQuery({ id });

  if (itemIsLoading) return <Loading />;
  if (itemError) return null;
  return <div>this is inventory Item Details: {itemData.name}</div>;
};

export default InventoryItemDetails;
