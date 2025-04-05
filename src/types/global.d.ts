// Global type declarations for modules without TypeScript definitions

declare module 'react-router-dom' {
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export const Link: React.FC<LinkProps>;
  export const useParams: () => Record<string, string>;
  export const useNavigate: () => (to: string) => void;
  export const useSearchParams: () => [URLSearchParams, (searchParams: URLSearchParams) => void];
  
  export interface RouteProps {
    path: string;
    element: React.ReactNode;
  }
  
  export const Route: React.FC<RouteProps>;
  
  export interface RoutesProps {
    children: React.ReactNode;
  }
  
  export const Routes: React.FC<RoutesProps>;
  
  export interface BrowserRouterProps {
    children: React.ReactNode;
  }
  
  export const BrowserRouter: React.FC<BrowserRouterProps>;
}

declare module 'zustand' {
  export const create: <T>(fn: (set: (state: Partial<T>) => void) => T) => () => T;
}

declare module 'firebase/app' {
  export interface FirebaseOptions {
    apiKey?: string;
    authDomain?: string;
    databaseURL?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
  }
  
  export const initializeApp: (options: FirebaseOptions) => any;
}

declare module 'firebase/firestore' {
  export const getFirestore: (app: any) => any;
  export const collection: (db: any, collectionName: string) => any;
  export const getDocs: (query: any) => Promise<{ docs: any[] }>;
  export const getDoc: (docRef: any) => Promise<{ exists: () => boolean; data: () => any; id: string }>;
  export const doc: (firestoreInstance: any, collectionName: string, docId: string) => any;
  export const query: (collectionRef: any, ...queryConstraints: any[]) => any;
  export const where: (field: string, operator: string, value: any) => any;
  export const limit: (limitCount: number) => any;
}

declare module '@react-three/fiber' {
  export const Canvas: React.FC<{
    children: React.ReactNode;
    camera?: Record<string, any>;
  }>;
}

declare module '@react-three/drei' {
  export const OrbitControls: React.FC<{
    enablePan?: boolean;
    enableZoom?: boolean;
    enableRotate?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
  }>;
  export const useGLTF: (url: string) => { scene: any };
  export const useTexture: (url: string) => any;
  export const Environment: React.FC<{ preset: string }>;
  export const Html: React.FC<{ center?: boolean; children: React.ReactNode }>;
} 