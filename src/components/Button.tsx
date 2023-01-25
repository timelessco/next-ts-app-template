import { forwardRef, type ComponentPropsWithRef } from "react";

export type ButtonProps = ComponentPropsWithRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button type="button" ref={ref} {...props} />;
  },
);
