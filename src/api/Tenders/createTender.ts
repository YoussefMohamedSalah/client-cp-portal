import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Tender, SelectedTender } from "types/Tender";
import { http } from "utils/Http";

export const useCreateTender = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.TENDER, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { tender: { data: data as Tender } };
  });
};

export const tenderInput = (data: Tender): any => {
  if (!data.thumbnail?.size) {
    return {
      description: data.description,
      date: data.date,
      hand_over: data.hand_over,
      comments: data.comments,
    } as SelectedTender;
  }

  const formData = new FormData();
  data.description && formData.append("description", data?.description!);
  data.date && formData.append("data", data?.date);
  data.hand_over && formData.append("hand_over", data?.hand_over);
  data.comments && formData.append("comments", `${data?.comments!}`);
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};
