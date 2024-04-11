import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type Props = {
  effect: boolean;
  auto: () => void;
};

export default function Resizer({ effect, auto }: Props) {
  return (
    <button
      title="Resize sidebar"
      onClick={auto}
      className="absolute left-0 bottom-0 top-0 border-l-2 border-transparent z-10 cursor-col-resize hover:border-primary/20 transition-colors duration-500 group"
    >
      <span className="group-hover:block hidden">
        {effect ? (
          <CaretRight size={24} weight="duotone" />
        ) : (
          <CaretLeft size={24} weight="duotone" />
        )}
      </span>
    </button>
  );
}
