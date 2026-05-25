import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function CharizardHistory() {
  usePageMeta(
    '喷火龙历代宝可梦 TCG 卡牌回顾 — PokéDex TCG',
    '从 Base Set 到最新系列，追溯宝可梦 TCG 最具传奇色彩卡牌——喷火龙的完整演变历程。',
    '喷火龙, Charizard, 宝可梦TCG, 卡牌回顾, 稀有卡牌, 收藏'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/guides" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 mb-6 transition-colors">
          <ArrowLeft size={16} /> 返回攻略列表
        </Link>

        <article className="prose prose-gray max-w-none">
          <div className="not-prose mb-8">
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">收藏</span>
            <span className="text-xs text-gray-400 ml-2">12 分钟阅读</span>
            <h1 className="text-3xl font-black text-gray-800 mt-3">喷火龙历代卡牌回顾</h1>
            <p className="text-gray-500 mt-2">喷火龙（Charizard）是宝可梦 TCG 中最具标志性的卡牌之一，没有之一。从 1996 年的第一版到最新的特别艺术卡，喷火龙始终是收藏家和玩家的终极目标。本文将带你回顾历代最重要的喷火龙卡牌。</p>
          </div>

          <h2>1996-1999 — 传奇的起点</h2>

          <h3>Base Set Charizard（4/102）</h3>
          <p>一切从这里开始。1996 年发行的 Base Set 是宝可梦 TCG 的第一个系列，而其中的喷火龙（4/102）是收藏界的圣杯。这张卡牌以其标志性的火焰起飞姿势和震撼的满版艺术图成为整个卡牌收藏文化的象征。一张经过专业评级的 PSA 10 Base Set Charizard 在 2020 年代拍卖价格超过 30 万美元。即使是品相普通的版本，也价值数千美元，是 TCG 收藏的终极起点。</p>

          <h2>2000-2005 — 第二代至第四代</h2>

          <h3>Legendary Collection Reverse Holo Charizard</h3>
          <p>2002 年发行的 Legendary Collection 系列引入了反向闪卡（Reverse Holo）工艺，卡牌画面保持普通但边框全闪。这一版的喷火龙反向闪卡极其稀有，是收藏家追逐的又一圣杯。</p>

          <h3>EX FireRed & LeafGreen Charizard ex（105/112）</h3>
          <p>2004 年，宝可梦 TCG 推出了 EX 系列的喷火龙 ex，拥有 150 HP 和强大的"烈焰爆燃"招式。这是喷火龙作为 ex 宝可梦的首次登场，开启了后续所有特殊形态的先河。</p>

          <h2>2006-2010 — 钻石珍珠到心金银魂</h2>

          <h3>Stormfront Charizard（100/100）</h3>
          <p>2008 年发行的 Stormfront 系列包含了一张极其稀有的闪卡喷火龙（100/100）。这张卡采用特别的闪卡工艺，并且由于 Stormfront 系列的整体印刷量较低，这张卡始终是现代喷火龙收藏中的热门。</p>

          <h2>2011-2015 — 黑白到 XY 时代</h2>

          <h3>Plasma Storm Charizard（136/135）</h3>
          <p>2013 年的 Plasma Storm 推出了全闪黑白风格的喷火龙，卡面编号 136/135 表明这是一张秘密稀有卡（Secret Rare）。采用 Plasma 系列的金属银色处理，视觉冲击力极强。</p>

          <h3>Flashfire Charizard EX（100/106）</h3>
          <p>2014 年的 Flashfire 系列为喷火龙推出了两张引人注目的卡牌：Charizard EX 和 Charizard EX（Mega Evolution）。Mega 喷火龙 X 的深蓝色外观与传统的火焰色截然不同，而 Mega 喷火龙 Y 则保留了经典的橙红色。这一系列再次确认了喷火龙在 TCG 中的核心地位。</p>

          <h2>2016-2019 — 太阳月亮时代</h2>

          <h3>Burning Shadows Charizard GX（150/147）</h3>
          <p>2017 年 Burning Shadows 系列推出的喷火龙 GX 秘密稀有（150/147）是太阳月亮时代最具价值的卡牌之一。彩虹全闪版本更是收藏家的必争之物。这张卡在 2020 年疫情期间价格飙升，一度达到 500 美元以上。</p>

          <h3>Hidden Fates Shiny Charizard GX（SV49/SV94）</h3>
          <p>2019 年的 Hidden Fates 系列推出了闪光版本（Shiny）的喷火龙 GX。黑色的底色配合闪耀的星星图案，让这张卡成为 Hidden Fates 系列最受欢迎的卡牌。即使在今天，一张 PSA 10 的闪色喷火龙 GX 仍然价值不菲。</p>

          <h2>2020-2024 — 剑盾到朱紫时代</h2>

          <h3>Champions Path Charizard V（79/73）</h3>
          <p>2020 年的 Champions Path 系列带来了喷火龙 V 的秘密稀有版本。这是喷火龙作为 V 卡牌的首次亮相。由于 Champions Path 的产量问题和巨大的需求，这张卡的二级市场价格长期居高不下。</p>

          <h3>Shining Fates Charizard VMAX（SV107/SV122）</h3>
          <p>2021 年 Shining Fates 系列推出了闪光版本的喷火龙 VMAX，巨大的白色翅膀和闪耀处理让这张卡在视觉上极具冲击力。这是 VMAX 形态的喷火龙首次以闪色版本出现，至今仍是热门的收藏目标。</p>

          <h3>Obsidian Flames Charizard ex（223/197）</h3>
          <p>2023 年，宝可梦 TCG 进入 Scarlet & Violet 时代，喷火龙再次以 ex 形态回归。Obsidian Flames 的暗黑封面喷火龙 ex 和其特别艺术版本（223/197）是朱紫时代的收藏亮点。这张卡融合了黑暗火焰氛围和精致的闪卡工艺，代表了现代喷火龙卡牌的最高水准。</p>

          <h3>Paldean Fates Charizard ex（234/091）</h3>
          <p>2024 年的 Paldean Fates 系列推出了全新闪色喷火龙 ex，编号 234/091 的秘密稀有版本描绘了喷火龙在帕底亚地区的独特姿态。作为最新的喷火龙核心收藏卡，它的问世再次证明：喷火龙永远是宝可梦 TCG 的王者。</p>

          <h2>为什么喷火龙如此特别？</h2>
          <p>喷火龙的地位不仅仅来自其卡牌强度。以下是几个关键因素：</p>
          <ul>
            <li><strong>童年记忆</strong> — 对于 90 后和 00 后来说，喷火龙是动画片中最酷的宝可梦之一，小智与喷火龙的情感连接深植人心。</li>
            <li><strong>稀缺性</strong> — Base Set 喷火龙是最早也是最稀有的卡牌之一，奠定了其收藏圣杯的地位。</li>
            <li><strong>持续的高品质</strong> — 历代喷火龙卡牌的艺术设计始终保持顶级水准，每一次新系列都让人期待喷火龙的新形象。</li>
            <li><strong>投资价值</strong> — 喷火龙卡牌的价格历史上保持稳定上涨，被许多人视为替代资产配置的一部分。</li>
          </ul>

          <h2>收藏建议</h2>
          <p>如果你打算开始收藏喷火龙卡牌：</p>
          <ul>
            <li>从最新的 Obsidian Flames 或 Paldean Fates 版本入手，价格相对合理。</li>
            <li>关注评级卡（PSA/BGS/CGC），评级后的卡牌流动性和价格透明度更高。</li>
            <li>注意保存环境，避免日晒、潮湿和剧烈温度变化。</li>
            <li>长期持有，喷火龙卡牌的升值潜力在 TCG 领域是经得起时间考验的。</li>
          </ul>

          <p className="text-gray-400 text-sm mt-8">最后更新：2025 年 5 月</p>
        </article>
      </div>
    </div>
  );
}
