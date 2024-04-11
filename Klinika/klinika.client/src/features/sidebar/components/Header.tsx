import { SidebarSimple } from "@phosphor-icons/react";

type Props = {
  effect: boolean;
  auto: () => void;
};

export default function Header({ effect, auto }: Props) {
  return (
    <div className="border-b-2 w-full px-2 py-3.5 flex items-center justify-between">
      <button
        title="Sidebar button"
        type="button"
        onClick={() => auto()}
        className="text-black hover:text-black/50 transition-colors"
      >
        <SidebarSimple size={24} weight={effect ? "fill" : "regular"} />
      </button>
      <div>Sidebar</div>
    </div>
  );
}
