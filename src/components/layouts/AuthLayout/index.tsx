import Link from "next/link";
type Proptypes = {
  error?: string;
  title?: string;
  link: string;
  linktext?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: Proptypes) => {
  const { error, title, children, link, linktext } = props;
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="font-semibold text-lg  mb-2">{title}</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <div className="w-1/3 p-5 shadow-lg mb-5">
        <div className="">{children}</div>
        <p>
          {linktext} <Link href={link}>here</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
