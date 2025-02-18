import Image from "next/image";

export const Sidebar = () => {
  return (
    <div
      className={`w-64 bg-[#101828] min-h-screen text-gray-300 p-4 fixed left-0 top-0 transition-all ${
        true ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <Image src="/logo.png" width={70} height={21} alt="logo" />
      </div>

      <nav className="space-y-2">
        <div className="flex items-center space-x-3 px-3 py-2 bg-[#9FF443] text-[#101828] rounded-2xl">
          <Image
            src="/sub-menu-icon.png"
            width={24}
            height={24}
            alt="sub menu icon"
          />
          <span className="font-bold">Menus</span>
        </div>
      </nav>
    </div>
  );
};
