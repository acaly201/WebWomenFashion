"use client";
import { useRef, useState } from "react";
import styles from "@/app/style/test.module.scss";

export default function Test() {
  return (
    <div className="" style={{ backgroundColor: "red" }}>
      <div style={{ backgroundColor: "black" }} className="w-[200px] h-[200px] transition-transform duration-300 group-hover:scale-110 relative group">
        
        <div style={{backgroundColor:'darkblue'}} className="w-full h-full"></div>
      </div>
    </div>
  );
}
