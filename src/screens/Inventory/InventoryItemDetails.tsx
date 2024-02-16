import React, { lazy } from "react";
import { useGetSingleItemQuery } from "api/InventoryItem/getSingleItem";
import { InventoryItem } from "types/Inventory";

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

  let item: InventoryItem = itemData?.inventoryItem.data! || {} as InventoryItem;

  return <div>this is inventory Item Details: {item.name}</div>;
};

export default InventoryItemDetails;
