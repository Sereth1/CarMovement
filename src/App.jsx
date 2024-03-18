import { Canvas } from "@react-three/fiber";

import Car from "./Car";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import Floor from "./Road";
import Road from "./Road";
import Maketa from "./maketa";
import { Newcar } from "./newCar";

export default function App() {
  return (
    <>
      <Canvas>
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
        <directionalLight position={[1, 1, 1]} intensity={4 * 4} />
        <directionalLight position={[-1, -1, -1]} intensity={4 * 4} />
        <Car />
        <Road />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </>
  );
}
