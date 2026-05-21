import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import Card from '../components/Card.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import PeriodFilter from '../components/PeriodFilter.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Modal from '../components/Modal.jsx';
import TableOfContents from '../components/TableOfContents.jsx';
import Icon from '../components/Icon.jsx';
import WeeklyReportModal from '../components/WeeklyReportModal.jsx';
import {
  sentimentData,
  apparitionData,
  competitionData,
  distributionData,
} from '../data/mockData.js';

export default function Vision() {
  // ───── Filtres période
  const [sentimentPeriod, setSentimentPeriod] = useState('week');
  const [apparitionPeriod, setApparitionPeriod] = useState('week');

  // ───── Modales
  const [showReport, setShowReport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [competitorSummary, setCompetitorSummary] = useState(null); // competitor object or null
  const [compareTarget, setCompareTarget] = useState(null);          // competitor object for "positionnement poussé"

  // ───── Tableau concurrentiel
  const [newCompName, setNewCompName] = useState('');
  const [newCompUrl, setNewCompUrl] = useState('');
  const [competitorsList, setCompetitorsList] = useState(competitionData.competitors);

  // ───── Données dérivées
  const sentiment = sentimentData.byPeriod[sentimentPeriod];
  const apparition = apparitionData.byPeriod[apparitionPeriod];

  const handleAddCompetitor = (e) => {
    e.preventDefault();
    if (!newCompName.trim()) return;
    const newComp = {
      name: newCompName.trim(),
      url: newCompUrl.trim() || null,
      isMe: false,
      score: Math.floor(40 + Math.random() * 50),
      visibility: Math.floor(500 + Math.random() * 1200),
      sentiment: Math.floor(50 + Math.random() * 40),
      topLLM: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'][Math.floor(Math.random() * 4)],
      aiSummary: `Concurrent ajouté manuellement. (MVP — résumé IA simulé pour ${newCompName.trim()}.)`,
    };
    setCompetitorsList([...competitorsList, newComp]);
    setNewCompName('');
    setNewCompUrl('');
  };

  const me = competitorsList.find((c) => c.isMe);

  return (
    <div className="space-y-12 xl:pr-64">
      <div className="space-y-12">
      {/* ─── Barre d'action Dashboard ─── */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowReport(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
        >
          <Icon name="FileBarChart" size={16} />
          Créer un rapport d'analyse
        </button>
      </div>

      {/* ════════════ 1. SENTIMENT ════════════ */}
      <section id="sentiment" className="scroll-mt-24">
        <SectionTitle
          title="Sentiment"
          subtitle="Ce que les IA pensent de votre marque"
          info="Le sentiment mesure le ton général des réponses IA qui parlent de votre marque : positif, neutre ou négatif. Il est calculé à partir d'une analyse automatique de toutes les phrases qui mentionnent votre marque."
        />

        {/* Perception IA en 1-2 phrases + 3 mots-clés */}
        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Lightbulb" size={18} className="text-skop-pink-vivid" />
              Perception de l'IA pour votre marque
              <InfoTooltip text={sentimentData.aiPerception.detail} />
            </span>
          }
          subtitle="Le résumé en 1-2 phrases de ce que pensent les IA"
          accent
          className="mb-6"
        >
          <p className="text-sm text-skop-black leading-relaxed">
            {sentimentData.aiPerception.oneLiner}
          </p>
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-2 inline-flex items-center gap-1.5">
              Les 3 mots qui définissent votre marque
              <InfoTooltip text="Les 3 termes qui ressortent le plus souvent dans les réponses IA sur votre marque. Ce sont vos « associations dominantes »." />
            </p>
            <div className="flex flex-wrap gap-2">
              {sentimentData.aiPerception.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-full bg-white border border-skop-pink-vivid text-sm font-semibold text-skop-black"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Score de sentiment
                <InfoTooltip text="Score sur 100 calculé à partir du ton (positif / neutre / négatif) des phrases mentionnant votre marque. > 70 = très positif." />
              </span>
            }
            action={<PeriodFilter value={sentimentPeriod} onChange={setSentimentPeriod} />}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <ScoreBadge score={sentiment.score} size="lg" />
              <div>
                <p className="text-sm text-skop-gray-700 font-medium">{sentiment.label}</p>
                <p className="text-xs text-skop-pink-vivid font-semibold mt-1">
                  {sentiment.delta} pts {sentiment.deltaLabel}
                </p>
              </div>
            </div>
            <p className="text-sm text-skop-gray-700">{sentiment.explanation}</p>
          </Card>

          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Évolution du sentiment
                <InfoTooltip text="Évolution du score de sentiment sur la période sélectionnée. Une courbe qui monte = les IA parlent de mieux en mieux de vous." />
              </span>
            }
            subtitle={
              sentimentPeriod === 'day' ? 'Dernières 24h' :
              sentimentPeriod === 'week' ? '7 derniers jours' :
              '7 dernières semaines'
            }
            className="lg:col-span-2"
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentiment.timeline} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="sentimentArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FE277E" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#FE277E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} domain={[40, 100]} />
                  <Tooltip cursor={{ stroke: '#FFCBE0' }} contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="score" stroke="#FE277E" strokeWidth={2.5} fill="url(#sentimentArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Sparkles" size={16} className="text-skop-pink-vivid" />
                Réponse la plus positive
                <InfoTooltip text="Phrase la mieux notée parmi toutes les réponses IA qui parlent de votre marque sur la période sélectionnée." />
              </span>
            }
            subtitle={`${sentiment.bestResponse.llm} · ${sentiment.bestResponse.date}`}
            accent
          >
            <blockquote className="text-sm text-skop-black italic">« {sentiment.bestResponse.text} »</blockquote>
          </Card>
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                <Icon name="TriangleAlert" size={16} className="text-skop-black" />
                Réponse la plus négative
                <InfoTooltip text="Phrase la moins bien notée. À surveiller : c'est ce qui tire votre sentiment vers le bas." />
              </span>
            }
            subtitle={`${sentiment.worstResponse.llm} · ${sentiment.worstResponse.date}`}
          >
            <blockquote className="text-sm text-skop-black italic">« {sentiment.worstResponse.text} »</blockquote>
          </Card>
        </div>

        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Search" size={16} className="text-skop-pink-vivid" />
              Pourquoi ce score ?
              <InfoTooltip text="Échantillon de réponses IA qui ont contribué au calcul de votre score actuel. Chaque réponse a une « contribution » positive ou négative." />
            </span>
          }
          subtitle="Échantillon de réponses des IA qui expliquent votre score actuel"
          className="mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sentimentData.sampleResponses.map((r, i) => (
              <SampleResponseCard key={i} response={r} />
            ))}
          </div>
        </Card>
      </section>

      {/* ════════════ 2. APPARITION ════════════ */}
      <section id="apparition" className="scroll-mt-24">
        <SectionTitle
          title="Apparition"
          subtitle="Où, quand et combien votre marque apparaît"
          info="Une « apparition » = une fois où une IA mentionne votre marque dans sa réponse à un utilisateur. C'est l'équivalent IA du « volume de recherche » SEO."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Volume d'apparition
                <InfoTooltip text="Nombre total de fois où votre marque a été citée par une IA sur la période sélectionnée." />
              </span>
            }
            action={<PeriodFilter value={apparitionPeriod} onChange={setApparitionPeriod} />}
          >
            <p className="font-title text-5xl font-bold text-skop-black">
              {apparition.total.toLocaleString('fr-FR')}
            </p>
            <p className="text-sm text-skop-pink-vivid font-semibold mt-2">
              {apparition.delta} {apparition.deltaLabel}
            </p>
            <p className="text-xs text-skop-gray-500 mt-3">
              {apparitionPeriod === 'day' && "Sur les dernières 24h."}
              {apparitionPeriod === 'week' && "Sur les 7 derniers jours."}
              {apparitionPeriod === 'month' && "Sur les 4 dernières semaines."}
            </p>
          </Card>

          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Évolution des apparitions
                <InfoTooltip text="Visualisation du volume d'apparitions dans le temps. Permet d'identifier les pics et les creux." />
              </span>
            }
            className="lg:col-span-2"
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apparition.timeline} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#FFE5EF' }} contentStyle={tooltipStyle} />
                  <Bar dataKey="volume" fill="#FFCBE0" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* MENTIONS vs RECOMMANDATIONS */}
        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="MessageCircle" size={16} className="text-skop-pink-vivid" />
              Mentions vs Recommandations
              <InfoTooltip text="L'IA peut parler de votre marque sans la recommander activement. Cette distinction est cruciale : être mentionné ne suffit pas, il faut être RECOMMANDÉ." />
            </span>
          }
          subtitle="Quand l'IA parle de vous vs quand elle vous recommande"
          className="mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualisation */}
            <div className="space-y-4">
              <div className="p-4 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-xs font-medium text-skop-gray-500 uppercase">Mentions totales</p>
                <p className="font-title text-3xl font-bold text-skop-black mt-1">
                  {apparitionData.mentionsVsRecommendations.mentions}
                </p>
                <p className="text-xs text-skop-gray-500">l'IA parle de vous</p>
              </div>
              <div className="p-4 rounded-skop bg-skop-pink border border-skop-pink-vivid">
                <p className="text-xs font-bold text-skop-pink-vivid uppercase">Recommandations</p>
                <p className="font-title text-3xl font-bold text-skop-black mt-1">
                  {apparitionData.mentionsVsRecommendations.recommendations}
                </p>
                <p className="text-xs text-skop-black/70">l'IA vous RECOMMANDE</p>
              </div>
              <div className="p-3 rounded-skop bg-white border border-skop-gray-200 text-center">
                <p className="font-title text-2xl font-bold text-skop-pink-vivid">
                  {apparitionData.mentionsVsRecommendations.recommendationRate}%
                </p>
                <p className="text-xs text-skop-gray-500 mt-0.5">Taux de recommandation</p>
              </div>
            </div>

            {/* Exemples */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-skop-gray-200 text-skop-gray-700">
                    {apparitionData.mentionsVsRecommendations.mentionExample.type}
                  </span>
                  <span className="text-xs text-skop-gray-500">{apparitionData.mentionsVsRecommendations.mentionExample.llm}</span>
                </div>
                <blockquote className="text-sm text-skop-black italic">
                  « {apparitionData.mentionsVsRecommendations.mentionExample.text} »
                </blockquote>
              </div>
              <div className="p-4 rounded-skop bg-skop-pink-soft border border-skop-pink">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-skop-pink-vivid text-white">
                    {apparitionData.mentionsVsRecommendations.recommendationExample.type}
                  </span>
                  <span className="text-xs text-skop-gray-700">{apparitionData.mentionsVsRecommendations.recommendationExample.llm}</span>
                </div>
                <blockquote className="text-sm text-skop-black italic">
                  « {apparitionData.mentionsVsRecommendations.recommendationExample.text} »
                </blockquote>
              </div>
            </div>
          </div>
        </Card>

        {/* INTENTION DE PROMPT */}
        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Target" size={16} className="text-skop-pink-vivid" />
              Analyse d'intention des prompts
              <InfoTooltip text="Tous les prompts ne se valent pas. Skop les segmente par intention utilisateur (recherche d'info, comparaison, avis, décision) pour savoir dans quel contexte décisionnel votre marque apparaît." />
            </span>
          }
          subtitle="Dans quel contexte les utilisateurs interrogent les IA"
          className="mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {apparitionData.intentBreakdown.map((it) => {
                const visibility = Math.round((it.appears / it.count) * 100);
                return (
                  <div key={it.intent} className="p-3 rounded-skop bg-white border border-skop-gray-200">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-skop-black">
                        <span>{it.icon}</span> {it.intent}
                      </span>
                      <span className="text-xs text-skop-gray-500">
                        {it.count} prompts · <span className="font-bold text-skop-pink-vivid">{visibility}%</span> de présence
                      </span>
                    </div>
                    <div className="relative h-2 bg-skop-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${visibility}%`, backgroundColor: it.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-center p-5 rounded-skop bg-skop-pink-soft border border-skop-pink">
              <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">
                Lecture stratégique
              </p>
              <p className="text-sm text-skop-black mt-2 leading-relaxed">
                {apparitionData.intentInsight}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex w-2 h-2 rounded-full bg-skop-pink-vivid animate-pulse" />
                Prompts en direct
                <InfoTooltip text="Aperçu temps réel des questions que les utilisateurs posent aux IA en lien avec votre secteur. Cliquez sur « Voir l'historique » pour tout consulter." />
              </span>
            }
            subtitle="Ce que les utilisateurs demandent aux IA en ce moment"
            action={
              <button
                onClick={() => setShowHistory(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-black text-white hover:bg-skop-gray-700 transition whitespace-nowrap"
              >
                <Icon name="History" size={14} />
                Voir l'historique
              </button>
            }
          >
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {apparitionData.livePrompts.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                  <div className="w-2 h-2 rounded-full bg-skop-pink-vivid mt-1.5 shrink-0 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-skop-black">« {p.user} »</p>
                    <p className="text-xs text-skop-gray-500 mt-1">{p.when} · {p.llm}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card
              title={
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="Trophy" size={16} className="text-skop-pink-vivid" />
                  Requête la plus fréquente
                  <InfoTooltip text="Question utilisateur qui déclenche le plus souvent la mention de votre marque par les IA. À choyer : c'est votre « mot-clé phare » du référencement IA." />
                </span>
              }
              subtitle="Celle qui fait LE PLUS apparaître votre marque"
              accent
            >
              <p className="font-title text-base font-semibold text-skop-black leading-snug">
                « {apparitionData.topQuery.text} »
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-skop-pink">
                <span className="text-2xl font-bold text-skop-pink-vivid">{apparitionData.topQuery.count}</span>
                <span className="text-xs text-skop-gray-700">apparitions {apparitionData.topQuery.deltaLabel}</span>
              </div>
            </Card>

            <Card
              title={
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="TrendingDown" size={16} className="text-skop-black" />
                  Requête la plus rare
                  <InfoTooltip text="À l'inverse, la requête où votre marque devrait apparaître mais n'apparaît presque jamais. C'est une opportunité ratée à reconquérir." />
                </span>
              }
              subtitle="Celle où vous devriez apparaître mais n'apparaissez quasi pas"
            >
              <p className="font-title text-base font-semibold text-skop-black leading-snug">
                « {apparitionData.rareQuery.text} »
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-skop-gray-100 border border-skop-gray-200">
                  <span className="text-2xl font-bold text-skop-gray-700">{apparitionData.rareQuery.count}</span>
                  <span className="text-xs text-skop-gray-500">apparitions {apparitionData.rareQuery.deltaLabel}</span>
                </div>
              </div>
              <p className="text-xs text-skop-gray-500 mt-3 inline-flex items-start gap-1.5"><Icon name="Lightbulb" size={12} className="mt-0.5 shrink-0" /> {apparitionData.rareQuery.reason}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════ 3. CONCURRENCE ════════════ */}
      <section id="concurrence" className="scroll-mt-24">
        <SectionTitle
          title="Concurrence"
          subtitle="Votre placement face aux autres"
          info="Comparaison de votre score global avec celui de vos concurrents. Le classement est calculé sur la base du score (sentiment + apparitions + qualité des sources)."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Votre placement
                <InfoTooltip text="Votre rang dans le secteur, calculé sur le score global IA (sentiment × volume × qualité sources)." />
              </span>
            }
            action={
              <button
                onClick={() => setShowMarket(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-black text-white hover:bg-skop-gray-700 transition whitespace-nowrap"
              >
                <Icon name="Map" size={14} />
                Marché
              </button>
            }
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-skop-pink flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-skop-black leading-none">#{competitionData.myRank}</span>
                <span className="text-[10px] text-skop-gray-700 mt-1">sur {competitionData.totalPlayers}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-skop-black">
                  Vous êtes {competitionData.myRank === 1 ? '1er' : `${competitionData.myRank}e`} du marché
                </p>
                <p className="text-xs text-skop-gray-500 mt-1">Score global : {competitionData.myScore}/100</p>
              </div>
            </div>
            <p className="text-sm text-skop-gray-700 mt-4">{competitionData.explanation}</p>
            <p className="text-xs text-skop-pink-vivid font-semibold mt-3">
              <Icon name="Lightbulb" size={12} className="inline -mt-0.5 mr-1" /> Cliquez sur « Marché » pour voir comment l'IA structure votre secteur
            </p>
          </Card>

          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Ajouter un concurrent
                <InfoTooltip text="Ajoutez n'importe quelle marque + son URL pour la suivre. Une fois ajoutée, cliquez sur « Comparer » dans le tableau pour un face-à-face détaillé." />
              </span>
            }
            subtitle="Suivez et comparez n'importe quelle marque"
            className="lg:col-span-2"
            accent
          >
            <form onSubmit={handleAddCompetitor} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Nom (ex: ICN Business School)"
                value={newCompName}
                onChange={(e) => setNewCompName(e.target.value)}
                className="px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
              />
              <input
                type="url"
                placeholder="URL du site (https://...)"
                value={newCompUrl}
                onChange={(e) => setNewCompUrl(e.target.value)}
                className="px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-skop bg-skop-black text-white text-sm font-semibold hover:bg-skop-gray-700 transition"
              >
                Ajouter & suivre
              </button>
            </form>
            <p className="text-xs text-skop-gray-500 mt-3">
              <Icon name="Lightbulb" size={12} className="inline -mt-0.5 mr-1" /> Le concurrent ajouté apparaîtra avec des données simulées. (Version MVP)
            </p>
          </Card>
        </div>

        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              Tableau concurrentiel
              <InfoTooltip text="Comparaison côte-à-côte. Cliquez « Résumé » pour lire comment l'IA parle d'un concurrent. Cliquez « Comparer » pour un face-à-face détaillé avec votre marque." />
            </span>
          }
          className="mt-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-skop-gray-500 uppercase tracking-wide border-b border-skop-gray-200">
                  <th className="py-3 pr-4">Concurrent</th>
                  <th className="py-3 pr-4">Score</th>
                  <th className="py-3 pr-4">Visibilité</th>
                  <th className="py-3 pr-4">Sentiment</th>
                  <th className="py-3 pr-4">LLM principal</th>
                  <th className="py-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {competitorsList.map((c) => (
                  <tr key={c.name} className={`border-b border-skop-gray-100 ${c.isMe ? 'bg-skop-pink-soft' : ''}`}>
                    <td className="py-3 pr-4 font-semibold text-skop-black">
                      <div className="flex flex-col">
                        <span>{c.name} {c.isMe && <span className="text-xs text-skop-pink-vivid ml-1">(vous)</span>}</span>
                        {c.url && (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-skop-gray-500 hover:text-skop-pink-vivid font-normal mt-0.5 truncate max-w-[200px]"
                          >
                            {c.url.replace(/^https?:\/\//, '')}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-bold">{c.score}</td>
                    <td className="py-3 pr-4">{c.visibility.toLocaleString('fr-FR')}</td>
                    <td className="py-3 pr-4">{c.sentiment}/100</td>
                    <td className="py-3 pr-4 text-skop-gray-700">{c.topLLM}</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="inline-flex gap-1.5">
                        <button
                          onClick={() => setCompetitorSummary(c)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-skop-gray-200 hover:bg-skop-pink-soft hover:border-skop-pink transition"
                        >
                          <Icon name="FileText" size={12} className="inline -mt-0.5 mr-1" />Résumé
                        </button>
                        {!c.isMe && (
                          <button
                            onClick={() => setCompareTarget(c)}
                            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-skop-black text-white hover:bg-skop-gray-700 transition"
                          >
                            <Icon name="Scale" size={12} className="inline -mt-0.5 mr-1" />Comparer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              Sources des réponses sur les concurrents
              <InfoTooltip text="Les sites web que les IA citent quand elles parlent de vos concurrents. Utile pour savoir où aller chercher de la visibilité." />
            </span>
          }
          subtitle="D'où viennent les infos que les IA utilisent"
          className="mt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {competitionData.sources.map((s) => (
              <div key={s.source} className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-sm font-semibold text-skop-black truncate">{s.source}</p>
                <p className="text-xs text-skop-gray-500 mt-1">{s.mentions} mentions</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ════════════ 4. DISTRIBUTION ════════════ */}
      <section id="distribution" className="scroll-mt-24">
        <SectionTitle
          title="Distribution par LLM"
          subtitle="Qui parle de vous, et avec quelles sources"
          info="Répartition de vos citations entre les différents modèles IA (ChatGPT, Claude, Gemini, etc.). Vous aide à savoir où porter vos efforts."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                LLM qui vous cite le plus
                <InfoTooltip text="L'IA qui mentionne le plus souvent votre marque. C'est sa source principale qu'il faut soigner en priorité." />
              </span>
            }
            accent
          >
            <p className="font-title text-3xl font-bold text-skop-black">{distributionData.topLLM}</p>
            <p className="text-sm text-skop-gray-700 mt-2">
              Source principale : <span className="font-semibold">{distributionData.topLLMSource}</span>
            </p>
            <div className="mt-4 space-y-2">
              {distributionData.byLLM.map((l) => {
                const max = Math.max(...distributionData.byLLM.map((x) => x.citations));
                const width = (l.citations / max) * 100;
                return (
                  <div key={l.llm}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-skop-black">{l.llm}</span>
                      <span className="text-skop-gray-500">{l.citations}</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-skop-pink-vivid/10">
                      <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: l.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title={
              <span className="inline-flex items-center gap-1.5">
                Citations par LLM dans le temps
                <InfoTooltip text="Évolution du nombre de citations pour chaque IA. Permet de repérer quelle IA monte / descend en termes de mentions." />
              </span>
            }
            className="lg:col-span-2"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributionData.timeline} margin={{ top: 10, right: 20, bottom: 0, left: -20 }}>
                  <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  {distributionData.byLLM.map((l) => (
                    <Line key={l.llm} type="monotone" dataKey={l.llm} stroke={l.color} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {distributionData.byLLM.map((l) => (
                <div key={l.llm} className="flex items-center gap-1.5 text-xs">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-skop-gray-700">{l.llm}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              Sources principales par LLM
              <InfoTooltip text="Les 3 sources que chaque IA consulte le plus quand elle parle de votre secteur. Indispensable pour cibler vos publications." />
            </span>
          }
          className="mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {distributionData.sourcesByLLM.map((item) => (
              <div key={item.llm} className="p-4 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-sm font-bold text-skop-black mb-2">{item.llm}</p>
                <ul className="space-y-1">
                  {item.sources.map((src) => (
                    <li key={src} className="text-xs text-skop-gray-700 truncate">• {src}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      </div>
      {/* Sommaire flottant — fixé à droite, visible uniquement en XL */}
      <TableOfContents
        sections={[
          { id: 'sentiment', label: 'Sentiment', iconName: 'MessageCircle' },
          { id: 'apparition', label: 'Apparition', iconName: 'Eye' },
          { id: 'concurrence', label: 'Concurrence', iconName: 'Swords' },
          { id: 'distribution', label: 'Distribution', iconName: 'Globe' },
        ]}
      />

      {/* ════════════ MODALES ════════════ */}

      {/* Rapport d'analyse de la semaine */}
      <WeeklyReportModal open={showReport} onClose={() => setShowReport(false)} />

      {/* Historique des prompts */}
      <Modal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        title="Historique complet des prompts"
        subtitle={`${apparitionData.fullHistory.length} requêtes utilisateurs sur les dernières 48h`}
        maxWidth="max-w-4xl"
      >
        <div className="space-y-2">
          {apparitionData.fullHistory.map((p, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-skop border ${
                p.appeared ? 'bg-skop-pink-soft border-skop-pink' : 'bg-skop-gray-50 border-skop-gray-200'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {p.appeared ? (
                  <span className="inline-flex w-6 h-6 rounded-full bg-skop-pink-vivid text-white text-xs font-bold items-center justify-center">✓</span>
                ) : (
                  <span className="inline-flex w-6 h-6 rounded-full bg-skop-gray-200 text-skop-gray-500 text-xs font-bold items-center justify-center">✗</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-skop-black">« {p.user} »</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-skop-gray-500">
                  <span>{p.when}</span>
                  <span>·</span>
                  <span className="font-medium">{p.llm}</span>
                  <span>·</span>
                  <span className={p.appeared ? 'text-skop-pink-vivid font-semibold' : 'text-skop-gray-500'}>
                    {p.appeared ? 'Marque citée' : 'Marque NON citée'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Marché (vue IA du secteur) */}
      <Modal
        open={showMarket}
        onClose={() => setShowMarket(false)}
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Map" size={18} />
            Comment l'IA structure votre marché
          </span>
        }
        subtitle="La carte mentale des LLM sur votre secteur"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-5">
          <div className="p-4 rounded-skop bg-skop-pink-soft border border-skop-pink">
            <p className="text-xs font-bold uppercase tracking-wide text-skop-pink-vivid mb-2">Résumé</p>
            <p className="text-sm text-skop-black leading-relaxed">{competitionData.marketView.summary}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-skop-gray-500 mb-3">
              Structuration du marché vue par les IA
            </p>
            <div className="space-y-3">
              {competitionData.marketView.structure.map((tier, i) => (
                <div key={i} className="p-4 rounded-skop bg-white border border-skop-gray-200">
                  <p className="font-title text-sm font-bold text-skop-black">{tier.tier}</p>
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {tier.schools.map((s) => (
                      <span
                        key={s}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          s === me?.name
                            ? 'bg-skop-pink-vivid text-white'
                            : 'bg-skop-gray-100 text-skop-gray-700'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-skop-gray-500">{tier.usage}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-skop-gray-500 mb-3">
              Références les plus citées par les IA
            </p>
            <div className="space-y-2">
              {competitionData.marketView.topReferences.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-skop-black">{r.source}</p>
                    <p className="text-xs text-skop-gray-500 mt-0.5">{r.note}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${
                    r.impact === 'Très fort' ? 'bg-skop-pink-vivid text-white' :
                    r.impact === 'Fort' ? 'bg-skop-pink text-skop-black' :
                    'bg-skop-gray-200 text-skop-gray-700'
                  }`}>
                    {r.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-skop-gray-500 mb-3">
              Messages-clés que les IA répètent
            </p>
            <div className="space-y-2">
              {competitionData.marketView.keyMessages.map((m, i) => (
                <blockquote
                  key={i}
                  className="p-3 rounded-skop bg-white border-l-4 border-skop-pink-vivid text-sm text-skop-black italic"
                >
                  {m}
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Résumé d'un concurrent */}
      <Modal
        open={!!competitorSummary}
        onClose={() => setCompetitorSummary(null)}
        title={competitorSummary ? `Comment l'IA parle de ${competitorSummary.name}` : ''}
        subtitle="Résumé généré à partir des réponses IA de la semaine"
        maxWidth="max-w-2xl"
      >
        {competitorSummary && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <KpiSmall label="Score" value={competitorSummary.score} />
              <KpiSmall label="Visibilité" value={competitorSummary.visibility.toLocaleString('fr-FR')} />
              <KpiSmall label="Sentiment" value={`${competitorSummary.sentiment}/100`} />
            </div>
            <div className="p-4 rounded-skop bg-skop-pink-soft border border-skop-pink">
              <p className="text-xs font-bold uppercase tracking-wide text-skop-pink-vivid mb-2">
                Résumé IA
              </p>
              <p className="text-sm text-skop-black leading-relaxed">{competitorSummary.aiSummary}</p>
            </div>
            {competitorSummary.url && (
              <a
                href={competitorSummary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-skop-pink-vivid hover:underline"
              >
                Visiter le site ↗
              </a>
            )}
          </div>
        )}
      </Modal>

      {/* Positionnement poussé — comparaison */}
      <Modal
        open={!!compareTarget}
        onClose={() => setCompareTarget(null)}
        title={compareTarget ? `${me?.name} vs ${compareTarget.name}` : ''}
        subtitle="Comparaison côte-à-côte poussée"
        maxWidth="max-w-4xl"
      >
        {compareTarget && me && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <CompareColumn comp={me} highlight />
              <CompareColumn comp={compareTarget} />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-skop-gray-500">
                Différences clés
              </p>
              {[
                {
                  label: 'Score global',
                  me: me.score,
                  comp: compareTarget.score,
                  unit: '/100',
                },
                {
                  label: 'Apparitions',
                  me: me.visibility,
                  comp: compareTarget.visibility,
                  unit: '',
                },
                {
                  label: 'Sentiment',
                  me: me.sentiment,
                  comp: compareTarget.sentiment,
                  unit: '/100',
                },
              ].map((d) => {
                const delta = d.me - d.comp;
                const meWins = delta > 0;
                const equal = delta === 0;
                return (
                  <div key={d.label} className="grid grid-cols-5 gap-2 items-center p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                    <span className="col-span-1 text-xs font-medium text-skop-gray-700">{d.label}</span>
                    <span className={`col-span-1 text-sm font-bold text-right ${meWins ? 'text-skop-pink-vivid' : 'text-skop-gray-700'}`}>
                      {d.me.toLocaleString('fr-FR')}{d.unit}
                    </span>
                    <span className="col-span-1 text-center text-xs text-skop-gray-400">vs</span>
                    <span className={`col-span-1 text-sm font-bold text-left ${!meWins && !equal ? 'text-skop-pink-vivid' : 'text-skop-gray-700'}`}>
                      {d.comp.toLocaleString('fr-FR')}{d.unit}
                    </span>
                    <span className="col-span-1 text-xs font-semibold text-right">
                      {equal ? '=' : `${delta > 0 ? '+' : ''}${delta.toLocaleString('fr-FR')}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-skop bg-skop-pink-soft border border-skop-pink">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1">Résumé IA — {me.name}</p>
                <p className="text-xs text-skop-black leading-relaxed">{me.aiSummary}</p>
              </div>
              <div className="p-4 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 mb-1">Résumé IA — {compareTarget.name}</p>
                <p className="text-xs text-skop-black leading-relaxed">{compareTarget.aiSummary}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ═══════ Sous-composants utilitaires ═══════

function SectionTitle({ title, subtitle, info }) {
  return (
    <div className="mb-6">
      <h2 className="font-title text-2xl font-extrabold text-skop-black inline-flex items-center gap-2 tracking-tight">
        {title}
        {info && <InfoTooltip text={info} />}
      </h2>
      {subtitle && <p className="text-sm text-skop-gray-400 mt-1 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function SampleResponseCard({ response }) {
  const isPositive = response.sentiment === 'positive';
  const isNegative = response.sentiment === 'negative';

  const tone = isPositive
    ? { bg: 'bg-skop-pink-soft', border: 'border-skop-pink', badge: 'bg-skop-pink-vivid text-white', label: 'Positif' }
    : isNegative
    ? { bg: 'bg-skop-gray-50', border: 'border-skop-gray-300', badge: 'bg-skop-black text-white', label: 'Négatif' }
    : { bg: 'bg-skop-gray-50', border: 'border-skop-gray-200', badge: 'bg-skop-gray-200 text-skop-gray-700', label: 'Neutre' };

  return (
    <div className={`p-4 rounded-skop border ${tone.bg} ${tone.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-skop-black">{response.llm}</span>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${tone.badge}`}>
            {tone.label}
          </span>
          <span className="text-xs font-bold text-skop-pink-vivid">{response.contribution}</span>
        </div>
      </div>
      <blockquote className="text-sm text-skop-black italic leading-relaxed">
        « {response.text} »
      </blockquote>
      <p className="text-xs text-skop-gray-500 mt-2">{response.date}</p>
    </div>
  );
}

function KpiSmall({ label, value }) {
  return (
    <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500">{label}</p>
      <p className="font-title text-xl font-bold text-skop-black mt-1">{value}</p>
    </div>
  );
}

function CompareColumn({ comp, highlight = false }) {
  return (
    <div className={`p-4 rounded-skop border ${highlight ? 'bg-skop-pink-soft border-skop-pink-vivid' : 'bg-skop-gray-50 border-skop-gray-200'}`}>
      <p className="font-title text-base font-bold text-skop-black">
        {comp.name} {highlight && <span className="text-xs text-skop-pink-vivid ml-1">(vous)</span>}
      </p>
      {comp.url && (
        <a
          href={comp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-skop-gray-500 hover:text-skop-pink-vivid block mt-0.5"
        >
          {comp.url.replace(/^https?:\/\//, '')}
        </a>
      )}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div>
          <p className="text-[10px] text-skop-gray-500 uppercase">Score</p>
          <p className="font-bold text-skop-black">{comp.score}</p>
        </div>
        <div>
          <p className="text-[10px] text-skop-gray-500 uppercase">Visib.</p>
          <p className="font-bold text-skop-black">{comp.visibility.toLocaleString('fr-FR')}</p>
        </div>
        <div>
          <p className="text-[10px] text-skop-gray-500 uppercase">Sent.</p>
          <p className="font-bold text-skop-black">{comp.sentiment}</p>
        </div>
      </div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: 'white',
  border: '1px solid #E4E4E7',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)',
};
