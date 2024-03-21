import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/router";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is ready register");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="font-semibold text-lg  mb-2">REGISTER</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <div className="w-1/3 p-5 shadow-lg mb-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="text" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <div>
            <label htmlFor="fullname">Fullname</label>
            <input name="fullname" id="fullname" type="text" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input name="phone" id="phone" type="text" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" className="mb-2 p-1 w-full bg-slate-200 rounded-sm mt-1 border-none outline-2 outline-slate-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white w-full p-1 rounded-sm mt-5">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
