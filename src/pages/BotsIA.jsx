import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Icon, { SkopBotIcon } from '../components/Icon.jsx';
import { botsData, distributionData } from '../data/mockData.js';

// Correspondance bot ↔ LLM (pour croiser passages et citations)
const BOT_TO_LLM = {
  GPTBot: 'ChatGPT',
  ClaudeBot: 'Claude',
  PerplexityBot: 'Perplexity',
  'Google-Extended': 'Gemini',
  DeepSeekBot: 'DeepSeek',
};

export default function BotsIA() {
  const [filterBot, setFilterBot] = useState('all');
  const [pagesSort, setPagesSort] = useState('crawls');

  const m = botsData.thisMonth;
  const topBot = botsData.byBot[0];

  // Croisement passages bots × citations LLM
  const crossing = useMemo(() => {
    return botsData.byBot
      .filter((b) => BOT_TO_LLM[b.bot])
      .map((b) => {
        const llmName = BOT_TO_LLM[b.bot];
        const llm = distributionData.byLLM.find((l) => l.llm === llmName);
        const citations = llm ? llm.citations : null;
        const efficiency =
          citations != null ? Math.round((citations / b.crawls) * 1000) : null; // citations / 1000 passages
        let verdict, reco;
        if (citations == null) {
          verdict = { label: 'Pas de données', tone: 'na' };
          reco = "Aucune citation mesurée pour ce LLM — surveiller son adoption.";
        } else if (efficiency >= 60) {
          verdict = { label: 'Bon équilibre', tone: 'good' };
          reco = `${llmName} crawle et cite votre site de façon cohérente. Maintenir le rythme de publication.`;
        } else if (efficiency >= 35) {
          verdict = { label: 'À renforcer', tone: 'mid' };
          reco = `${llmName} vous lit beaucoup mais cite peu. Renforcer l'autorité : données chiffrées, sources citées, FAQ structurée sur les pages les plus crawlées.`;
        } else {
          verdict = { label: 'Manque d\'autorité', tone: 'bad' };
          reco = `${llmName} crawle massivement (${b.crawls.toLocaleString('fr-FR')} passages) mais ne cite quasiment pas. Vos pages manquent de signaux d'autorité : ajoutez sources vérifiables, chiffres, schema.org, et faites-vous citer par des médias tiers.`;
        }
        return { bot: b.bot, llm: llmName, color: b.color, crawls: b.crawls, citations, efficiency, verdict, reco };
      })
      .sort((a, b) => (a.efficiency ?? 999) - (b.efficiency ?? 999));
  }, []);

  const verdictColor = {
    good: 'bg-skop-gray-100 text-skop-gray-700',
    mid: 'bg-skop-pink text-skop-black',
    bad: 'bg-skop-pink-vivid text-white',
    na: 'bg-skop-gray-50 text-skop-gray-400',
  };

  const chartData = useMemo(() => {
    if (filterBot === 'all') {
      return botsData.timeline.map((d) => ({ date: d.date, value: d.total }));
    }
    return botsData.timeline.map((d) => ({ date: d.date, value: d[filterBot] || 0 }));
  }, [filterBot]);

  const filterColor =
    filterBot === 'all'
      ? '#FE277E'
      : botsData.byBot.find((b) => b.bot === filterBot)?.color || '#FE277E';

  const pagesSorted = useMemo(() => {
    return [...botsData.topPages].sort((a, b) => {
      if (pagesSort === 'crawls') return b.crawls - a.crawls;
      if (pagesSort === 'recent') return botsData.topPages.indexOf(a) - botsData.topPages.indexOf(b); // already by recency in mock
      return 0;
    });
  }, [pagesSort]);

  return (
    <div className="space-y-8">
      {/* Statut de la connexion Cloudflare */}
      {botsData.cloudflare.connected ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
          <div className="flex items-center gap-2 text-sm text-skop-black flex-wrap">
            <span className="w-2 h-2 rounded-full bg-skop-pink-vivid animate-pulse" />
            <span className="font-semibold">Cloudflare connecté</span>
            <span className="text-skop-gray-500">·</span>
            <span className="text-skop-gray-700 font-mono text-xs">{botsData.cloudflare.zone}</span>
            <span className="text-skop-gray-500">·</span>
            <span className="text-skop-gray-500 text-xs">
              Account {botsData.cloudflare.accountId}
            </span>
            <span className="text-skop-gray-500">·</span>
            <span className="text-skop-gray-500 text-xs">Sync : {botsData.cloudflare.lastSync}</span>
          </div>
          <a
            href="/organisation"
            className="text-xs text-skop-pink-vivid font-semibold hover:underline whitespace-nowrap"
          >
            Gérer →
          </a>
        </div>
      ) : (
        <div className="px-4 py-3 rounded-skop bg-skop-gray-50 border border-skop-gray-300 text-sm text-skop-gray-700 flex items-center justify-between gap-3">
          <span>⚠️ Connectez votre compte Cloudflare pour activer cette page.</span>
          <a href="/organisation" className="px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-pink-vivid text-white whitespace-nowrap">
            Connecter Cloudflare
          </a>
        </div>
      )}

      {/* Répartition par bot — 7 cards */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <SkopBotIcon size={16} />
            Répartition par bot IA
            <InfoTooltip text="Chaque bot a une identité (User-Agent) unique dans les logs. Skop les détecte automatiquement et compte les passages. Le delta indique l'évolution vs le mois précédent." />
          </span>
        }
        subtitle={`Période : ${m.period} · ${m.totalCrawls.toLocaleString('fr-FR')} passages au total`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {botsData.byBot.map((b) => {
            const isPositive = b.delta > 0;
            const isSelected = filterBot === b.bot;
            return (
              <button
                key={b.bot}
                onClick={() => setFilterBot(isSelected ? 'all' : b.bot)}
                title={b.userAgent}
                className={`p-3 rounded-skop border text-left transition ${
                  isSelected
                    ? 'bg-skop-pink-soft border-skop-pink-vivid'
                    : 'bg-white border-skop-gray-200 hover:border-skop-pink'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: b.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-skop-black font-mono truncate">{b.bot}</p>
                    <p className="text-[10px] text-skop-gray-500 truncate">{b.operator}</p>
                  </div>
                </div>
                <p className="font-title text-xl font-bold text-skop-black leading-none mt-2">
                  {b.crawls.toLocaleString('fr-FR')}
                </p>
                <div className="flex items-center justify-between mt-1.5 text-[11px]">
                  <span className="text-skop-gray-500">{b.percentage}%</span>
                  <span className={`font-bold ${isPositive ? 'text-skop-pink-vivid' : 'text-skop-black'}`}>
                    {isPositive ? '+' : ''}{b.delta}%
                  </span>
                </div>
                <div className="h-1 mt-2 bg-skop-gray-100 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${Math.min(b.percentage * 2, 100)}%`, backgroundColor: b.color }} />
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-skop-gray-500 mt-3 italic">
          💡 Survole une carte pour voir le User-Agent complet. Clique pour filtrer le graphique ci-dessous.
        </p>
      </Card>

      {/* Chart 30 jours */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="TrendingUp" size={16} className="text-skop-pink-vivid" />
            Passages de bots sur 30 jours
            <InfoTooltip text="Évolution quotidienne des passages détectés dans vos logs Cloudflare. Les bots crawlent en continu (faible effet week-end) — quand la courbe monte, c'est que les IA s'intéressent plus à votre site." />
          </span>
        }
        subtitle={
          filterBot === 'all'
            ? `Total tous bots · ${m.totalCrawls.toLocaleString('fr-FR')} passages sur 30 jours`
            : `Filtré sur ${filterBot} · ${botsData.byBot.find((b) => b.bot === filterBot)?.crawls.toLocaleString('fr-FR') || 0} passages`
        }
        action={
          <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs overflow-x-auto max-w-full">
            {['all', ...botsData.byBot.map((b) => b.bot)].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterBot(opt)}
                className={`px-3 py-1 rounded-full transition font-medium whitespace-nowrap ${
                  filterBot === opt
                    ? 'bg-white text-skop-black shadow-sm'
                    : 'text-skop-gray-500 hover:text-skop-black'
                }`}
              >
                {opt === 'all' ? 'Tous' : opt}
              </button>
            ))}
          </div>
        }
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="botsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={filterColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={filterColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F5" vertical={false} />
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} interval={3} />
              <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: '#FFCBE0' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E4E4E7',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [`${value.toLocaleString('fr-FR')} passages`, filterBot === 'all' ? 'Tous bots' : filterBot]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={filterColor}
                strokeWidth={2.5}
                fill="url(#botsArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Croisement passages × citations */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="GitCompareArrows" size={16} className="text-skop-pink-vivid" />
            Passages des bots × citations des IA
            <InfoTooltip text="On croise le nombre de passages du crawler de chaque IA avec le nombre de fois où cette IA cite réellement votre marque. Beaucoup de passages mais peu de citations = vos pages manquent d'autorité." />
          </span>
        }
        subtitle="Vos pages sont-elles lues mais pas citées ? Diagnostic par IA, du plus problématique au meilleur"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-skop-gray-400 uppercase tracking-wide border-b border-skop-gray-200">
                <th className="py-3 pr-3">IA</th>
                <th className="py-3 pr-3 text-right">Passages bot</th>
                <th className="py-3 pr-3 text-right">Citations</th>
                <th className="py-3 pr-3 text-right">
                  <span className="inline-flex items-center gap-1">
                    Citations / 1000 passages
                    <InfoTooltip text="Efficacité : combien de citations vous obtenez pour 1000 passages du bot. Plus c'est bas, plus vos pages sont lues sans être citées." />
                  </span>
                </th>
                <th className="py-3 pr-3 text-right">Diagnostic</th>
              </tr>
            </thead>
            <tbody>
              {crossing.map((c) => (
                <tr key={c.bot} className="border-b border-skop-gray-100">
                  <td className="py-3 pr-3">
                    <span className="inline-flex items-center gap-2 font-semibold text-skop-black">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                      {c.llm}
                    </span>
                    <span className="block text-[11px] text-skop-gray-400 font-mono mt-0.5">{c.bot}</span>
                  </td>
                  <td className="py-3 pr-3 text-right font-mono text-skop-black">
                    {c.crawls.toLocaleString('fr-FR')}
                  </td>
                  <td className="py-3 pr-3 text-right font-mono text-skop-black">
                    {c.citations != null ? c.citations : '—'}
                  </td>
                  <td className="py-3 pr-3 text-right font-title font-bold text-skop-black">
                    {c.efficiency != null ? c.efficiency : '—'}
                  </td>
                  <td className="py-3 pr-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${verdictColor[c.verdict.tone]}`}>
                      {c.verdict.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top pages crawlées */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="FileText" size={16} className="text-skop-pink-vivid" />
            Pages les plus crawlées par les bots IA
            <InfoTooltip text="Pour chaque page : quelle page est lue, par quel bot principalement, combien de passages ce mois, et la date du dernier passage." />
          </span>
        }
        subtitle="Top 10 du mois — les pages que les IA lisent en priorité"
        action={
          <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs">
            <button
              onClick={() => setPagesSort('crawls')}
              className={`px-3 py-1 rounded-full transition font-medium ${pagesSort === 'crawls' ? 'bg-white text-skop-black shadow-sm' : 'text-skop-gray-500'}`}
            >
              Tri par crawls
            </button>
            <button
              onClick={() => setPagesSort('recent')}
              className={`px-3 py-1 rounded-full transition font-medium ${pagesSort === 'recent' ? 'bg-white text-skop-black shadow-sm' : 'text-skop-gray-500'}`}
            >
              Tri par date
            </button>
          </div>
        }
      >
        <div id="top-bot-pages" className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-skop-gray-500 uppercase tracking-wide border-b border-skop-gray-200">
                <th className="py-3 pr-3">Page</th>
                <th className="py-3 pr-3 text-right">Passages</th>
                <th className="py-3 pr-3">
                  <span className="inline-flex items-center gap-1">Bot principal <InfoTooltip text="Le bot qui a crawlé cette page le plus de fois" /></span>
                </th>
                <th className="py-3 pr-3">
                  <span className="inline-flex items-center gap-1">Répartition <InfoTooltip text="Distribution des passages entre les bots (proportion)" /></span>
                </th>
                <th className="py-3 pr-3 text-right whitespace-nowrap">Dernier passage</th>
              </tr>
            </thead>
            <tbody>
              {pagesSorted.map((p) => {
                const topBotMeta = botsData.byBot.find((b) => b.bot === p.topBot);
                const sortedBots = Object.entries(p.bots)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5);
                const totalShown = sortedBots.reduce((sum, [, c]) => sum + c, 0);
                return (
                  <tr key={p.page} className="border-b border-skop-gray-100 hover:bg-skop-pink-soft/30 transition">
                    <td className="py-3 pr-3">
                      <p className="text-sm font-semibold text-skop-black">{p.title}</p>
                      <p className="text-[11px] text-skop-gray-500 font-mono mt-0.5">{p.page}</p>
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <span className="font-title text-base font-bold text-skop-black">{p.crawls.toLocaleString('fr-FR')}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-skop-gray-50 border border-skop-gray-200 text-xs font-semibold font-mono">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: topBotMeta?.color || '#A1A1AA' }} />
                        {p.topBot}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex h-2 rounded-full overflow-hidden bg-skop-gray-100 max-w-[160px]">
                        {sortedBots.map(([bot, count]) => {
                          const botMeta = botsData.byBot.find((b) => b.bot === bot);
                          return (
                            <div
                              key={bot}
                              className="h-full"
                              style={{
                                width: `${(count / totalShown) * 100}%`,
                                backgroundColor: botMeta?.color || '#A1A1AA',
                              }}
                              title={`${bot} : ${count}`}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-right text-xs text-skop-gray-700 whitespace-nowrap">
                      {p.lastCrawl}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-skop-gray-500">
          <span className="font-bold uppercase tracking-wide text-skop-gray-700">Légende :</span>
          {botsData.byBot.map((b) => (
            <span key={b.bot} className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: b.color }} />
              <span className="font-mono">{b.bot}</span>
            </span>
          ))}
        </div>
      </Card>
      {/* Recommandations */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Lightbulb" size={16} className="text-skop-pink-vivid" />
            Recommandations pour être davantage cité
            <InfoTooltip text="Actions concrètes pour transformer les passages des bots en citations réelles dans les réponses des IA." />
          </span>
        }
        subtitle="Priorisé selon les IA qui vous lisent mais ne vous citent pas"
      >
        <div className="space-y-3">
          {crossing
            .filter((c) => c.verdict.tone === 'bad' || c.verdict.tone === 'mid')
            .map((c) => (
              <div
                key={c.bot}
                className={`p-4 rounded-skop border ${
                  c.verdict.tone === 'bad'
                    ? 'border-l-4 border-l-skop-pink-vivid border-skop-gray-200 bg-white'
                    : 'border-skop-gray-200 bg-skop-gray-50'
                }`}
              >
                <p className="text-sm font-bold text-skop-black mb-1 inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                  {c.llm}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${verdictColor[c.verdict.tone]}`}>
                    {c.verdict.label}
                  </span>
                </p>
                <p className="text-sm text-skop-gray-700 leading-relaxed">{c.reco}</p>
              </div>
            ))}

          <div className="p-4 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
              Plan d'action global
            </p>
            <ul className="space-y-1.5 text-sm text-skop-black">
              <li className="flex items-start gap-2">
                <span className="text-skop-gray-400">→</span>
                Ajouter des données chiffrées vérifiables sur les pages les plus crawlées (les IA citent en priorité le mesurable).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-skop-gray-400">→</span>
                Structurer le contenu (titres, FAQ schema.org, sources citées) pour faciliter l'extraction.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-skop-gray-400">→</span>
                Obtenir des mentions sur des médias tiers (presse, L'Étudiant…) — l'autorité externe pèse beaucoup.
              </li>
            </ul>
          </div>
        </div>
      </Card>

    </div>
  );
}
