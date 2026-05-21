import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon, { SkopBotIcon } from './Icon.jsx';

const COMMANDS = [
  // Navigation
  { group: 'Navigation', iconName: 'Eye', label: 'Aller à Vision', shortcut: 'V', to: '/vision' },
  { group: 'Navigation', iconName: 'GitFork', label: 'Aller à Fanout queries', shortcut: 'F', to: '/fanout' },
  { group: 'Navigation', iconName: 'Target', label: 'Aller à Stratégie', shortcut: 'S', to: '/strategie' },
  { group: 'Navigation', iconName: 'PenLine', label: 'Aller au Studio', shortcut: 'C', to: '/creation' },
  { group: 'Navigation', iconName: 'Newspaper', label: 'Aller à Journalistes', shortcut: 'J', to: '/journalistes' },
  { group: 'Navigation', iconName: 'Microscope', label: 'Aller à Scanner', shortcut: 'A', to: '/scanner' },
  { group: 'Navigation', iconName: 'Activity', label: 'Aller à Mesure', shortcut: 'M', to: '/mesure' },
  { group: 'Navigation', iconCustom: 'bot', label: 'Aller à Bots IA', shortcut: 'B', to: '/bots' },
  { group: 'Navigation', iconName: 'Users', label: 'Aller à Visiteurs', shortcut: 'I', to: '/visiteurs' },
  { group: 'Navigation', iconName: 'Building2', label: 'Aller à Organisation', shortcut: 'O', to: '/organisation' },

  // Studio — canaux
  { group: 'Studio — canaux', iconName: 'Linkedin', label: 'LinkedIn (posts entreprise + perso)', to: '/creation?channel=linkedin' },
  { group: 'Studio — canaux', iconName: 'Building2', label: 'LinkedIn Page (améliorations)', to: '/creation?channel=linkedinPage' },
  { group: 'Studio — canaux', iconName: 'MessageSquare', label: 'LinkedIn Commentaires', to: '/creation?channel=linkedinComments' },
  { group: 'Studio — canaux', iconName: 'MessageCircle', label: 'Reddit (posts authentiques)', to: '/creation?channel=reddit' },
  { group: 'Studio — canaux', iconName: 'Youtube', label: 'YouTube (scripts long format)', to: '/creation?channel=youtube' },
  { group: 'Studio — canaux', iconName: 'HelpCircle', label: 'FAQ (basées sur fanouts)', to: '/creation?channel=faq' },
  { group: 'Studio — canaux', iconName: 'Code', label: 'Code site (améliorations techniques)', to: '/creation?channel=codeSite' },
  { group: 'Studio — canaux', iconName: 'FileText', label: 'Blog externe (articles à pitcher)', to: '/creation?channel=blogExterne' },
  { group: 'Studio — canaux', iconName: 'Star', label: 'Avis (récolte clients)', to: '/creation?channel=avis' },
  { group: 'Studio — canaux', iconName: 'MessageSquare', label: 'Réponse avis (templates)', to: '/creation?channel=reponseAvis' },

  // Sous-pages
  { group: 'Sous-pages', iconName: 'Calendar', label: 'Voir le Calendrier des tâches', to: '/organisation', hint: 'Onglet Calendrier' },
  { group: 'Sous-pages', iconName: 'Users', label: 'Voir les Collaborateurs', to: '/organisation', hint: 'Onglet Collaborateurs' },
  { group: 'Sous-pages', iconName: 'Building2', label: "Modifier les infos entreprise", to: '/organisation', hint: 'Onglet Entreprise' },

  // Actions
  { group: 'Actions', iconName: 'Plus', label: 'Créer une tâche', to: '/organisation', hint: 'Bouton "Nouvelle tâche" du Calendrier' },
  { group: 'Actions', iconName: 'Sparkles', label: 'Créer un contenu', to: '/creation', hint: 'Bouton "Créer" du Studio' },
  { group: 'Actions', iconName: 'Microscope', label: 'Scanner un contenu (score GEO)', to: '/scanner', hint: 'Coller un texte → score GEO + conseils' },
  { group: 'Actions', iconName: 'Mail', label: 'Pitcher un journaliste', to: '/journalistes', hint: 'Choisir un journaliste → générer un pitch personnalisé' },
  { group: 'Actions', iconName: 'UserPlus', label: 'Inviter un collaborateur', to: '/organisation', hint: 'Onglet Collaborateurs → "Inviter"' },

  // Vision sections (ancres)
  { group: 'Vision — sections', iconName: 'MessageCircle', label: 'Sentiment', to: '/vision#sentiment' },
  { group: 'Vision — sections', iconName: 'Eye', label: 'Apparition (volume, prompts en direct)', to: '/vision#apparition' },
  { group: 'Vision — sections', iconName: 'Swords', label: 'Concurrence', to: '/vision#concurrence' },
  { group: 'Vision — sections', iconName: 'Globe', label: 'Distribution par LLM', to: '/vision#distribution' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listener clavier global pour Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Focus input à l'ouverture
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index quand la requête change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Filtre des commandes
  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  // Groupes
  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  // Index global plat pour navigation clavier
  const flat = filtered;

  const handleSelect = (cmd) => {
    setOpen(false);
    if (cmd.to) {
      navigate(cmd.to);
    } else if (cmd.action) {
      cmd.action();
    }
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = flat[activeIndex];
      if (cmd) handleSelect(cmd);
    }
  };

  if (!open) return null;

  let runningIndex = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-skop shadow-skop-hover overflow-hidden flex flex-col max-h-[70vh] animate-command-palette-in"
      >
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-skop-gray-200">
          <Icon name="Search" size={16} className="text-skop-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tape une commande ou cherche une section…"
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-skop-gray-400"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-skop-gray-100 text-skop-gray-500 border border-skop-gray-200">
            Esc
          </kbd>
        </div>

        {/* Résultats */}
        <div className="overflow-y-auto flex-1 py-2">
          {flat.length === 0 ? (
            <p className="text-sm text-skop-gray-500 text-center py-8">
              Aucun résultat pour « {query} »
            </p>
          ) : (
            Object.entries(grouped).map(([group, cmds]) => (
              <div key={group}>
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 px-4 pt-3 pb-1">
                  {group}
                </p>
                {cmds.map((cmd) => {
                  const idx = runningIndex++;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={cmd.label}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition ${
                        isActive ? 'bg-skop-pink-soft' : 'hover:bg-skop-gray-50'
                      }`}
                    >
                      <span className="shrink-0 text-skop-gray-700">
                        {cmd.iconCustom === 'bot' ? (
                          <SkopBotIcon size={18} />
                        ) : (
                          <Icon name={cmd.iconName} size={18} />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-skop-black font-medium truncate">{cmd.label}</p>
                        {cmd.hint && (
                          <p className="text-[11px] text-skop-gray-500 truncate">{cmd.hint}</p>
                        )}
                      </div>
                      {cmd.shortcut && (
                        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-skop-gray-100 text-skop-gray-500 border border-skop-gray-200">
                          ⌘ {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer aide */}
        <div className="px-4 py-2 border-t border-skop-gray-200 flex items-center gap-4 text-[11px] text-skop-gray-500">
          <span className="inline-flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded bg-skop-gray-100 border border-skop-gray-200">↑↓</kbd>
            naviguer
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded bg-skop-gray-100 border border-skop-gray-200">↵</kbd>
            sélectionner
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded bg-skop-gray-100 border border-skop-gray-200">Esc</kbd>
            fermer
          </span>
        </div>
      </div>
    </div>
  );
}
