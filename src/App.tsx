import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CardDetailPage from './pages/CardDetailPage';
import SetsPage from './pages/SetsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/card/:id" element={<CardDetailPage />} />
              <Route path="/sets" element={<SetsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-6xl">🃏</div>
                <h1 className="text-2xl font-black text-gray-800">页面不存在</h1>
                <p className="text-gray-500">你要找的页面似乎不在这里</p>
                <Link to="/" className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                  返回首页
                </Link>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
