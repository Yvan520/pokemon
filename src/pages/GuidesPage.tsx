import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, TrendingUp, Star } from 'lucide-react';

const GUIDES = [
  {
    slug: 'beginner',
    title: '宝可梦 TCG 新手入门指南',
    desc: '从零开始学习宝可梦集换式卡牌游戏的基础规则、卡牌类型和对战流程。',
    icon: '🎮',
    readTime: '8 分钟',
    category: '入门',
  },
  {
    slug: 'best-cards',
    title: '各属性最强卡牌推荐 2025',
    desc: '盘点当前环境各属性最具战斗力和收藏价值的顶级卡牌，助你组建最强卡组。',
    icon: '🏆',
    readTime: '10 分钟',
    category: '攻略',
  },
  {
    slug: 'charizard-history',
    title: '喷火龙历代卡牌回顾',
    desc: '从 Base Set 到最新系列，追溯宝可梦 TCG 最具传奇色彩卡牌的演变历程。',
    icon: '🔥',
    readTime: '12 分钟',
    category: '收藏',
  },
];

export { GUIDES };

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={24} className="text-red-500" />
          <div>
            <h1 className="text-2xl font-black text-gray-800">攻略指南</h1>
            <p className="text-sm text-gray-500">宝可梦 TCG 卡牌策略、收藏与入门知识</p>
          </div>
        </div>

        <div className="grid gap-4">
          {GUIDES.map(guide => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{guide.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                    <span className="text-xs text-gray-400">{guide.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">{guide.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{guide.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-red-400 flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">更多攻略内容持续更新中</p>
      </div>
    </div>
  );
}
