import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

type ButtonSize = "small" | "medium" | "large";
type ButtonPreset =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "outline"
  | "ghost";
type ButtonRounded = "base" | "small" | "medium" | "large" | "full";

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-1 py-0.5 text-sm",
  medium: "px-2 py-1 text-base",
  large: "px-3 py-1.5 text-lg",
};

const presetClasses: Record<ButtonPreset, string> = {
  primary: "bg-teal-500 hover:bg-teal-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  outline:
    "bg-transparent border border-current hover:bg-gray-100 text-blue-500",
  ghost: "bg-transparent hover:bg-gray-100 text-blue-500",
};

const roundedClasses: Record<ButtonRounded, string> = {
  base: "rounded",
  small: "rounded-sm",
  medium: "rounded-md",
  large: "rounded-lg",
  full: "rounded-full",
};

const Button = ({
  children,
  size,
  preset,
  rounded,
  fullWidth = false,
  inline = false,
  ...rest
}: {
  children?: ReactNode;
  size?: ButtonSize;
  preset?: ButtonPreset;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  inline?: boolean;
} & ComponentPropsWithoutRef<"button">) => {
  const classes = className(
    rest.className,
    "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out",
    size && sizeClasses[size],
    preset && presetClasses[preset],
    rounded && roundedClasses[rounded],
    fullWidth && "w-full",
    inline && "inline-flex gap-x-1 items-center",
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;