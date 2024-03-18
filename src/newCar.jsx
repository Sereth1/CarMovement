import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Gltf } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
// const { camera } = useThree(); // Get the main camera from the scene

export function Newcar(props) {
  const group = useRef();
  const [speed, setSpeed] = useState(0);
  const followDistance = 1; // Adjust to set how far the camera is behind the car
  const followHeight = 2; // Adjust to set the height of the camera
  const cameraLerpFactor = 0.3; // Adjust for smoother camera movement
  const [steeringAngle, setSteeringAngle] = useState(0);
  const { camera } = useThree();
  const { nodes, materials, animations } = useGLTF(
    "model/futuristic_car_animation.glb"
  );
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

  // Handle key up events to stop turning the car
  const handleKeyUp = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setSteeringAngle(0);
    }
  };

  // Update car position and camera each frame
  useFrame(() => {
    if (node.current) {
      // Update car position based on speed and steering angle
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(node.current.quaternion);
      forward.normalize();
      forward.multiplyScalar(speed);
      node.current.position.add(forward);

      if (steeringAngle !== 0) {
        node.current.rotateY(steeringAngle);
      }

      // Dampen the speed slightly each frame to simulate friction
      setSpeed((s) => s * 0.9);

      // Update camera position to follow the car
      const offset = new THREE.Vector3(0, followHeight, -followDistance);
      const cameraPosition = node.current.localToWorld(offset.clone());
      camera.position.lerp(cameraPosition, cameraLerpFactor);
      const lookAtPosition = node.current.position
        .clone()
        .add(new THREE.Vector3(0, followHeight * 0.5, 0));
      camera.lookAt(lookAtPosition);
    }
  });

  // Set up and clean up event listeners for keyboard input
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} object={nodes.scene} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.909}
        >
          <group
            name="ee75c747430b455e82c9cdab2d1d80fbfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Material_002__untitled_001}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.Material_001}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Car__Speed_Car_c_png}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.Car__Speed_Car_A_1_png}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Car__untitled_006}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Cube_002" />
                  <group
                    name="Hemi"
                    position={[-0.533, 3.496, 3.179]}
                    rotation={[0.272, -0.202, 0.014]}
                  >
                    <group name="Object_21" rotation={[Math.PI / 2, 0, 0]}>
                      <group name="Object_22" />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
