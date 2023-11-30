"use client";
import Image from "next/image";
import SearchAppBar from "@/app/components/SearchAppBar";
import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import MeshTest from "./components/MeshTest";
import test from "/next.svg";
import TestModelObj from "./components/TestModelObj";

import dynamic from "next/dynamic";
import { Proper } from "./components/Proper";

//@ts-ignore
const Scroll = dynamic(
  //@ts-ignore
  () => {
    return import("./components/TestModelObj");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <main className="main flex min-h-screen flex-col items-center justify-between p-24">
      <SearchAppBar></SearchAppBar>
      <Proper></Proper>
    </main>
  );
}
