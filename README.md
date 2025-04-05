# Jurchen Solar Products Showcase

A modern web application to showcase solar products built with React, TypeScript, and Firebase.

## Features

- Responsive design with Tailwind CSS
- Dynamic product listings
- Product categorization
- Product detail pages with specifications
- 3D model viewer for products using Three.js
- Image galleries
- Embedded YouTube videos

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Data Source**: Firebase Firestore
- **3D Viewer**: Three.js with react-three-fiber
- **Build Tool**: Vite

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Firebase project with Firestore database

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jurchen-solar-showcase.git
   cd jurchen-solar-showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Firebase Data Structure

The application uses the following Firestore collections:

- **category**: Information about product categories
- **subcategory**: Information about product subcategories
- **hero_slider**: Banner images and links for the homepage slider
- **products**: Complete product information

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, which can be deployed to any static hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Three.js and react-three-fiber for 3D rendering
- Firebase for database services
- React ecosystem
- Tailwind CSS for styling
