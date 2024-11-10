
interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input = ({ type, className, placeholder }: InputProps) => {
  return (
    <div className={className}>
      <input
      type={type}
      className="w-full p-3 border border-black rounded-md"
      placeholder={placeholder}
    />
    </div>
  );
};

export default Input;
