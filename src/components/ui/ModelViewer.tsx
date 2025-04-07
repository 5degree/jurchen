import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import LoadingSpinner from './LoadingSpinner';

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

// Component to handle loading error
const ModelError = () => {
  return (
    <Html center>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Failed to load 3D model</p>
      </div>
    </Html>
  );
};

// Component to handle loading state
const ModelLoader = () => {
  return (
    <Html center>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <LoadingSpinner size="large" />
        <p className="mt-2 text-gray-600">Loading 3D model...</p>
      </div>
    </Html>
  );
};

// Component to render the actual 3D model
const Model = ({ modelUrl }: { modelUrl: string }) => {
  const [error, setError] = useState(false);

  try {
    // Add CORS proxy to the URL
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${modelUrl}`;
    const { scene } = useGLTF(proxyUrl);
    return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
  } catch (err) {
    console.error('Error rendering model:', err);
    if (!error) setError(true);
    return <ModelError />;
  }
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
          <Model modelUrl={modelUrl} />
          <Environment preset="sunset" />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer; 