import { useState, useMemo, useEffect } from 'react';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Modal from '../components/Modal.jsx';
import Icon from '../components/Icon.jsx';
import ImportEntreprise from './ImportEntreprise.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { organizationData } from '../data/mockData.js';

const TODAY = '2026-05-13'; // Date actuelle (mock)

export default function Organisation() {
  const [tab, setTab] = useState('calendrier');

  const tabs = [
    { value: 'calendrier', label: 'Calendrier', iconName: 'Calendar' },
    { value: 'collaborateurs', label: 'Collaborateurs', iconName: 'Users' },
    { value: 'entreprise', label: 'Entreprise', iconName: 'Building2' },
  ];

  // KPIs synthétiques tirés de organizationData (aujourd'hui = TODAY constant)
  const todayCount = organizationData.tasks.filter((t) => t.date === TODAY).length;
  const inProgressCount = organizationData.tasks.filter((t) => t.status === 'in_progress').length;
  const teamCount = organizationData.collaborators.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-8">
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

      {tab === 'calendrier' && <CalendarTab />}
      {tab === 'collaborateurs' && <CollaboratorsTab />}
      {tab === 'entreprise' && <ImportEntreprise />}
    </div>
  );
}

// ════════════════════════════════════════
// TAB CALENDRIER
// ════════════════════════════════════════

