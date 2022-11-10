import { FC } from "react";
import { ButtonProps } from "./Button.interface";

const Button: FC<ButtonProps> = ({ children, loading, extendClass, ...props }) => {
  return (
    <button
      className={`max-w-fit bg-black px-10 py-2 text-white hover:shadow-lg transition-shadow  ${extendClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
