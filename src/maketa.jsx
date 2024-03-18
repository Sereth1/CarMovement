import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Maketa(props) {
  const refMaketa = useRef();
  const paketa = useLoader(GLTFLoader, "/model/plakakia.glb");
  const fixedPosition = [0, 0, 0]; // Set your desired fixed position

  useEffect(() => {
    if (refMaketa.current) {
      refMaketa.current.position.set(...fixedPosition);
    }
  }, []);

  useFrame(() => {
    if (refMaketa.current) {
      // Ensure position is locked in every frame
      // refMaketa.current.position.set(...fixedPosition);
    }
  });

  return (
    <primitive {...props} ref={refMaketa} object={paketa.scene}>
      <meshStandardMaterial />
    </primitive>
  );
}

export default Maketa;
