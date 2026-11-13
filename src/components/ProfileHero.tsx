// src/components/ProfileHero.tsx

import { profile } from "./data/portfolioData";

export default function ProfileHero() {
  return (
    <section id="about" className="mb-10 text-center">
      <h1 className="text-5xl font-black italic">
        {profile.name.toUpperCase()}
      </h1>

      <p className="mt-4 text-cyan-200">{profile.title}</p>

      <p className="mt-4 max-w-2xl mx-auto text-slate-300">
        {profile.summary}
      </p>
    </section>
  );
}