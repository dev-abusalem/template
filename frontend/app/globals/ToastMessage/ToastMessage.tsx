import { COLORS } from "@/app/constant/color";
import { toast } from "sonner";

interface ToastProps {
  message: string;
}

export const Success = ({ message }: ToastProps) => {
  return toast.success(message, {
    style: {
      backgroundColor: COLORS.invms100,
      borderColor: COLORS.primary,
      color: COLORS.invms900,
    },
  });
};

export const Failed = ({ message }: ToastProps) => {
  return toast.error(message, {
    style: {
      backgroundColor: COLORS.invmsred100,
      borderColor: COLORS.invmsred400,
      color: COLORS.invmsred900,
    },
  });
};
