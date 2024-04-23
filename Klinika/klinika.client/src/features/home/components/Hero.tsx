import { Link } from "react-router-dom";
import hero_illustration from "../assets/hero-illustration.svg";
export default function Hero() {
  return (
    <section className="xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 w-screen flex justify-evenly sm:gap-0 gap-12 items-center flex-col sm:h-screen h-[600px]">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="w-fit sm:h-10 h-fit border-2 gap-2 flex justify-between items-center rounded-full border-primary/50 bg-white pl-4 pr-0.5 sm:py-0 py-0.5 overflow-clip hover:border-primary/60 transition-colors">
          <span className="text-primary sm:text-base text-xs truncate">
            Prioritize your well-being
          </span>
          <Link
            to="../register"
            className="text-compact hover:text-compact/70 sm:text-base text-xs bg-primary/50 hover:bg-primary/70 rounded-full px-6 py-1"
          >
            Register now
          </Link>
        </div>
        <h1 className="xl:text-[164px] lg:text-[132px] text-compact md:text-[124px] sm:text-[64px] text-[72px] leading-[80%] font-medium text-center">
          Take care of yourself
        </h1>
      </div>
      <figure className="w-full flex justify-center items-center">
        <img src={hero_illustration} alt="abstract illustrations" />
      </figure>
    </section>
  );
}
