import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
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
import Icon from '../components/Icon.jsx';
import { visitorsData } from '../data/mockData.js';

export default function Visiteurs() {
  const [filterLLM, setFilterLLM] = useState('all');

  const totalConversions = visitorsData.thisMonth.totalConversions;
  const m = visitorsData.thisMonth;

  // Données chart selon le filtre
  const chartData = useMemo(() => {
    if (filterLLM === 'all') {
      return visitorsData.timeline.map((d) => ({ date: d.date, value: d.total }));
    }
    return visitorsData.timeline.map((d) => ({ date: d.date, value: d[filterLLM] || 0 }));
  }, [filterLLM]);

  const filterColor =
    filterLLM === 'all'
      ? '#FE277E'
      : visitorsData.byLLM.find((l) => l.llm === filterLLM)?.color || '#FE277E';

  return (
    <div className="space-y-8">
      {/* Statut de la connexion GA4 */}
      {visitorsData.ga4.connected ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
          <div className="flex items-center gap-2 text-sm text-skop-black">
            <span className="w-2 h-2 rounded-full bg-skop-pink-vivid animate-pulse" />
            <span className="font-semibold">Google Analytics 4 connecté</span>
            <span className="text-skop-gray-500">·</span>
            <span className="text-skop-gray-700 font-mono text-xs">{visitorsData.ga4.propertyId}</span>
            <span className="text-skop-gray-500">·</span>
            <span className="text-skop-gray-500 text-xs">Dernière sync : {visitorsData.ga4.lastSync}</span>
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
          <span>⚠️ Connectez votre compte Google Analytics 4 pour activer cette page.</span>
          <a href="/organisation" className="px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-pink-vivid text-white whitespace-nowrap">
            Connecter GA4
          </a>
        </div>
      )}

      {/* Répartition par IA — 6 cards */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Bot" size={16} className="text-skop-pink-vivid" />
            Répartition du trafic par IA
            <InfoTooltip text="D'où viennent vos visiteurs IA. Le delta indique l'évolution vs le mois précédent." />
          </span>
        }
        subtitle="Période : 14 avril → 13 mai 2026"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {visitorsData.byLLM.map((l) => {
            const isPositive = l.delta > 0;
            return (
              <button
                key={l.llm}
                onClick={() => setFilterLLM(filterLLM === l.llm ? 'all' : l.llm)}
                className={`p-3 rounded-skop border text-left transition ${
                  filterLLM === l.llm
                    ? 'bg-skop-pink-soft border-skop-pink-vivid'
                    : 'bg-white border-skop-gray-200 hover:border-skop-pink'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-xs font-bold text-skop-black truncate">{l.llm}</span>
                </div>
                <p className="font-title text-xl font-bold text-skop-black leading-none">
                  {l.visitors.toLocaleString('fr-FR')}
                </p>
                <div className="flex items-center justify-between mt-2 text-[11px]">
                  <span className="text-skop-gray-500">{l.percentage}%</span>
                  <span className={`font-bold ${isPositive ? 'text-skop-pink-vivid' : 'text-skop-black'}`}>
                    {isPositive ? '+' : ''}{l.delta}%
                  </span>
                </div>
                <div className="h-1 mt-2 bg-skop-gray-100 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${l.percentage * 2}%`, backgroundColor: l.color }} />
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-skop-gray-500 mt-3 italic">
          <Icon name="Lightbulb" size={11} className="inline -mt-0.5 mr-1" /> Clique sur une IA pour filtrer le graphique ci-dessous.
        </p>
      </Card>

      {/* Chart principal */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="TrendingUp" size={16} className="text-skop-pink-vivid" />
            Trafic IA sur 30 jours
            <InfoTooltip text="Évolution quotidienne du nombre de visiteurs venus des IA. Filtre actif : applique la sélection ci-dessus ou choisis ici." />
          </span>
        }
        subtitle={
          filterLLM === 'all'
            ? `Total tous IA · ${m.total.toLocaleString('fr-FR')} visiteurs sur 30 jours`
            : `Filtré sur ${filterLLM} · ${visitorsData.byLLM.find((l) => l.llm === filterLLM)?.visitors.toLocaleString('fr-FR') || 0} visiteurs`
        }
        action={
          <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs overflow-x-auto max-w-full">
            {['all', ...visitorsData.byLLM.map((l) => l.llm)].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterLLM(opt)}
                className={`px-3 py-1 rounded-full transition font-medium whitespace-nowrap ${
                  filterLLM === opt
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
                <linearGradient id="visitorsArea" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value) => [`${value} visiteurs`, filterLLM === 'all' ? 'Total' : filterLLM]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={filterColor}
                strokeWidth={2.5}
                fill="url(#visitorsArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top pages */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="FileText" size={16} className="text-skop-pink-vivid" />
            Pages les plus visitées depuis les IA
            <InfoTooltip text="Quelles pages reçoivent le plus de trafic IA, l'IA principale qui envoie ces visites, le temps moyen passé et le taux de rebond." />
          </span>
        }
        subtitle="Top 10 du mois — d'où viennent les visiteurs et ce qu'ils font"
        className="scroll-mt-24"
      >
        <div id="top-pages" className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-skop-gray-500 uppercase tracking-wide border-b border-skop-gray-200">
                <th className="py-3 pr-3">Page</th>
                <th className="py-3 pr-3 text-right">Visiteurs IA</th>
                <th className="py-3 pr-3">
                  <span className="inline-flex items-center gap-1">IA #1 <InfoTooltip text="L'IA qui envoie le plus de trafic vers cette page" /></span>
                </th>
                <th className="py-3 pr-3 text-right">
                  <span className="inline-flex items-center gap-1">Durée <InfoTooltip text="Durée moyenne de session" /></span>
                </th>
                <th className="py-3 pr-3 text-right">
                  <span className="inline-flex items-center gap-1">Rebond <InfoTooltip text="% de visiteurs qui partent sans interagir" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visitorsData.topPages.map((p) => {
                const llmColor = visitorsData.byLLM.find((l) => l.llm === p.topLLM)?.color || '#A1A1AA';
                const bounceColor =
                  p.bounceRate < 35 ? 'text-skop-pink-vivid' :
                  p.bounceRate < 55 ? 'text-skop-gray-700' :
                  'text-skop-black';
                return (
                  <tr key={p.page} className="border-b border-skop-gray-100 hover:bg-skop-pink-soft/30 transition">
                    <td className="py-3 pr-3">
                      <p className="text-sm font-semibold text-skop-black">{p.title}</p>
                      <p className="text-[11px] text-skop-gray-500 font-mono mt-0.5">{p.page}</p>
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <span className="font-title text-base font-bold text-skop-black">{p.visitors}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-skop-gray-50 border border-skop-gray-200 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: llmColor }} />
                        {p.topLLM}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-right font-mono text-sm text-skop-black">{p.avgDuration}</td>
                    <td className={`py-3 pr-3 text-right font-bold ${bounceColor}`}>{p.bounceRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Target" size={16} className="text-skop-pink-vivid" />
              Funnel de conversion
              <InfoTooltip text="Parcours des visiteurs IA depuis leur arrivée jusqu'à une action concrète. À chaque étape, combien restent." />
            </span>
          }
          subtitle={`${visitorsData.conversion.funnel[0].count.toLocaleString('fr-FR')} visiteurs IA → ${visitorsData.thisMonth.totalConversions} conversions`}
        >
          <div className="space-y-3">
            {visitorsData.conversion.funnel.map((f, i) => {
              const widthPct = f.rate;
              const isLast = i === visitorsData.conversion.funnel.length - 1;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p className="text-sm font-semibold text-skop-black flex-1 min-w-0">{f.stage}</p>
                    <div className="text-right shrink-0">
                      <span className={`font-title text-base font-bold ${isLast ? 'text-skop-pink-vivid' : 'text-skop-black'}`}>
                        {f.count.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs text-skop-gray-500 ml-1.5">({f.rate}%)</span>
                    </div>
                  </div>
                  <div className="h-3 bg-skop-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isLast ? 'bg-skop-pink-vivid' : 'bg-skop-pink'}`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1.5">
              <Icon name="Star" size={11} className="inline -mt-0.5 mr-1 text-skop-pink-vivid" /> Meilleur chemin de conversion
            </p>
            <p className="text-xs text-skop-gray-700">
              <strong className="text-skop-black">{visitorsData.conversion.bestPath.conversionRate}%</strong> de conversion · délai moyen{' '}
              <strong className="text-skop-black">{visitorsData.conversion.bestPath.avgTimeToConvert}</strong>
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-skop-black flex-wrap">
              {visitorsData.conversion.bestPath.sequence.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-skop-pink text-[11px] font-medium">{s}</span>
                  {i < visitorsData.conversion.bestPath.sequence.length - 1 && (
                    <span className="text-skop-pink-vivid">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Sparkles" size={16} className="text-skop-pink-vivid" />
              Top actions réalisées
              <InfoTooltip text="Actions concrètes effectuées par les visiteurs IA, avec l'IA principale qui a généré chaque action." />
            </span>
          }
          subtitle="Ce que les visiteurs font une fois sur votre site"
        >
          <div className="space-y-2">
            {visitorsData.conversion.topActions.map((a, i) => {
              const llmColor = visitorsData.byLLM.find((l) => l.llm === a.channel)?.color || '#A1A1AA';
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-skop bg-white border border-skop-gray-200 hover:border-skop-pink transition"
                >
                  <span className="text-xl shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-skop-black">{a.action}</p>
                    <p className="text-[11px] text-skop-gray-500 inline-flex items-center gap-1 mt-0.5">
                      Provient surtout de
                      <span className="inline-flex items-center gap-1 font-semibold text-skop-black">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: llmColor }} />
                        {a.channel}
                      </span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-title text-lg font-bold text-skop-pink-vivid leading-none">{a.count}</p>
                    <p className="text-[10px] text-skop-gray-500 uppercase">ce mois</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
