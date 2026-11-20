// src/components/TopNav.tsx

type Props = {
  items: { id: string; label: string }[];
  active: string;
  onClick: (id: string) => void;
};

export default function TopNav({ items, active, onClick }: Props) {
  return (
    <nav className="sticky top-4 z-30 mb-8 rounded-2xl bg-[#07172a]/70 p-4 backdrop-blur">
      <div className="flex gap-2 flex-wrap justify-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider ${
              active === item.id
                ? "bg-cyan-400 text-black"
                : "bg-white/5 text-white hover:bg-cyan-400/10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}