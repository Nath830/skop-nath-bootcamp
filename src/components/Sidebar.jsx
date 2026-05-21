import { NavLink, useLocation } from 'react-router-dom';
import SkopLogo from './SkopLogo.jsx';
import Icon, { SkopBotIcon } from './Icon.jsx';
import { account } from '../data/mockData.js';

/**
 * Sidebar à 3 grandes parties :
 *  - Vision        → Dashboard, Fanout, Bots IA, Visiteurs
 *  - Création      → Stratégie, Studio, Journalistes, Scanner, Mesure
 *  - Organisation  → page unique
 */
const SECTIONS = [
  {
    label: 'Vision',
    iconName: 'Eye',
    items: [
      { to: '/vision', label: 'Dashboard', iconName: 'LayoutDashboard' },
      { to: '/fanout', label: 'Fanout queries', iconName: 'GitFork' },
      { to: '/bots', label: 'Bots IA', iconCustom: 'bot' },
      { to: '/visiteurs', label: 'Visiteurs', iconName: 'Users' },
    ],
  },
  {
    label: 'Création',
    iconName: 'PenLine',
    items: [
      { to: '/strategie', label: 'Stratégie', iconName: 'Target' },
      { to: '/creation', label: 'Studio', iconName: 'PenLine' },
      { to: '/journalistes', label: 'Journalistes', iconName: 'Newspaper' },
      { to: '/scanner', label: 'Scanner', iconName: 'Microscope' },
      { to: '/mesure', label: 'Mesure', iconName: 'Activity' },
    ],
  },
  {
    label: 'Organisation',
    iconName: 'Building2',
    to: '/organisation',
  },
];

export default function Sidebar() {
  const location = useLocation();

  // Détermine si un sous-item est actif (gère les onglets ?tab= de Création)
  const isItemActive = (item) => {
    const [path] = item.to.split('?');
    if (location.pathname !== path) return false;
    if (item.creationTab) {
      const currentTab = new URLSearchParams(location.search).get('tab') || 'studio';
      return currentTab === item.creationTab;
    }
    return true;
  };

  return (
    <aside className="w-64 shrink-0 border-r border-skop-gray-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="px-6 pt-6 pb-4">
        <SkopLogo size={36} />
      </div>

      <div className="mx-3 mb-5 p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
        <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">
          Compte suivi
        </p>
        <p className="font-title text-sm font-bold text-skop-black leading-tight mt-0.5">
          {account.name}
        </p>
        <p className="text-[11px] text-skop-gray-500 mt-0.5">{account.city}</p>
      </div>

      <nav className="flex-1 px-3 overflow-y-auto space-y-5">
        {SECTIONS.map((section) => {
          // ─── Section avec lien direct (Organisation) ───
          if (section.to) {
            return (
              <NavLink
                key={section.label}
                to={section.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-skop transition ${
                    isActive
                      ? 'bg-skop-pink text-skop-black'
                      : 'text-skop-black hover:bg-skop-pink-soft'
                  }`
                }
              >
                <Icon name={section.iconName} size={18} />
                <span className="font-title text-sm font-bold uppercase tracking-wide">
                  {section.label}
                </span>
              </NavLink>
            );
          }

          // ─── Section avec sous-items (Vision, Création) ───
          return (
            <div key={section.label}>
              <div className="flex items-center gap-2.5 px-3 mb-1.5">
                <Icon name={section.iconName} size={18} className="text-skop-pink-vivid" />
                <span className="font-title text-sm font-bold uppercase tracking-wide text-skop-black">
                  {section.label}
                </span>
              </div>
              <div className="space-y-0.5 pl-2 border-l border-skop-gray-200 ml-4">
                {section.items.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2.5 pl-4 pr-3 py-2 rounded-skop text-[13px] transition ${
                        active
                          ? 'bg-skop-pink text-skop-black font-semibold'
                          : 'text-skop-gray-700 hover:bg-skop-pink-soft hover:text-skop-black'
                      }`}
                    >
                      <span className="shrink-0">
                        {item.iconCustom === 'bot' ? (
                          <SkopBotIcon size={16} />
                        ) : (
                          <Icon name={item.iconName} size={16} />
                        )}
                      </span>
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-skop-gray-200">
        <p className="text-xs text-skop-gray-500">MVP · données factices</p>
        <p className="text-xs text-skop-gray-400 mt-0.5">v0.1 · Bootcamp Delta</p>
      </div>
    </aside>
  );
}
