type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};
const Input = (props: Propstypes) => {
  const { label, name, type, placeholder } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} id={name} type={type} placeholder={placeholder} className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
    </div>
  );
};

export default Input;
