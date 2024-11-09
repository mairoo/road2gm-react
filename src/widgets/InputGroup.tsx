import { IconType } from "react-icons";

interface InputGroupProps {
  icon: IconType;
  type: "text" | "email" | "password";
  placeholder: string;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  icon: Icon,
  type,
  placeholder,
  className = "",
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={type}
      className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      placeholder={placeholder}
    />
  </div>
);

export default InputGroup;
