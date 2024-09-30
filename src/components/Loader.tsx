import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/context";

function Loader() {
  const [loadingMsg, setLoadingMsg] = useState<String>(
    "Preparing your experience, almost ready..."
  );
  const { progress } = useProgress();
  const { isLoading, setIsLoading } = useAppContext();

  //useEffect checks if the application is loaded + display message
  useEffect(() => {
    if (progress === 100) {
      setLoadingMsg("You're all set!");
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div
      className={`absolute left-[calc(100%/2-200px)] top-[calc(100%/2-20px)] h-[30px] w-full md:w-[unset] flex flex-col justify-center items-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-[300px] md:w-[400px]">
        <p className="text-sm md:text-base font-bold font-roboto">
          {loadingMsg}
        </p>
        <Progress className="[&>*]:bg-red-600" value={progress} max={100} />
      </div>
    </div>
  );
}

export default Loader;
