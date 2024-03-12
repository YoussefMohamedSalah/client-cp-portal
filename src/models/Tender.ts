export enum TenderKeys {
  CODE = "code",
  USER = "user",
  DATE = "date",
  HAND_OVER = "hand_over",
  DESCRIPTION = "description",
  FILES = "files",
  COMMENTS = "comments",
  STATUS = "status",
}

export const TenderNumKeys = [];

export const TenderStrKeys = [TenderKeys.HAND_OVER, TenderKeys.DATE];

export const TenderRequiredKeys = [TenderKeys.DATE, TenderKeys.HAND_OVER];
