import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Modal from './Modal.jsx';
import Icon from './Icon.jsx';
import {
  reportHistory,
  trackingData,
  contentFeedback,
} from '../data/mockData.js';

/**
 * Rapport d'analyse de la semaine — ouvert depuis le Dashboard.
 * Affiche les données stratégiques clés + permet de comparer avec
 * une période historique (semaines / mois passés).
 */
export default function WeeklyReportModal({ open, onClose }) {
  const current = reportHistory[0];
  const [compareId, setCompareId] = useState('w-1');
  const compare = reportHistory.find((p) => p.id === compareId) ?? null;

  const metrics = [
    { key: 'visibility', label: 'Score de visibilité IA', suffix: '/100', iconName: 'TrendingUp' },
    { key: 'apparitions', label: 'Apparitions', suffix: '', iconName: 'Eye' },
    { key: 'sentiment', label: 'Sentiment', suffix: '/100', iconName: 'MessageCircle' },
    { key: 'rank', label: 'Position marché', prefix: '#', suffix: '/5', iconName: 'Swords', lowerIsBetter: true },
    { key: 'citedContents', label: 'Contenus cités IA', suffix: '', iconName: 'BookOpen' },
    { key: 'pitches', label: 'Pitches presse', suffix: '', iconName: 'Newspaper' },
  ];

  const highlights = [
    {
      iconName: 'TrendingUp',
      title: `Visibilité +${trackingData.weekDelta} pts cette semaine`,
      detail: "Meilleure progression du mois — objectif 85/100 atteignable sous 3 semaines.",
    },
    {
      iconName: 'BookOpen',
      title: 'Article "Post-bac vs prépa" : 47 citations IA',
      detail: 'Devient le contenu le plus repris (ChatGPT 24, Claude 14, Gemini 9).',
    },
    {
      iconName: 'AlertTriangle',
      title: 'Zone d\'ombre : "Master Grande École"',
      detail: "Requête posée 180×/sem, vous n'y apparaissez quasiment pas. Levier prioritaire.",
      critical: true,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Rapport d'analyse"
      subtitle={`${current.label} · ${current.range}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Sélecteur de comparaison */}
        <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
          <span className="text-sm font-semibold text-skop-black inline-flex items-center gap-1.5">
            <Icon name="GitCompareArrows" size={15} className="text-skop-pink-vivid" />
            Comparer avec
          </span>
          <select
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            className="text-sm font-semibold text-skop-black bg-white border border-skop-gray-200 rounded-full px-3 py-1.5 focus:outline-none focus:border-skop-pink-vivid cursor-pointer"
          >
            <option value="">Aucune comparaison</option>
            {reportHistory.slice(1).map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} ({p.range})
              </option>
            ))}
          </select>
        </div>

        {/* KPIs avec delta vs période comparée */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map((m) => {
            const cur = current[m.key];
            const cmp = compare ? compare[m.key] : null;
            let delta = null;
            let positive = null;
            if (cmp != null) {
              const diff = cur - cmp;
              delta = diff;
              positive = m.lowerIsBetter ? diff < 0 : diff > 0;
            }
            return (
              <div key={m.key} className="p-4 rounded-skop bg-white border border-skop-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 inline-flex items-center gap-1.5">
                  <Icon name={m.iconName} size={12} />
                  {m.label}
                </p>
                <p className="font-title text-2xl font-extrabold text-skop-black mt-2 leading-none">
                  {m.prefix || ''}{cur.toLocaleString('fr-FR')}{m.suffix}
                </p>
                {delta != null ? (
                  <p
                    className={`text-xs font-bold mt-1.5 ${
                      positive ? 'text-skop-pink-vivid' : positive === false ? 'text-skop-black' : 'text-skop-gray-500'
                    }`}
                  >
                    {delta > 0 ? '+' : ''}{delta.toLocaleString('fr-FR')} vs {compare.label.toLowerCase()}
                  </p>
                ) : (
                  <p className="text-xs text-skop-gray-400 mt-1.5">—</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Évolution */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
            Évolution de la visibilité (7 semaines)
          </p>
          <div className="h-44 rounded-skop bg-skop-gray-50 border border-skop-gray-200 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trackingData.timeline} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="reportArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FE277E" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#FE277E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#A1A1AA" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#A1A1AA" fontSize={10} tickLine={false} axisLine={false} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E4E4E7',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#FE277E" strokeWidth={2.5} fill="url(#reportArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faits marquants */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
            Faits marquants
          </p>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-skop border ${
                  h.critical
                    ? 'border-l-4 border-l-skop-pink-vivid border-skop-gray-200 bg-white'
                    : 'border-skop-gray-200 bg-skop-gray-50'
                }`}
              >
                <Icon
                  name={h.iconName}
                  size={16}
                  className={`mt-0.5 shrink-0 ${h.critical ? 'text-skop-pink-vivid' : 'text-skop-gray-500'}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-skop-black leading-snug">{h.title}</p>
                  <p className="text-xs text-skop-gray-600 mt-1 leading-relaxed">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prochaines actions */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
            Prochaines actions prioritaires
          </p>
          <ol className="space-y-2">
            {trackingData.advices.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <span className="w-6 h-6 rounded-full bg-white border border-skop-gray-200 text-skop-gray-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-skop-black">{a.title}</p>
                  <p className="text-xs text-skop-gray-500 mt-0.5">{a.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Retour des contenus publiés (condensé) */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
            Retour des contenus publiés ·{' '}
            {contentFeedback.globalStats.citedAsSource}/{contentFeedback.globalStats.totalPublished} cités par les IA
          </p>
          <div className="space-y-1.5">
            {contentFeedback.contents.map((c) => {
              const positive = !c.visibilityImpact.startsWith('−');
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-2.5 rounded-md bg-skop-gray-50 border border-skop-gray-200"
                >
                  <span className="text-sm text-skop-black flex-1 min-w-0 truncate">{c.title}</span>
                  <span className="text-[11px] text-skop-gray-500 whitespace-nowrap">
                    {c.citedAsSource ? `${c.aiCitations} cit.` : 'non cité'}
                  </span>
                  <span
                    className={`text-sm font-bold whitespace-nowrap ${
                      positive ? 'text-skop-pink-vivid' : 'text-skop-black'
                    }`}
                  >
                    {c.visibilityImpact}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
