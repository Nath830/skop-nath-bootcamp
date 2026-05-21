import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Icon from '../components/Icon.jsx';
import {
  strategyData,
  strategyGaps,
  trackingData,
} from '../data/mockData.js';

/**
 * Page Stratégie — stepper 3 étapes : Analyse → Insights → Plan d'action.
 * (Extraite de l'ancien onglet Stratégie du Studio pour devenir une page autonome.)
 */
export default function Strategie() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showAllGaps, setShowAllGaps] = useState(false);
  const [showFramework, setShowFramework] = useState(false);
  const [editing, setEditing] = useState(false);
  const [audience, setAudience] = useState(strategyData.audience);
  const [tone, setTone] = useState(strategyData.toneOfVoice);

  const fm = strategyData.fanoutMethodology;

  const ptsOf = (s) => parseInt(String(s).match(/\d+/)?.[0] || '0', 10);
  const sortedGaps = [...strategyGaps].sort(
    (a, b) => ptsOf(b.impactScore) - ptsOf(a.impactScore),
  );
  const visibleGaps = showAllGaps ? sortedGaps : sortedGaps.slice(0, 3);

  const steps = [
    { n: 1, label: 'Analyse' },
    { n: 2, label: 'Insights' },
    { n: 3, label: "Plan d'action" },
  ];

  const goCreate = () => navigate('/creation?channel=linkedin');

  return (
    <div className="space-y-8">
      {/* ─── Stepper ─── */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <button onClick={() => setStep(s.n)} className="flex items-center gap-2.5 group">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  step === s.n
                    ? 'bg-skop-pink-vivid text-white'
                    : step > s.n
                    ? 'bg-skop-gray-200 text-skop-gray-700'
                    : 'bg-skop-gray-100 text-skop-gray-400'
                }`}
              >
                {step > s.n ? <Icon name="Check" size={14} /> : s.n}
              </span>
              <span
                className={`text-sm font-semibold transition ${
                  step === s.n ? 'text-skop-black' : 'text-skop-gray-400 group-hover:text-skop-gray-700'
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && <span className="w-10 h-px bg-skop-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* ════════════ ÉTAPE 1 — ANALYSE ════════════ */}
      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col items-center text-center py-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-skop-gray-400 mb-3">
                Score de visibilité IA
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-title text-7xl font-extrabold text-skop-black leading-none">
                  {trackingData.visibilityScore}
                </span>
                <span className="font-title text-2xl font-bold text-skop-gray-300">/100</span>
              </div>
              <p className="text-sm text-skop-gray-500 mt-4 max-w-md leading-relaxed">
                Voici votre visibilité actuelle auprès des IA. Cette stratégie a été conçue pour la
                faire progresser — suivez les 3 étapes.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SecondaryMetric label="Prompts analysés" value={fm.analyzedPrompts} />
            <SecondaryMetric label="Fanouts tracés" value={fm.totalFanouts} />
            <SecondaryMetric label="Sources à capter" value={fm.topTargetSources.length} />
          </div>

          <Card>
            <button
              onClick={() => setShowFramework((v) => !v)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="font-title text-base font-bold text-skop-black">
                Cadre de la stratégie
              </span>
              <Icon
                name={showFramework ? 'ChevronDown' : 'ChevronRight'}
                size={18}
                className="text-skop-gray-400"
              />
            </button>

            {showFramework && (
              <div className="mt-5 space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">
                        Audience cible
                      </p>
                      <button
                        onClick={() => setEditing((e) => !e)}
                        className="text-[11px] font-semibold text-skop-gray-500 hover:text-skop-black inline-flex items-center gap-1"
                      >
                        <Icon name={editing ? 'Check' : 'Pencil'} size={11} />
                        {editing ? 'Enregistrer' : 'Modifier'}
                      </button>
                    </div>
                    {editing ? (
                      <textarea
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-full p-3 rounded-skop border border-skop-gray-200 text-sm min-h-[70px] focus:outline-none focus:border-skop-pink-vivid"
                      />
                    ) : (
                      <p className="text-sm text-skop-black">{audience}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
                      Ton de voix
                    </p>
                    {editing ? (
                      <textarea
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full p-3 rounded-skop border border-skop-gray-200 text-sm min-h-[70px] focus:outline-none focus:border-skop-pink-vivid"
                      />
                    ) : (
                      <p className="text-sm text-skop-gray-700">{tone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
                    Objectifs
                  </p>
                  <ul className="space-y-1.5">
                    {strategyData.goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-skop-black">
                        <span className="w-5 h-5 rounded-full bg-skop-gray-100 flex items-center justify-center text-[11px] font-bold text-skop-gray-500 shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
                    Canaux et formats
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {strategyData.channels.map((c) => (
                      <div key={c.name} className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                        <p className="text-sm font-bold text-skop-black">{c.name}</p>
                        <p className="text-xs text-skop-gray-500 mt-0.5">{c.frequency} · ton {c.tone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Voir les insights
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ════════════ ÉTAPE 2 — INSIGHTS ════════════ */}
      {step === 2 && (
        <div className="space-y-6">
          <Card
            title="Ce que l'analyse révèle"
            subtitle="Les signaux extraits de l'analyse fanout — opportunités et points faibles"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fm.keyFindings.map((f, i) => {
                const critical = f.type === 'dark-zone';
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-skop border ${
                      critical
                        ? 'border-l-4 border-l-skop-pink-vivid border-skop-gray-200 bg-white'
                        : 'border-skop-gray-200 bg-skop-gray-50'
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
                      {critical ? 'Gap critique' : f.type === 'strength' ? 'Force' : 'Opportunité'}
                    </p>
                    <p className="text-sm text-skop-black leading-relaxed">{f.finding}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="Gaps stratégiques"
            subtitle="Sujets où votre marque devrait apparaître — triés par impact potentiel"
          >
            <ul className="divide-y divide-skop-gray-100">
              {visibleGaps.map((g, i) => {
                const treated = g.addressedBy.length > 0;
                return (
                  <li key={i} className="flex items-center gap-4 py-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        treated ? 'bg-skop-gray-300' : 'bg-skop-pink-vivid'
                      }`}
                      title={treated ? 'Traité' : 'Non traité'}
                    />
                    <p className="text-sm font-medium text-skop-black flex-1 min-w-0">{g.zone}</p>
                    <span className="px-2.5 py-1 rounded-full bg-skop-gray-100 text-skop-gray-700 text-xs font-bold whitespace-nowrap">
                      {g.impactScore}
                    </span>
                  </li>
                );
              })}
            </ul>

            {sortedGaps.length > 3 && (
              <button
                onClick={() => setShowAllGaps((v) => !v)}
                className="mt-4 text-sm font-semibold text-skop-gray-600 hover:text-skop-black inline-flex items-center gap-1.5"
              >
                {showAllGaps
                  ? 'Réduire'
                  : `Voir tous les gaps (${sortedGaps.length - 3} de plus)`}
                <Icon name={showAllGaps ? 'ChevronUp' : 'ChevronDown'} size={14} />
              </button>
            )}
          </Card>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700 hover:bg-skop-gray-50 transition"
            >
              <Icon name="ArrowLeft" size={16} />
              Précédent
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Voir mon plan de contenu
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ════════════ ÉTAPE 3 — PLAN D'ACTION ════════════ */}
      {step === 3 && (
        <div className="space-y-6">
          <Card
            title="Plan de contenu"
            subtitle="Les contenus à créer, dérivés de l'analyse fanout — déroulez pour le détail"
          >
            <div className="space-y-3">
              {strategyData.fanoutBasedContentPlan.map((p, i) => (
                <ContentPlanAccordion key={p.id} plan={p} index={i + 1} onCreate={goCreate} />
              ))}
            </div>
          </Card>

          <div className="flex justify-start">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700 hover:bg-skop-gray-50 transition"
            >
              <Icon name="ArrowLeft" size={16} />
              Précédent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SecondaryMetric({ label, value }) {
  return (
    <div className="p-4 rounded-skop bg-white border border-skop-gray-200 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">{label}</p>
      <p className="font-title text-3xl font-bold text-skop-black mt-1.5">{value}</p>
    </div>
  );
}

function ContentPlanAccordion({ plan, index, onCreate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-skop border border-skop-gray-200 overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-4 flex-1 min-w-0 text-left"
        >
          <span className="w-8 h-8 rounded-full bg-skop-gray-100 text-skop-gray-700 text-sm font-bold flex items-center justify-center shrink-0">
            {index}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-title text-base font-bold text-skop-black leading-snug">
              {plan.title}
            </p>
            <p className="text-xs text-skop-gray-400 mt-0.5">{plan.contentType}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-skop-gray-100 text-skop-gray-700 text-xs font-bold whitespace-nowrap shrink-0">
            {plan.expectedImpact}
          </span>
          <Icon
            name={open ? 'ChevronDown' : 'ChevronRight'}
            size={18}
            className="text-skop-gray-400 shrink-0"
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-skop-gray-100 bg-skop-gray-50 p-4 space-y-4 animate-fade-in">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
              Prompts analysés
            </p>
            <ul className="space-y-1">
              {plan.analyzedPrompts.map((p, i) => (
                <li key={i} className="text-sm text-skop-black pl-3 border-l-2 border-skop-gray-200 italic">
                  « {p} »
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
              Fanouts ciblés
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.keyFanoutsTargeted.map((f, i) => (
                <span
                  key={i}
                  className="inline-block px-2.5 py-1 rounded-md bg-white border border-skop-gray-200 text-[11px] font-mono text-skop-gray-700"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
              Sources à capter
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.keySourcesToCapture.map((s) => (
                <span
                  key={s}
                  className="inline-block px-2.5 py-1 rounded-full bg-skop-gray-100 text-skop-gray-700 text-xs font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
              Pourquoi ce contenu
            </p>
            <p className="text-sm text-skop-black leading-relaxed">{plan.reasoning}</p>
          </div>

          <div className="pt-1">
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
            >
              <Icon name="Plus" size={15} />
              Créer ce contenu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
