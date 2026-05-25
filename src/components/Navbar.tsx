import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Database, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-yellow-400 font-semibold'
      : 'text-white/80 hover:text-white';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-2xl border-b border-red-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg ring-2 ring-yellow-400 group-hover:ring-4 transition-all">
              <span className="text-red-600 font-black text-sm leading-none">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-base leading-tight tracking-tight">PokéDex TCG</span>
              <span className="text-red-200 text-[10px] leading-tight">宝可梦卡牌数据库</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive('/')}`}>
              <BookOpen size={15} />首页
            </Link>
            <Link to="/search" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive('/search')}`}>
              <Search size={15} />搜索卡牌
            </Link>
            <Link to="/sets" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive('/sets')}`}>
              <Database size={15} />卡包系列
            </Link>
            <Link to="/guides" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive('/guides')}`}>
              <BookOpen size={15} />攻略指南
            </Link>
            <Link to="/about" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive('/about')}`}>
              <Database size={15} />关于
            </Link>
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="快速搜索卡牌..."
                className="bg-red-800/60 border border-red-500/50 rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder-red-300 focus:outline-none focus:border-yellow-400 focus:bg-red-800/80 transition-all w-44 focus:w-56"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-red-500/30 pt-3 space-y-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2 px-1">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="搜索卡牌..."
                  className="w-full bg-red-800/60 border border-red-500/50 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-red-300 focus:outline-none"
                />
              </div>
              <button type="submit" className="bg-yellow-400 text-red-800 rounded-full px-3 py-2 text-sm font-semibold">搜</button>
            </form>
            <div className="flex flex-col gap-2 px-1">
              <Link to="/" onClick={() => setMenuOpen(false)} className={`text-sm py-1 ${isActive('/')}`}>🏠 首页</Link>
              <Link to="/search" onClick={() => setMenuOpen(false)} className={`text-sm py-1 ${isActive('/search')}`}>🔍 搜索卡牌</Link>
              <Link to="/sets" onClick={() => setMenuOpen(false)} className={`text-sm py-1 ${isActive('/sets')}`}>📦 卡包系列</Link>
              <Link to="/guides" onClick={() => setMenuOpen(false)} className={`text-sm py-1 ${isActive('/guides')}`}>📖 攻略指南</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className={`text-sm py-1 ${isActive('/about')}`}>ℹ️ 关于</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
