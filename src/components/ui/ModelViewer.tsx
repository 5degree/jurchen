import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import ObjModel from './ObjModel';
import LoadingSpinner from './LoadingSpinner';

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

const ModelLoader = () => (
  <Html center>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <LoadingSpinner size="large" />
      <p className="mt-2 text-gray-600">Loading 3D model...</p>
    </div>
  </Html>
);

export default function ModelViewer({ modelUrl, className = "w-full h-96" }: ModelViewerProps) {
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
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <hemisphereLight color={"white"} groundColor={"#444444"} intensity={0.6} />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Suspense fallback={<ModelLoader />}>
          <ObjModel modelUrl={modelUrl} />
          <Environment preset="sunset" />
          <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
