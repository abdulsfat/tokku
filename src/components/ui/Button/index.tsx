type Propstypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
};

const Button = (props: Propstypes) => {
  const { type, onClick, children, variant = "bg-blue-500", className } = props;
  return (
    <div>
      <button type={type} onClick={onClick}  className={`${variant} text-white mt-5 w-full p-2 rounded-sm flex justify-center items-center gap-2  ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
