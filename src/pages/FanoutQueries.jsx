import { useState } from 'react';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Icon from '../components/Icon.jsx';
import { fanoutData } from '../data/mockData.js';

export default function FanoutQueries() {
  return (
    <div className="space-y-8">
      <Card accent>
        <p className="text-sm text-skop-gray-700 leading-relaxed">{fanoutData.intro}</p>
      </Card>

      {/* KPIs fanout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-skop bg-white border border-skop-gray-200">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 inline-flex items-center gap-1.5">
            Prompts analysés
            <InfoTooltip text="Nombre de requêtes utilisateur réelles dont Skop a tracé le fanout complet." />
          </p>
          <p className="font-title text-3xl font-bold text-skop-black mt-1.5">
            {fanoutData.totalAnalyzed}
          </p>
          <p className="text-xs text-skop-gray-500 mt-0.5">cette semaine</p>
        </div>
        <div className="p-4 rounded-skop bg-white border border-skop-gray-200">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 inline-flex items-center gap-1.5">
            Fanouts identifiés
            <InfoTooltip text="Total de sous-requêtes générées par les IA sur tous les prompts analysés. En moyenne ~3,7 fanouts par prompt." />
          </p>
          <p className="font-title text-3xl font-bold text-skop-black mt-1.5">
            {fanoutData.totalFanouts}
          </p>
          <p className="text-xs text-skop-gray-500 mt-0.5">~3,7 fanouts / prompt</p>
        </div>
        <div className="p-4 rounded-skop bg-white border border-skop-gray-200">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 inline-flex items-center gap-1.5">
            Top source fanout
            <InfoTooltip text="La source la plus consultée par les fanouts. Cibler en priorité." />
          </p>
          <p className="font-title text-xl font-bold text-skop-pink-vivid mt-1.5">
            {fanoutData.topFanoutSources[0].source}
          </p>
          <p className="text-xs text-skop-gray-500 mt-0.5">
            {fanoutData.topFanoutSources[0].count} fanouts ·{' '}
            <span className="font-semibold text-skop-gray-700">
              {fanoutData.topFanoutSources[0].brandCaptured} captés
            </span>
          </p>
        </div>
      </div>

      {/* Top sources de fanout */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Antenna" size={16} className="text-skop-pink-vivid" />
            Sources les plus consultées par les fanouts
            <InfoTooltip text="Pour chaque source : combien de fanouts l'ont consultée, et combien de fois votre marque y a été captée." />
          </span>
        }
        subtitle="Les sites où il faut être présent en priorité"
      >
        <div className="space-y-2">
          {fanoutData.topFanoutSources.map((s) => {
            const captureRate = Math.round((s.brandCaptured / s.count) * 100);
            return (
              <div key={s.source} className="flex items-center gap-4 p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-skop-black truncate">{s.source}</p>
                  <p className="text-[11px] text-skop-gray-500 mt-0.5">
                    {s.count} fanouts l'ont consultée
                  </p>
                </div>
                <div className="w-32 shrink-0">
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-skop-gray-200">
                    <div
                      className="h-full bg-skop-pink-vivid"
                      style={{ width: `${captureRate}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-skop-gray-500 mt-1 text-right">
                    <span className="font-bold text-skop-gray-700">{s.brandCaptured}</span> captés ({captureRate}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Analyses détaillées de prompts */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Microscope" size={16} className="text-skop-pink-vivid" />
            Analyses détaillées de prompts utilisateur
            <InfoTooltip text="Pour 4 prompts à fort volume, voici la décomposition complète en fanouts + les sources consultées par chacun." />
          </span>
        }
        subtitle={`${fanoutData.analyses.length} prompts analysés en détail · cliquez pour déplier`}
      >
        <div className="space-y-3">
          {fanoutData.analyses.map((a) => (
            <FanoutAnalysisCard key={a.id} analysis={a} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function FanoutAnalysisCard({ analysis }) {
  const [open, setOpen] = useState(false);
  const isDark = analysis.isDarkZone;
  const brandRateColor =
    analysis.brandAppearanceRate >= 60 ? 'text-skop-pink-vivid' :
    analysis.brandAppearanceRate >= 30 ? 'text-skop-gray-700' :
    'text-skop-black';

  return (
    <div
      className={`rounded-skop border overflow-hidden ${
        isDark ? 'border-l-4 border-l-skop-pink-vivid border-skop-gray-200 bg-white' :
        'border-skop-gray-200 bg-white'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-4 hover:bg-skop-gray-50 transition flex items-start gap-4"
      >
        <div className="shrink-0">
          {isDark ? (
            <span className="inline-flex w-8 h-8 rounded-full bg-skop-black text-white items-center justify-center">
              <Icon name="EyeOff" size={16} />
            </span>
          ) : analysis.brandAppeared ? (
            <span className="inline-flex w-8 h-8 rounded-full bg-skop-gray-100 text-skop-gray-700 items-center justify-center">
              <Icon name="Check" size={16} />
            </span>
          ) : (
            <span className="inline-flex w-8 h-8 rounded-full bg-skop-gray-100 text-skop-gray-400 items-center justify-center">
              <Icon name="X" size={16} />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-title text-base font-bold text-skop-black leading-snug">
            « {analysis.originalPrompt} »
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-skop-gray-500">
            <span className="font-medium">{analysis.llm}</span>
            <span>·</span>
            <span>{analysis.date}</span>
            <span>·</span>
            <span>{analysis.promptCount} prompts/sem</span>
            <span>·</span>
            <span>{analysis.fanouts.length} fanouts</span>
            <span>·</span>
            <span className={`font-bold ${brandRateColor}`}>
              {analysis.brandAppearanceRate}% présence
            </span>
            {isDark && (
              <span className="px-2 py-0.5 rounded-full bg-skop-gray-100 text-skop-gray-700 text-[10px] font-bold uppercase">
                Faible présence
              </span>
            )}
          </div>
        </div>
        <Icon
          name={open ? 'ChevronDown' : 'ChevronRight'}
          size={18}
          className="text-skop-gray-400 shrink-0"
        />
      </button>

      {open && (
        <div className="border-t border-skop-gray-200 bg-skop-gray-50 p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">
            Fanout queries générés par l'IA
          </p>
          {analysis.fanouts.map((f, i) => (
            <div key={i} className="rounded-skop bg-white border border-skop-gray-200 overflow-hidden">
              <div className="p-3 bg-skop-gray-50 border-b border-skop-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1">
                  Fanout #{i + 1}
                </p>
                <p className="text-sm font-mono text-skop-black">« {f.query} »</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
                  Sources consultées ({f.sources.length})
                </p>
                <ul className="space-y-2">
                  {f.sources.map((s, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 p-2 rounded-md border ${
                        s.brandMentioned
                          ? 'bg-white border-l-4 border-l-skop-pink-vivid border-skop-gray-200'
                          : 'bg-skop-gray-50 border-skop-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0 mt-0.5 ${
                          s.brandMentioned
                            ? 'bg-skop-gray-100 text-skop-gray-700'
                            : 'bg-skop-gray-100 text-skop-gray-400'
                        }`}
                      >
                        <Icon name={s.brandMentioned ? 'Check' : 'X'} size={11} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-skop-black truncate">{s.url}</p>
                        {s.snippet && (
                          <p className="text-[11px] text-skop-gray-700 italic mt-1">
                            « {s.snippet} »
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
