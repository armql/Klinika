import hero_illustration from "../assets/hero-illustration.svg";
export default function Hero() {
  return (
    <section className="xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 w-screen flex justify-evenly sm:gap-0 gap-12 items-center flex-col sm:h-screen h-[600px]">
      <div className="">
        <h1 className="xl:text-[144px] lg:text-[84px] md:text-[80px] sm:text-[64px] text-[64px] font-semibold leading-[90%] text-center">
          Take care of yourself
        </h1>
        <p className="text-zinc-400 xl:text-[36px] lg:text-[34px] md:text-[32px] sm:text-[24px] text-[18px] text-center">
          Sample reservation system of Klinika
        </p>
      </div>
      <figure className="w-full flex justify-center items-center">
        <img src={hero_illustration} alt="" />
      </figure>
    </section>
  );
}
