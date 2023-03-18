"use client";

import { signOut } from "next-auth/react";
import { SignOut as SignOutIcon } from "phosphor-react";
import Button from "~/components/Button";

const SignOut = () => (
  <Button type="button" onClick={() => signOut()} title="Sign out">
    <SignOutIcon />
  </Button>
);

export default SignOut;
