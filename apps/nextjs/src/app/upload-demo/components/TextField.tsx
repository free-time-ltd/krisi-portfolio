import { FC } from "react";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

const TextField: FC<Props> = ({ id, name, label, placeholder, ...props }) => (
  <div className="my-2">
    <label htmlFor={id} className="form-label mb-2 inline-block text-gray-700">
      {label}
    </label>
    <input
      type="text"
      className="form-control
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
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
      id={id}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  </div>
);

export default TextField;
