import type { SVGProps } from "react";

export default function LinkedInMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3.5 8.5h2.96V20.5H3.5V8.5Zm7.01 0h2.84v1.64h.04c.4-.75 1.37-1.9 3.39-1.9 3.62 0 4.29 2.38 4.29 5.48v6.78h-2.96v-6.01c0-1.43-.03-3.27-1.99-3.27-2 0-2.31 1.56-2.31 3.17v6.11h-2.96V8.5Z" />
    </svg>
  );
}