function CalendarTab() {
  const toast = useToast();
  // Mois affiché : par défaut mai 2026
  const [viewMonth, setViewMonth] = useState({ year: 2026, month: 5 }); // 1-based month
  const [statusFilter, setStatusFilter] = useState('all');
  const [taskDetails, setTaskDetails] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [prefillDate, setPrefillDate] = useState(null);

  // Tâches en state local : on peut en ajouter pendant la session
  const [tasks, setTasks] = useState(organizationData.tasks);
  const { collaborators, statusLabels } = organizationData;

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
    toast(`Tâche "${newTask.title}" ajoutée au calendrier`, { icon: '📅' });
  };

  const openAddTaskFor = (dateStr) => {
    setPrefillDate(dateStr);
    setShowAddTask(true);
  };

  const closeAddTask = () => {
    setShowAddTask(false);
    setPrefillDate(null);
  };

  // KPIs
  const today = TODAY;
  const todayTasks = tasks.filter((t) => t.date === today);
  const weekTasks = tasks.filter((t) => {
    const d = new Date(t.date);
    const now = new Date(today);
    const diff = (d - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < 7;
  });
  const monthTasks = tasks.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === viewMonth.year && d.getMonth() + 1 === viewMonth.month;
  });
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;

  // Calendar grid
  const calendarCells = useMemo(() => {
    return buildMonthGrid(viewMonth.year, viewMonth.month, tasks);
  }, [viewMonth.year, viewMonth.month, tasks]);

  // Liste filtrée
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === viewMonth.year && d.getMonth() + 1 === viewMonth.month;
      })
      .filter((t) => (statusFilter === 'all' ? true : t.status === statusFilter))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [tasks, viewMonth, statusFilter]);

  const getCollab = (id) => collaborators.find((c) => c.id === id);

  const monthName = new Date(viewMonth.year, viewMonth.month - 1, 1).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const navMonth = (delta) => {
    const m = viewMonth.month + delta;
    if (m < 1) setViewMonth({ year: viewMonth.year - 1, month: 12 });
    else if (m > 12) setViewMonth({ year: viewMonth.year + 1, month: 1 });
    else setViewMonth({ ...viewMonth, month: m });
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiTile
          label="Tâches aujourd'hui"
          value={todayTasks.length}
          delta={`${todayTasks.filter((t) => t.status === 'done').length} terminées`}
          tooltip="Nombre de tâches planifiées aujourd'hui."
          accent
        />
        <KpiTile
          label="Cette semaine"
          value={weekTasks.length}
          delta="à venir"
          tooltip="Toutes les tâches planifiées dans les 7 prochains jours."
        />
        <KpiTile
          label="En cours"
          value={inProgressCount}
          delta="actuellement"
          tooltip="Nombre de tâches qui ont démarré mais qui ne sont pas finies."
        />
        <KpiTile
          label="Ce mois-ci"
          value={monthTasks.length}
          delta={monthName}
          tooltip="Toutes les tâches du mois actuellement affiché dans le calendrier."
        />
      </div>

      {/* Calendrier mensuel */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Calendar" size={16} className="text-skop-pink-vivid" />
            Calendrier des tâches
            <InfoTooltip text="Vue mensuelle. Chaque jour affiche les pastilles des tâches qui y sont planifiées. Cliquez sur une tâche pour voir les détails." />
          </span>
        }
        action={
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => {
                setPrefillDate(null);
                setShowAddTask(true);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-skop-pink-vivid text-white hover:opacity-90 transition whitespace-nowrap"
            >
              <Icon name="Plus" size={14} className="inline -mt-0.5 mr-1" />Nouvelle tâche
            </button>
            <span className="h-5 w-px bg-skop-gray-200 mx-1" />
            <button
              onClick={() => navMonth(-1)}
              className="w-7 h-7 rounded-full bg-skop-gray-100 hover:bg-skop-gray-200 text-skop-gray-700 transition flex items-center justify-center"
            >
              ←
            </button>
            <span className="px-2 text-sm font-semibold text-skop-black capitalize min-w-[100px] text-center">
              {monthName}
            </span>
            <button
              onClick={() => navMonth(1)}
              className="w-7 h-7 rounded-full bg-skop-gray-100 hover:bg-skop-gray-200 text-skop-gray-700 transition flex items-center justify-center"
            >
              →
            </button>
            <button
              onClick={() => setViewMonth({ year: 2026, month: 5 })}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-skop-black text-white hover:bg-skop-gray-700 transition"
            >
              Aujourd'hui
            </button>
          </div>
        }
      >
        {/* Headers Lun-Dim */}
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 py-1.5"
            >
              {d}
            </div>
          ))}
        </div>
        {/* Grid des jours */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarCells.map((cell, i) => (
            <DayCell
              key={i}
              cell={cell}
              isToday={cell.dateStr === today}
              onTaskClick={(t) => setTaskDetails(t)}
              onDayClick={(dateStr) => openAddTaskFor(dateStr)}
            />
          ))}
        </div>
        <p className="text-[11px] text-skop-gray-500 mt-3 italic">
          💡 Astuce : cliquez sur un jour vide pour créer une tâche à cette date.
        </p>
      </Card>

      {/* Liste des tâches du mois */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="ClipboardList" size={16} className="text-skop-pink-vivid" />
            Tâches de {monthName}
            <InfoTooltip text="Liste détaillée de toutes les tâches du mois, filtrable par statut." />
          </span>
        }
        action={
          <div className="inline-flex rounded-full bg-skop-gray-100 p-1 text-xs">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'todo', label: 'À faire' },
              { value: 'in_progress', label: 'En cours' },
              { value: 'done', label: 'Terminé' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1 rounded-full transition font-medium ${
                  statusFilter === f.value
                    ? 'bg-white text-skop-black shadow-sm'
                    : 'text-skop-gray-500 hover:text-skop-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-skop-gray-500 text-center py-8">
            Aucune tâche {statusFilter === 'all' ? '' : `« ${statusLabels[statusFilter].label} »`} sur ce mois.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => {
              const c = getCollab(task.assignee);
              const isPast = task.date < today && task.status !== 'done';
              return (
                <div
                  key={task.id}
                  onClick={() => setTaskDetails(task)}
                  className="flex items-center gap-3 p-3 rounded-skop bg-white border border-skop-gray-200 hover:border-skop-pink hover:bg-skop-pink-soft transition cursor-pointer"
                >
                  <span className="text-xl shrink-0">{task.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-skop-black">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-skop-gray-500">
                      <span>{formatDate(task.date)}</span>
                      <span>·</span>
                      <span>{task.channel}</span>
                      {c && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <span className={`w-4 h-4 rounded-full ${c.avatarColor} text-[8px] font-bold flex items-center justify-center text-skop-black`}>
                              {c.initials}
                            </span>
                            <span className="font-medium">{c.name.split(' ')[0]}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap ${statusLabels[task.status].color}`}>
                    {statusLabels[task.status].label}
                  </span>
                  {isPast && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-skop-black text-white whitespace-nowrap">
                      En retard
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Modale création de tâche */}
      <AddTaskModal
        open={showAddTask}
        onClose={closeAddTask}
        onSubmit={(t) => {
          handleAddTask(t);
          closeAddTask();
        }}
        collaborators={collaborators}
        prefillDate={prefillDate || TODAY}
      />

      {/* Modale détails tâche */}
      <Modal
        open={!!taskDetails}
        onClose={() => setTaskDetails(null)}
        title={taskDetails ? `${taskDetails.icon} ${taskDetails.title}` : ''}
        subtitle={taskDetails ? `${formatDate(taskDetails.date)} · ${taskDetails.channel}` : ''}
        maxWidth="max-w-lg"
      >
        {taskDetails && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500">Type</p>
                <p className="text-sm font-semibold text-skop-black mt-1">{taskDetails.type}</p>
              </div>
              <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500">Canal</p>
                <p className="text-sm font-semibold text-skop-black mt-1">{taskDetails.channel}</p>
              </div>
            </div>
            {(() => {
              const c = getCollab(taskDetails.assignee);
              if (!c) return null;
              return (
                <div className="p-3 rounded-skop bg-skop-pink-soft border border-skop-pink flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full ${c.avatarColor} text-sm font-bold flex items-center justify-center text-skop-black`}>
                    {c.initials}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid">Assigné à</p>
                    <p className="text-sm font-semibold text-skop-black">{c.name}</p>
                    <p className="text-xs text-skop-gray-500">{c.role}</p>
                  </div>
                </div>
              );
            })()}
            <div className="flex items-center justify-between p-3 rounded-skop bg-white border border-skop-gray-200">
              <p className="text-sm font-medium text-skop-gray-700">Statut</p>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${statusLabels[taskDetails.status].color}`}>
                {statusLabels[taskDetails.status].label}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function DayCell({ cell, isToday, onTaskClick, onDayClick }) {
  if (!cell.day) {
    return <div className="aspect-square rounded-skop bg-transparent" />;
  }

  // Clic sur le fond de la cellule (pas sur une tâche) → créer une tâche à cette date
  const handleCellClick = (e) => {
    if (e.target === e.currentTarget || e.target.dataset.cellbg) {
      onDayClick(cell.dateStr);
    }
  };

  return (
    <div
      onClick={handleCellClick}
      className={`aspect-square min-h-[80px] p-1.5 rounded-skop border cursor-pointer group ${
        isToday
          ? 'bg-skop-pink-soft border-skop-pink-vivid hover:bg-skop-pink'
          : cell.isOtherMonth
          ? 'bg-skop-gray-50 border-skop-gray-100 opacity-50 hover:opacity-70'
          : 'bg-white border-skop-gray-200 hover:border-skop-pink hover:bg-skop-pink-soft'
      } transition overflow-hidden relative`}
    >
      <div data-cellbg="1" className="flex items-center justify-between mb-1">
        <span
          className={`text-xs font-bold ${
            isToday
              ? 'inline-flex w-5 h-5 rounded-full bg-skop-pink-vivid text-white items-center justify-center'
              : 'text-skop-black'
          }`}
        >
          {cell.day}
        </span>
        <span
          data-cellbg="1"
          className="opacity-0 group-hover:opacity-100 text-[10px] text-skop-pink-vivid font-bold transition"
        >
          + tâche
        </span>
        {cell.tasks.length > 0 && (
          <span data-cellbg="1" className="text-[9px] text-skop-gray-500 font-semibold">
            {cell.tasks.length}
          </span>
        )}
      </div>
      <div data-cellbg="1" className="space-y-0.5">
        {cell.tasks.slice(0, 2).map((t) => (
          <button
            key={t.id}
            onClick={(e) => {
              e.stopPropagation();
              onTaskClick(t);
            }}
            className="w-full text-left px-1 py-0.5 rounded text-[10px] font-medium truncate bg-skop-pink-soft text-skop-black border border-skop-pink hover:bg-skop-pink transition"
            title={t.title}
          >
            {t.icon} {t.title}
          </button>
        ))}
        {cell.tasks.length > 2 && (
          <p data-cellbg="1" className="text-[9px] text-skop-gray-500 px-1">
            + {cell.tasks.length - 2} autre{cell.tasks.length - 2 > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// TAB COLLABORATEURS
// ════════════════════════════════════════

function CollaboratorsTab() {
  const [showInvite, setShowInvite] = useState(false);
  const { collaborators, permissionLabels } = organizationData;

  const activeCount = collaborators.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* KPIs équipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <KpiTile
          label="Membres de l'équipe"
          value={collaborators.length}
          delta={`${activeCount} actifs`}
          tooltip="Nombre total de personnes ayant accès à l'espace Skop de Delta Business School."
          accent
        />
        <KpiTile
          label="Admins"
          value={collaborators.filter((c) => c.permission === 'admin').length}
          delta="accès complet"
          tooltip="Nombre d'admins. Ils peuvent inviter, retirer et changer les permissions."
        />
        <KpiTile
          label="Éditeurs"
          value={collaborators.filter((c) => c.permission === 'editor').length}
          delta="création et publication"
          tooltip="Nombre d'éditeurs. Ils peuvent créer et publier mais pas gérer l'équipe."
        />
      </div>

      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Users" size={16} className="text-skop-pink-vivid" />
            Équipe Delta Business School sur Skop
            <InfoTooltip text="Liste des personnes ayant accès à votre espace Skop. Chaque membre a un rôle (Admin, Éditeur ou Lecture seule) qui détermine ses droits." />
          </span>
        }
        subtitle="Tous les membres qui ont accès à votre espace Skop"
        action={
          <button
            onClick={() => setShowInvite(true)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-skop-pink-vivid text-white hover:opacity-90 transition"
          >
            <Icon name="UserPlus" size={14} className="inline -mt-0.5 mr-1" />Inviter un collaborateur
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {collaborators.map((c) => (
            <div
              key={c.id}
              className={`p-4 rounded-skop border ${
                c.isMe ? 'bg-skop-pink-soft border-skop-pink-vivid' : 'bg-white border-skop-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-12 h-12 rounded-full ${c.avatarColor} text-sm font-bold flex items-center justify-center shrink-0 text-skop-black`}>
                  {c.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-skop-black truncate">
                    {c.name}
                    {c.isMe && <span className="ml-1 text-xs text-skop-pink-vivid">(vous)</span>}
                  </p>
                  <p className="text-xs text-skop-gray-500 truncate">{c.role}</p>
                  <p className="text-[11px] text-skop-gray-400 mt-0.5 truncate">{c.email}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-skop-gray-100 flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${permissionLabels[c.permission].color}`}>
                  {permissionLabels[c.permission].label}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      c.status === 'active' ? 'bg-skop-pink-vivid' : 'bg-skop-gray-300'
                    }`}
                  />
                  <span className="text-skop-gray-500">{c.lastActive}</span>
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-skop-gray-100 text-xs text-skop-gray-500">
                <span className="font-semibold text-skop-black">{c.contentsPublished}</span> contenu
                {c.contentsPublished !== 1 ? 's' : ''} publié{c.contentsPublished !== 1 ? 's' : ''} via Skop
              </div>
            </div>
          ))}

          {/* Card Inviter */}
          <button
            onClick={() => setShowInvite(true)}
            className="p-4 rounded-skop border-2 border-dashed border-skop-gray-200 hover:border-skop-pink-vivid hover:bg-skop-pink-soft transition flex flex-col items-center justify-center text-skop-gray-500 hover:text-skop-pink-vivid min-h-[180px]"
          >
            <Icon name="UserPlus" size={28} className="mb-2" />
            <span className="text-sm font-semibold">Inviter un collaborateur</span>
            <span className="text-xs mt-1">Par email</span>
          </button>
        </div>
      </Card>

      <InviteCollaboratorModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}

