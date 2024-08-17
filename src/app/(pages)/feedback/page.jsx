"use client";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    // Dynamically load the Aidaform script
    const script = document.createElement("script");
    script.id = "aidaform-app";
    script.src = "https://widget.aidaform.com/embed.js";
    document.head.appendChild(script);

    return () => {
      // Clean up the script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        data-aidaform-app="form202405"
        data-url="https://varun49.aidaform.com/portafolio"
        data-width="100%"
        data-height="500px"
        data-do-resize
      ></div>
    </div>
  );
};

export default Page;
