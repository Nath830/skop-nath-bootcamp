import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  CartesianGrid,
  Legend,
} from 'recharts';
import Card from '../components/Card.jsx';
import Icon from '../components/Icon.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import { measureData, studioChannels } from '../data/mockData.js';

/**
 * Page Mesure — corrélations contenus publiés ↔ volume de citations IA.
 * Remplace l'ancien Journal (qui se contentait d'archiver les copies/enregistrements).
 */
export default function Mesure() {
  const { intro, timeseries, publications, correlation, causalities } = measureData;

  // Map publication week → publication objects pour ReferenceDot
  const publicationByWeek = publications.reduce((acc, p) => {
    if (!acc[p.week]) acc[p.week] = [];
    acc[p.week].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Intro */}
      <Card>
        <p className="text-sm text-skop-gray-700 leading-relaxed">{intro}</p>
      </Card>

      {/* Score de corrélation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card accent>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-2">
            Corrélation publications ↔ citations
          </p>
          <p className="font-title text-5xl font-extrabold text-skop-black leading-none">
            {correlation.score}
          </p>
          <p className="text-xs text-skop-gray-500 mt-2">
            Coefficient de Pearson sur 12 semaines
          </p>
        </Card>
        <Card className="md:col-span-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
            Interprétation
          </p>
          <p className="text-sm text-skop-black leading-relaxed">{correlation.interpretation}</p>
        </Card>
      </div>

      {/* Chart : citations + publications */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="TrendingUp" size={16} className="text-skop-pink-vivid" />
            Évolution dans le temps
            <InfoTooltip text="Courbe : citations IA détectées chaque semaine. Barres : nombre de publications Skop cette semaine. Les pics de citations suivent typiquement 7-14 jours après une vague de publications." />
          </span>
        }
        subtitle="12 dernières semaines"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeseries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="week" stroke="#9CA3AF" fontSize={11} />
              <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={11} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                fontSize={11}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #E5E7EB',
                  fontSize: 12,
                }}
                labelStyle={{ fontWeight: 700 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
              <Bar
                yAxisId="right"
                dataKey="publishedCount"
                name="Publications"
                fill="#CCFCFF"
                stroke="#47EAD0"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="citations"
                name="Citations IA"
                stroke="#FE277E"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#FE277E' }}
                activeDot={{ r: 6 }}
              />
              {publications.map((p, i) => {
                const point = timeseries.find((t) => t.week === p.week);
                if (!point) return null;
                return (
                  <ReferenceDot
                    key={i}
                    x={p.week}
                    y={point.citations}
                    yAxisId="left"
                    r={6}
                    fill="#0A0A0A"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Légende publications */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {publications.map((p, i) => {
            const channel = studioChannels[p.channel];
            return (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-skop bg-skop-gray-50 border border-skop-gray-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-skop-black shrink-0" />
                <span className="text-[11px] font-mono font-bold text-skop-gray-500 shrink-0">
                  {p.week}
                </span>
                {channel && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-skop-gray-700">
                    <Icon name={channel.iconName} size={11} />
                    {channel.label}
                  </span>
                )}
                <span className="text-xs text-skop-black truncate">{p.title}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Causalités directes */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Link2" size={16} className="text-skop-pink-vivid" />
            Causalités directes détectées
            <InfoTooltip text="Skop détecte quand un contenu que vous avez publié est explicitement repris dans la réponse d'une IA, avec preuve textuelle (citation directe). Le délai = temps entre la publication et la première citation observée." />
          </span>
        }
        subtitle={`${causalities.length} contenus ont déclenché des citations identifiables`}
      >
        <div className="space-y-4">
          {causalities.map((c) => {
            const channel = studioChannels[c.content.channel];
            return (
              <div
                key={c.id}
                className="rounded-skop border border-skop-gray-200 overflow-hidden"
              >
                {/* Header : contenu source */}
                <div className="p-4 bg-skop-gray-50 border-b border-skop-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-white border border-skop-pink flex items-center justify-center shrink-0">
                      {channel ? (
                        <Icon name={channel.iconName} size={16} className="text-skop-pink-vivid" />
                      ) : (
                        <Icon name="FileText" size={16} className="text-skop-pink-vivid" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {channel && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white border border-skop-gray-200 text-skop-gray-700">
                            {channel.label}
                          </span>
                        )}
                        <span className="text-[11px] text-skop-gray-500">
                          Publié le {c.content.publishedAt}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ml-auto ${
                            c.confidence === 'Élevée'
                              ? 'bg-skop-pink-soft text-skop-pink-vivid border border-skop-pink-vivid'
                              : 'bg-skop-gray-100 text-skop-gray-700 border border-skop-gray-200'
                          }`}
                        >
                          Confiance {c.confidence}
                        </span>
                      </div>
                      <p className="font-title text-sm font-bold text-skop-black">
                        {c.content.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Citations déclenchées */}
                <div className="p-4 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">
                    Citations déclenchées ({c.triggered.length})
                  </p>
                  {c.triggered.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-skop bg-white border border-skop-gray-200"
                    >
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-skop-gray-900 text-white">
                          {t.llm}
                        </span>
                        <span className="text-[11px] text-skop-gray-500">
                          {t.firstSeenAt} · délai {t.delayDays}j
                        </span>
                      </div>
                      <p className="text-xs text-skop-gray-500 mb-1.5">
                        Requête : <span className="text-skop-black">« {t.query} »</span>
                      </p>
                      <p className="text-sm text-skop-black italic leading-relaxed pl-3 border-l-2 border-skop-pink-vivid">
                        {t.quote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
