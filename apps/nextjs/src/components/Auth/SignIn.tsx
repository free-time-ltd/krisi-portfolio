"use client";

import { signIn } from "next-auth/react";
import { SignIn as SignInIcon } from "phosphor-react";
import Button from "~/components/Button";

const SignIn = () => (
  <Button type="button" onClick={() => signIn()} title="Sign in">
    <SignInIcon />
  </Button>
);

export default SignIn;
