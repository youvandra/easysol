import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export type TextAreaInputProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string;
  notice?: string;
};
