import { MouseEvent } from "react";
import { data } from "../data/features";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
export default function Features() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove(event: MouseEvent) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 py-12 h-min-[100vh]">
      <div className="flex flex-col gap-2 items-center py-4 text-center">
        <span className="text-primary font-medium text-center text-xl">
          Features
        </span>
        <h1 className="text-4xl font-medium">
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
              onMouseMove={handleMouseMove}
              className="flex relative z-10 cursor-pointer overflow-hidden transition-all duration-500 justify-start py-4 items-center flex-col gap-2 min-h-[200px] max-h-[200px] rounded-xl max-w-[350px] px-2 min-w-[350px] group"
            >
              <motion.div
                className="pointer-events-none absolute -inset-px -z-10 rounded-xl opacity-0 transition duration-700 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              #F8F8F8,
              transparent 80%
            )
          `,
                }}
              />
              <span className="p-2 border group-hover:border-zinc-200 transition duration-200 border-zinc-100 rounded-lg">
                <item.icon size={28} weight="duotone" />
              </span>
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <p
                title={item.description}
                className="text-zinc-500 line-clamp-3"
              >
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        <div></div>
      </div>
    </section>
  );
}
