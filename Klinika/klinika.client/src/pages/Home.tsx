import { Fragment } from "react";
import { Hero } from "../features/home/__home";
export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="flex lg:flex-row flex-col gap-4 xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 py-12">
        <div className="bg-gradient-to-r from-primary to-primary/90 lg:w-1/2 w-full relative rounded-xl lg:h-[400px] h-full z-10 overflow-hidden">
          {/* <div className="border-r-[400px] border-b-[400px] border-r-transparent border-b-compact absolute top-0 left-0 w-0 h-0 z-10" /> */}
          <img
            src="https://www.fico.com/sites/default/files/styles/lg/public/2023-02/GettyImages-186460462.jpg.webp?itok=IC4nvVuG"
            alt="A doctor posing for a photo"
            className="-z-10 absolute top-0 brightness-90 left-0 w-full h-full object-cover"
          />
          <div className="w-full h-full p-10 bg-black bg-opacity-30">
            <h1 className="font-bold text-white text-6xl h-[130px]">
              Live a healthier life with Klinika
            </h1>
            <p className="text-pink-50 line-clamp-4 text-lg tracking-wide h-[120px]">
              Discover our advanced healthcare features that empower you to take
              control of your well-being. From personalized health assessments
              to real-time monitoring, Klinika provides comprehensive solutions
              to help you achieve optimal health.
            </p>
            <button
              type="button"
              className="bg-white text-compact line-clamp-4 px-6 py-3 rounded-md mt-4 text-lg font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="bg-primary/60 group lg:w-1/2 w-full cursor-pointer relative rounded-xl h-[400px] z-10 overflow-hidden">
          <img
            src="https://s.abcnews.com/images/Health/doctor-gty-er-180205_hpMain_5.jpg"
            // src="https://cdn.dribbble.com/users/2008861/screenshots/5769168/office-dialogue-dribs6.gif"
            className="object-cover w-full h-full brightness-75 absolute top-0 left-0 right-0 bottom-0"
            alt="Image of people working on a computer"
          />
          <div className="bg-black absolute top-0 right-0 left-0 bottom-0 bg-opacity-30" />
          <div className="w-full h-full flex flex-col justify-center items-start p-12 absolute top-0 left-0 right-0">
            <h1 className="font-bold text-white text-6xl h-[130px]">
              Get the care you deserve
            </h1>
            <p className="text-pink-50 text-lg tracking-wide h-[120px]">
              Access quality healthcare services from the comfort of your home.
              Our team of experienced doctors and specialists are available 24/7
              to provide you with the care you need. Book an appointment today.
            </p>
            <button
              type="button"
              className="bg-white text-compact px-6 py-3 rounded-md mt-4 text-lg font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
