import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function Car(props) {
  const carRef = useRef();
  const { camera } = useThree();
  const [speed, setSpeed] = useState(0);
  const [steeringAngle, setSteeringAngle] = useState(0);
  const redCar = useLoader(GLTFLoader, "/model/car.glb");

  const followDistance = 1;
  const followHeight = 2;
  const cameraLerpFactor = 0.1;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setSpeed((speed) => Math.min(speed + 0.005, 0.1));
        break;
      case "ArrowUp":
        setSpeed((speed) => Math.max(speed - 0.005, -0.05));
        break;
      case "ArrowRight":
        setSteeringAngle(-0.05);
        break;
      case "ArrowLeft":
        setSteeringAngle(0.05);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setSteeringAngle(0);
    }
  };

  useFrame(() => {
    if (carRef.current) {
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(carRef.current.quaternion);
      forward.normalize();
      forward.multiplyScalar(speed);
      carRef.current.position.add(forward);

      if (steeringAngle !== 0) {
        carRef.current.rotateY(steeringAngle);
      }

      setSpeed((s) => s * 0.9);

      const offset = new THREE.Vector3(0, followHeight, -followDistance);
      const cameraPosition = carRef.current.localToWorld(offset.clone());
      camera.position.lerp(cameraPosition, cameraLerpFactor);
      const lookAtPosition = carRef.current.position
        .clone()
        .add(new THREE.Vector3(0, followHeight * 0.5, 0));
      camera.lookAt(lookAtPosition);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <primitive
      {...props}
      ref={carRef}
      object={redCar.scene}
      rotation={[0, -5, 0]}
    />
  );
}
