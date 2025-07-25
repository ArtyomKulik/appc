import { type SVGProps } from "react";

export default function ArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 0L10 6H0L5 0Z" fill={props.fill ?? "currentColor"} />
    </svg>
  );
}
