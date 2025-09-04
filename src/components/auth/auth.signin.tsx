"use client";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const AuthSignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submit = () => {
    console.log(email, password);
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
