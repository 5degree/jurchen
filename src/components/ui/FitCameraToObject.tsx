import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface FitCameraProps {
  object: THREE.Object3D;
}

export default function FitCameraToObject({ object }: FitCameraProps) {
  const { camera, controls, gl, scene } = useThree() as {
    camera: THREE.PerspectiveCamera;
    controls: OrbitControlsImpl;
    gl: THREE.WebGLRenderer;
    scene: THREE.Scene;
  };

  useEffect(() => {
    if (!object) return;
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Fit camera distance
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

    cameraZ *= 1.5; // padding

    camera.position.set(center.x, center.y, cameraZ);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    // Adjust controls target
    if (controls) {
      controls.target.copy(center);
      controls.update();
    }
  }, [object, camera, controls, gl, scene]);

  return null;
}
