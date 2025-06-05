import { inter } from "@/app/fonts";
import { Icon } from "@iconify/react";
import HeaderTabs, { Tab } from "./header-tabs";

interface HeaderSectionProps {
  title: string;
  iconName: string;
  tabs?: Tab[];
}

const HeaderSection = ({ title, iconName, tabs }: HeaderSectionProps) => {
  return (
    <div className="flex justify-between items-center mb-16 w-full">
      <div className="flex items-center gap-3 text-slate-800">
        <Icon icon={iconName} width={34} className="text-blue-600" />
        <h1 className={`${inter.className} text-3xl`}>{title}</h1>
      </div>
      {tabs && <HeaderTabs tabs={tabs!} />}
    </div>
  );
};

export default HeaderSection;
