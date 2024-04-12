import { login_data } from "../data/slider-data";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
export default function SliderCard() {
  const [slider, setSlider] = useState({
    active: 1,
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleSlider(index: number) {
    setSlider((prev) => ({
      ...prev,
      active: index,
    }));
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-[50%] relative z-10 group overflow-hidden h-[550px] bg-zinc-50 border-2 md:block hidden rounded-md"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 rounded-md opacity-0 transition duration-700 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              #e3e3e3,
              transparent 80%
            )
          `,
        }}
      />
      <div className="w-full h-full flex justify-center p-4 flex-col items-center">
        {login_data
          .filter((item) => item.id === slider.active)
          .map((item) => (
            <div
              key={item.id}
              className="flex gap-2 flex-col items-center justify-between h-full"
            >
              <div className="flex flex-col gap-2">
                <h1 className="xl:text-8xl lg:text-7xl md:text-6xl font-bold text-compact/80">
                  {item.header}
                </h1>
                <p className="xl:text-2xl lg:text-xl md:text-lg font-regular text-compact/60">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        <div className="flex gap-2">
          {login_data.map((item) => (
            <div
              onClick={() => handleSlider(item.id)}
              className={`h-2 rounded-full transition-all duration-500 ${
                item.id === slider.active
                  ? "w-8 bg-primary"
                  : "w-4 cursor-pointer bg-primary/80 "
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
