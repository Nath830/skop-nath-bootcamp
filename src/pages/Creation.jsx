import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Icon from '../components/Icon.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { studioChannels, studioChannelOrder } from '../data/mockData.js';

/**
 * Page Studio (route /creation) — hub de création multi-canal.
 * 10 canaux : LinkedIn, LinkedIn Page, LinkedIn Commentaires, Reddit,
 * YouTube, FAQ, Code site, Blog externe, Avis, Réponse avis.
 * Chaque contenu peut être marqué « publié » via une case à cocher.
 */
export default function Creation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawChannel = searchParams.get('channel');
  const channelKey = studioChannelOrder.includes(rawChannel) ? rawChannel : 'linkedin';
  const setChannel = (key) => setSearchParams({ channel: key });

  const toast = useToast();
  const channel = studioChannels[channelKey];

  // État local : map { contentId → bool publié }, initialisé depuis le mock.
  const [publishedMap, setPublishedMap] = useState(() => {
    const m = {};
    studioChannelOrder.forEach((k) => {
      (studioChannels[k].contents || []).forEach((c) => {
        m[c.id] = !!c.published;
      });
    });
    return m;
  });
  const togglePublished = (id) => {
    setPublishedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast(next[id] ? 'Marqué comme publié' : 'Non publié', {
        icon: next[id] ? '✓' : '↩',
      });
      return next;
    });
  };

  const handleCreate = () => {
    toast(`Nouveau contenu ${channel.label} généré`, { icon: '✨' });
  };

  return (
    <div className="space-y-8">
      {/* ─── Barre d'onglets canaux ─── */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-skop bg-skop-gray-100">
        {studioChannelOrder.map((key) => {
          const c = studioChannels[key];
          const active = key === channelKey;
          return (
            <button
              key={key}
              onClick={() => setChannel(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition ${
                active
                  ? 'bg-white text-skop-black shadow-sm'
                  : 'text-skop-gray-500 hover:text-skop-black'
              }`}
            >
              <Icon name={c.iconName} size={13} />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* ─── Header du canal actif ─── */}
      <Card accent>
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 rounded-skop bg-skop-pink-soft flex items-center justify-center shrink-0">
            <Icon name={channel.iconName} size={22} className="text-skop-pink-vivid" />
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-title text-xl font-bold text-skop-black">{channel.label}</h2>
            <p className="text-sm text-skop-black mt-1 font-medium">{channel.headline}</p>
            <p className="text-xs text-skop-gray-500 mt-2 leading-relaxed">
              {channel.description}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            <Icon name="Plus" size={14} />
            Créer
          </button>
        </div>
      </Card>

      {/* ─── Liste des contenus du canal ─── */}
      <div className="space-y-4">
        {channel.contents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            channelKey={channelKey}
            isPublished={publishedMap[content.id]}
            onTogglePublished={() => togglePublished(content.id)}
          />
        ))}
      </div>

      {/* ─── Section additionnelle pour Avis : avis récoltés ─── */}
      {channelKey === 'avis' && channel.collectedReviews && (
        <Card
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Inbox" size={16} className="text-skop-pink-vivid" />
              Avis récoltés (scrapés par Skop)
            </span>
          }
          subtitle={`${channel.collectedReviews.length} avis exploitables dans vos prochains contenus`}
        >
          <div className="space-y-3">
            {channel.collectedReviews.map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-skop border border-skop-gray-200 bg-white"
              >
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-semibold text-sm text-skop-black">{r.author}</span>
                  <span className="text-[11px] text-skop-gray-500">·</span>
                  <span className="text-[11px] text-skop-gray-500">{r.platform}</span>
                  <span className="text-[11px] text-skop-gray-500">·</span>
                  <span className="text-[11px] text-skop-pink-vivid font-bold">
                    {'★'.repeat(r.rating)}
                  </span>
                  <span className="text-[11px] text-skop-gray-400 ml-auto">{r.date}</span>
                </div>
                <p className="text-sm text-skop-gray-700 leading-relaxed">« {r.text} »</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// CONTENT CARD — dispatch par canal
// ════════════════════════════════════════
function ContentCard({ content, channelKey, isPublished, onTogglePublished }) {
  return (
    <div
      className={`rounded-skop border overflow-hidden transition ${
        isPublished
          ? 'border-skop-gray-200 bg-skop-gray-50/60'
          : 'border-skop-gray-200 bg-white'
      }`}
    >
      {/* Header : checkbox publié + date */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-skop-gray-100">
        <PublishedCheckbox checked={isPublished} onChange={onTogglePublished} />
        <span className="text-[11px] text-skop-gray-500">{content.date}</span>
      </div>

      {/* Body : contenu spécifique au canal */}
      <div className="p-5 space-y-3">
        {renderChannelBody(channelKey, content)}
      </div>
    </div>
  );
}

function PublishedCheckbox({ checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none group">
      <span
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition shrink-0 ${
          checked
            ? 'bg-skop-teal-vivid border-skop-teal-vivid'
            : 'bg-white border-skop-gray-300 group-hover:border-skop-gray-500'
        }`}
      >
        {checked && <Icon name="Check" size={13} className="text-skop-black" />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`text-xs font-bold uppercase tracking-wide transition ${
          checked ? 'text-skop-black' : 'text-skop-gray-500'
        }`}
      >
        {checked ? 'Publié' : 'Marquer publié'}
      </span>
    </label>
  );
}

// ════════════════════════════════════════
// DISPATCH PAR CANAL
// ════════════════════════════════════════
function renderChannelBody(channelKey, c) {
  switch (channelKey) {
    case 'linkedin':
      return <LinkedInPost c={c} />;
    case 'linkedinPage':
      return <LinkedInPageImprovement c={c} />;
    case 'linkedinComments':
      return <LinkedInComment c={c} />;
    case 'reddit':
      return <RedditPost c={c} />;
    case 'youtube':
      return <YouTubeScript c={c} />;
    case 'faq':
      return <FaqQuestion c={c} />;
    case 'codeSite':
      return <CodeSiteImprovement c={c} />;
    case 'blogExterne':
      return <BlogArticle c={c} />;
    case 'avis':
      return <AvisMessage c={c} />;
    case 'reponseAvis':
      return <ReviewResponse c={c} />;
    default:
      return null;
  }
}

// ────────────────────────────────────────
function LinkedInPost({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            c.accountType === 'entreprise'
              ? 'bg-skop-pink-soft text-skop-pink-vivid border border-skop-pink-vivid'
              : 'bg-skop-gray-100 text-skop-gray-700 border border-skop-gray-200'
          }`}
        >
          {c.accountType === 'entreprise' ? 'Compte entreprise' : 'Compte perso'}
        </span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700 font-medium">{c.author}</span>
        <span className="text-[11px] text-skop-gray-500 ml-auto">{c.tone}</span>
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">{c.title}</p>
      <p className="text-sm text-skop-gray-700 whitespace-pre-line leading-relaxed">{c.body}</p>
      <div className="flex items-center gap-3 pt-2 text-[11px] text-skop-gray-500">
        <span>{c.stats.length}</span>
        <span>·</span>
        <span>{c.stats.estimatedReach} estimées</span>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function LinkedInPageImprovement({ c }) {
  const impactColor =
    c.impact === 'Élevé'
      ? 'bg-skop-pink-vivid text-white'
      : c.impact === 'Moyen'
      ? 'bg-skop-pink-soft text-skop-pink-vivid border border-skop-pink-vivid'
      : 'bg-skop-gray-100 text-skop-gray-700';
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-100 text-skop-gray-700">
          Section : {c.section}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${impactColor}`}>
          Impact {c.impact}
        </span>
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">{c.title}</p>
      <p className="text-sm text-skop-gray-700 whitespace-pre-line leading-relaxed">{c.body}</p>
    </>
  );
}

// ────────────────────────────────────────
function LinkedInComment({ c }) {
  return (
    <>
      {/* Post cible */}
      <div className="rounded-skop bg-skop-gray-50 border border-skop-gray-200 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-2">
          Post cible
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 rounded-full bg-skop-pink-soft flex items-center justify-center text-[11px] font-bold text-skop-pink-vivid">
            {c.targetPost.avatar}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-skop-black truncate">{c.targetPost.author}</p>
            <p className="text-[10px] text-skop-gray-500">{c.targetPost.engagement}</p>
          </div>
        </div>
        <p className="text-xs text-skop-gray-700 italic leading-relaxed">{c.targetPost.preview}</p>
      </div>

      {/* Commentaire à poster */}
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400">
        Commentaire à poster (rédigé par Skop)
      </p>
      <div className="rounded-skop bg-skop-pink-soft border border-skop-pink p-3">
        <p className="text-sm text-skop-black leading-relaxed">{c.comment}</p>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function RedditPost({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-900 text-white">
          {c.subreddit}
        </span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700 font-medium">{c.format}</span>
        <span className="text-[11px] text-skop-gray-500 ml-auto">Ton {c.tone}</span>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1">
          {c.format === 'Post original' ? 'Titre' : 'Question cible'}
        </p>
        <p className="text-sm text-skop-black font-semibold leading-snug">« {c.targetQuestion} »</p>
      </div>
      <p className="text-sm text-skop-gray-700 whitespace-pre-line leading-relaxed">{c.body}</p>
    </>
  );
}

// ────────────────────────────────────────
function YouTubeScript({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-900 text-white">
          YouTube
        </span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700 font-medium">{c.format}</span>
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">{c.title}</p>
      <p className="text-sm text-skop-gray-700 leading-relaxed">{c.description}</p>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
          Chapitrage
        </p>
        <ul className="space-y-1">
          {c.chapters.map((ch, i) => (
            <li key={i} className="text-xs text-skop-gray-700 font-mono">
              {ch}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-skop bg-skop-pink-soft border border-skop-pink p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1.5">
          <Icon name="UserCheck" size={11} className="inline mr-1" />
          Invité proposé
        </p>
        <p className="text-sm font-bold text-skop-black">{c.proposedGuest.name}</p>
        <p className="text-xs text-skop-gray-700 mb-2">{c.proposedGuest.role}</p>
        <p className="text-xs text-skop-gray-600 italic">{c.proposedGuest.why}</p>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function FaqQuestion({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-pink-soft text-skop-pink-vivid border border-skop-pink-vivid">
          Q/R
        </span>
        {c.targetLLMs.map((llm) => (
          <span
            key={llm}
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-100 text-skop-gray-700"
          >
            {llm}
          </span>
        ))}
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">
        Q : {c.question}
      </p>
      <p className="text-sm text-skop-gray-700 whitespace-pre-line leading-relaxed">
        <span className="font-bold text-skop-black">R :</span> {c.answer}
      </p>
      <div className="pt-1 text-[11px] text-skop-gray-500">
        <Icon name="GitFork" size={11} className="inline mr-1" />
        Fanout source : <span className="font-mono text-skop-gray-700">{c.sourceFanout}</span>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function CodeSiteImprovement({ c }) {
  const impactColor =
    c.impact === 'Critique'
      ? 'bg-skop-pink-vivid text-white'
      : c.impact === 'Élevé'
      ? 'bg-skop-pink-soft text-skop-pink-vivid border border-skop-pink-vivid'
      : 'bg-skop-gray-100 text-skop-gray-700';
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-100 text-skop-gray-700">
          {c.section}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${impactColor}`}>
          Impact {c.impact}
        </span>
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">
        {c.improvement}
      </p>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
          État actuel
        </p>
        <pre className="text-[11px] font-mono text-skop-gray-700 bg-skop-gray-50 p-3 rounded-skop border border-skop-gray-200 overflow-x-auto whitespace-pre-wrap">
{c.currentState}
        </pre>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1.5">
          Code proposé par Skop
        </p>
        <pre className="text-[11px] font-mono text-skop-black bg-skop-pink-soft p-3 rounded-skop border border-skop-pink overflow-x-auto whitespace-pre-wrap">
{c.suggestedCode}
        </pre>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function BlogArticle({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-900 text-white">
          Article
        </span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700">Ton {c.tone}</span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700">{c.wordCount} mots</span>
      </div>
      <p className="font-title text-base font-bold text-skop-black leading-snug">{c.title}</p>
      <p className="text-sm text-skop-gray-700 leading-relaxed italic">« {c.excerpt} »</p>

      {/* Site cible proposé */}
      <div className="rounded-skop bg-skop-pink-soft border border-skop-pink p-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">
            <Icon name="Target" size={11} className="inline mr-1" />
            Site proposé pour publication
          </p>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-skop-pink-vivid border border-skop-pink-vivid">
            DA {c.proposedSite.domainAuthority}
          </span>
        </div>
        <p className="text-sm font-bold text-skop-black">{c.proposedSite.name}</p>
        <p className="text-[11px] text-skop-gray-500 mb-1.5">{c.proposedSite.url}</p>
        <p className="text-xs text-skop-gray-700">{c.proposedSite.why}</p>
      </div>

      {/* Sites alternatifs */}
      <details className="text-xs">
        <summary className="cursor-pointer text-skop-gray-500 hover:text-skop-black font-semibold">
          Voir tous les sites alternatifs ({c.alternativeSites.length})
        </summary>
        <div className="mt-2 space-y-1.5">
          {c.alternativeSites.map((s) => (
            <div
              key={s.url}
              className="flex items-center justify-between p-2 rounded-md bg-skop-gray-50 border border-skop-gray-200"
            >
              <div>
                <p className="text-xs font-bold text-skop-black">{s.name}</p>
                <p className="text-[10px] text-skop-gray-500">{s.url}</p>
              </div>
              <span className="text-[10px] font-bold text-skop-gray-700">DA {s.authority}</span>
            </div>
          ))}
        </div>
      </details>

      {/* Sources */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
          Sources de l'article
        </p>
        <ul className="space-y-1">
          {c.sources.map((s, i) => (
            <li key={i} className="text-xs text-skop-gray-700 pl-3 border-l-2 border-skop-gray-200">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function AvisMessage({ c }) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-gray-900 text-white">
          {c.format}
        </span>
        <span className="text-[11px] text-skop-gray-500">·</span>
        <span className="text-[11px] text-skop-gray-700">Cible : {c.target}</span>
      </div>
      {c.subject && (
        <p className="text-[11px] text-skop-gray-500">
          Sujet : <span className="font-semibold text-skop-black">{c.subject}</span>
        </p>
      )}

      {/* Plateforme cible */}
      <div className="rounded-skop bg-skop-pink-soft border border-skop-pink p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-1">
          <Icon name="MapPin" size={11} className="inline mr-1" />
          Où l'avis doit être écrit
        </p>
        <p className="text-sm font-bold text-skop-black">{c.targetPlatform.name}</p>
        <p className="text-[11px] text-skop-gray-500 mb-1.5">{c.targetPlatform.url}</p>
        <p className="text-xs text-skop-gray-700">{c.targetPlatform.why}</p>
      </div>

      {/* Plateformes alternatives */}
      <details className="text-xs">
        <summary className="cursor-pointer text-skop-gray-500 hover:text-skop-black font-semibold">
          Autres plateformes possibles ({c.alternativePlatforms.length})
        </summary>
        <div className="mt-2 space-y-1.5">
          {c.alternativePlatforms.map((p) => (
            <div
              key={p.url}
              className="flex items-center justify-between p-2 rounded-md bg-skop-gray-50 border border-skop-gray-200"
            >
              <div>
                <p className="text-xs font-bold text-skop-black">{p.name}</p>
                <p className="text-[10px] text-skop-gray-500">{p.url}</p>
              </div>
              <span className="text-[10px] font-bold text-skop-pink-vivid">★ {p.score}</span>
            </div>
          ))}
        </div>
      </details>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-400 mb-1.5">
          Message à envoyer
        </p>
        <div className="rounded-skop bg-skop-gray-50 border border-skop-gray-200 p-3">
          <p className="text-sm text-skop-gray-700 whitespace-pre-line leading-relaxed">{c.body}</p>
        </div>
      </div>
    </>
  );
}

// ────────────────────────────────────────
function ReviewResponse({ c }) {
  return (
    <>
      {/* Avis cible */}
      <div className="rounded-skop bg-skop-gray-50 border border-skop-gray-200 p-3">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="font-bold text-sm text-skop-black">{c.targetReview.author}</span>
          <span className="text-[11px] text-skop-gray-500">·</span>
          <span className="text-[11px] text-skop-gray-700">{c.targetReview.platform}</span>
          <span className="text-[11px] text-skop-pink-vivid font-bold ml-1">
            {'★'.repeat(c.targetReview.rating)}
            {'☆'.repeat(5 - c.targetReview.rating)}
          </span>
        </div>
        <p className="text-sm text-skop-gray-700 italic leading-relaxed">
          « {c.targetReview.text} »
        </p>
      </div>

      {/* Réponse suggérée */}
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">
        Réponse rédigée par Skop (factuelle, détaillée, point par point)
      </p>
      <div className="rounded-skop bg-skop-pink-soft border border-skop-pink p-3">
        <p className="text-sm text-skop-black whitespace-pre-line leading-relaxed">
          {c.suggestedResponse}
        </p>
      </div>
    </>
  );
}
