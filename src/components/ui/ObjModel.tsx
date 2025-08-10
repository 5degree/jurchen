import { useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import FitCameraToObject from './FitCameraToObject';

interface ObjModelProps {
  modelUrl: string;
}

const ModelError = () => (
  <Html center>
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>Failed to load 3D model</p>
    </div>
  </Html>
);

export default function ObjModel({ modelUrl }: ObjModelProps) {
  const [error, setError] = useState(false);
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const objLoader = (materials?: THREE.MaterialCreator) => {
      const loader = new OBJLoader();
      if (materials) loader.setMaterials(materials);
      loader.load(
        modelUrl,
        (object) => {
          object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              // Give a default material if none
              if (!(mesh.material as THREE.Material).name) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xffffff,
                  metalness: 0.1,
                  roughness: 0.8,
                });
              }
            }
          });
          setObj(object);
        },
        undefined,
        (err) => {
          console.error('Error loading OBJ model:', err);
          setError(true);
        }
      );
    };

    // Try loading .mtl if it exists
    const mtlUrl = modelUrl.replace(/\.obj$/i, '.mtl');
    fetch(mtlUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          const mtlLoader = new MTLLoader();
          mtlLoader.load(
            mtlUrl,
            (materials) => {
              materials.preload();
              objLoader(materials);
            },
            undefined,
            () => objLoader()
          );
        } else {
          objLoader();
        }
      })
      .catch(() => objLoader());
  }, [modelUrl]);

  if (error) return <ModelError />;
  if (!obj) return null;

  return (
    <>
      <primitive object={obj} scale={[1, 1, 1]} position={[0, 0, 0]} />
      <FitCameraToObject object={obj} />
    </>
  );
}
