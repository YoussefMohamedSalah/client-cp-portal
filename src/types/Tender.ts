import { ENUMS } from "enums/enums";

export interface Tender {
  id: string;
  code: string;
  status: typeof ENUMS.STATUS;
  description?: string;
  user: { id: string; name: string };
  date: string;
  hand_over: string;
  files: string[];
  comments: Comment[];
  thumbnail?: File;
}

export interface SelectedTender {
  id: string;
  code?: string;
  status?: typeof ENUMS.STATUS;
  description?: string;
  user?: { id: string; name: string };
  date?: string;
  hand_over?: string;
  files: string[];
  comments: Comment[];
}
export interface CreateTenderInput {
  description?: string;
  date: string;
  hand_over: string;
  files: File[];
  comments: Comment[];
}
