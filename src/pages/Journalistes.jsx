import { useState, useMemo } from 'react';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Modal from '../components/Modal.jsx';
import Icon from '../components/Icon.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { journalistsData } from '../data/mockData.js';

// Statuts de relation (CRM léger) — éditables par l'utilisateur
const RELATION_META = {
  'a-contacter': { label: 'À contacter', dot: 'bg-skop-pink-vivid' },
  contacte: { label: 'Contacté', dot: 'bg-skop-gray-400' },
  'en-discussion': { label: 'En discussion', dot: 'bg-skop-gray-400' },
  'article-publie': { label: 'Article publié', dot: 'bg-skop-gray-700' },
  'pas-interesse': { label: 'Pas intéressé', dot: 'bg-skop-gray-300' },
};
const RELATION_ORDER = ['a-contacter', 'contacte', 'en-discussion', 'article-publie', 'pas-interesse'];

// Relation initiale déduite du statut détecté par l'IA
function seedRelation(status) {
  if (status === 'article-published') return 'article-publie';
  if (status === 'pitch-sent') return 'en-discussion';
  if (status === 'mentioned') return 'contacte';
  return 'a-contacter';
}

export default function Journalistes() {
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [pitchTarget, setPitchTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);

  // Base de données CRM (state local de session) : { [id]: { relation, notes } }
  const [crm, setCrm] = useState(() => {
    const init = {};
    journalistsData.journalists.forEach((j) => {
      init[j.id] = { relation: seedRelation(j.status), notes: '' };
    });
    return init;
  });

  const setRelation = (id, relation) => {
    setCrm((c) => ({ ...c, [id]: { ...c[id], relation } }));
    toast(`Relation mise à jour : ${RELATION_META[relation].label}`, { icon: '✓' });
  };
  const setNotes = (id, notes) => {
    setCrm((c) => ({ ...c, [id]: { ...c[id], notes } }));
  };

  const statusMeta = journalistsData.journalistStatusMeta;

  const journalists = useMemo(() => {
    if (filter === 'all') return journalistsData.journalists;
    return journalistsData.journalists.filter((j) => crm[j.id]?.relation === filter);
  }, [filter, crm]);

  // Compteurs par statut de relation pour la barre CRM
  const counts = RELATION_ORDER.reduce((acc, r) => {
    acc[r] = journalistsData.journalists.filter((j) => crm[j.id]?.relation === r).length;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Barre CRM — suivi des relations */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Contact" size={16} className="text-skop-pink-vivid" />
            Suivi des relations presse
            <InfoTooltip text="Votre carnet de bord journalistes : notez où vous en êtes avec chacun (à contacter, contacté, en discussion…) et ajoutez des notes. Cliquez un statut pour filtrer." />
          </span>
        }
        subtitle="Cliquez un statut pour filtrer la liste"
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition ${
              filter === 'all'
                ? 'bg-skop-black text-white border-skop-black'
                : 'bg-white text-skop-gray-700 border-skop-gray-200 hover:bg-skop-gray-50'
            }`}
          >
            Tous
            <span className="px-1.5 py-0.5 rounded-full bg-skop-gray-100 text-skop-gray-700 text-[11px] font-bold">
              {journalistsData.journalists.length}
            </span>
          </button>
          {RELATION_ORDER.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(filter === r ? 'all' : r)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                filter === r
                  ? 'bg-skop-black text-white border-skop-black'
                  : 'bg-white text-skop-gray-700 border-skop-gray-200 hover:bg-skop-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${RELATION_META[r].dot}`} />
              {RELATION_META[r].label}
              <span className="px-1.5 py-0.5 rounded-full bg-skop-gray-100 text-skop-gray-700 text-[11px] font-bold">
                {counts[r]}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Grille de journalistes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {journalists.map((j) => (
          <JournalistCard
            key={j.id}
            journalist={j}
            onPitch={() => setPitchTarget(j)}
            relation={crm[j.id]?.relation}
            onRelationChange={(r) => setRelation(j.id, r)}
            onOpenDetail={() => setDetailTarget(j)}
          />
        ))}
      </div>

      {journalists.length === 0 && (
        <Card>
          <p className="text-sm text-skop-gray-500 text-center py-8">
            Aucun journaliste avec ce statut de relation.
          </p>
        </Card>
      )}

      {/* Pitches envoyés */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Mail" size={16} className="text-skop-pink-vivid" />
            Pitches envoyés
            <InfoTooltip text="Historique des pitches envoyés via Skop, avec leur statut actuel." />
          </span>
        }
        subtitle={`${journalistsData.sentPitches.length} pitches envoyés ces 30 derniers jours`}
      >
        <div className="space-y-2">
          {journalistsData.sentPitches.map((p) => {
            const meta = journalistsData.pitchStatusMeta[p.status];
            return (
              <div
                key={p.id}
                className="flex items-start gap-3 p-3 rounded-skop bg-white border border-skop-gray-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-semibold text-skop-black">{p.subject}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-skop-gray-500">
                    Envoyé à <strong>{p.journalistName}</strong> ({p.outlet}) ·{' '}
                    angle : {p.angle} · {p.sentDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Modale Pitch Generator */}
      <PitchGeneratorModal journalist={pitchTarget} onClose={() => setPitchTarget(null)} />

      <JournalistDetailModal
        journalist={detailTarget}
        statusMeta={statusMeta}
        notes={detailTarget ? crm[detailTarget.id]?.notes ?? '' : ''}
        onNotesChange={(n) => detailTarget && setNotes(detailTarget.id, n)}
        onClose={() => setDetailTarget(null)}
      />
    </div>
  );
}

// ════════════════════════════════════════
// CARD JOURNALISTE — compacte par défaut
// ════════════════════════════════════════
function JournalistCard({
  journalist,
  onPitch,
  relation,
  onRelationChange,
  onOpenDetail,
}) {
  const j = journalist;
  const rm = RELATION_META[relation] ?? RELATION_META['a-contacter'];

  return (
    <div className="rounded-skop bg-white border border-skop-gray-200 shadow-skop-card overflow-hidden flex flex-col">
      <div className="p-5 flex items-start gap-3">
        <span className="w-11 h-11 rounded-full bg-skop-gray-100 text-skop-gray-700 text-sm font-bold flex items-center justify-center shrink-0">
          {j.initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-title text-base font-bold text-skop-black truncate">{j.name}</p>
          <p className="text-xs text-skop-gray-500 truncate">
            {j.outlet} · {j.role}
          </p>
        </div>
        <button
          type="button"
          onClick={onPitch}
          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-pink-vivid text-white hover:opacity-90 transition whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
        >
          <Icon name="Mail" size={12} />
          Pitch
        </button>
      </div>

      <div className="px-5 pb-4 flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${rm.dot}`} />
          <select
            value={relation}
            onChange={(e) => onRelationChange(e.target.value)}
            className="text-xs font-semibold text-skop-black bg-skop-gray-50 border border-skop-gray-200 rounded-full px-3 py-1.5 focus:outline-none focus:border-skop-pink-vivid cursor-pointer"
          >
            {RELATION_ORDER.map((r) => (
              <option key={r} value={r}>
                {RELATION_META[r].label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={onOpenDetail}
          className="text-xs font-semibold text-skop-gray-500 hover:text-skop-black inline-flex items-center gap-1"
        >
          Voir tout
          <Icon name="ArrowUpRight" size={13} />
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// MODALE — Détail journaliste
// ════════════════════════════════════════
function JournalistDetailModal({ journalist, statusMeta, notes, onNotesChange, onClose }) {
  if (!journalist) return null;
  const j = journalist;

  return (
    <Modal
      open={!!journalist}
      onClose={onClose}
      title={j.name}
      subtitle={`${j.outlet} · ${j.role}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusMeta[j.status].color}`}>
            {statusMeta[j.status].label}
          </span>
          <span className="text-[11px] text-skop-gray-400">Statut détecté par l'IA</span>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1">Beat</p>
          <p className="text-sm text-skop-gray-700">{j.beat}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
            <p className="text-[9px] font-bold uppercase tracking-wide text-skop-gray-400">Citations IA</p>
            <p className="font-title text-lg font-bold text-skop-black">{j.aiCitationScore}%</p>
            <p className="text-[10px] text-skop-gray-500">de ses articles repris</p>
          </div>
          <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
            <p className="text-[9px] font-bold uppercase tracking-wide text-skop-gray-400">Citations / mois</p>
            <p className="font-title text-lg font-bold text-skop-black">{j.avgAiCitations}</p>
            <p className="text-[10px] text-skop-gray-500">moyenne des IA</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
            Préférences éditoriales
          </p>
          <ul className="space-y-1">
            {j.editorialPreferences.map((p, i) => (
              <li key={i} className="text-sm text-skop-black flex items-start gap-1.5">
                <span className="text-skop-gray-400">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
            Angles préférés
          </p>
          <div className="flex flex-wrap gap-1.5">
            {j.preferredAngles.map((a) => (
              <span
                key={a.type}
                className="px-2.5 py-0.5 rounded-full bg-skop-gray-100 text-skop-gray-700 text-[11px] font-semibold"
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
            Articles récents
          </p>
          <div className="space-y-1.5">
            {j.recentArticles.map((a, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-md border text-xs ${
                  a.mentionsYou
                    ? 'bg-white border-l-4 border-l-skop-pink-vivid border-skop-gray-200'
                    : 'bg-skop-gray-50 border-skop-gray-200'
                }`}
              >
                <p className="text-skop-black">{a.title}</p>
                <p className="text-[10px] text-skop-gray-500 mt-0.5">
                  {a.date} · {a.aiCitations} citations IA
                  {a.mentionsYou && (
                    <span className="ml-1 text-skop-pink-vivid font-bold">· vous mentionne</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1">
            Pourquoi pitcher
          </p>
          <p className="text-sm text-skop-black">{j.whyPitch}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
            Notes (suivi de la relation)
          </p>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Ex: relancé le 12/05, attend nos chiffres employabilité, dispo après le 20…"
            className="w-full min-h-[80px] p-3 rounded-skop bg-white border border-skop-gray-200 text-sm leading-relaxed focus:outline-none focus:border-skop-pink-vivid"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono pt-2 border-t border-skop-gray-100">
          <a
            href={`mailto:${j.contact}`}
            className="inline-flex items-center gap-1 text-skop-gray-600 hover:text-skop-pink-vivid hover:underline transition"
          >
            <Icon name="Mail" size={12} />
            {j.contact}
          </a>
          <span className="text-skop-gray-300">·</span>
          <a
            href={`https://www.linkedin.com/in/${j.socials.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-skop-gray-600 hover:text-skop-pink-vivid hover:underline transition"
          >
            <Icon name="Linkedin" size={12} />
            {j.socials.linkedin}
            <Icon name="ArrowUpRight" size={11} />
          </a>
        </div>
      </div>
    </Modal>
  );
}

// ════════════════════════════════════════
// MODALE — Générateur de pitch
// ════════════════════════════════════════
function PitchGeneratorModal({ journalist, onClose }) {
  const toast = useToast();
  const [angle, setAngle] = useState(null);
  const [dataPoint, setDataPoint] = useState('92% taux d\'employabilité à 6 mois');
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!journalist) return null;

  const handleGenerate = () => {
    const subject = subjectFor(angle, journalist, dataPoint);
    const body = bodyFor(angle, journalist, dataPoint);
    setGenerated({ subject, body });
    toast(`Pitch généré pour ${journalist.name}`, { icon: '✨' });
  };

  const handleCopy = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(`Sujet : ${generated.subject}\n\n${generated.body}`);
    setCopied(true);
    toast('Pitch copié dans le presse-papier', { icon: '📋' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    toast(`Pitch envoyé à ${journalist.name} (simulation)`, { icon: '✉️' });
    handleClose();
  };

  const handleClose = () => {
    setAngle(null);
    setDataPoint("92% taux d'employabilité à 6 mois");
    setGenerated(null);
    setCopied(false);
    onClose();
  };

  return (
    <Modal
      open={!!journalist}
      onClose={handleClose}
      title={`Pitch — ${journalist.name}`}
      subtitle={`${journalist.outlet} · ${journalist.role}`}
      maxWidth="max-w-3xl"
    >
      {!generated ? (
        <div className="space-y-5">
          <div className="p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1">
              <Icon name="Lightbulb" size={11} className="inline -mt-0.5 mr-1" /> Pourquoi pitcher cette journaliste
            </p>
            <p className="text-sm text-skop-black">{journalist.whyPitch}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-2">
              1. Choisis l'angle (basé sur ses préférences)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {journalist.preferredAngles.map((a) => (
                <button
                  key={a.type}
                  type="button"
                  onClick={() => setAngle(a.type)}
                  className={`p-3 rounded-skop border text-left text-sm font-semibold transition ${
                    angle === a.type
                      ? 'bg-skop-pink-vivid text-white border-skop-pink-vivid'
                      : 'bg-white text-skop-gray-700 border-skop-gray-200 hover:bg-skop-gray-50'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-2">
              2. Donnée chiffrée à mettre en avant
            </p>
            <input
              type="text"
              value={dataPoint}
              onChange={(e) => setDataPoint(e.target.value)}
              placeholder="Ex: 92% d'employabilité à 6 mois"
              className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
            />
            <p className="text-[11px] text-skop-gray-500 mt-1.5">
              <Icon name="Lightbulb" size={11} className="inline -mt-0.5 mr-1" /> Plus c'est concret et chiffré, plus le pitch est efficace.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-skop-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700"
            >
              Annuler
            </button>
            <button
              type="button"
              disabled={!angle || !dataPoint.trim()}
              onClick={handleGenerate}
              className="px-5 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="Sparkles" size={14} className="inline -mt-0.5 mr-1.5" />Générer le pitch
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-skop bg-white border border-skop-gray-200">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 mb-1.5">
              Sujet du mail
            </p>
            <p className="text-sm font-semibold text-skop-black mb-4">{generated.subject}</p>

            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 mb-1.5">
              Corps du mail
            </p>
            <pre className="whitespace-pre-wrap text-sm text-skop-black font-sans leading-relaxed bg-skop-gray-50 p-3 rounded-md border border-skop-gray-200">
              {generated.body}
            </pre>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setGenerated(null)}
              className="px-5 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700"
            >
              ↻ Recommencer
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-skop bg-skop-black text-white text-sm font-semibold hover:bg-skop-gray-700 transition"
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name={copied ? 'Check' : 'Copy'} size={12} />
                {copied ? 'Copié' : 'Copier'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="px-5 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
            >
              <Icon name="Send" size={14} className="inline -mt-0.5 mr-1.5" />Envoyer
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ────────────────────────────────────────
// Génération du pitch (simulation)
// ────────────────────────────────────────
function subjectFor(angle, j, dataPoint) {
  const map = {
    data: `[Donnée exclusive] ${dataPoint} — Delta Business School`,
    testimony: `[Témoignage alumni] 3 entrepreneurs Delta qui ont levé > 1M€ en 2026`,
    trend: `[Tendance 2026] Pourquoi les bacheliers fuient la prépa pour les écoles post-bac`,
    exclusive: `[Annonce exclusive] Delta lance un nouveau parcours Tech & Product`,
    comparison: `[Comparatif chiffré] Prépa vs école post-bac : ${dataPoint}`,
    expert: `[Tribune / avis d'expert] Le directeur de Delta sur l'avenir des écoles post-bac`,
    partnership: `[Partenariat école-entreprise] Delta x Doctolib & BlaBlaCar — chiffres alternance 2026`,
  };
  return map[angle] || `[Pitch] Delta Business School pour ${j.outlet}`;
}

function bodyFor(angle, j, dataPoint) {
  const recentArticle = j.recentArticles[0];
  const greeting = `Bonjour ${j.name.split(' ')[0]},\n\n`;
  const opener = `J'ai lu votre récent article « ${recentArticle.title} » (${recentArticle.date}) — l'angle m'a beaucoup intéressé(e).\n\n`;

  const angleBody = {
    data: `Je vous écris parce que nous venons de finaliser une étude exclusive : ${dataPoint}.\n\nQuelques chiffres clés que vous pourriez exploiter :\n→ ${dataPoint}\n→ 28% des alumni Delta créent leur entreprise dans les 3 ans après le diplôme\n→ Salaire médian à 3 ans : 47 K€ brut/an\n→ 90% des étudiants en 4e/5e année sont en alternance\n\nJe peux vous envoyer le rapport complet (12 pages) ou organiser un entretien avec notre directeur des études.\n`,
    testimony: `Je voulais vous proposer trois portraits d'alumni Delta qui correspondent à votre angle « entrepreneuriat étudiant » :\n\n→ Léa M. (promo 2024) — Lumen Health (FemTech) — 1,8M€ levés\n→ Karim B. (promo 2023) — Tract.ai (logistique IA) — 3,2M€ levés\n→ Inès R. (promo 2024) — Plume (édition assistée IA) — 1,1M€ levés\n\nLes trois ont commencé leur projet pendant leur 3e année à Delta. Disponibles pour interview cette semaine.\n`,
    trend: `Le sujet de votre article m'a fait penser qu'il y a une vraie tendance à creuser : ${dataPoint}.\n\nQuelques data points qui pourraient nourrir un papier de fond :\n→ +45% de candidatures en école post-bac vs 2024 chez Delta\n→ -12% en prépa nationalement (source : ${dataPoint})\n→ Témoignages de 3 lycéens en Terminale qui ont fait ce choix\n\nJe peux vous mettre en relation avec eux + le DRH de Doctolib qui recrute majoritairement post-bac désormais.\n`,
    exclusive: `Je voulais vous donner l'information en exclusivité : Delta Business School lance officiellement à la rentrée 2026 un nouveau parcours « Tech & Product » destiné aux étudiants qui veulent allier business et produit numérique.\n\nQuelques chiffres :\n→ ${dataPoint}\n→ 30 places en 1re promotion (rentrée septembre 2026)\n→ Partenariats : Doctolib, BlaBlaCar, Decathlon\n→ Encadrement par 8 intervenants Product Lead en activité\n\nLe directeur est disponible pour une interview en exclu.\n`,
    comparison: `Je pense qu'un comparatif chiffré sur prépa vs école post-bac pourrait intéresser vos lecteurs, surtout en cette période de Parcoursup.\n\nQuelques données concrètes que nous publions ce mois :\n→ ${dataPoint}\n→ Coût total sur 5 ans : prépa publique ~7K€ vs école post-bac ~50K€ (mais 2-3 ans d'alternance qui couvrent une partie)\n→ Insertion 6 mois : 92% chez Delta vs 87% pour le Top 10 PGE\n\nJe peux fournir le tableau complet avec sources, et organiser des interviews croisées (étudiant prépa + étudiant Delta).\n`,
    expert: `Notre directeur, Antoine Delaunay, serait ravi d'écrire une tribune (700-1000 mots) sur l'avenir des écoles post-bac dans un paysage en mutation.\n\nThèses possibles :\n→ Pourquoi le modèle « post-bac + alternance » va devenir dominant d'ici 2030\n→ ${dataPoint}\n→ La fin programmée des classements traditionnels\n\nIl peut livrer la tribune sous 5 jours ouvrés.\n`,
    partnership: `Je voulais vous parler de notre partenariat alternance avec Doctolib, BlaBlaCar et Decathlon — qui correspond exactement à votre beat.\n\nChiffres exclusifs 2026 :\n→ 90% de nos étudiants Master en alternance dans ces 3 entreprises\n→ ${dataPoint}\n→ 78% des alternants Doctolib sont embauchés en CDI à la sortie\n\nLes responsables RH des 3 entreprises sont disponibles pour des interviews.\n`,
  };

  const closing = `\nJe peux vous envoyer plus de matériel (data, photos, contacts) sous 24h si l'angle vous intéresse.\n\nBien à vous,\nAntoine Delaunay\nDirecteur Delta Business School\n📞 06 XX XX XX XX · ✉️ direction@delta-business.school`;

  return greeting + opener + (angleBody[angle] || '') + closing;
}
