export enum InventoryItemKeys {
  NAME = "name",
  PRICE = "price",
  TOTAL_VALUE = "total_value",
  COUNT = "count",
  THUMBNAIL = "thumbnail",
};


export const InventoryItemNumKeys = [
  InventoryItemKeys.PRICE,
  InventoryItemKeys.COUNT,
];

export const InventoryItemStrKeys = [
  InventoryItemKeys.NAME,
];

export const InventoryItemRequiredKeys = [
  InventoryItemKeys.NAME,
  InventoryItemKeys.PRICE,
  InventoryItemKeys.COUNT,
];
