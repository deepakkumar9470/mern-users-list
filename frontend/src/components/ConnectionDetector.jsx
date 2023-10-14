import React from "react";
import { Detector} from "react-detect-offline";
const ConnectionDetector = ({ children }) => {
  return (
    <>
      <Detector
        render={({ online }) => (
            online ? children :
          <div className="flex items-center justify-center flex-col gap-6 h-[80vh] text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#211a7f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
            <h1 className="text-childText mb-2">No connection</h1>
            <h4 className="text-childText">Please check your internet connection</h4>
          </div>
        )}
      />
    </>
  );
};

export default ConnectionDetector;