function InviteCollaboratorModal({ open, onClose }) {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', permission: 'editor' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast(`Invitation envoyée à ${form.email}`, { icon: '✉️' });
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', permission: 'editor' });
      onClose();
    }, 1500);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Inviter un collaborateur"
      subtitle="Donnez accès à l'espace Skop à un membre de votre équipe"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Nom complet
          </span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: Camille Martin"
            className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Email
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ex@delta-business.school"
            className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Niveau d'accès
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Éditeur' },
              { value: 'viewer', label: 'Lecture seule' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, permission: opt.value })}
                className={`px-3 py-2 rounded-skop text-xs font-semibold transition ${
                  form.permission === opt.value
                    ? 'bg-skop-pink-vivid text-white'
                    : 'bg-white border border-skop-gray-200 text-skop-gray-700 hover:bg-skop-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </label>
        <div className="flex justify-end gap-2 pt-2 border-t border-skop-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700 hover:bg-skop-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
          >
            {sent ? '✓ Invitation envoyée' : 'Envoyer l\'invitation'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ════════════════════════════════════════
// MODALE — AJOUT D'UNE TÂCHE
// ════════════════════════════════════════

const TASK_TYPES = [
  { value: 'Publication', defaultIcon: '📝', channels: ['Blog interne', 'Blog externe', 'LinkedIn', 'Reddit', 'FAQ site', 'YouTube', 'TikTok', 'Podcast', 'Email'] },
  { value: 'Optimisation', defaultIcon: '⚡', channels: ['Site', 'SEO', 'GEO'] },
  { value: 'Réunion', defaultIcon: '👥', channels: ['Interne', 'Avec client', 'Webinaire'] },
  { value: 'Production', defaultIcon: '🎬', channels: ['YouTube', 'Podcast', 'Pub'] },
  { value: 'Événement', defaultIcon: '🎤', channels: ['Live', 'Webinaire', 'Salon'] },
  { value: 'Analyse', defaultIcon: '📊', channels: ['Interne', 'Rapport'] },
  { value: 'Autre', defaultIcon: '📌', channels: ['Divers'] },
];

const ICON_CHOICES = ['📝', '💼', '🟠', '❓', '📹', '🎵', '🎧', '🎤', '🎬', '📧', '⚡', '👥', '📊', '📈', '⭐', '🚀', '📌', '✅'];

function AddTaskModal({ open, onClose, onSubmit, collaborators, prefillDate }) {
  const [form, setForm] = useState({
    title: '',
    date: prefillDate,
    type: 'Publication',
    channel: 'Blog interne',
    assignee: collaborators[0]?.id ?? 1,
    status: 'todo',
    icon: '📝',
  });

  // À chaque ouverture (ou changement de prefillDate), on resynchronise la date pré-remplie
  // si le formulaire est encore vide (l'utilisateur n'a rien tapé).
  useEffect(() => {
    if (open && prefillDate && form.title === '') {
      setForm((f) => ({ ...f, date: prefillDate }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefillDate]);

  const selectedType = TASK_TYPES.find((t) => t.value === form.type) ?? TASK_TYPES[0];

  const handleTypeChange = (typeValue) => {
    const t = TASK_TYPES.find((x) => x.value === typeValue);
    setForm((f) => ({
      ...f,
      type: typeValue,
      channel: t.channels[0],
      icon: t.defaultIcon,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
    });
    // Reset
    setForm({
      title: '',
      date: prefillDate,
      type: 'Publication',
      channel: 'Blog interne',
      assignee: collaborators[0]?.id ?? 1,
      status: 'todo',
      icon: '📝',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nouvelle tâche"
      subtitle="Ajoutez une tâche à votre calendrier d'équipe"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Titre de la tâche *
          </span>
          <input
            type="text"
            required
            autoFocus
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder='Ex: "Publier article blog Tech & Product"'
            className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
          />
        </label>

        {/* Date + Statut */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
              Date *
            </span>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
              Statut
            </span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
            >
              <option value="todo">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </label>
        </div>

        {/* Type + Canal */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
              Type
            </span>
            <select
              value={form.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
            >
              {TASK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.defaultIcon} {t.value}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
              Canal
            </span>
            <select
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
              className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
            >
              {selectedType.channels.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Assigné */}
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Assigné à
          </span>
          <select
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid"
          >
            {collaborators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.role}
              </option>
            ))}
          </select>
        </label>

        {/* Icône */}
        <label className="block">
          <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
            Icône (optionnel — défaut auto selon le type)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ICON_CHOICES.map((ic) => (
              <button
                type="button"
                key={ic}
                onClick={() => setForm({ ...form, icon: ic })}
                className={`w-9 h-9 rounded-skop text-lg flex items-center justify-center transition ${
                  form.icon === ic
                    ? 'bg-skop-pink-vivid ring-2 ring-skop-pink-vivid scale-110'
                    : 'bg-skop-gray-50 hover:bg-skop-pink-soft'
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </label>

        {/* Aperçu */}
        <div className="p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
          <p className="text-[10px] font-bold uppercase tracking-wide text-skop-pink-vivid mb-2">
            Aperçu
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{form.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-skop-black">
                {form.title || <span className="italic text-skop-gray-400">Titre de la tâche…</span>}
              </p>
              <p className="text-xs text-skop-gray-500 mt-0.5">
                {form.date && formatDate(form.date)} · {form.channel} ·{' '}
                {collaborators.find((c) => c.id === form.assignee)?.name.split(' ')[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-skop-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm font-semibold text-skop-gray-700 hover:bg-skop-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!form.title.trim() || !form.date}
            className="px-5 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ✓ Créer la tâche
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ════════════════════════════════════════
// UTILITAIRES
// ════════════════════════════════════════

function KpiTile({ label, value, delta, tooltip, accent = false }) {
  return (
    <div
      className={`p-4 rounded-skop border ${
        accent ? 'bg-skop-pink-soft border-skop-pink' : 'bg-white border-skop-gray-200'
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-skop-gray-500 inline-flex items-center gap-1.5">
        {label}
        {tooltip && <InfoTooltip text={tooltip} />}
      </p>
      <p className="font-title text-2xl font-bold text-skop-black mt-1.5">{value}</p>
      {delta && <p className="text-xs text-skop-gray-500 mt-1">{delta}</p>}
    </div>
  );
}

function buildMonthGrid(year, month, tasks) {
  // month is 1-based here
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const totalDays = lastDay.getDate();

  // Day of week of first day (0 = Sunday, 1 = Monday, ... 6 = Saturday)
  // French calendar: Monday is first day → shift so Monday = 0
  const firstWeekday = (firstDay.getDay() + 6) % 7;

  const cells = [];
  // Empty cells before first day
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: null });
  }

  // Days of the month
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    cells.push({
      day: d,
      dateStr,
      tasks: dayTasks,
      isOtherMonth: false,
    });
  }

  // Fill last row with empty cells
  while (cells.length % 7 !== 0) {
    cells.push({ day: null });
  }

  return cells;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
