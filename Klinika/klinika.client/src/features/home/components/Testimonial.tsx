export default function Testimonial() {
  return (
    <section className="bg-white rounded-lg flex justify-center items-center xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 py-24 relative">
      <div className="absolute h-full w-full bg-[radial-gradient(#71D68A_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="flex flex-col gap-2">
        <h1 className="z-10 font-medium text-center text-xl text-primary">
          Our System
        </h1>
        <h1 className="z-10 text-center text-4xl font-medium">
          The system is designed to help you manage your healthcare needs with
          ease, providing a seamless and intuitive user experience, while also
          providing the necessary tools to help you manage your health.
        </h1>
        <div className="z-10 flex mt-4 justify-center items-center flex-col">
          <div className="w-16 h-16 overflow-hidden bg-zinc-300 border rounded-full">
            <img
              src="https://img.freepik.com/premium-photo/smiling-man-suit-tie-standing-front-window-generative-ai_561855-25034.jpg"
              alt="Doctor avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-gray-500 text-xs tracking-wide">CEO, Klinika</p>
        </div>
      </div>
    </section>
  );
}
