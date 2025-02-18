import Image from "next/image";

export const Breadcrumb = ({ route }: { route: string }) => {
  return (
    <div className="flex items-center gap-3 h-[84px]">
      <Image src="/folder-icon.png" width={20} height={18} alt="folder icon" />
      <span className="text-[#D0D5DD]">/</span>
      <span className="text-sm">{route}</span>
    </div>
  );
};
