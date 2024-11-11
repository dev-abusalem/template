import { useEffect } from "react";
import "nprogress/nprogress.css";
import { COLORS } from "@/app/constant/color";

const NProgressStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      #nprogress .bar {
        background: ${COLORS.primary};
        height: 4px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default NProgressStyles;
