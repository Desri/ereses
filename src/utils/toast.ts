import { ToastMessage } from "@/components/ToastMessage";
import { toast } from "react-toastify";

export const showErrorToast = (message?: string) => {
  toast(ToastMessage, {
    data: {
      message: message ?? "Something went wrong",
      type: "error",
    },
  });
};

export const showSuccessToast = (message: string) => {
  toast(ToastMessage, {
    data: {
      message,
      type: "success",
    },
  });
};
