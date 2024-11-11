import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { generateUploadButton } from "@uploadthing/react";
import { BASE_URL } from "@/app/config/url-manager";
import { VERSION } from "@/app/config/api-version";

interface LoadingButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const LoadingButton = ({ children, className }: LoadingButtonProps) => {
  return (
    <Button
      type="button"
      className={`${
        className ? className : "bg-invms600 shadow bg-opacity-15 "
      } cursor-not-allowed `}
      disabled
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
};

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  types?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const SubmitButton = ({
  children,
  className,
  disabled,
  onClick,
  types = "submit",
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={disabled ? true : false}
      onClick={onClick}
      type={types}
      className={`${
        className
          ? className
          : "text-white bg-invms600 hover:bg-invms500 tracking-wide rounded-md text-sm px-6 py-3 mt-4"
      } `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16px"
        height="16px"
        fill="#fff"
        className="mr-2 inline"
        viewBox="0 0 548.244 548.244"
      >
        <path
          fillRule="evenodd"
          d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </Button>
  );
};

export const UploadButton = generateUploadButton({
  url: `${BASE_URL}/api/${VERSION}/upload-image`,
});
