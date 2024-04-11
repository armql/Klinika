import { user } from "../../../data/user";
import { SignOut, User } from "@phosphor-icons/react";
type Props = {
  effect: boolean;
};

export default function Profile({ effect }: Props) {
  return (
    <div
      className={`flex justify-between w-full gap-2 px-2 ${
        effect ? "flex-col" : "flex-row"
      }`}
    >
      <div className="flex items-center justify-center gap-2 flex-row">
        <div className="h-7 w-7 flex text-white justify-center items-center rounded-full bg-primary/80">
          <User size={18} weight="duotone" />
        </div>
        {!effect && <span className="">{user.name}</span>}
      </div>

      <div className="rounded-lg bg-gray-100">
        <button
          title="Logout button"
          type="button"
          // onClick={logout}
          className={`flex cursor-pointer items-center justify-center rounded-lg border border-transparent bg-white py-1.5 transition duration-300 hover:-translate-x-1 px-2 hover:border-gray-200 active:-translate-x-1.5 active:shadow-sm ${
            effect && "w-full"
          }`}
        >
          <span>
            <SignOut size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
