"use client";
import { Button, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submit = async () => {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/");
    }
  };
  return (
    <>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}></Input>

      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}></Input>
      <Button onClick={submit}>Sign In</Button>
    </>
  );
};
export default AuthSignIn;
