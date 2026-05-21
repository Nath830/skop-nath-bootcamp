import { useState } from 'react';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Icon from '../components/Icon.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { optimizationData, siteImprovements } from '../data/mockData.js';

export default function Scanner() {
  const [tab, setTab] = useState('contenu');

  const totalSiteImpact = siteImprovements.reduce((sum, s) => {
    const m = s.geoImpact.match(/\d+/);
    return sum + (m ? parseInt(m[0], 10) : 0);
  }, 0);

  const tabs = [
    { value: 'contenu', label: 'Scanner de contenu', iconName: 'FileSearch' },
    { value: 'site', label: 'Scanner du site', iconName: 'Globe' },
  ];

  return (
    <div className="space-y-8">
      {/* Onglets */}
      <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-sm">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition font-medium ${
              tab === t.value
                ? 'bg-white text-skop-black shadow-sm'
                : 'text-skop-gray-500 hover:text-skop-black'
            }`}
          >
            <Icon name={t.iconName} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'contenu' && <ContentAuditTab />}
      {tab === 'site' && <SiteAuditTab totalSiteImpact={totalSiteImpact} />}
    </div>
  );
}

// ════════════════════════════════════════
// ONGLET — AUDIT DE CONTENU
// ════════════════════════════════════════
function ContentAuditTab() {
  const toast = useToast();
  const [mode, setMode] = useState('paste'); // 'paste' | 'file'
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [improved, setImproved] = useState(null);

  const runAudit = (text) => {
    const length = text.length;
    const hasNumbers = /\d/.test(text);
    const hasStructure = /#{1,3}|^- |^\*/m.test(text);
    let score = 40;
    if (length > 500) score += 15;
    if (length > 1500) score += 10;
    if (hasNumbers) score += 15;
    if (hasStructure) score += 15;
    score = Math.min(score, 95);

    const tips = [
      length < 500 && {
        severity: 'high',
        text: 'Contenu trop court — visez 800 à 1 500 mots pour un article de fond.',
      },
      !hasNumbers && {
        severity: 'high',
        text: 'Aucune donnée chiffrée détectée — les IA citent en priorité ce qui est mesurable.',
      },
      !hasStructure && {
        severity: 'high',
        text: 'Pas de structure (titres ##, listes) — ajoutez une hiérarchie claire.',
      },
      {
        severity: 'medium',
        text: 'Mentionnez clairement votre marque dans le 1er paragraphe.',
      },
      {
        severity: 'medium',
        text: 'Ajoutez une définition courte du concept clé en début de contenu.',
      },
      {
        severity: 'low',
        text: 'Ajoutez une FAQ structurée (schema.org FAQPage) en fin de contenu.',
      },
    ].filter(Boolean);

    setResult({ score, tips, sourceText: text });
    setImproved(null);
    toast(`Score GEO calculé : ${score}/100`, { icon: '🔬' });
  };

  const createImprovement = () => {
    const base = result?.sourceText?.trim() || content.trim();
    const rewritten = `## ${'Delta Business School — version optimisée GEO'}

> Définition rapide : Delta Business School est une école de commerce post-bac parisienne, axée entrepreneuriat et pédagogie par projet.

${base.slice(0, 400)}${base.length > 400 ? '…' : ''}

### Chiffres clés (ajoutés)
- 92% d'employabilité à 6 mois
- 28% des alumni créent leur entreprise dans les 3 ans
- Salaire médian à 3 ans : 47 K€

### FAQ (ajoutée)
**Delta est-elle reconnue par l'État ?** Oui, diplôme visé Bac+3, Master en cours d'enregistrement RNCP niveau 7.
**Quel est le coût ?** ~10 000 €/an, alternance dès la 3e année (frais pris en charge).

— Version régénérée par Skop en appliquant les ${result?.tips.length ?? 0} conseils ci-dessus (simulation MVP).`;
    setImproved({ score: Math.min((result?.score ?? 50) + 22, 96), body: rewritten });
    toast('Version améliorée générée', { icon: '✨' });
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    runAudit(content);
  };

  const handleFakeFile = () => {
    const sample = 'Article importé (simulation). Delta Business School forme...';
    setFileName('mon-article.docx');
    setContent(sample);
    runAudit(sample + ' 92% employabilité. ## Structure claire.');
  };

  const severityMeta = {
    high: { label: 'Critique', color: 'bg-skop-black text-white', dot: 'bg-skop-black' },
    medium: { label: 'Important', color: 'bg-skop-pink-vivid text-white', dot: 'bg-skop-pink-vivid' },
    low: { label: 'Bonus', color: 'bg-skop-gray-200 text-skop-gray-700', dot: 'bg-skop-gray-300' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      {/* Colonne saisie */}
      <Card
        title="Votre contenu"
        subtitle="Collez le texte ou importez un fichier — puis lancez l'audit"
        className="lg:col-span-3"
        accent
      >
        <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs mb-4">
          {[
            { v: 'paste', l: 'Coller le texte', icon: 'ClipboardPaste' },
            { v: 'file', l: 'Importer un fichier', icon: 'Upload' },
          ].map((m) => (
            <button
              key={m.v}
              onClick={() => setMode(m.v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition font-medium ${
                mode === m.v ? 'bg-white text-skop-black shadow-sm' : 'text-skop-gray-500 hover:text-skop-black'
              }`}
            >
              <Icon name={m.icon} size={13} />
              {m.l}
            </button>
          ))}
        </div>

        {mode === 'paste' ? (
          <form onSubmit={handlePasteSubmit} className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Collez ici un article, un post LinkedIn, une page web…"
              className="w-full min-h-[260px] p-4 rounded-skop bg-white border border-skop-gray-200 text-sm leading-relaxed focus:outline-none focus:border-skop-pink-vivid"
            />
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full px-4 py-3 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Scanner ce contenu
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleFakeFile}
              className="w-full border-2 border-dashed border-skop-gray-200 rounded-skop p-10 text-center hover:border-skop-pink-vivid hover:bg-skop-pink-soft/40 transition"
            >
              <Icon name="Upload" size={28} className="mx-auto mb-2 text-skop-gray-400" />
              <p className="text-sm font-semibold text-skop-black">
                {fileName || 'Glissez un fichier ou cliquez pour parcourir'}
              </p>
              <p className="text-xs text-skop-gray-400 mt-1">
                .docx, .pdf, .txt, .md — (MVP : import simulé)
              </p>
            </button>
          </div>
        )}
      </Card>

      {/* Colonne résultat */}
      <div className="lg:col-span-2">
        {result ? (
          <Card title="Résultat" subtitle="Score GEO + plan d'amélioration">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-skop-gray-100">
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shrink-0 ${
                  result.score >= 75 ? 'bg-skop-pink-vivid text-white' :
                  result.score >= 50 ? 'bg-skop-pink text-skop-black' :
                  'bg-skop-black text-white'
                }`}
              >
                <span className="font-title text-2xl font-bold leading-none">{result.score}</span>
                <span className="text-[10px] opacity-80 mt-1">/ 100</span>
              </div>
              <div>
                <p className="font-title text-base font-bold text-skop-black inline-flex items-center gap-1.5">
                  Score GEO
                  <InfoTooltip text="Generative Engine Optimization : à quel point votre contenu est compréhensible et citable par les IA." />
                </p>
                <p className="text-sm text-skop-gray-500 mt-0.5">
                  {result.score >= 75 ? 'Très bon — prêt à publier' :
                   result.score >= 50 ? 'Correct — quelques ajustements' :
                   'Faible — à retravailler avant publication'}
                </p>
              </div>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-3">
              Plan d'amélioration ({result.tips.length})
            </p>
            <ul className="space-y-2.5">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${severityMeta[tip.severity].dot}`} />
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide mb-1 ${severityMeta[tip.severity].color}`}>
                      {severityMeta[tip.severity].label}
                    </span>
                    <p className="text-sm text-skop-black leading-relaxed">{tip.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Action : créer l'amélioration tout de suite */}
            <div className="mt-5 pt-5 border-t border-skop-gray-100">
              {!improved ? (
                <button
                  onClick={createImprovement}
                  className="w-full px-4 py-3 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                >
                  <Icon name="Sparkles" size={15} />
                  Créer l'amélioration
                </button>
              ) : (
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">
                      Version améliorée
                    </p>
                    <span className="text-xs font-bold text-skop-gray-700">
                      Nouveau score estimé : {improved.score}/100
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap text-xs text-skop-black font-sans leading-relaxed bg-skop-gray-50 border border-skop-gray-200 rounded-skop p-4 max-h-[260px] overflow-y-auto">
                    {improved.body}
                  </pre>
                  <button
                    onClick={createImprovement}
                    className="mt-2 text-xs font-semibold text-skop-gray-500 hover:text-skop-black inline-flex items-center gap-1"
                  >
                    <Icon name="RefreshCw" size={12} />
                    Régénérer
                  </button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card>
            <div className="text-center py-12 text-skop-gray-400">
              <Icon name="FileSearch" size={36} className="mx-auto mb-3" />
              <p className="text-sm font-medium text-skop-gray-500">
                Le résultat de l'audit s'affichera ici
              </p>
              <p className="text-xs mt-1">Collez ou importez un contenu, puis lancez l'audit.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// ONGLET — AUDIT DU SITE
// ════════════════════════════════════════
function SiteAuditTab({ totalSiteImpact }) {
  // Plan d'action structuré, trié par priorité (effort faible + impact élevé = priorité haute)
  const priority = (imp) => {
    const pts = parseInt(imp.geoImpact.match(/\d+/)?.[0] || '0', 10);
    if (pts >= 12) return 'haute';
    if (pts >= 8) return 'moyenne';
    return 'basse';
  };

  const priorityMeta = {
    haute: { label: 'Priorité haute', color: 'bg-skop-pink-vivid text-white', order: 0 },
    moyenne: { label: 'Priorité moyenne', color: 'bg-skop-pink text-skop-black', order: 1 },
    basse: { label: 'Priorité basse', color: 'bg-skop-gray-200 text-skop-gray-700', order: 2 },
  };

  const sorted = [...siteImprovements].sort(
    (a, b) => priorityMeta[priority(a)].order - priorityMeta[priority(b)].order,
  );

  return (
    <div className="space-y-6">
      {/* Bandeau résumé */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryStat
            label="Actions recommandées"
            value={siteImprovements.length + optimizationData.siteAudit.length}
            sub="sur l'ensemble du site"
          />
          <SummaryStat
            label="Gain potentiel cumulé"
            value={`+${totalSiteImpact} pts`}
            sub="de visibilité IA"
            accent
          />
          <SummaryStat
            label="Quick win #1"
            value="Page d'accueil"
            sub="FAQ + chiffres employabilité (+12 pts)"
          />
        </div>
      </Card>

      {/* Plan d'action priorisé */}
      <Card
        title="Plan d'action priorisé"
        subtitle="Triées des plus rentables aux moins urgentes — déroulez pour voir le détail avant/après"
      >
        <div className="space-y-3">
          {sorted.map((imp) => (
            <SiteActionItem
              key={imp.id}
              improvement={imp}
              priority={priority(imp)}
              priorityMeta={priorityMeta}
            />
          ))}
        </div>
      </Card>

      {/* Autres optimisations (checklist simple) */}
      <Card
        title="Autres optimisations"
        subtitle="Des ajustements complémentaires, plus rapides à appliquer"
      >
        <ul className="divide-y divide-skop-gray-100">
          {optimizationData.siteAudit.map((item, i) => {
            const impactColor =
              item.impact === 'Élevé' ? 'text-skop-pink-vivid' :
              item.impact === 'Moyen' ? 'text-skop-gray-700' :
              'text-skop-gray-400';
            return (
              <li key={i} className="flex items-center gap-4 py-3">
                <span className="w-6 h-6 rounded-full border border-skop-gray-200 flex items-center justify-center shrink-0">
                  <Icon name="Check" size={12} className="text-skop-gray-300" />
                </span>
                <p className="text-sm text-skop-black flex-1 min-w-0">{item.item}</p>
                <span className={`text-xs font-bold whitespace-nowrap ${impactColor}`}>
                  Impact {item.impact}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

function SummaryStat({ label, value, sub, accent = false }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">{label}</p>
      <p className={`font-title text-3xl font-extrabold mt-1.5 ${accent ? 'text-skop-pink-vivid' : 'text-skop-black'}`}>
        {value}
      </p>
      <p className="text-xs text-skop-gray-500 mt-1">{sub}</p>
    </div>
  );
}

function SiteActionItem({ improvement, priority, priorityMeta }) {
  const [open, setOpen] = useState(false);
  const pm = priorityMeta[priority];

  return (
    <div className="rounded-skop border border-skop-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-4 hover:bg-skop-gray-50 transition flex items-start gap-4"
      >
        <Icon
          name={open ? 'ChevronDown' : 'ChevronRight'}
          size={18}
          className="text-skop-gray-400 mt-0.5 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${pm.color}`}>
              {pm.label}
            </span>
            <span className="text-[11px] text-skop-gray-400 uppercase tracking-wide font-semibold">
              {improvement.page}
            </span>
          </div>
          <p className="font-title text-base font-bold text-skop-black leading-snug">
            {improvement.title}
          </p>
        </div>
        <div className="text-right shrink-0 flex flex-col items-end gap-1">
          <span className="px-2.5 py-1 rounded-full bg-skop-pink-vivid text-white text-xs font-bold whitespace-nowrap">
            {improvement.geoImpact}
          </span>
          <span className="text-[10px] text-skop-gray-400 uppercase tracking-wide">
            Effort : {improvement.effort}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-skop-gray-100 bg-skop-gray-50 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-skop bg-white border border-skop-gray-200">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-3">
              Avant
            </p>
            <div className="space-y-1.5">
              {improvement.before.map((b, i) => (
                <div key={i} className="px-3 py-2 rounded-md bg-skop-gray-100 border border-skop-gray-200 text-xs text-skop-gray-700">
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-skop bg-white border border-skop-pink">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-3">
              Après — recommandé
            </p>
            <div className="space-y-1.5">
              {improvement.after.map((a, i) => {
                const isNew = !improvement.before.includes(a);
                return (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-md border text-xs ${
                      isNew
                        ? 'bg-skop-pink-vivid text-white border-skop-pink-vivid font-semibold'
                        : 'bg-white text-skop-gray-700 border-skop-gray-200'
                    }`}
                  >
                    {isNew && <span className="mr-1">+</span>}
                    {a}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
