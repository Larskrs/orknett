import { useState, useEffect } from "react";

const useViewDown = (amount) => {
  const [isDown, setIsDown] = useState(false);
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
        console.log(window.scrollY)
      if (window.scrollY >= amount) {
        setIsDown(true)
      } else {
        setIsDown(false)
      }
      setScrollY(window.scrollY)
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isDown
};

export default useViewDown;