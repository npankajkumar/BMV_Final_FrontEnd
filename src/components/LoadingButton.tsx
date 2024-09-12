import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const LoadingButton = ({
  variant,
  onClick,
  className,
  loadingTitle,
  type,
  loading,
  children,
}: {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  onClick?: any;
  className?: string;
  loadingTitle?: string;
  type?: "submit" | "reset" | "button" | undefined;
  loading: boolean;
  children: string | JSX.Element | JSX.Element[];
}) => {
  //   if (!loadingTitle) loadingTitle = title;
  return (
    <Button
      className={className}
      type={type}
      onClick={onClick}
      variant={variant}
    >
      {children}
      {loading && <LoaderCircle className="animate-spin ml-2" />}
    </Button>
  );
};

export default LoadingButton;
