import { twMerge } from "tailwind-merge";

interface InputProps {
  type: string;
  className?: string;
  placeholder?: string;
}

const Input = ({ type, className, placeholder }: InputProps) => {
  return (
    <div>
      <input
        type={type}
        className={twMerge("p-3 border border-black rounded-md", className)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
