import { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextField: FC<Props> = ({ label, ...props }) => (
  <div className="my-2">
    {label && props.id && (
      <label
        htmlFor={props.id}
        className="form-label mb-2 inline-block text-white"
      >
        {label}
      </label>
    )}
    <input
      type="text"
      {...props}
      className={`form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none ${props.className}`}
    />
  </div>
);

export default TextField;
