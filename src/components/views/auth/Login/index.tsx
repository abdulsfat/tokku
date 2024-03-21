import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="text" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white w-full p-1 rounded-sm mt-5">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p>
        Don{"'"}t have an account? Sign Up <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
};

export default LoginView;
