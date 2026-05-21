import { useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';

const titles = {
  '/vision': {
    title: 'Vision',
    subtitle: "Comment les IA parlent de votre entreprise — sentiment, apparitions, concurrents, sources.",
  },
  '/strategie': {
    title: 'Stratégie',
    subtitle: "Votre plan d'action en 3 étapes : analyse de visibilité, insights extraits des fanouts, contenus à créer.",
  },
  '/creation': {
    title: 'Studio',
    subtitle: "Tous vos contenus prêts à publier, classés par canal — LinkedIn, Reddit, YouTube, FAQ, blog externe, avis, code site.",
  },
  '/mesure': {
    title: 'Mesure',
    subtitle: "Corrélations entre vos publications et le volume de citations IA — détection des causalités directes.",
  },
  '/journalistes': {
    title: 'Journalistes',
    subtitle: "Identifier les journalistes qui couvrent votre secteur, analyser leurs préférences et générer des pitches data-driven pour obtenir des articles cités par les IA.",
  },
  '/scanner': {
    title: 'Scanner',
    subtitle: "Scan GEO de votre site et de vos contenus — qu'est-ce qui empêche les IA de bien vous lire et vous citer ?",
  },
  '/bots': {
    title: 'Bots IA',
    subtitle: "Passages réels des crawlers IA (GPTBot, ClaudeBot, PerplexityBot…) détectés dans vos logs Cloudflare.",
  },
  '/visiteurs': {
    title: 'Visiteurs',
    subtitle: "Combien de personnes ont cliqué depuis une IA pour atterrir sur votre site, et ce qu'elles ont fait une fois là.",
  },
  '/organisation': {
    title: 'Organisation',
    subtitle: "Calendrier des tâches, équipe et infos entreprise — tout l'opérationnel de votre compte Skop.",
  },
  '/fanout': {
    title: 'Fanout queries',
    subtitle: "Comment les IA décomposent chaque requête en sous-recherches, et les sources qu'elles consultent.",
  },
};

export default function Header() {
  const { pathname } = useLocation();
  const current = titles[pathname] ?? { title: 'Skop', subtitle: '' };

  return (
    <header className="border-b border-skop-gray-200 bg-white sticky top-0 z-10">
      <div className="px-8 lg:px-12 py-6 flex items-center justify-between gap-6">
        <div>
          <h1 className="font-title text-[28px] font-extrabold text-skop-black tracking-tight leading-tight">
            {current.title}
          </h1>
          {current.subtitle && (
            <p className="text-sm text-skop-gray-400 mt-1.5 max-w-2xl leading-relaxed">
              {current.subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-skop-gray-200 hover:border-skop-pink-vivid hover:bg-skop-pink-soft transition group"
            title="Ouvrir la palette de commandes (Cmd+K)"
          >
            <Icon name="Search" size={14} className="text-skop-gray-500 group-hover:text-skop-black" />
            <span className="text-xs text-skop-gray-500 group-hover:text-skop-black">Rechercher…</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-skop-gray-100 text-skop-gray-700 border border-skop-gray-200">
              ⌘ K
            </kbd>
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-skop-pink-soft border border-skop-pink">
            <span className="w-2 h-2 rounded-full bg-skop-pink-vivid animate-pulse" />
            <span className="text-xs font-medium text-skop-black">MVP démo</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-skop-gray-100 border border-skop-gray-200 flex items-center justify-center text-sm font-semibold text-skop-gray-700">
            NG
          </div>
        </div>
      </div>
    </header>
  );
}
