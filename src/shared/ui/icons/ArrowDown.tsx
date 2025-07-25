import { type SVGProps } from "react";

export default function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0L10 0L5 6L0 0Z" fill={props.fill ?? "currentColor"} />
    </svg>
  );
}
