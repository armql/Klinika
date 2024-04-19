import { ArrowLeft } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="h-screen w-screen">
      <div className="relative h-full w-full">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="flex flex-col gap-8 items-center w-full h-full justify-center">
          <h1 className="text-7xl z-10 font-semibold text-zinc-800">
            Page not found
          </h1>
          <span className="text-2xl z-10 text-zinc-500 text-center">
            <p>The page you are looking for doesn't exist.</p>
            <span>Here are some helpful links</span>
          </span>
          <div className="flex gap-4 z-10 items-center">
            <button
              type="button"
              className="flex border-2 bg-white hover:bg-zinc-50 border-primary/500 px-6 py-3 rounded-md gap-2 text-lg items-center font-medium"
            >
              <ArrowLeft size={22} /> Go back
            </button>
            <button
              type="button"
              className="bg-primary/50 h-full text-green-950 px-4 py-3 rounded-md text-lg font-medium"
            >
              Take me home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
