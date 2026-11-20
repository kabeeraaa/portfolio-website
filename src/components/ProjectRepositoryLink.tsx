import { ArrowUpRight } from "lucide-react";

export default function ProjectRepositoryLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} on GitHub`}
      className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-3 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/20"
    >
      View on GitHub
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  );
}
