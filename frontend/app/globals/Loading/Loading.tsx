import { COLORS } from "@/app/constant/color";
import { Loader, Loader2 } from "lucide-react";
import React from "react";
import HashLoader from "react-spinners/HashLoader";

interface LoadingProps {
  size?: number;
  color?: string;
}
const Loading = ({ size, color }: LoadingProps) => {
  return (
    <section className="min-h-[60vh] w-full flex justify-center items-center">
      <HashLoader
        size={size ? size : 40}
        color={color ? color : COLORS.primary}
      />
    </section>
  );
};

export const Loading2 = () => {
  return (
    <div className="h-full w-full justify-center flex items-center">
      <Loader2 className="text-invms600 animate-spin font-semibold w-10 h-10 " />
    </div>
  );
};

export default Loading;
