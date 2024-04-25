import react from "../assets/react.svg";
import typescript from "../assets/typescript.svg";
import dotnet from "../assets/dot-net.svg";
import zustand from "../assets/zustand.png";
import axios from "../assets/axios.svg";
import framer from "../assets/framer.svg";
import mssql from "../assets/ms-sql.svg";
import mongo from "../assets/mongo.svg";

export default function TechProof() {
  return (
    <section className="py-24">
      <h1 className="text-4xl font-semibold text-center text-compact mb-8">
        Technologies & Libraries We've Worked With
      </h1>
      <style>
        {`
          .carousel {
            display: flex;
            gap: 200px; 
            animation: slide 60s linear infinite;
          }
        
          .carousel img {
            flex-shrink: 0;
          }

          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="flex h-full w-full items-center justify-center tracking-tight text-white">
        <ul
          className={`carousel w-full items-center justify-evenly font-normal tracking-wide`}
        >
          {[
            react,
            typescript,
            dotnet,
            axios,
            zustand,
            mssql,
            mongo,
            framer,
            react,
          ].map((src, index) => (
            <li key={index}>
              s
              <img
                src={src}
                alt="logo"
                className="md:min-w-[8vw] min-w-[12vw] min-h-[12vh] md:min-h-[8vh] z-20"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
