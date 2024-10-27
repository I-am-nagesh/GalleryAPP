"use client";

import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    router.push("/login");
  };

  return <RegisterForm onSuccess={handleRegistrationSuccess} />;
}
