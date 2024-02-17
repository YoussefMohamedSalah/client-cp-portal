import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Tender } from "types/Tender";
import { http } from "utils/Http";

export const useUpdateTender = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.TENDER + updateInput.id + "/", updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { tender: { data: data as any } };
  });
};

export const tenderUpdateInput = (data: Tender): any => {
  if (!data.thumbnail?.size) {
    return {
      description: data.description,
      date: data.date,
      hand_over: data.hand_over,
      comments: data.comments,
    } as Tender;
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.description && formData.append("description", data?.description!);
  data.date && formData.append("data", data?.date);
  data.hand_over && formData.append("hand_over", data?.hand_over);
  data.comments && formData.append("comments", `${data?.comments!}`);
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};
