"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { PVRLoader } from "three/addons/loaders/PVRLoader.js";

import THREE, {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
} from "three";

function MeshComponent() {
  const fileUrl = "azru/00000003.mesh.obj";
  let mesh = useRef<Mesh>(null!);
  const obj = useLoader(OBJLoader, fileUrl);
  const texture1 = useLoader(TextureLoader, "azru/00000004_Out.png");
  const texture2 = useLoader(TextureLoader, "azru/00000007_Out.png");
  const texture3 = useLoader(TextureLoader, "azru/00000008_Out.png");
  const texture4 = useLoader(TextureLoader, "azru/00000009_Out.png");
  const texture5 = useLoader(TextureLoader, "azru/00000011_Out.png");
  const texture6 = useLoader(TextureLoader, "azru/00000012_Out.png");
  const texture7 = useLoader(TextureLoader, "azru/00000015_Out.png");
  const texture8 = useLoader(TextureLoader, "azru/00000018_Out.png");

  let mat1 = new MeshBasicMaterial({
    map: texture1,
    transparent: true,
    alphaTest: 0.5,
  });

  let mat2 = new MeshBasicMaterial({
    map: texture2,
    transparent: true,
    alphaTest: 0.5,
  });

  let mat3 = new MeshBasicMaterial({
    map: texture3,
    transparent: true,
    alphaTest: 0.5,
  });

  let mat4 = new MeshBasicMaterial({
    map: texture4,
    transparent: true,
    alphaTest: 0.5,
  });
  let mat5 = new MeshBasicMaterial({
    map: texture5,
    transparent: true,
    alphaTest: 0.5,
  });
  let mat6 = new MeshBasicMaterial({
    map: texture6,
    transparent: false,
    alphaTest: 0.5,
  });
  let mat7 = new MeshBasicMaterial({
    map: texture7,
    transparent: false,
    alphaTest: 0.5,
  });
  let mat8 = new MeshBasicMaterial({
    map: texture8,
    transparent: false,
    alphaTest: 0.5,
  });

  console.log(obj);
  obj.traverse(function (child) {
    // aka setTexture
    if (child instanceof Mesh) {
      console.log("is mesh");
      child.material.map = mat2.map;
      child.material.alphaMap = mat4.map;
      child.material.aoMap = mat5.map;
      child.material.lightMap = mat3.map;
      child.material.emissiveMap = mat5.map;
    }
  });

  var geometry = new BoxGeometry(10, 10, 10);
  geometry.clearGroups();
  geometry.addGroup(0, Infinity, 0);
  geometry.addGroup(0, Infinity, 1);
  geometry.addGroup(0, Infinity, 2);
  geometry.addGroup(0, Infinity, 3);
  geometry.addGroup(0, Infinity, 4);
  geometry.addGroup(0, Infinity, 5);
  geometry.addGroup(0, Infinity, 6);
  geometry.addGroup(0, Infinity, 7);

  var materials = [mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8];

  // mesh
  mesh = useRef<Mesh>(new Mesh(geometry, materials));
  obj.position.z = -140;
  obj.position.y = 24;
  obj.position.x = 0;

  //   obj.rotateZ(20);
  //   obj.rotateX(20);

  //   useFrame(() => {
  //     console.log("CURRENT ROTATION IS", mesh.current.rotation);
  //     console.log("CURRENT POSITION IS", mesh.current.position);
  //   });

  //@ts-ignore

  return (
    <>
      <mesh ref={mesh}>
        <primitive object={obj} />
      </mesh>
    </>
  );
}

export function Proper() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <OrbitControls />
        <ambientLight />
        {/* <pointLight position={[10, 10, 10]} /> */}
        <MeshComponent />
      </Canvas>
    </div>
  );
}
