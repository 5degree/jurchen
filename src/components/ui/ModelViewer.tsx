import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Environment, Html } from '@react-three/drei';
import LoadingSpinner from './LoadingSpinner';

interface ModelViewerProps {
  modelUrl: string;
  modelType?: 'obj' | 'gltf' | 'glb';
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
const Model = ({ modelUrl, modelType = 'obj' }: ModelViewerProps) => {
  const [error, setError] = useState(false);

  // Handle different model types
  if (modelType === 'gltf' || modelType === 'glb' || modelUrl.endsWith('.gltf') || modelUrl.endsWith('.glb')) {
    try {
      const { scene } = useGLTF(modelUrl);
      return <primitive object={scene} />;
    } catch (err) {
      setError(true);
      return <ModelError />;
    }
  } else {
    // Default to OBJ loader
    try {
      // We'll use Drei's OBJ loader via the primitive component
      return <primitive object={new Object()} />;
    } catch (err) {
      setError(true);
      return <ModelError />;
    }
  }
};

const ModelViewer = ({ modelUrl, modelType }: ModelViewerProps) => {
  if (!modelUrl) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No 3D model available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={<ModelLoader />}>
          <Model modelUrl={modelUrl} modelType={modelType} />
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