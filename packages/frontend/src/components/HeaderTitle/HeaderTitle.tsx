import Image from "next/image";

export const HeaderTitle = ({
  title,
  icon,
}: {
  title: string;
  icon?: string;
}) => {
  return (
    <div className="flex items-center  mb-6 gap-4">
      <div className="bg-[#253BFF] rounded-full p-4">
        <Image
          src={icon ?? "/white-sub-menu-icon.png"}
          width={24}
          height={24}
          alt="sub menu icon"
        />
      </div>

      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};
