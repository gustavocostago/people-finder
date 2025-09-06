import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const PersonDetailPage = lazy(() => import('./pages/PersonDetailPage').then(module => ({ default: module.PersonDetailPage })));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <ProgressSpinner />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/person/:id" element={<PersonDetailPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;