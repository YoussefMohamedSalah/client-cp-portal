export enum TenderKeys {
  DATE = "date",
  HAND_OVER = "hand_over",
  DESCRIPTION = "description",
  FILES = "files",
  COMMENTS = "comments",
};

export const TenderNumKeys = [];

export const TenderStrKeys = [
  TenderKeys.HAND_OVER,
  TenderKeys.DESCRIPTION,
];

export const TenderRequiredKeys = [
  TenderKeys.DESCRIPTION,
  TenderKeys.HAND_OVER,
];