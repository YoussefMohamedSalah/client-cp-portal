export enum SiteRequestKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  DATE = "date",
  DESCRIPTION = "description",
}

export const SiteRequestNumKeys = [];

export const SiteRequestStrKeys = [SiteRequestKeys.DATE, SiteRequestKeys.PROJECT];

export const SiteRequestRequiredKeys = [SiteRequestKeys.DATE, SiteRequestKeys.PROJECT, SiteRequestKeys.SUBJECT];
