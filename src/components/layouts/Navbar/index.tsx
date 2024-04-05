import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="px-10 flex justify-end items-center w-full h-20 fixed shadow-sm">
      {!data ? (
        <Button
          type="button"
          onClick={() => {
            data ? signOut() : signIn();
          }}
          className="mr-4"
        >
          Register
        </Button>
      ) : (
        ""
      )}
      <Button
        type="button"
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
