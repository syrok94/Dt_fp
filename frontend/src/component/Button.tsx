import { twMerge } from "tailwind-merge";

interface ButtonProps {
  classname?: string;
  title: string;
}

const Button = ({ classname, title }: ButtonProps) => {
  return <button className={twMerge('p-1.5 border border-black rounded-md', classname)} >{title}</button>;
};

export default Button;
