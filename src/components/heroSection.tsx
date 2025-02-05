import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/home.json";
import { Play } from "lucide-react";
const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAnimation = () => {
      setIsLoaded(true);
    };

    loadAnimation();
  }, []);

  return (
    <div className="bg-teal-300 pt-10 lg:pt-2 sm:pt-24 text-teal-600">
      <div className="container  mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex  flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Get your job search ON with Jobisearch
            </h1>
            <p className="text-xl sm:text-2xl mb-8">
              Find your dream job with ease.
            </p>
            <button className="bg-teal-600 flex items-center space-x-2 text-white font-bold py-2 px-5 rounded-full hover:bg-teal-800 transition duration-300">
              Start <Play className=" ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            {isLoaded && (
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
