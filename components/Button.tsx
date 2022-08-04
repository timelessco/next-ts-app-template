import React, { forwardRef, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{}>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  },
);
