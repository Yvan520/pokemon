import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  usePageMeta(
    '隐私政策 — PokéDex TCG',
    'PokéDex TCG 的隐私政策，了解我们如何收集、使用和保护您的个人信息。',
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white mb-2">隐私政策</h1>
          <p className="text-red-200 text-sm">最后更新：2025 年 5 月</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. 信息收集</h2>
            <p>
              PokéDex TCG（"我们"）尊重并保护您的隐私。我们收集的信息仅用于改善服务体验：
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>自动收集的匿名统计数据（页面访问量、浏览器类型等）通过 Google AdSense</li>
              <li>您主动提交的信息（如通过联系表单）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. 信息使用</h2>
            <p>收集的信息用于：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>提供和维护服务</li>
              <li>展示个性化广告（通过 Google AdSense）</li>
              <li>分析使用趋势以改进网站</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Google AdSense</h2>
            <p>
              我们使用 Google AdSense 展示广告。Google 及其合作伙伴可能会使用 Cookie 来根据您之前访问本网站的记录展示个性化广告。您可以在
              <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-red-500 hover:underline"> Google 广告设置 </a>
              中选择关闭个性化广告。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. 第三方链接</h2>
            <p>
              本网站可能包含指向第三方网站的链接（如 TCGPlayer、CardMarket）。这些网站拥有独立的隐私政策，我们对这些第三方网站的内容和隐私实践不承担责任。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Cookie 政策</h2>
            <p>
              我们使用 Cookie 和类似技术来改善用户体验、分析流量和展示广告。使用本网站即表示您同意使用 Cookie。您可以通过浏览器设置管理 Cookie 偏好。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. 联系我们</h2>
            <p>如果您对隐私政策有任何疑问，请通过以下方式联系我们：admin@gamewayz.com</p>
          </section>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400">
              本隐私政策可能会不时更新。重大变更时我们会通过网站公告通知。
            </p>
          </div>
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
