// import { TextStats } from "../../features/dashboard/__dashboard";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-12 p-12 w-full h-full">
      {/* <TextStats /> */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-12 items-center justify-between">
        <div className="w-full rounded-md h-[200px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[200px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[200px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[200px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center justify-between">
        <div className="w-full rounded-md h-[350px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[350px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-12 items-center justify-between">
        <div className="w-full rounded-md h-[250px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[250px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
        <div className="w-full rounded-md h-[250px] border-2 border-dashed overflow-hidden">
          <div className="bg-zinc-50 w-full h-full"></div>
        </div>
      </div>
    </section>
  );
}
