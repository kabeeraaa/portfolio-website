type SkipLinkProps = {
  targetId: string;
  onSkip: () => void;
};

export default function SkipLink({ targetId, onSkip }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      onClick={(event) => {
        event.preventDefault();
        onSkip();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded-lg focus:bg-[#07172a] focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>
  );
}
