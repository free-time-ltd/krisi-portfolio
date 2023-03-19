"use client";

import { signOut } from "next-auth/react";
import { forwardRef, type Ref } from "react";

type ButtonRef = HTMLButtonElement;
type BaseSignOutProps = Omit<
  React.HTMLProps<HTMLButtonElement>,
  "onClick" | "type" | "ref"
>;

const BaseSignOut = (props: BaseSignOutProps, ref: Ref<ButtonRef>) => (
  <button type="button" {...props} onClick={() => signOut()} ref={ref} />
);

export default forwardRef<ButtonRef, BaseSignOutProps>(BaseSignOut);
