import instace from "@/lib/axios/instace";

const authServices = {
  registerAccount: (data: any) => instace.post("/api/user/register", data),
};

export default authServices;
