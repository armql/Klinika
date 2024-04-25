import { data } from "../data/features";

export default function Features() {
  return (
    <section className="xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 py-12">
      <div className="flex flex-col gap-2 items-center py-4 text-center">
        <span className="text-primary font-medium text-lg">Features</span>
        <h1 className="text-4xl font-semibold">
          All that you will need to manage your healthcare needs.
        </h1>
        <p className="font-light text-lg">
          A platform user centered platform that is designed to help you manage
          your healthcare needs with ease.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <ul className="grid lg:grid-cols-3 grid-cols-1 items-center justify-start text-center lg:gap-y-12 gap-y-2 gap-x-24 py-12">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex justify-start py-4 items-center flex-col gap-2 min-h-[200px] max-h-[200px] max-w-[350px] min-w-[350px]"
            >
              <span className="p-2 border border-zinc-100 rounded-lg">
                <item.icon size={28} weight="duotone" />
              </span>
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <p className="text-zinc-500">{item.description}</p>
            </li>
          ))}
        </ul>
        <div></div>
      </div>
    </section>
  );
}
