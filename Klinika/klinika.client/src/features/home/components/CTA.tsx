export default function CTA() {
  return (
    <section className="xl:px-48 lg:px-24 md:px-12 sm:px-6 px-2 py-24">
      <div className="bg-gradient-to-b overflow-hidden relative from-primary/60 to-primary/50 rounded-2xl w-full flex flex-col gap-4 items-center justify-center text-center text-white">
        <div className="border-t-[400px] border-t-transparent border-r-[500px] border-r-compact/70 -z-10 absolute bottom-0 right-0" />
        <div className="border-b-[400px] border-b-transparent border-l-[500px] border-l-compact/40 -z-10 absolute top-0 left-0" />
        <div className="flex max-w-[700px] flex-col items-center py-12 px-4 justify-center gap-6 h-full">
          <h1 className="text-6xl font-medium text-compact">
            Ready to get started?
          </h1>
          <p className="text-compact">
            Sign up now to get started with our platform and start managing your
            healthcare needs with ease, providing a seamless and intuitive user
            experience.
          </p>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="bg-green-100 text-compact px-6 font-medium rounded-md py-2"
            >
              Learn more
            </button>
            <button
              type="button"
              className="bg-compact text-green-100 px-6 font-medium rounded-md py-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
