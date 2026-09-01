import { stats } from "../constants";
import { Card } from "./Card";

export function AcademyIntro() {
  return (
    <section className="w-full max-w-[576px]">
      <h1 className="text-[44px] font-extrabold leading-none tracking-normal text-[#0a349b] sm:text-[54px]">Route Posts</h1>
      <p className="mt-6 max-w-[590px] text-[22px] leading-[1.45] text-[#071836]">
        Connect with friends and the world around you on Route Posts.
      </p>
      <Card className="mt-7 p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#0b3397]">About Route Academy</p>
        <h2 className="mt-4 text-base font-extrabold text-[#111a2f]">Egypt&apos;s Leading IT Training Center Since 2012</h2>
        <p className="mt-4 text-sm leading-7 text-[#43536d]">
          Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering
          high-quality training courses in programming, web development, and application development.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {stats.map(([value, label]) => (
            <div className="rounded-[10px] border border-[#b9caff] bg-[#f2f6ff] px-3 py-3" key={label}>
              <p className="text-[15px] font-extrabold leading-none text-[#0b3397]">{value}</p>
              <p className="mt-2 text-[10px] font-extrabold uppercase text-[#45536a]">{label}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
