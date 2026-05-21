import { useState } from 'react';
import Card from '../components/Card.jsx';
import InfoTooltip from '../components/InfoTooltip.jsx';
import Icon, { SkopBotIcon } from '../components/Icon.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { visitorsData, botsData } from '../data/mockData.js';

export default function ImportEntreprise() {
  const toast = useToast();

  // ─── État de la connexion GA4 (initialisé depuis le mock) ───
  const [ga4, setGa4] = useState({
    connected: visitorsData.ga4.connected,
    propertyId: visitorsData.ga4.propertyId,
    apiKey: '••••••••••••••••••',
    testing: false,
    testResult: null, // 'success' | 'error' | null
  });

  const [ga4Form, setGa4Form] = useState({
    propertyId: visitorsData.ga4.propertyId,
    apiKey: '',
  });

  const handleGa4Test = () => {
    setGa4((s) => ({ ...s, testing: true, testResult: null }));
    setTimeout(() => {
      // Simulation : réussit si Property ID au format GA4-XXX
      const isValid = /^GA4-\d+$/i.test(ga4Form.propertyId.trim()) && ga4Form.apiKey.trim().length >= 8;
      if (isValid) {
        setGa4({
          connected: true,
          propertyId: ga4Form.propertyId.trim(),
          apiKey: '••••••••••••••••••',
          testing: false,
          testResult: 'success',
        });
        toast('Connexion Google Analytics 4 réussie', { icon: '✅' });
      } else {
        setGa4((s) => ({ ...s, testing: false, testResult: 'error' }));
        toast('Échec de connexion — vérifie le Property ID et la clé API', { icon: '⚠️', variant: 'warning' });
      }
    }, 1400);
  };

  const handleGa4Disconnect = () => {
    setGa4({ connected: false, propertyId: '', apiKey: '', testing: false, testResult: null });
    setGa4Form({ propertyId: '', apiKey: '' });
    toast('GA4 déconnecté', { icon: '🔌' });
  };

  // ─── État de la connexion Cloudflare ───
  const [cf, setCf] = useState({
    connected: botsData.cloudflare.connected,
    accountId: botsData.cloudflare.accountId,
    zone: botsData.cloudflare.zone,
    apiToken: '••••••••••••••••••',
    testing: false,
    testResult: null,
  });

  const [cfForm, setCfForm] = useState({
    accountId: botsData.cloudflare.accountId,
    zone: botsData.cloudflare.zone,
    apiToken: '',
  });

  const handleCfTest = () => {
    setCf((s) => ({ ...s, testing: true, testResult: null }));
    setTimeout(() => {
      const isValid =
        /^cf-[A-Z0-9-]+$/i.test(cfForm.accountId.trim()) &&
        cfForm.zone.trim().includes('.') &&
        cfForm.apiToken.trim().length >= 20;
      if (isValid) {
        setCf({
          connected: true,
          accountId: cfForm.accountId.trim(),
          zone: cfForm.zone.trim(),
          apiToken: '••••••••••••••••••',
          testing: false,
          testResult: 'success',
        });
        toast('Connexion Cloudflare réussie', { icon: '✅' });
      } else {
        setCf((s) => ({ ...s, testing: false, testResult: 'error' }));
        toast('Échec de connexion — vérifie Account ID, zone et API Token', { icon: '⚠️', variant: 'warning' });
      }
    }, 1400);
  };

  const handleCfDisconnect = () => {
    setCf({ connected: false, accountId: '', zone: '', apiToken: '', testing: false, testResult: null });
    setCfForm({ accountId: '', zone: '', apiToken: '' });
    toast('Cloudflare déconnecté', { icon: '🔌' });
  };
  const [form, setForm] = useState({
    name: 'Delta Business School',
    sector: 'École de commerce · Enseignement supérieur',
    website: 'https://delta-business.school',
    description:
      "Delta Business School est une école de commerce parisienne post-bac qui forme la nouvelle génération d'entrepreneurs et de talents tech. Pédagogie par projet, promotions à taille humaine et fort lien avec l'écosystème startup français.",
    targetAudience: 'Lycéens en Terminale · Étudiants en BTS/Licence (admissions parallèles) · Parents prescripteurs',
    tone: "Inspirant et concret. Mettre en avant les projets étudiants et les parcours d'alumni. Parler de la vraie vie sur le campus. Éviter le jargon des classements et le discours \"prestige\". Tutoyer sur réseaux sociaux, vouvoyer en presse.",
    values: 'Pédagogie par projet · Entrepreneuriat · Humain · Audace',
    avoidWords: 'élitiste, prestigieux, sélectif, classement',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    toast('Informations entreprise enregistrées', { icon: '🏢' });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card
        title="Pourquoi cette étape est cruciale"
        subtitle="Skop génère des contenus alignés sur votre identité"
        accent
      >
        <p className="text-sm text-skop-gray-700">
          Les informations ci-dessous nourrissent <strong>la stratégie</strong>, <strong>les contenus du Studio</strong>{' '}
          et <strong>les recommandations d'audit</strong>. Plus vous êtes précis, plus les contenus générés vous ressemblent.
        </p>
      </Card>

      {/* ════ Connexion Google Analytics 4 ════ */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Plug" size={16} className="text-skop-pink-vivid" />
            Intégration Google Analytics 4
            <InfoTooltip text="Connectez votre compte GA4 pour activer la page Visiteurs et voir combien de personnes cliquent sur votre site depuis ChatGPT, Claude, Gemini, etc." />
          </span>
        }
        subtitle="Pour activer la page Visiteurs — voir le trafic réel venu des IA"
      >
        {ga4.connected ? (
          // ─── État connecté ───
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
              <span className="inline-flex w-9 h-9 rounded-full bg-skop-pink-vivid text-white items-center justify-center">
                <Icon name="Check" size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-skop-black">Connecté à Google Analytics 4</p>
                <p className="text-[11px] text-skop-gray-500 font-mono mt-0.5">
                  Property : {ga4.propertyId} · Dernière sync : il y a 12 min
                </p>
              </div>
              <button
                type="button"
                onClick={handleGa4Disconnect}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-skop-gray-200 text-skop-gray-700 hover:bg-skop-gray-50 transition whitespace-nowrap"
              >
                Déconnecter
              </button>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-skop-gray-50 border border-skop-gray-200 text-xs text-skop-gray-700">
              <Icon name="Lightbulb" size={14} />
              <span>
                Les données GA4 alimentent automatiquement la page <a href="/visiteurs" className="font-semibold text-skop-pink-vivid hover:underline">Visiteurs</a>.
              </span>
            </div>
          </div>
        ) : (
          // ─── État non connecté ───
          <div className="space-y-4">
            <p className="text-sm text-skop-gray-700">
              Collez votre <strong>Property ID</strong> et votre <strong>clé API GA4</strong> ci-dessous, puis testez la connexion. Skop importera ensuite vos données automatiquement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Property ID Google Analytics 4">
                <input
                  type="text"
                  value={ga4Form.propertyId}
                  onChange={(e) => setGa4Form({ ...ga4Form, propertyId: e.target.value })}
                  placeholder="GA4-XXXXXXXXX"
                  className={`${inputStyle} font-mono`}
                />
                <p className="text-[11px] text-skop-gray-500 mt-1.5">
                  Format attendu : <code className="font-mono">GA4-</code> suivi de chiffres. Trouvable dans Admin → Détails du compte.
                </p>
              </Field>
              <Field label="Clé API (Service Account)">
                <input
                  type="password"
                  value={ga4Form.apiKey}
                  onChange={(e) => setGa4Form({ ...ga4Form, apiKey: e.target.value })}
                  placeholder="••••••••••••••••••"
                  className={`${inputStyle} font-mono`}
                />
                <p className="text-[11px] text-skop-gray-500 mt-1.5">
                  Générer via Google Cloud Console → IAM → Comptes de service.
                </p>
              </Field>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-[11px] text-skop-gray-500">
                Skop accède en <strong>lecture seule</strong> à vos données GA4. Aucune écriture, aucune modification.
              </p>
              <button
                type="button"
                onClick={handleGa4Test}
                disabled={ga4.testing || !ga4Form.propertyId.trim() || !ga4Form.apiKey.trim()}
                className="px-4 py-2 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {ga4.testing ? (
                  <><Icon name="Loader" size={14} className="inline -mt-0.5 mr-1.5 animate-spin" />Test en cours…</>
                ) : (
                  <><Icon name="Plug" size={14} className="inline -mt-0.5 mr-1.5" />Tester la connexion</>
                )}
              </button>
            </div>

            {ga4.testResult === 'error' && (
              <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-black/30 text-sm text-skop-black inline-flex items-start gap-2">
                <Icon name="X" size={14} className="mt-0.5 shrink-0" />
                <span>Échec de la connexion. Vérifie que le Property ID est au format <code className="font-mono">GA4-XXXXX</code> et que la clé API fait au moins 8 caractères.</span>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* ════ Connexion Cloudflare (logs bots IA) ════ */}
      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <SkopBotIcon size={16} />
            Intégration Cloudflare (logs bots IA)
            <InfoTooltip text="Connectez votre compte Cloudflare pour activer la page Bots IA. Skop lira vos logs en lecture seule pour détecter les passages des crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.) sur votre site." />
          </span>
        }
        subtitle="Pour activer la page Bots IA — détecter les passages des crawlers OpenAI, Anthropic, Perplexity, etc."
      >
        {cf.connected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-skop bg-skop-pink-soft border border-skop-pink">
              <span className="inline-flex w-9 h-9 rounded-full bg-skop-pink-vivid text-white items-center justify-center">
                <Icon name="Check" size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-skop-black">Connecté à Cloudflare</p>
                <p className="text-[11px] text-skop-gray-500 font-mono mt-0.5">
                  Zone : {cf.zone} · Account : {cf.accountId} · Sync : il y a 4 min
                </p>
              </div>
              <button
                type="button"
                onClick={handleCfDisconnect}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-skop-gray-200 text-skop-gray-700 hover:bg-skop-gray-50 transition whitespace-nowrap"
              >
                Déconnecter
              </button>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-skop-gray-50 border border-skop-gray-200 text-xs text-skop-gray-700">
              <Icon name="Lightbulb" size={14} />
              <span>
                Les logs Cloudflare alimentent automatiquement la page{' '}
                <a href="/bots" className="font-semibold text-skop-pink-vivid hover:underline">Bots IA</a>.
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-skop-gray-700">
              Collez votre <strong>Account ID</strong>, votre <strong>zone</strong> (domaine du site) et votre <strong>API Token</strong> Cloudflare ci-dessous, puis testez la connexion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Account ID">
                <input
                  type="text"
                  value={cfForm.accountId}
                  onChange={(e) => setCfForm({ ...cfForm, accountId: e.target.value })}
                  placeholder="cf-XXXXXXXX-XXX"
                  className={`${inputStyle} font-mono`}
                />
                <p className="text-[11px] text-skop-gray-500 mt-1.5">
                  Trouvable dans Cloudflare Dashboard → coin droit de la sidebar.
                </p>
              </Field>
              <Field label="Zone (domaine)">
                <input
                  type="text"
                  value={cfForm.zone}
                  onChange={(e) => setCfForm({ ...cfForm, zone: e.target.value })}
                  placeholder="delta-business.school"
                  className={`${inputStyle} font-mono`}
                />
                <p className="text-[11px] text-skop-gray-500 mt-1.5">
                  Le domaine du site dont on lit les logs.
                </p>
              </Field>
              <Field label="API Token (lecture seule)">
                <input
                  type="password"
                  value={cfForm.apiToken}
                  onChange={(e) => setCfForm({ ...cfForm, apiToken: e.target.value })}
                  placeholder="••••••••••••••••••"
                  className={`${inputStyle} font-mono`}
                />
                <p className="text-[11px] text-skop-gray-500 mt-1.5">
                  Générer via My Profile → API Tokens → "Read logs only".
                </p>
              </Field>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-[11px] text-skop-gray-500">
                Skop n'accède qu'en <strong>lecture aux logs</strong>. Aucune modification de votre config Cloudflare.
              </p>
              <button
                type="button"
                onClick={handleCfTest}
                disabled={cf.testing || !cfForm.accountId.trim() || !cfForm.zone.trim() || !cfForm.apiToken.trim()}
                className="px-4 py-2 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {cf.testing ? (
                  <><Icon name="Loader" size={14} className="inline -mt-0.5 mr-1.5 animate-spin" />Test en cours…</>
                ) : (
                  <><Icon name="Plug" size={14} className="inline -mt-0.5 mr-1.5" />Tester la connexion</>
                )}
              </button>
            </div>

            {cf.testResult === 'error' && (
              <div className="p-3 rounded-skop bg-skop-gray-50 border border-skop-black/30 text-sm text-skop-black inline-flex items-start gap-2">
                <Icon name="X" size={14} className="mt-0.5 shrink-0" />
                <span>Échec de la connexion. Vérifie : Account ID au format <code className="font-mono">cf-XXX</code>, zone valide (contient un point), API Token d'au moins 20 caractères.</span>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Building2" size={16} className="text-skop-pink-vivid" />
            Identité de l'entreprise
          </span>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nom de l'entreprise">
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className={inputStyle}
            />
          </Field>
          <Field label="Secteur / activité">
            <input
              type="text"
              value={form.sector}
              onChange={handleChange('sector')}
              className={inputStyle}
            />
          </Field>
          <Field label="Site web">
            <input
              type="url"
              value={form.website}
              onChange={handleChange('website')}
              className={inputStyle}
            />
          </Field>
          <Field label="Public cible">
            <input
              type="text"
              value={form.targetAudience}
              onChange={handleChange('targetAudience')}
              className={inputStyle}
            />
          </Field>
        </div>

        <Field label="Description de l'entreprise" className="mt-5">
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            className={`${inputStyle} min-h-[100px]`}
          />
        </Field>
      </Card>

      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="PenLine" size={16} className="text-skop-pink-vivid" />
            Charte éditoriale
          </span>
        }
        subtitle="Pour que les contenus créés vous ressemblent"
      >
        <Field label="Ton de voix">
          <textarea
            value={form.tone}
            onChange={handleChange('tone')}
            className={`${inputStyle} min-h-[80px]`}
            placeholder="Ex: Expert mais chaleureux. Phrases courtes. On évite le jargon."
          />
          <p className="text-xs text-skop-gray-500 mt-2">
            <Icon name="Lightbulb" size={11} className="inline -mt-0.5 mr-1" /> Soyez concret : "phrases courtes", "tutoiement", "données chiffrées", etc.
          </p>
        </Field>

        <Field label="Valeurs de la marque" className="mt-5">
          <input
            type="text"
            value={form.values}
            onChange={handleChange('values')}
            className={inputStyle}
            placeholder="Ex: Transparence · Impact · Pédagogie"
          />
        </Field>

        <Field label="Mots à éviter" className="mt-5">
          <input
            type="text"
            value={form.avoidWords}
            onChange={handleChange('avoidWords')}
            className={inputStyle}
            placeholder='Ex: "révolutionnaire", "disruptif"'
          />
          <p className="text-xs text-skop-gray-500 mt-2">
            Séparés par des virgules. Skop évitera ces termes dans les contenus générés.
          </p>
        </Field>
      </Card>

      <Card
        title={
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Paperclip" size={16} className="text-skop-pink-vivid" />
            Documents de référence (optionnel)
          </span>
        }
      >
        <div className="border-2 border-dashed border-skop-gray-200 rounded-skop p-8 text-center bg-skop-gray-50">
          <Icon name="FileText" size={32} className="mx-auto mb-2 text-skop-gray-400" />
          <p className="text-sm font-semibold text-skop-black">Glissez-déposez vos documents</p>
          <p className="text-xs text-skop-gray-500 mt-1">
            Charte graphique, guide éditorial, pitch deck, présentations…<br />
            (MVP — l'upload n'est pas encore actif)
          </p>
        </div>
      </Card>

      <div className="flex items-center justify-between sticky bottom-0 bg-white/80 backdrop-blur-md p-4 rounded-skop border border-skop-gray-200 shadow-skop-card">
        <p className="text-sm text-skop-gray-500">
          {saved ? '✅ Informations enregistrées (simulation MVP)' : 'Vos modifications ne sont pas encore enregistrées'}
        </p>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-skop bg-skop-pink-vivid text-white text-sm font-semibold hover:opacity-90 transition"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold text-skop-gray-700 uppercase tracking-wide mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle =
  'w-full px-4 py-2.5 rounded-skop bg-white border border-skop-gray-200 text-sm focus:outline-none focus:border-skop-pink-vivid transition';
