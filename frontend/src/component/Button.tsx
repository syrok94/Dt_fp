interface ButtonProps {
  classname?: string;
  title?: string;
}

const Button = ({ classname, title }: ButtonProps) => {
  return (
    <div className={classname}>
      <button className="w-full p-2 border border-black rounded-md">
        {title}
      </button>
    </div>
  );
};

export default Button;
