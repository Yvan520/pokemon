import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function BeginnerGuide() {
  usePageMeta(
    '宝可梦 TCG 新手入门指南 — PokéDex TCG',
    '从零开始学习宝可梦集换式卡牌游戏的基础规则、卡牌类型和对战流程，快速上手 PTCG。',
    '宝可梦TCG, 新手入门, 宝可梦卡牌规则, PTCG教程'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/guides" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 mb-6 transition-colors">
          <ArrowLeft size={16} /> 返回攻略列表
        </Link>

        <article className="prose prose-gray max-w-none">
          <div className="not-prose mb-8">
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">入门</span>
            <span className="text-xs text-gray-400 ml-2">8 分钟阅读</span>
            <h1 className="text-3xl font-black text-gray-800 mt-3">宝可梦 TCG 新手入门指南</h1>
            <p className="text-gray-500 mt-2">宝可梦集换式卡牌游戏（Pokémon TCG）自 1996 年问世以来，已成为全球最受欢迎的卡牌游戏之一。如果你是第一次接触，本指南将带你快速了解基础规则与核心玩法。</p>
          </div>

          <h2>什么是宝可梦 TCG？</h2>
          <p>宝可梦 TCG 是一款双人对战的卡牌策略游戏。每位玩家组建一副 60 张的卡组，扮演宝可梦训练家，使用宝可梦卡牌、能量卡和训练家卡相互对战。目标是通过攻击对手的宝可梦，获得 6 张奖赏卡来赢得比赛。</p>

          <h2>卡牌类型</h2>
          <h3>宝可梦卡（Pokémon）</h3>
          <p>你的主力卡牌。每个宝可梦拥有 HP（血量）、属性和招式。基础宝可梦可以直接上场，进化宝可梦需要在其基础形态上放置进化。GX、V、VMAX、VSTAR 等特殊宝可梦拥有更强力的技能，通常是对战的核心。</p>

          <h3>能量卡（Energy）</h3>
          <p>宝可梦发动招式需要的基本资源。基本能量分为 11 种属性：草、火、水、电、超、斗、恶、钢、妖、龙、无色。每回合可以从手牌中附着一张基本能量到己方宝可梦身上。特殊能量卡则提供额外效果。</p>

          <h3>训练家卡（Trainer）</h3>
          <p>训练家卡分为三类：</p>
          <ul>
            <li><strong>物品卡（Item）</strong> — 使用后弃置，通常用于检索卡牌、回复 HP 或加速能量。</li>
            <li><strong>支援者卡（Supporter）</strong> — 每回合只能使用一张，效果更强，例如博士的研究（弃掉手牌抽 7 张）。</li>
            <li><strong>竞技场卡（Stadium）</strong> — 留在场上改变双方规则，双方各只能有一张在场。</li>
          </ul>

          <h2>基础规则</h2>
          <h3>开局设置</h3>
          <ol>
            <li>洗牌后抽取 7 张手牌。如果手牌中没有基础宝可梦，向对手展示手牌并重新抽牌。</li>
            <li>将一张基础宝可梦面朝下放在战斗区，最多 5 张放在后备区。</li>
            <li>将卡组顶部 6 张牌面朝下作为奖赏卡。</li>
            <li>先手玩家在第一回合不能使用支援者卡，也不能攻击。</li>
          </ol>

          <h3>回合流程</h3>
          <ol>
            <li><strong>抽牌阶段</strong> — 从卡组抽 1 张牌。</li>
            <li><strong>行动阶段</strong> — 可以执行以下任意操作（不限次数，除非注明）：
              <ul>
                <li>从手牌放置基础宝可梦到后备区</li>
                <li>进化宝可梦（先手第一回合不可进化）</li>
                <li>附着一张能量卡到己方宝可梦（每回合一次）</li>
                <li>使用训练家卡</li>
                <li>使用宝可梦特性（Ability）</li>
                <li>将战斗宝可梦与后备宝可梦交换（撤退，需支付撤退费用）</li>
              </ul>
            </li>
            <li><strong>攻击阶段</strong> — 战斗宝可梦使用招式攻击对手。攻击后回合结束。</li>
          </ol>

          <h3>获胜条件</h3>
          <ul>
            <li>获得 6 张奖赏卡（击败对手的宝可梦获得奖赏卡，GX/V 等特殊宝可梦被击败时奖赏卡数量更多）</li>
            <li>对手卡组无牌可抽</li>
            <li>对手战斗区无宝可梦且后备区为空</li>
          </ul>

          <h2>新手卡组建议</h2>
          <p>如果你是刚开始，建议先使用预组卡组（Theme Deck）或 League Battle Deck 熟悉流程。以下是一些适合新手的卡组方向：</p>
          <ul>
            <li><strong>电系卡组</strong>（如皮卡丘 VMAX）— 简单直接，快速充能，适合学习节奏。</li>
            <li><strong>斗系卡组</strong>（如路卡利欧 VSTAR）— 打击面广，操作直观。</li>
            <li><strong>水系卡组</strong>（如帕路奇亚 VSTAR）— 有充能加速和检索能力，适合进阶练习。</li>
          </ul>

          <h2>实用技巧</h2>
          <ul>
            <li>卡组中推荐包含 15-20 张能量卡，10-15 张宝可梦卡，其余为训练家卡。</li>
            <li>博士的研究和先机球是大多数卡组的标配检索卡。</li>
            <li>注意属性克制关系（×2 伤害）和抗性（−30 伤害）。</li>
            <li>多看高水平对局录像能快速提升理解。</li>
          </ul>

          <h2>资源推荐</h2>
          <ul>
            <li><a href="https://www.pokemon.com/us/pokemon-tcg" target="_blank" rel="noreferrer">官方网站</a> — 规则详解和卡牌数据库</li>
            <li><a href="https://limitlesstcg.com/" target="_blank" rel="noreferrer">Limitless TCG</a> — 比赛数据和上位卡组</li>
            <li><a href="https://tcgplayer.com" target="_blank" rel="noreferrer">TCGPlayer</a> — 卡牌价格查询</li>
          </ul>

          <p className="text-gray-400 text-sm mt-8">最后更新：2025 年 5 月</p>
        </article>
      </div>
    </div>
  );
}
