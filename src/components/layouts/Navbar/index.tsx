import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="px-10 flex justify-end items-center w-full h-20 bg-black text-white fixed">
      <button
        onClick={() => {
          data ? signOut() : signIn()
        }}
        className="bg-white border-none rounded-md px-5 py-3 text-black "
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
