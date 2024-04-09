import { Fragment } from "react/jsx-runtime";
import { login_data } from "../data/slider-data";
import { useState } from "react";

export default function SliderCard() {
  const [slider, setSlider] = useState({
    active: 1,
  });
  console.log("logged re-render");
  function next(index: unknown) {
    console.log("logged run");
    setSlider((prev) => ({
      ...prev,
      active: login_data.length > index ? index + 1 : 1,
    }));
  }
  function prev(index: unknown) {
    console.log("logged run");
    setSlider((prev) => ({
      ...prev,
      active: index > 1 ? index - 1 : login_data.length,
    }));
  }
  return (
    <div className="w-[50%] max-h-screen bg-gradient-to-b from-compact/80 to-primary/50 md:block hidden rounded-md">
      <div className="w-full h-full flex justify-end p-4 flex-col items-start">
        {login_data
          .filter((item) => item.id === slider.active)
          .map((item) => (
            <Fragment key={item.id}>
              <h1 className="text-4xl font-manrope text-compact">
                {item.header}
              </h1>
              <p>{item.description}</p>
              <button type="button" onClick={() => next(item.id)}>
                next
              </button>
              <button type="button" onClick={() => prev(item.id)}>
                prev
              </button>
            </Fragment>
          ))}
      </div>
    </div>
  );
}
