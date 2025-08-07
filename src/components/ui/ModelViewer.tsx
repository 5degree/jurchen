import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import LoadingSpinner from './LoadingSpinner';
import * as THREE from 'three';

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

const ModelError = () => (
  <Html center>
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>Failed to load 3D model</p>
    </div>
  </Html>
);

const ModelLoader = () => (
  <Html center>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <LoadingSpinner size="large" />
      <p className="mt-2 text-gray-600">Loading 3D model...</p>
    </div>
  </Html>
);

const ObjModel = ({ modelUrl }: { modelUrl: string }) => {
  const [error, setError] = useState(false);
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      modelUrl,
      (object) => {
        setObj(object);
      },
      undefined,
      (error) => {
        console.error('Error loading OBJ model:', error);
        setError(true);
      }
    );
  }, [modelUrl]);

  if (error) {
    return <ModelError />;
  }

  if (!obj) {
    return <ModelLoader />;
  }

  return <primitive object={obj} scale={[1, 1, 1]} position={[0, 0, 0]} />;
};

const ModelViewer = ({ modelUrl, className = "w-full h-96" }: ModelViewerProps) => {
  if (!modelUrl) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <p className="text-gray-500">No 3D model available</p>
      </div>
    );
  }

  return (
    <div className={`${className} bg-gray-100 rounded-lg overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={<ModelLoader />}>
          <ObjModel modelUrl={modelUrl} />
          <Environment preset="sunset" />
          <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;