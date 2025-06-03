"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type Tab = {
  title: string;
  url: string;
};

const HeaderTabs = ({ tabs }: { tabs: Tab[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 w-fit p-1 bg-slate-200/40 rounded-lg">
      {tabs.map((tab) => (
        <Link key={tab.title} href={tab.url}>
          <Button
            className={cn({
              "text-sm  h-8 px-4 bg-transparent shadow-none text-slate-600/70 hover:bg-blue-50/90 hover:text-blue-500":
                true,
              "bg-white text-blue-500 shadow-sm shadow-slate-500/20":
                pathname == tab.url,
            })}
          >
            {tab.title}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HeaderTabs;
