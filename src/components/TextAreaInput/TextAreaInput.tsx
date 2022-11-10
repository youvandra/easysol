import { FC } from "react";
import { TextAreaInputProps } from "./TextAreaInput.interface";

const TextAreaInput: FC<TextAreaInputProps> = ({
  label,
  notice,
  value,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="uppercase font-normal flex items-center gap-2">
        {label}
        {notice && (
          <i className="w-5 h-5 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path
                  stroke-linecap="round"
                  d="M10 8.484C10.5 7.494 11 7 12 7c1.246 0 2 .989 2 1.978s-.5 1.483-2 2.473V13m0 3.5v.5"
                />
              </g>
            </svg>
          </i>
        )}
      </label>
      <textarea
        className="border px-3 py-2 border-black shadow-md  text-base"
        {...props}
      >
        {value}
      </textarea>
    </div>
  );
};

export default TextAreaInput;
