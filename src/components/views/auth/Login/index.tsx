import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Inputan";
import Button from "@/components/ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="font-semibold text-lg  mb-2">LOGIN</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <div className="w-1/3 p-5 shadow-lg mb-5">
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
        </form>
        <div className="">
          <hr className="mt-5 mb-5" />
          <Button type="button" onClick={() => signIn("google", { callbackUrl, redirect: false })} className="gap-2">
            <FaGoogle />
            Login With Google
          </Button>
        </div>
      </div>
      <p>
        Don{"'"}t have an account? Sign Up <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
};

export default LoginView;
