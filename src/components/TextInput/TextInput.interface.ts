import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  notice?: string;
};
