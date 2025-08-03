import type { SVGProps } from "react";

export function DogPaw(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="4" />
      <path d="M17.5 7.5a2.5 2.5 0 0 1 0 5" />
      <path d="M4.5 7.5a2.5 2.5 0 0 0 0 5" />
      <path d="M7.5 17.5a2.5 2.5 0 0 1 5 0" />
    </svg>
  );
}
