import React, { useState } from "react";
import { RiFileTextLine, RiToolsFill, RiLinksLine } from "@remixicon/react";

export default function NavigationBar() {
  return (
    <div className="my-8 ml-[5%] h-[45vh] min-w-fit bg-white rounded-3xl grid grid-rows-4 grid-cols-1 justify-items-center items-center">
      <div className="p-2 rounded-full flex flex-col cursor-pointer">
        <img src="src\assets\images\Kuromi.jpg" className="rounded-full" alt="Logo" width={70} />
      </div>
      <div className="h-4/5 w-4/5 rounded-xl flex justify-center items-center flex-col font-sans text-md cursor-pointer bg-slate-100">
        <RiFileTextLine size={35}></RiFileTextLine>
        <p>Content</p>
      </div>
      <div className="h-4/5 w-4/5 rounded-xl flex justify-center items-center flex-col font-sans text-md cursor-pointer">
        <RiToolsFill size={35}></RiToolsFill>
        <p>Customize</p>
      </div>
      <div className="h-4/5 w-4/5 rounded-xl flex justify-center items-center flex-col font-sans text-md cursor-pointer">
        <RiLinksLine size={35}></RiLinksLine>
        <p>Links</p>
      </div>
    </div>
  );
}
