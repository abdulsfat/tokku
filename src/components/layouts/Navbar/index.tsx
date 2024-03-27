import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="px-10 flex justify-end items-center w-full h-20 fixed shadow-sm">
      <Button className="mr-4">Register</Button>
      <Button
        onClick={() => {
          data ? signOut() : signIn();
        }}
        className=""
      >
        {data ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default Navbar;
