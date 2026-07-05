import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout';
import Home from './components/Home';

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
