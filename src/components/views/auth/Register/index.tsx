import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Inputan";
import Button from "@/components/ui/Button";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
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
          <Input label="Email" name="email" type="email" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit">{isLoading ? "Loading..." : "Register"}</Button>
   
        </form>
      </div>
      <p>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
