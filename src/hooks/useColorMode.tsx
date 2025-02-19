import { useEffect, useState } from "react";

const useColorMode = () => {
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the color mode from localStorage
      const storedColorMode = localStorage.getItem("color-theme") || "light";
      setColorMode(storedColorMode);
    }
  }, []);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window !== "undefined") {
      // Update the body class based on the color mode
      const className = "dark";
      const bodyClass = window.document.body.classList;

      if (colorMode === "dark") {
        bodyClass.add(className);
      } else {
        bodyClass.remove(className);
      }

      // Save the color mode to localStorage
      localStorage.setItem("color-theme", colorMode);
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
