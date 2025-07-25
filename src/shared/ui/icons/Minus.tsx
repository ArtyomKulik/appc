import { type SVGProps } from "react";

export default function Minus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 2" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="12" height="2" rx="1" fill={props.fill ?? "currentColor"} />
    </svg>
  );
}
