import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { ChevronRight } from 'lucide-react';

export default function AboutPage() {
  usePageMeta(
    '关于本站 — PokéDex TCG | 宝可梦卡牌数据库',
    'PokéDex TCG 是一个面向宝可梦集换式卡牌游戏爱好者的免费卡牌数据库，提供卡牌搜索、价格查询和系列浏览功能。',
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white mb-2">关于本站</h1>
          <p className="text-red-200 text-sm">PokéDex TCG — 宝可梦卡牌数据库</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">什么是 PokéDex TCG？</h2>
            <p>
              PokéDex TCG 是一个面向宝可梦集换式卡牌游戏（Pokémon TCG）爱好者的免费卡牌数据库。
              我们提供 18,000+ 张卡牌的搜索、浏览和价格查询服务，帮助玩家了解卡牌信息、追踪市场价格。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">主要功能</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>🔍 卡牌搜索 — 按名称、属性、稀有度、分类快速筛选</li>
              <li>📄 卡牌详情 — 技能、特性、弱点、抵抗力完整信息</li>
              <li>💰 价格查询 — TCGPlayer & CardMarket 市场价格</li>
              <li>📦 卡包系列 — 浏览所有已发布的扩展包和系列</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">数据来源</h2>
            <p>
              所有卡牌数据来自 <a href="https://pokemontcg.io" target="_blank" rel="noreferrer" className="text-red-500 hover:underline">Pokémon TCG API</a>，
              价格数据来自 TCGPlayer 和 CardMarket。我们感谢这些平台提供的数据支持。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">免责声明</h2>
            <p>
              PokéDex TCG 是一个非官方的粉丝站点，与 Nintendo、The Pokémon Company、
              Creatures Inc. 或 Game Freak 无任何官方关联。所有卡牌图像和名称均为其各自所有者的财产。
              本站仅提供信息参考，不提供任何形式的保证。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">联系方式</h2>
            <p>
              如有任何问题或建议，请发送邮件至：<a href="mailto:admin@gamewayz.com" className="text-red-500 hover:underline">admin@gamewayz.com</a>
            </p>
          </section>
        </div>

        <div className="mt-6">
          <Link to="/" className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1">
            <ChevronRight size={14} className="rotate-180" /> 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
