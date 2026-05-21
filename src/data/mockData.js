// =============================================
// MOCK DATA pour le MVP de Skop
// Contexte : compte Delta Business School (école de commerce parisienne)
// Toutes les données sont factices et statiques.
// =============================================

export const account = {
  name: 'Delta Business School',
  shortName: 'Delta BS',
  sector: 'École de commerce · Enseignement supérieur',
  city: 'Paris',
};

// =============================================
// VISION : SENTIMENT
// =============================================
export const sentimentData = {
  byPeriod: {
    day: {
      score: 75,
      label: 'Positif',
      delta: '+3',
      deltaLabel: 'vs hier',
      explanation:
        "Aujourd'hui les IA évoquent Delta Business School de façon majoritairement positive, surtout grâce à 2 témoignages d'alumni récents partagés sur LinkedIn.",
      timeline: [
        { date: '00h', score: 70 },
        { date: '04h', score: 69 },
        { date: '08h', score: 72 },
        { date: '12h', score: 76 },
        { date: '16h', score: 77 },
        { date: '20h', score: 75 },
        { date: 'Maint.', score: 75 },
      ],
      bestResponse: {
        llm: 'ChatGPT',
        text: "Delta Business School se distingue par son approche pédagogique tournée vers l'entrepreneuriat et son réseau d'intervenants issus de la tech française.",
        date: 'aujourd\'hui · 14h32',
      },
      worstResponse: {
        llm: 'Mistral',
        text: "Delta Business School reste encore peu connue à l'international comparée à HEC ou ESSEC.",
        date: 'aujourd\'hui · 11h08',
      },
    },
    week: {
      score: 72,
      label: 'Positif',
      delta: '+4',
      deltaLabel: 'vs semaine dernière',
      explanation:
        "Sur 7 jours, le sentiment IA pour Delta Business School est positif. L'école est associée à l'innovation pédagogique, l'esprit entrepreneurial et un campus parisien dynamique.",
      timeline: [
        { date: '05/05', score: 66 },
        { date: '06/05', score: 68 },
        { date: '07/05', score: 65 },
        { date: '08/05', score: 70 },
        { date: '09/05', score: 73 },
        { date: '10/05', score: 75 },
        { date: '11/05', score: 72 },
      ],
      bestResponse: {
        llm: 'ChatGPT',
        text: "Delta Business School est saluée pour son approche par projets, ses promotions à taille humaine et l'accompagnement entrepreneurial qu'elle propose dès la 1re année.",
        date: '2026-05-08',
      },
      worstResponse: {
        llm: 'Gemini',
        text: "Delta Business School reste moins reconnue par les recruteurs traditionnels que les grandes écoles historiques classées au Programme Grande École.",
        date: '2026-05-07',
      },
    },
    month: {
      score: 65,
      label: 'Plutôt positif',
      delta: '+12',
      deltaLabel: 'vs mois dernier',
      explanation:
        "Sur 30 jours, vous gagnez 12 points. La hausse coïncide avec la rentrée admissibles + la publication du palmarès des écoles innovantes de Challenges où Delta apparaît pour la 1re fois.",
      timeline: [
        { date: 'S15', score: 48 },
        { date: 'S16', score: 53 },
        { date: 'S17', score: 58 },
        { date: 'S18', score: 62 },
        { date: 'S19', score: 65 },
        { date: 'S20', score: 67 },
        { date: 'S21', score: 65 },
      ],
      bestResponse: {
        llm: 'ChatGPT',
        text: "Au cours du mois écoulé, Delta Business School a fait parler d'elle grâce à plusieurs levées de fonds de ses jeunes alumni et à son nouveau parcours « Tech & Product ».",
        date: '2026-04-28',
      },
      worstResponse: {
        llm: 'Perplexity',
        text: "Delta Business School manque encore d'études chiffrées sur l'employabilité de ses diplômés et la rémunération moyenne post-études.",
        date: '2026-04-15',
      },
    },
  },
  // Perception globale de l'IA (1-2 phrases + détail + 3 mots-clés)
  aiPerception: {
    oneLiner:
      "Delta Business School est perçue comme une école de commerce parisienne moderne, post-bac et orientée entrepreneuriat, encore en construction de notoriété face aux grandes écoles historiques.",
    detail:
      "Cette perception est dérivée de l'analyse de 612 réponses IA sur les 7 derniers jours, croisant les 5 principaux LLM (ChatGPT, Claude, Gemini, Perplexity, Mistral). Les 3 traits dominants ressortent dans 73% des réponses : entrepreneuriat, pédagogie par projet, taille humaine. La perception négative (manque de reconnaissance, école jeune) ressort dans 18% des réponses, surtout sur Perplexity.",
    keywords: ['Entrepreneuriat', 'Post-bac', 'Taille humaine'],
  },
  // Réponses IA qui expliquent le score
  sampleResponses: [
    {
      llm: 'ChatGPT',
      sentiment: 'positive',
      contribution: '+14',
      text: "Delta Business School est une école de commerce parisienne post-bac qui mise sur la pédagogie par projet et un fort lien avec l'écosystème startup français. Son réseau d'alumni en tech est régulièrement cité comme un avantage.",
      date: '2026-05-10',
    },
    {
      llm: 'Claude',
      sentiment: 'positive',
      contribution: '+7',
      text: "L'école met l'accent sur l'apprentissage par projet et la rencontre avec des entrepreneurs en activité, ce qui plaît particulièrement aux profils Bac+0 qui veulent éviter la prépa classique.",
      date: '2026-05-09',
    },
    {
      llm: 'Gemini',
      sentiment: 'neutral',
      contribution: '+2',
      text: "Delta Business School propose un cursus en 5 ans avec une spécialisation en marketing digital, entrepreneuriat ou tech & product à partir de la 3e année. Les frais de scolarité tournent autour de 10 000 € par an.",
      date: '2026-05-09',
    },
    {
      llm: 'Perplexity',
      sentiment: 'negative',
      contribution: '-6',
      text: "Comparée aux écoles du Top 5 (HEC, ESSEC, ESCP, EDHEC, EM Lyon), Delta Business School reste une jeune école dont la reconnaissance par les recruteurs grand compte est encore en construction.",
      date: '2026-05-08',
    },
    {
      llm: 'Mistral',
      sentiment: 'positive',
      contribution: '+3',
      text: "Delta Business School fait partie des écoles « nouvelle génération » qui se positionnent sur l'entrepreneuriat et la tech, avec un campus parisien et des promotions volontairement réduites.",
      date: '2026-05-07',
    },
  ],
};

// =============================================
// VISION : APPARITION
// =============================================
export const apparitionData = {
  byPeriod: {
    day: {
      total: 89,
      delta: '+6%',
      deltaLabel: 'vs hier',
      timeline: [
        { date: '00h', volume: 4 },
        { date: '04h', volume: 2 },
        { date: '08h', volume: 11 },
        { date: '12h', volume: 22 },
        { date: '16h', volume: 19 },
        { date: '20h', volume: 17 },
        { date: 'Maint.', volume: 14 },
      ],
    },
    week: {
      total: 612,
      delta: '+12%',
      deltaLabel: 'vs semaine précédente',
      timeline: [
        { date: '05/05', volume: 78 },
        { date: '06/05', volume: 84 },
        { date: '07/05', volume: 81 },
        { date: '08/05', volume: 96 },
        { date: '09/05', volume: 92 },
        { date: '10/05', volume: 95 },
        { date: '11/05', volume: 86 },
      ],
    },
    month: {
      total: 2384,
      delta: '+18%',
      deltaLabel: 'vs mois précédent',
      timeline: [
        { date: 'S15', volume: 442 },
        { date: 'S16', volume: 498 },
        { date: 'S17', volume: 547 },
        { date: 'S18', volume: 612 },
      ],
    },
  },
  // Mentions vs Recommandations (l'IA parle vs l'IA recommande)
  mentionsVsRecommendations: {
    mentions: 612,
    recommendations: 184,
    recommendationRate: 30, // %
    mentionExample: {
      llm: 'Gemini',
      text: "Delta Business School est une école de commerce parisienne post-bac fondée en 2018, qui propose un cursus de 5 ans en alternance possible à partir de la 3e année.",
      type: 'Mention factuelle (sans recommandation)',
    },
    recommendationExample: {
      llm: 'ChatGPT',
      text: "Pour un profil qui veut allier entrepreneuriat et école de commerce sans passer par la prépa, je recommande de regarder Delta Business School à Paris : promotions à taille humaine et accompagnement de projet dès la 1re année.",
      type: 'Recommandation explicite',
    },
  },
  // Analyse d'intention de prompt
  intentBreakdown: [
    { intent: "Recherche d'info", icon: '🔍', count: 245, percentage: 40, appears: 78, color: '#FFCBE0' },
    { intent: 'Comparaison', icon: '⚖️', count: 184, percentage: 30, appears: 124, color: '#FE277E' },
    { intent: 'Avis & témoignages', icon: '💬', count: 122, percentage: 20, appears: 62, color: '#000000' },
    { intent: 'Décision (achat/inscription)', icon: '✅', count: 61, percentage: 10, appears: 18, color: '#A1A1AA' },
  ],
  intentInsight:
    "Vous êtes très visible sur les requêtes de COMPARAISON (67% de présence) — c'est votre point fort. En revanche, vous êtes peu cité sur les requêtes de DÉCISION (30% de présence) — c'est là qu'il faut renforcer la preuve sociale et les chiffres d'employabilité.",
  livePrompts: [
    { user: 'Quelle est la meilleure école de commerce post-bac à Paris ?', when: 'il y a 12 sec', llm: 'ChatGPT' },
    { user: 'Comparatif Delta Business School vs PSB Paris', when: 'il y a 45 sec', llm: 'Claude' },
    { user: 'Avis sur Delta Business School en 2026', when: 'il y a 1 min', llm: 'Gemini' },
    { user: 'École de commerce avec spécialisation entrepreneuriat', when: 'il y a 2 min', llm: 'ChatGPT' },
    { user: 'Comment intégrer Delta Business School en admission parallèle ?', when: 'il y a 3 min', llm: 'Perplexity' },
    { user: 'Quel est le tarif des écoles de commerce parisiennes ?', when: 'il y a 4 min', llm: 'Claude' },
  ],
  // Historique complet des prompts (modale "Voir l'historique")
  fullHistory: [
    { user: 'Quelle est la meilleure école de commerce post-bac à Paris ?', when: 'aujourd\'hui · 14h45', llm: 'ChatGPT', appeared: true },
    { user: 'Comparatif Delta Business School vs PSB Paris', when: 'aujourd\'hui · 14h32', llm: 'Claude', appeared: true },
    { user: 'Avis sur Delta Business School en 2026', when: 'aujourd\'hui · 14h17', llm: 'Gemini', appeared: true },
    { user: 'École de commerce avec spécialisation entrepreneuriat', when: 'aujourd\'hui · 13h58', llm: 'ChatGPT', appeared: true },
    { user: 'Comment intégrer Delta Business School en admission parallèle ?', when: 'aujourd\'hui · 13h41', llm: 'Perplexity', appeared: true },
    { user: 'Quel est le tarif des écoles de commerce parisiennes ?', when: 'aujourd\'hui · 13h22', llm: 'Claude', appeared: true },
    { user: 'École post-bac sans prépa Paris', when: 'aujourd\'hui · 12h59', llm: 'ChatGPT', appeared: true },
    { user: 'Programme Grande École vs Bachelor : différence', when: 'aujourd\'hui · 12h44', llm: 'Mistral', appeared: false },
    { user: 'Classement écoles de commerce 2026', when: 'aujourd\'hui · 12h12', llm: 'Gemini', appeared: false },
    { user: 'École de commerce avec stage à l\'étranger', when: 'aujourd\'hui · 11h47', llm: 'ChatGPT', appeared: true },
    { user: 'Témoignages alumni Delta Business School', when: 'aujourd\'hui · 11h28', llm: 'Claude', appeared: true },
    { user: 'Quelle école de commerce pour devenir entrepreneur ?', when: 'aujourd\'hui · 10h53', llm: 'ChatGPT', appeared: true },
    { user: 'Admission parallèle après une licence éco-gestion', when: 'aujourd\'hui · 10h31', llm: 'Perplexity', appeared: true },
    { user: 'Delta Business School avis Reddit', when: 'aujourd\'hui · 10h09', llm: 'ChatGPT', appeared: true },
    { user: 'École de commerce en alternance Paris', when: 'hier · 18h47', llm: 'Claude', appeared: true },
    { user: 'Quelles sont les écoles de commerce reconnues par l\'État ?', when: 'hier · 17h33', llm: 'Claude', appeared: false },
    { user: 'Diplôme visé Bac+5 RNCP niveau 7', when: 'hier · 16h22', llm: 'Gemini', appeared: false },
    { user: 'École de commerce avec césure obligatoire', when: 'hier · 15h08', llm: 'ChatGPT', appeared: true },
    { user: 'Avis Delta Business School parents', when: 'hier · 13h42', llm: 'ChatGPT', appeared: true },
    { user: 'Programmes BBA post-bac à Paris', when: 'hier · 12h16', llm: 'Claude', appeared: false },
    { user: 'Combien coûte une école de commerce sur 5 ans ?', when: 'hier · 11h58', llm: 'Perplexity', appeared: true },
    { user: 'École de commerce financée par France Travail', when: 'hier · 10h44', llm: 'ChatGPT', appeared: false },
    { user: 'Salaire à la sortie d\'une école de commerce post-bac', when: '11/05 · 09h17', llm: 'ChatGPT', appeared: true },
    { user: 'Concours commun Sésame ou Accès en 2026', when: '11/05 · 08h22', llm: 'ChatGPT', appeared: false },
    { user: 'Quelle école de commerce ressemble à HEC mais en post-bac ?', when: '10/05 · 19h47', llm: 'Claude', appeared: true },
    { user: 'Top écoles de commerce sur l\'entrepreneuriat 2026', when: '10/05 · 18h33', llm: 'Gemini', appeared: true },
  ],
  // Requête qui fait LE PLUS sortir la marque
  topQuery: {
    text: 'Quelle est la meilleure école de commerce post-bac à Paris ?',
    count: 78,
    deltaLabel: 'cette semaine',
  },
  // Requête qui fait LE MOINS sortir la marque (inverse)
  rareQuery: {
    text: 'Quel est le meilleur programme Master Grande École en France ?',
    count: 2,
    deltaLabel: 'cette semaine',
    reason:
      "Cette requête est posée 180 fois par semaine mais Delta Business School n'apparaît que dans 2 réponses. Les IA citent quasi exclusivement HEC, ESSEC et ESCP qui dominent le PGE classé.",
  },
};

// =============================================
// VISION : FANOUT QUERIES
// Les IA décomposent chaque requête en plusieurs sous-requêtes (fanouts)
// pour aller chercher leurs réponses. Skop trace ces fanouts.
// =============================================
export const fanoutData = {
  intro:
    "Quand un utilisateur pose une question à une IA, celle-ci ne fait jamais une seule recherche : elle décompose la requête en plusieurs « fanout queries » (sous-requêtes dérivées) qu'elle envoie en parallèle. Comprendre ces fanouts et les sources qu'ils consultent est LA clé du référencement IA.",
  totalAnalyzed: 18,
  totalFanouts: 67,
  topFanoutSources: [
    { source: 'letudiant.fr', count: 23, brandCaptured: 14 },
    { source: 'challenges.fr', count: 19, brandCaptured: 3 },
    { source: 'studyrama.fr', count: 14, brandCaptured: 8 },
    { source: 'medium.com', count: 11, brandCaptured: 9 },
    { source: 'linkedin.com', count: 9, brandCaptured: 6 },
    { source: 'reddit.com/r/EtudiantSup', count: 8, brandCaptured: 5 },
    { source: 'lefigaro.fr/etudiant', count: 6, brandCaptured: 1 },
  ],
  analyses: [
    {
      id: 1,
      originalPrompt: "Quelle est la meilleure école de commerce post-bac à Paris ?",
      llm: 'ChatGPT',
      date: '2026-05-13',
      promptCount: 87,
      brandAppeared: true,
      brandAppearanceRate: 73,
      fanouts: [
        {
          query: "Top business schools Paris post-bac 2026 ranking",
          sources: [
            { url: 'letudiant.fr/etudes/ecoles-de-commerce/post-bac', brandMentioned: true, snippet: "Delta Business School est citée parmi les 5 écoles innovantes recommandées en 2026..." },
            { url: 'challenges.fr/classement-grandes-ecoles', brandMentioned: false, snippet: "Classement traditionnel — Delta non listée (école jeune)" },
            { url: 'studyrama.fr/etudes-superieures/ecoles-de-commerce', brandMentioned: true, snippet: "Delta apparaît dans la catégorie post-bac modernes" },
          ],
        },
        {
          query: "Écoles de commerce Paris sans prépa admission directe",
          sources: [
            { url: 'letudiant.fr/etudes/ecoles-commerce/sans-prepa', brandMentioned: true, snippet: "Top 3 cité — Delta, PSB, ESG" },
            { url: 'reddit.com/r/EtudiantSup/comments/avis-ecoles-post-bac', brandMentioned: true, snippet: "Témoignage alumni Delta très positif (rated +24)" },
          ],
        },
        {
          query: "Pédagogie par projet école commerce Paris entrepreneuriat",
          sources: [
            { url: 'medium.com/@delta-business-school/pedagogie-projet', brandMentioned: true, snippet: "Article auto-promo Delta, bien référencé" },
            { url: 'linkedin.com/pulse/pedagogie-projet-ecole-commerce', brandMentioned: true, snippet: "Post LinkedIn alumni — engagement fort" },
          ],
        },
      ],
    },
    {
      id: 2,
      originalPrompt: "Comment intégrer une école de commerce en admission parallèle après une licence ?",
      llm: 'Claude',
      date: '2026-05-12',
      promptCount: 56,
      brandAppeared: true,
      brandAppearanceRate: 64,
      fanouts: [
        {
          query: "Admission parallèle école commerce Bac+2 critères 2026",
          sources: [
            { url: 'letudiant.fr/etudes/admission-parallele', brandMentioned: true, snippet: "Delta accepte Bac+2 avec dossier + entretien" },
            { url: 'studyrama.fr/admissions-paralleles', brandMentioned: true, snippet: "Fiche école Delta — admissions parallèles ouvertes" },
            { url: 'digiSchool.fr/admissions-paralleles-2026', brandMentioned: false, snippet: "Listing principalement Top 10 PGE" },
          ],
        },
        {
          query: "Concours admission parallèle écoles de commerce 2026",
          sources: [
            { url: 'letudiant.fr/concours-admission-parallele', brandMentioned: false, snippet: "Focus sur Tremplin, Passerelle, AST — Delta hors concours" },
            { url: 'reddit.com/r/EtudiantSup/comments/admission-parallele-2026', brandMentioned: true, snippet: "Discussion détaillée incluant Delta (admission directe)" },
          ],
        },
        {
          query: "Témoignages reconversion école commerce Bac+3",
          sources: [
            { url: 'reddit.com/r/EtudiantSup/comments/avis-delta-bac3', brandMentioned: true, snippet: "Témoignage Karim B. promo 2023, Delta admission parallèle" },
            { url: 'linkedin.com/posts/alumni-delta-reconversion', brandMentioned: true, snippet: "Post LinkedIn d'un alumni Delta — reconversion réussie" },
          ],
        },
      ],
    },
    {
      id: 3,
      originalPrompt: "Quel est le meilleur programme Master Grande École en France ?",
      llm: 'Perplexity',
      date: '2026-05-11',
      promptCount: 180,
      brandAppeared: false,
      brandAppearanceRate: 1,
      isDarkZone: true,
      fanouts: [
        {
          query: "Programme Grande École classement France 2026",
          sources: [
            { url: 'challenges.fr/classement-pge-2026', brandMentioned: false, snippet: "Top 10 PGE — Delta absent (non classée)" },
            { url: 'lefigaro.fr/etudiant/classement-grandes-ecoles', brandMentioned: false, snippet: "Top 15 — Delta absente" },
            { url: 'linternaute.com/classement-pge', brandMentioned: false, snippet: "Classement Le Point — Delta non listée" },
          ],
        },
        {
          query: "Top business schools Master programs France EQUIS AACSB",
          sources: [
            { url: 'aacsb.edu/accredited-schools/france', brandMentioned: false, snippet: "Delta non accréditée (procédure en cours)" },
            { url: 'efmd.org/equis/list', brandMentioned: false, snippet: "Delta non accréditée EQUIS" },
          ],
        },
        {
          query: "Master Grande École vs Master en France différence",
          sources: [
            { url: 'letudiant.fr/master-grande-ecole-vs-master', brandMentioned: false, snippet: "Article comparatif, Delta non citée" },
          ],
        },
      ],
    },
    {
      id: 4,
      originalPrompt: "École de commerce avec spécialisation entrepreneuriat ou tech",
      llm: 'ChatGPT',
      date: '2026-05-10',
      promptCount: 38,
      brandAppeared: true,
      brandAppearanceRate: 82,
      fanouts: [
        {
          query: "Meilleures écoles commerce entrepreneuriat France 2026",
          sources: [
            { url: 'medium.com/top-ecoles-entrepreneuriat-france', brandMentioned: true, snippet: "Delta listée parmi les 3 références" },
            { url: 'producthunt.com/alumni-startup-french-business-schools', brandMentioned: true, snippet: "3 startups Delta listées (Lumen Health, Tract.ai, Plume)" },
          ],
        },
        {
          query: "Incubateur étudiant école de commerce Paris",
          sources: [
            { url: 'medium.com/delta-incubateur-etudiants', brandMentioned: true, snippet: "Article Skop sur DeltaLab" },
            { url: 'linkedin.com/company/delta-business-school/posts', brandMentioned: true, snippet: "Page LinkedIn Delta — posts récents sur l'incubateur" },
          ],
        },
        {
          query: "Programme tech product business school France",
          sources: [
            { url: 'medium.com/delta-parcours-tech-product', brandMentioned: true, snippet: "Article sur le nouveau parcours Tech & Product" },
            { url: 'letudiant.fr/etudes/ecoles-commerce/specialisations', brandMentioned: false, snippet: "Listing spécialisations — Delta non listée (parcours récent)" },
          ],
        },
      ],
    },
  ],
};

// =============================================
// VISION : CONCURRENCE
// =============================================
export const competitionData = {
  myScore: 68,
  myRank: 4,
  totalPlayers: 5,
  explanation:
    "Delta Business School est en 4e position sur le marché des écoles de commerce parisiennes suivies. Le trio HEC/ESSEC/ESCP domine grâce à un volume d'apparition massif lié à leur ancienneté et leur présence dans les classements internationaux.",
  competitors: [
    {
      name: 'Delta Business School',
      isMe: true,
      url: 'https://delta-business.school',
      score: 68,
      visibility: 612,
      sentiment: 72,
      topLLM: 'ChatGPT',
      aiSummary:
        "Delta Business School est présentée comme une école jeune, parisienne, orientée entrepreneuriat avec une pédagogie par projet. Les IA mettent en avant la taille humaine des promotions et la levée de fonds régulière de ses alumni. Le manque de reconnaissance institutionnelle (pas d'accréditation EQUIS/AACSB) est aussi mentionné.",
    },
    {
      name: 'HEC Paris',
      isMe: false,
      url: 'https://www.hec.edu',
      score: 92,
      visibility: 8421,
      sentiment: 84,
      topLLM: 'ChatGPT',
      aiSummary:
        "HEC Paris est citée comme LA référence absolue des écoles de commerce françaises, classée n°1 sur le PGE, avec un réseau alumni mondial et des accréditations triples (EQUIS, AACSB, AMBA). Les IA la recommandent systématiquement pour les profils ambitionnant le top du marché (banque, conseil, corporate).",
    },
    {
      name: 'ESSEC Business School',
      isMe: false,
      url: 'https://www.essec.edu',
      score: 87,
      visibility: 5712,
      sentiment: 82,
      topLLM: 'ChatGPT',
      aiSummary:
        "ESSEC est positionnée comme la 2e du Top 3 historique, particulièrement reconnue pour la finance, le luxe et l'international. Campus de Cergy + Singapore + Maroc. Les IA la citent souvent comme alternative à HEC pour des profils légèrement plus internationaux.",
    },
    {
      name: 'ESCP Business School',
      isMe: false,
      url: 'https://escp.eu',
      score: 84,
      visibility: 4980,
      sentiment: 79,
      topLLM: 'Claude',
      aiSummary:
        "ESCP est mise en avant pour son ADN européen (6 campus dans 6 pays) et son Bachelor in Management trilingue. Les IA la décrivent comme « l'école la plus internationale » et la recommandent pour les profils qui veulent vivre/travailler à l'étranger.",
    },
    {
      name: 'PSB Paris School of Business',
      isMe: false,
      url: 'https://www.psbedu.paris',
      score: 61,
      visibility: 540,
      sentiment: 70,
      topLLM: 'Gemini',
      aiSummary:
        "PSB est positionnée comme une école post-bac de niveau « bon milieu de tableau », accessible (admissions parallèles nombreuses), Bachelor RNCP niveau 6 + Master Grande École RNCP niveau 7. Les IA la citent comme alternative pragmatique à Delta sur le segment post-bac parisien.",
    },
  ],
  sources: [
    { source: 'letudiant.fr', mentions: 41 },
    { source: 'challenges.fr', mentions: 33 },
    { source: 'studyrama.fr', mentions: 28 },
    { source: 'reddit.com/r/EtudiantSup', mentions: 19 },
  ],
  // Vue du marché par les IA
  marketView: {
    summary:
      "Les IA structurent le marché des écoles de commerce françaises en 3 tiers distincts qu'elles citent presque toujours dans le même ordre : (1) Top historique Parisiana (HEC, ESSEC, ESCP), (2) Top alternatives spécialisées (EDHEC, EM Lyon, Audencia), (3) Émergentes & post-bac (Delta, PSB, ICN, ESG).",
    structure: [
      {
        tier: 'Tier 1 — Top historique',
        schools: ['HEC Paris', 'ESSEC', 'ESCP'],
        usage: 'Citées systématiquement sur "meilleure école", "classement", "élite".',
      },
      {
        tier: 'Tier 2 — Spécialisées',
        schools: ['EM Lyon', 'EDHEC', 'Audencia'],
        usage: 'Citées par spécificité (luxe, finance, RSE) et international.',
      },
      {
        tier: 'Tier 3 — Émergentes post-bac',
        schools: ['Delta Business School', 'PSB', 'ICN', 'ESG'],
        usage: 'Citées sur entrepreneuriat, admission parallèle, post-bac sans prépa.',
      },
    ],
    topReferences: [
      { source: 'letudiant.fr', impact: 'Très fort', note: 'Cité par tous les LLM sur "écoles post-bac"' },
      { source: 'Classement Challenges (Top Grandes Écoles)', impact: 'Très fort', note: 'Source structurante du Tier 1' },
      { source: 'studyrama.fr', impact: 'Fort', note: 'Particulièrement utilisé par Gemini' },
      { source: 'classement Le Figaro étudiant', impact: 'Moyen', note: 'Cité surtout par Perplexity' },
      { source: 'LinkedIn (profils alumni)', impact: 'Moyen', note: 'Sert à Claude pour valider les débouchés réels' },
    ],
    keyMessages: [
      "« Si vous visez l'excellence académique, HEC/ESSEC/ESCP restent les choix sûrs »",
      "« Pour un cursus international ou spécialisé, regardez EM Lyon, EDHEC, Audencia »",
      "« Si vous voulez entreprendre dès la sortie du bac sans passer par la prépa, des écoles comme Delta Business School ou PSB sont des alternatives intéressantes »",
    ],
  },
};

// =============================================
// VISION : DISTRIBUTION
// =============================================
export const distributionData = {
  topLLM: 'ChatGPT',
  topLLMSource: 'letudiant.fr',
  byLLM: [
    { llm: 'ChatGPT', citations: 261, color: '#FE277E' },
    { llm: 'Claude', citations: 158, color: '#000000' },
    { llm: 'Gemini', citations: 112, color: '#FFCBE0' },
    { llm: 'Perplexity', citations: 58, color: '#A1A1AA' },
    { llm: 'Mistral', citations: 23, color: '#3F3F46' },
  ],
  timeline: [
    { date: '05/05', ChatGPT: 32, Claude: 21, Gemini: 14, Perplexity: 8, Mistral: 3 },
    { date: '06/05', ChatGPT: 35, Claude: 22, Gemini: 16, Perplexity: 8, Mistral: 3 },
    { date: '07/05', ChatGPT: 34, Claude: 20, Gemini: 17, Perplexity: 7, Mistral: 3 },
    { date: '08/05', ChatGPT: 41, Claude: 24, Gemini: 18, Perplexity: 10, Mistral: 3 },
    { date: '09/05', ChatGPT: 38, Claude: 22, Gemini: 17, Perplexity: 7, Mistral: 4 },
    { date: '10/05', ChatGPT: 42, Claude: 24, Gemini: 17, Perplexity: 8, Mistral: 4 },
    { date: '11/05', ChatGPT: 39, Claude: 25, Gemini: 13, Perplexity: 6, Mistral: 3 },
  ],
  sourcesByLLM: [
    { llm: 'ChatGPT', sources: ['letudiant.fr', 'challenges.fr', 'linkedin.com'] },
    { llm: 'Claude', sources: ['linkedin.com', 'medium.com', 'studyrama.fr'] },
    { llm: 'Gemini', sources: ['studyrama.fr', 'letudiant.fr', 'lefigaro.fr'] },
    { llm: 'Perplexity', sources: ['lefigaro.fr', 'leparisien.fr', 'letudiant.fr'] },
    { llm: 'Mistral', sources: ['linkedin.com', 'letudiant.fr', 'medium.com'] },
  ],
};

// =============================================
// VISION : SOURCES
// =============================================
export const sourcesData = {
  dailySources: [
    { source: 'letudiant.fr', citations: 38, type: 'Média étudiant', recommended: true },
    { source: 'challenges.fr', citations: 27, type: 'Classements', recommended: true },
    { source: 'studyrama.fr', citations: 23, type: 'Média étudiant', recommended: false },
    { source: 'linkedin.com', citations: 19, type: 'Réseau pro / alumni', recommended: false },
    { source: 'reddit.com/r/EtudiantSup', citations: 14, type: 'Forum étudiant', recommended: false },
    { source: 'lefigaro.fr/etudiant', citations: 11, type: 'Presse', recommended: false },
    { source: 'leparisien.fr/etudiant', citations: 8, type: 'Presse', recommended: false },
    { source: 'youtube.com', citations: 6, type: 'Vidéo / témoignages', recommended: false },
  ],
  recommendation: {
    source: 'letudiant.fr',
    reason:
      "letudiant.fr est cité par 4 LLM sur 5 quand on parle d'orientation post-bac. Publier 1 article ou un témoignage alumni par mois pourrait faire grimper la visibilité de Delta de 10-15 points.",
  },
};

// =============================================
// CRÉATION : STRATÉGIE
// =============================================
export const strategyData = {
  audience:
    'Lycéens en Terminale (Bac+0) · Étudiants en BTS/Licence cherchant une admission parallèle (Bac+2/+3) · Parents prescripteurs',
  goals: [
    "Apparaître dans le top 3 des réponses IA sur \"meilleure école de commerce post-bac à Paris\"",
    "Améliorer la perception face aux grandes écoles historiques (HEC, ESSEC, ESCP)",
    "Multiplier par 2 les candidatures en admissions parallèles d'ici 2026",
  ],
  channels: [
    { name: 'LinkedIn', frequency: '4 posts/semaine', tone: 'inspirant via stories alumni' },
    { name: 'Instagram', frequency: '5 posts + 3 stories/semaine', tone: 'campus life, étudiants actuels' },
    { name: 'Blog école / SEO', frequency: '1 article/semaine', tone: 'pédagogique, chiffres concrets' },
    { name: 'TikTok', frequency: '2 vidéos/semaine', tone: 'témoignages courts, immersion' },
    { name: 'Presse étudiante (L\'Etudiant, Studyrama)', frequency: '1 publication/mois', tone: 'factuel, retours diplômés' },
  ],
  toneOfVoice:
    "Inspirant et concret. Mettre en avant les projets étudiants réels et les parcours alumni. Parler de la vraie vie sur le campus parisien. Éviter le jargon des classements et le discours \"prestige\". Tutoyer en réseaux sociaux, vouvoyer en presse et site institutionnel.",
  explanation:
    "Cette stratégie a été pensée pour maximiser la présence de Delta Business School sur les sources qui structurent l'imaginaire « école de commerce » côté lycéens et parents (letudiant.fr, challenges.fr, studyrama.fr) tout en exploitant les forces de l'école : alumni entrepreneurs visibles + campus parisien + format post-bac.",
  // Méthodologie : la stratégie est dérivée de l'analyse fanout
  fanoutMethodology: {
    overview:
      "Cette stratégie n'est pas générique : elle est dérivée de l'analyse de 18 prompts utilisateurs réels et des 67 fanout queries que les IA ont générées en réponse. Pour chaque contenu proposé, vous voyez exactement quels prompts ont été analysés, quels fanouts on cible, quelles sources on veut capter, et pourquoi.",
    analyzedPrompts: 18,
    totalFanouts: 67,
    topTargetSources: ['letudiant.fr', 'medium.com', 'reddit.com/r/EtudiantSup', 'linkedin.com'],
    keyFindings: [
      {
        finding: "letudiant.fr est consulté par 78% des fanouts post-bac et capté 14× sur 23",
        type: 'opportunity',
      },
      {
        finding: "Sur la requête « Master Grande École », tous les fanouts ciblent les classements traditionnels — Delta absent",
        type: 'dark-zone',
      },
      {
        finding: "Medium et LinkedIn sont les meilleures sources pour les fanouts entrepreneuriat (capté 9/11 et 6/9)",
        type: 'strength',
      },
      {
        finding: "Reddit r/EtudiantSup est consulté par Claude et Gemini sur admissions parallèles",
        type: 'opportunity',
      },
    ],
  },
  // Contenus à créer, chacun dérivé d'une analyse fanout précise
  fanoutBasedContentPlan: [
    {
      id: 'plan-1',
      contentType: 'Article blog école',
      title: 'Pourquoi choisir une école post-bac plutôt qu\'une prépa en 2026 ?',
      channel: 'Blog interne (relayé sur Medium + LinkedIn)',
      analyzedPromptId: 1,
      analyzedPrompts: ['Quelle est la meilleure école de commerce post-bac à Paris ?'],
      keyFanoutsTargeted: [
        'Top business schools Paris post-bac 2026 ranking',
        'Écoles de commerce Paris sans prépa admission directe',
      ],
      keySourcesToCapture: ['letudiant.fr', 'medium.com', 'reddit.com/r/EtudiantSup'],
      reasoning:
        "Sur les 87 prompts analysés autour de « meilleure école post-bac Paris », 78% des fanouts passent par letudiant.fr et medium.com. En publiant un article structuré + témoignage sur ces canaux avec les bons mots-clés (« post-bac », « sans prépa », « projet »), on capte directement les fanouts de l'IA — 4 LLM sur 5 reprennent les articles letudiant.fr sous 72h.",
      expectedImpact: '+15 pts visibilité',
      status: 'En cours',
    },
    {
      id: 'plan-2',
      contentType: 'Post LinkedIn + Reddit',
      title: '3 alumni Delta qui ont levé 1M€+ + témoignages r/EtudiantSup',
      channel: 'LinkedIn (compte personnel) + Reddit',
      analyzedPromptId: 4,
      analyzedPrompts: [
        'École de commerce avec spécialisation entrepreneuriat ou tech',
        'Quelle est la meilleure école de commerce post-bac à Paris ?',
      ],
      keyFanoutsTargeted: [
        'Meilleures écoles commerce entrepreneuriat France 2026',
        'Incubateur étudiant école de commerce Paris',
      ],
      keySourcesToCapture: ['linkedin.com', 'medium.com', 'reddit.com/r/EtudiantSup'],
      reasoning:
        "Sur 38 prompts entrepreneuriat analysés, Delta apparaît dans 82% des cas — mais surtout via medium.com et LinkedIn (capté 9/11 et 6/9). Vos alumni qui ont levé des fonds sont citables. Un post personnel (≠ page entreprise) a 5× plus d'engagement et est capté par Claude et Gemini sous 48h.",
      expectedImpact: '+9 pts visibilité',
      status: 'En cours',
    },
    {
      id: 'plan-3',
      contentType: 'FAQ site + réponses Reddit',
      title: 'FAQ « Admissions parallèles » avec critères chiffrés + 2 réponses Reddit',
      channel: 'Site Delta + Reddit r/EtudiantSup',
      analyzedPromptId: 2,
      analyzedPrompts: ['Comment intégrer une école de commerce en admission parallèle après une licence ?'],
      keyFanoutsTargeted: [
        'Admission parallèle école commerce Bac+2 critères 2026',
        'Témoignages reconversion école commerce Bac+3',
      ],
      keySourcesToCapture: ['letudiant.fr', 'studyrama.fr', 'reddit.com/r/EtudiantSup'],
      reasoning:
        "Sur 56 prompts admissions parallèles, les fanouts cherchent des critères CHIFFRÉS (taux, dates, modalités). Une FAQ structurée schema.org sur le site + 2 réponses Reddit honnêtes capturent ces fanouts directement. Claude consulte spécifiquement reddit.com sur ce sujet.",
      expectedImpact: '+11 pts visibilité',
      status: 'À planifier',
    },
    {
      id: 'plan-4',
      contentType: 'Article Medium + page produit',
      title: 'Article « Pourquoi Delta n\'est pas dans le Top PGE — et comment le devenir »',
      channel: 'Medium (externe) + page programme PGE',
      analyzedPromptId: 3,
      analyzedPrompts: ['Quel est le meilleur programme Master Grande École en France ?'],
      keyFanoutsTargeted: [
        'Top business schools alternatives au PGE classique',
        'Master Grande École vs Master en France différence',
      ],
      keySourcesToCapture: ['medium.com', 'linkedin.com'],
      reasoning:
        "ZONE D'OMBRE : sur 180 prompts/mois autour de « Master Grande École », vous n'apparaissez QUE 1% du temps. Les fanouts ciblent uniquement le Top 10 PGE (challenges.fr, lefigaro.fr). Stratégie : se positionner sur les fanouts secondaires « alternative innovante » via Medium pour capter un narratif différent, en attendant l'accréditation EQUIS.",
      expectedImpact: '+8 pts visibilité',
      status: 'Non démarré',
    },
  ],
};

// =============================================
// CRÉATION : RÈGLES GEO & CANAUX
// =============================================
export const geoRules = {
  'external-presence': {
    label: 'Présence hors site',
    short: 'Hors site',
    icon: '🌍',
    description: "Posté sur le site ET en dehors. Les IA valorisent la présence multi-plateforme.",
  },
  'fresh-content': {
    label: 'Contenu régulier',
    short: 'Régulier',
    icon: '🔥',
    description: "Publication chaude et régulière. Les IA favorisent les contenus récents et vivants.",
  },
  'authority': {
    label: "Figure d'autorité",
    short: 'Autorité',
    icon: '👑',
    description: "Positionnement comme référence sur le sujet. Les IA aiment les voix expertes — mais pas que.",
  },
  'conversational': {
    label: 'Ton conversationnel',
    short: 'Conversationnel',
    icon: '💬',
    description: "Avis et retours d'expérience humains. Les IA basent beaucoup leurs réponses sur ces ressentis.",
  },
  'cited-sources': {
    label: 'Sources citées',
    short: 'Sources',
    icon: '🔗',
    description: "Liens et références vérifiables. Les IA veulent pouvoir contrôler les infos, surtout sur des sujets complexes.",
  },
  'multi-format': {
    label: 'Multi-format',
    short: 'Multi-format',
    icon: '🎨',
    description: "Déclinaison du contenu en plusieurs formats (texte + vidéo + visuel + audio). Les IA aiment aller chercher d'autres formats.",
  },
  'audience-fit': {
    label: 'Adapté audience',
    short: 'Audience',
    icon: '🎯',
    description: "Pertinent et calibré pour votre audience cible spécifique. Augmente fortement la résonance.",
  },
};

export const contentChannels = {
  'reddit': { label: 'Reddit', icon: '🟠' },
  'blog-internal': { label: 'Blog interne (site Delta)', icon: '📝' },
  'blog-external': { label: 'Blog externe (média)', icon: '📰' },
  'linkedin': { label: 'LinkedIn', icon: '💼' },
  'faq': { label: 'FAQ site', icon: '❓' },
};

// =============================================
// CRÉATION : STUDIO
// =============================================
export const studioContents = [
  {
    id: 1,
    type: 'Article blog école',
    channel: 'blog-internal',
    geoRules: ['authority', 'cited-sources', 'audience-fit'],
    title: 'Pourquoi choisir une école post-bac plutôt qu\'une prépa en 2026 ?',
    status: 'À valider',
    priority: 'haute',
    body: `# Pourquoi choisir une école post-bac plutôt qu'une prépa en 2026 ?

Tu es en Terminale et tu hésites entre une classe prépa et une école de commerce post-bac ? Voici les 4 points à connaître.

## 1. Le rythme

En prépa, deux années intenses de cours théoriques, puis un concours.
En école post-bac comme Delta Business School, on entre en école dès la rentrée et on alterne théorie, projets et stages dès la 1re année.

## 2. La pédagogie

Les écoles post-bac modernes misent sur l'**apprentissage par projet** : tu travailles sur des cas réels avec des entreprises partenaires dès la 1re année.

## 3. Le coût

Une école post-bac coûte autour de 9 000-11 000 € par an. Mais c'est aussi 5 ans de stages, d'alternance et de réseau professionnel.

## 4. Les débouchés

À Delta Business School, 92% de nos alumni sont en poste 6 mois après leur diplôme, dont 28% comme fondateurs ou co-fondateurs de leur entreprise.

—
Article rédigé par l'équipe pédagogique de Delta Business School.`,
  },
  {
    id: 2,
    type: 'Post LinkedIn',
    channel: 'linkedin',
    geoRules: ['external-presence', 'conversational', 'fresh-content'],
    title: '3 alumni Delta Business School qui ont levé 1M€+ cette année',
    status: 'À valider',
    priority: 'haute',
    body: `3 alumni Delta Business School ont levé plus d'1M€ depuis janvier.

Trois parcours, trois secteurs, trois preuves que l'entrepreneuriat n'attend pas un MBA.

🟢 Léa, promo 2023 — fondatrice de Lumen Health (FemTech) — 1,8M€ en seed
🟢 Karim, promo 2021 — cofondateur de Tract.ai (logistique IA) — 3,2M€ en seed
🟢 Inès, promo 2024 — fondatrice de Plume (édition assistée par IA) — 1,1M€ en pre-seed

Leur point commun ?
→ Un MVP lancé pendant leur 3e année à Delta
→ Un mentorat avec un alumni entrepreneur dès la 2e année
→ Un accès au DeltaLab dès leurs idées les plus brutes

L'entrepreneuriat se transmet. Notre rôle, c'est de créer le cadre pour que ça arrive.

#Delta #Entrepreneuriat #EcoleDeCommerce`,
  },
  {
    id: 3,
    type: 'Réponse Reddit',
    channel: 'reddit',
    geoRules: ['external-presence', 'conversational', 'audience-fit'],
    title: 'r/EtudiantSup — "Avis sur Delta Business School ?"',
    status: 'En cours',
    priority: 'moyenne',
    body: `Hey, je suis actuellement en 4e année à Delta Business School, je peux te donner mon retour honnête.

Ce que j'aime :
- Promo à taille humaine (~80 par année), donc on connaît vraiment ses profs et ses camarades
- Beaucoup d'intervenants pros (anciens de Doctolib, BlaBlaCar, etc.) plutôt que des profs académiques uniquement
- L'accompagnement entrepreneurial dès la 2e année si tu veux monter ton projet (DeltaLab)
- Campus parisien à Bastille, facile d'accès

Ce qui peut décevoir :
- C'est une école jeune, donc moins de "marque" que HEC ou ESSEC sur le CV
- Pas encore d'AACSB / EQUIS — donc moins reconnu à l'international que les Top 5
- Le tarif (~10k/an) reste un investissement, surtout sans alternance

Honnêtement, si tu veux une école orientée projet/entrepreneuriat et que tu n'es pas obsédé par le classement, ça vaut le coup. Si tu vises un poste corporate finance en banque d'affaires, regarde plutôt les ESSEC/ESCP.

Si tu as des questions précises, je peux y répondre.`,
  },
  {
    id: 4,
    type: 'FAQ site école',
    channel: 'faq',
    geoRules: ['cited-sources', 'audience-fit', 'multi-format'],
    title: 'Combien coûte vraiment une école de commerce sur 5 ans ?',
    status: 'Brouillon',
    priority: 'moyenne',
    body: `## Question : Combien coûte vraiment une école de commerce sur 5 ans ?

Une école de commerce post-bac en France représente un investissement total compris entre **45 000 et 75 000 €** sur 5 ans, hors logement et vie courante. À Delta Business School, le coût total scolarité varie selon votre parcours.

### Détail des frais à Delta Business School

| Année | Statut | Frais à votre charge |
| --- | --- | --- |
| Année 1-2 (Bachelor) | Initiale | 9 800 € / an |
| Année 3 | Initiale ou alternance | 10 200 € / an |
| Année 4-5 (Master) | Alternance (90 % des cas) | **0 € — pris en charge par l'entreprise** |

### Aides et financements possibles

- **Bourses CROUS** : cumulables avec les frais Delta (jusqu'à 6 335 €/an)
- **Prêt étudiant garanti par l'État** : jusqu'à 20 000 € sans caution
- **Bourse Delta Audace** : 30 % de remise pour les profils méritants
- **Alternance dès l'année 3** : frais payés par l'entreprise + salaire

### Et le retour sur investissement ?

Salaire médian d'un alumni Delta à 3 ans après le diplôme : **47 K€ brut/an** (source : enquête diplômés Delta 2024).

→ [Télécharger le simulateur de coût et ROI au format Excel](#simulateur)
→ [Voir la vidéo "10 minutes pour comprendre le financement d'une école"](#video)
→ [Prendre RDV avec un conseiller financement](#rdv)`,
  },
];

// Ajout au studio : Script YouTube, Idée podcast, Script publicité, Avis vitrine
studioContents.push(
  {
    id: 5,
    type: 'Script vidéo YouTube',
    channel: 'blog-external',
    geoRules: ['multi-format', 'authority', 'audience-fit'],
    title: '10 minutes pour comprendre le financement d\'une école de commerce',
    status: 'À valider',
    priority: 'haute',
    body: `# Script vidéo YouTube — 10 minutes financement école de commerce

[OUVERTURE — 0:00 → 0:30]
"Tu envisages de faire une école de commerce mais tu as peur de la facture finale ? T'inquiète : aujourd'hui je t'explique en 10 minutes exactement comment ça se finance — bourses, alternance, prêts — et combien ça coûte VRAIMENT."

[CONTEXTE — 0:30 → 2:00]
Présenter le chiffre choc : 45 000 à 75 000 € sur 5 ans selon l'école et le statut.

[STRUCTURE — 2:00 → 8:00]
Partie 1 — Les frais réels année par année (avec tableau visuel à l'écran)
Partie 2 — L'alternance dès la 3e année (qui change tout)
Partie 3 — Les bourses CROUS + Delta Audace + prêts garantis par l'État
Partie 4 — ROI à 3 ans : salaire moyen alumni

[CTA — 8:00 → 10:00]
"Lien dans la description pour télécharger notre simulateur Excel + prendre RDV avec un conseiller financement."

—
🎯 Pourquoi cette vidéo pour le GEO :
- Format vidéo (les IA cherchent du multi-format)
- Très précis et chiffré (sources vérifiables)
- Ciblé parents + lycéens (audience double)`,
  },
  {
    id: 6,
    type: 'Idée podcast',
    channel: 'blog-external',
    geoRules: ['multi-format', 'conversational', 'external-presence'],
    title: 'Série podcast — "Mon premier million : 5 entrepreneurs Delta racontent"',
    status: 'Brouillon',
    priority: 'moyenne',
    body: `# Concept podcast — Mon premier million

## Format
5 épisodes de 25-35 min, format interview détendue avec des alumni Delta qui ont levé > 1M€ ou atteint > 1M€ de CA.

## Pitch
"Pas de mythologie startup. Pas de leçons. Juste 5 fondateurs Delta qui racontent comment ils sont passés de l'idée sur le coin d'une table en 2e année à leur première vraie réussite."

## 5 épisodes proposés
1. Léa (Lumen Health) — comment elle a transformé son projet d'année 4 en startup FemTech 1,8M€
2. Karim (Tract.ai) — la pivot qui a sauvé sa startup logistique
3. Inès (Plume) — édition assistée par IA, 18 mois pour valider un marché
4. Marc (Vestio) — la marque éthique née d'un cours sur la RSE
5. Diane (Talker) — l'app de notes vocales qui cartonne en Allemagne

## Format de diffusion
- Apple Podcasts + Spotify + Deezer (multi-plateforme)
- YouTube (visuel pour les extraits courts)
- Article résumé pour chaque épisode sur le blog Delta

🎯 Pourquoi ce podcast pour le GEO :
- Multi-format (audio + transcript écrit + vidéo extraits)
- Conversationnel (les LLM adorent les témoignages réels)
- Hors site (toutes les plateformes podcast = présence externe)`,
  },
  {
    id: 7,
    type: 'Script publicité courte',
    channel: 'blog-external',
    geoRules: ['conversational', 'audience-fit'],
    title: 'Spot pub TikTok 30s — "Tu n\'as pas la prépa ? Tant mieux."',
    status: 'À valider',
    priority: 'moyenne',
    body: `# Script TikTok / pub courte (30s)

[0-3s] — Plan rapproché étudiant à un bureau, livres ouverts.
VOIX : "T'as pas eu la prépa que tu visais ?"

[3-6s] — Coupure. Le même étudiant en groupe avec un mentor sur un campus parisien.
VOIX : "Tant mieux."

[6-15s] — Montage rapide : étudiants en train de pitcher devant un public, alumni qui sort de Doctolib, projet de groupe, soutenance.
VOIX : "À Delta Business School, on apprend par projet. Avec des entrepreneurs en activité. Et 28% de nos alumni créent leur boîte dans les 3 ans."

[15-22s] — Plan large étudiants qui rigolent sur la terrasse du campus Bastille.
VOIX : "Pas de classement à courir. Juste un cursus qui prépare à entreprendre."

[22-30s] — Sur fond noir : LOGO Delta Business School + texte "Candidatures ouvertes · delta-business.school"
VOIX : "Delta. Pour ceux qui veulent faire, pas juste apprendre."

🎯 Pourquoi cette pub pour le GEO :
- Conversationnel (storytelling personnel)
- Adapté audience (lycéens TikTok, ton direct, format court)`,
  },
);

// =============================================
// CRÉATION : STATS (combien de créa Skop a fait)
// =============================================
export const creationStats = {
  totalGenerated: 47,
  totalCopied: 31,
  totalPublished: 18,
  avgGeoScore: 78,
  thisWeek: 7,
  copyRate: 66, // %
  publishRate: 38, // %
};

// =============================================
// CRÉATION : GAPS STRATÉGIQUES COMBLÉS
// (relié aux zones d'ombre de Vision)
// =============================================
export const strategyGaps = [
  {
    zone: 'Programmes Master Grande École post-bac',
    description: "Zone d'ombre identifiée — 180 prompts/sem, 2 apparitions seulement.",
    addressedBy: [
      { id: 1, title: 'Article blog "Pourquoi choisir une école post-bac"' },
      { id: 4, title: 'FAQ "Combien coûte vraiment une école"' },
    ],
    impactScore: '+14 pts',
    status: 'En cours',
  },
  {
    zone: 'Études en alternance Bac+5 Paris',
    description: 'Cité 8% du temps malgré une offre alternance dès l\'année 3.',
    addressedBy: [
      { id: 2, title: 'Post LinkedIn "3 alumni qui ont levé 1M€"' },
    ],
    impactScore: '+11 pts',
    status: 'En cours',
  },
  {
    zone: 'École de commerce + IA / data',
    description: 'Sujet en forte croissance (+45%/2 mois), Delta absente.',
    addressedBy: [],
    impactScore: '+8 pts',
    status: 'Non traité',
  },
  {
    zone: 'Concours commun Sésame / Accès',
    description: '94 prompts/sem où Delta n\'apparaît jamais.',
    addressedBy: [],
    impactScore: '+9 pts',
    status: 'Non traité',
  },
  {
    zone: 'Reconnaissance internationale d\'un diplôme français',
    description: '0% de présence sur 52 prompts/sem.',
    addressedBy: [],
    impactScore: '+7 pts',
    status: 'Non traité',
  },
];

// =============================================
// CRÉATION : AVIS / TÉMOIGNAGES
// =============================================
export const reviewsData = {
  intro:
    "Skop va chercher automatiquement les avis sur votre marque (Google, L'Étudiant, Trustpilot…) et indique d'où chaque avis provient. Certains sont réutilisés pour créer du contenu — c'est signalé sur le contenu concerné.",
  // Avis individuels récupérés, avec leur source d'origine.
  // usedInContentId : id du contenu (studioContents) qui réutilise cet avis.
  reviews: [
    {
      id: 'rev-1',
      author: 'Léa M., promo 2024',
      source: 'Google Reviews',
      sourceUrl: 'https://g.page/delta-business-school/reviews',
      rating: 5,
      text: "Délégué de promo pendant 3 ans, je peux dire que l'équipe pédagogique est ultra dispo. Les intervenants pros valent l'or qu'on paye. Ma boîte est née pendant mon année de 3e année.",
      date: '2026-04-22',
      new: true,
      usedInContentId: 3,
    },
    {
      id: 'rev-2',
      author: 'Karim B., promo 2023',
      source: "L'Étudiant — fiche école",
      sourceUrl: 'https://letudiant.fr/ecole/delta-business-school/avis',
      rating: 4,
      text: "Solide école post-bac. On sent que c'est jeune (peu d'alumni installés vs HEC) mais l'accompagnement entrepreneurial est vraiment singulier. J'ai trouvé mon alternance grâce à un prof.",
      date: '2026-03-15',
      usedInContentId: 1,
    },
    {
      id: 'rev-3',
      author: 'Inès R., parent d\'élève',
      source: 'Trustpilot',
      sourceUrl: 'https://trustpilot.com/review/delta-business.school',
      rating: 5,
      text: "Ma fille a hésité entre prépa et Delta. Le suivi personnalisé et la transparence sur les frais nous ont convaincus. Aucun regret après 2 ans.",
      date: '2026-04-30',
      new: true,
    },
    {
      id: 'rev-4',
      author: 'Thomas L., promo 2022',
      source: 'Studyrama — fiche école',
      sourceUrl: 'https://studyrama.com/ecole/delta-business-school',
      rating: 4,
      text: "L'alternance dès la 3e année m'a permis de financer mes études et d'être embauché chez mon entreprise d'accueil avant même le diplôme.",
      date: '2026-02-18',
    },
    {
      id: 'rev-5',
      author: 'Sarah K., promo 2024',
      source: 'Google Reviews',
      sourceUrl: 'https://g.page/delta-business-school/reviews',
      rating: 5,
      text: "Le DeltaLab (incubateur étudiant) est ce qui distingue vraiment l'école. J'y ai lancé mon premier projet avec un mentor alumni.",
      date: '2026-05-04',
      new: true,
    },
  ],
};

// =============================================
// CRÉATION : JOURNAL — contenus publiés
// (lié au tracking : avant/après visibilité)
// =============================================
export const libraryData = {
  intro:
    "Archive de vos contenus effectivement publiés. Pour chacun, Skop mesure l'impact sur votre score de visibilité IA : avant publication vs après. C'est la preuve directe du ROI de Skop.",
  globalStats: {
    totalPublished: 18,
    totalImpact: '+26 pts',
    avgImpactPerContent: '+1.4 pts',
    topPerformer: 'Article "Pourquoi choisir une école post-bac"',
  },
  publishedContents: [
    {
      id: 'p1',
      title: 'Pourquoi choisir une école post-bac plutôt qu\'une prépa en 2026 ?',
      type: 'Article blog école',
      channel: 'blog-internal',
      publishedAt: '2026-04-15',
      visibilityBefore: 53,
      visibilityAfter: 62,
      impact: 9,
      mentions: 47,
      url: 'https://delta-business.school/blog/post-bac-vs-prepa',
    },
    {
      id: 'p2',
      title: '3 alumni Delta qui ont levé 1M€+ cette année',
      type: 'Post LinkedIn',
      channel: 'linkedin',
      publishedAt: '2026-04-22',
      visibilityBefore: 60,
      visibilityAfter: 66,
      impact: 6,
      mentions: 28,
      url: 'https://linkedin.com/posts/delta-business-school-alumni-leves',
    },
    {
      id: 'p3',
      title: 'Réponse Reddit — r/EtudiantSup',
      type: 'Réponse Reddit',
      channel: 'reddit',
      publishedAt: '2026-04-28',
      visibilityBefore: 64,
      visibilityAfter: 67,
      impact: 3,
      mentions: 12,
      url: 'https://reddit.com/r/EtudiantSup/comments/avis-delta',
    },
    {
      id: 'p4',
      title: 'FAQ "Combien coûte une école de commerce sur 5 ans"',
      type: 'FAQ site école',
      channel: 'faq',
      publishedAt: '2026-05-03',
      visibilityBefore: 66,
      visibilityAfter: 71,
      impact: 5,
      mentions: 23,
      url: 'https://delta-business.school/faq/cout-ecole-de-commerce',
    },
    {
      id: 'p5',
      title: 'Témoignage alumni — vidéo YouTube',
      type: 'Vidéo YouTube',
      channel: 'blog-external',
      publishedAt: '2026-05-08',
      visibilityBefore: 70,
      visibilityAfter: 68,
      impact: -2,
      mentions: 8,
      url: 'https://youtube.com/watch?v=delta-alumni-temoignage',
    },
  ],
  // Évolution score visibilité avec marqueurs de publication
  visibilityTimeline: [
    { date: '08/04', score: 50, publication: null },
    { date: '15/04', score: 53, publication: 'Article post-bac vs prépa' },
    { date: '22/04', score: 60, publication: '3 alumni 1M€' },
    { date: '28/04', score: 64, publication: 'Reddit r/EtudiantSup' },
    { date: '03/05', score: 67, publication: 'FAQ coûts école' },
    { date: '08/05', score: 70, publication: 'Vidéo alumni YT' },
    { date: '11/05', score: 68, publication: null },
  ],
};

// =============================================
// CRÉATION : SCHÉMA AMÉLIORATIONS SITE
// =============================================
export const siteImprovements = [
  {
    id: 'home',
    page: "Page d'accueil",
    title: 'Ajouter FAQ + chiffres employabilité',
    before: ['Hero image + slogan', 'Bouton CTA "Candidater"', 'Vidéo de présentation'],
    after: ['Hero image + slogan', '3 KPIs employabilité (92% à 6 mois)', 'Bouton CTA "Candidater"', 'FAQ structurée (8 questions clés)', '3 témoignages alumni'],
    geoImpact: '+12 pts',
    effort: 'Moyen',
  },
  {
    id: 'pge',
    page: 'Page "Programme Grande École"',
    title: 'Ajouter section RNCP + critères chiffrés',
    before: ['Description prose 2 paragraphes', 'Galerie photo', 'Bouton "En savoir +"'],
    after: ['Description courte', 'Bloc RNCP / Reconnaissance État', '4 chiffres clés (durée, frais, alternance, débouchés)', 'Galerie photo', 'CTA candidature'],
    geoImpact: '+9 pts',
    effort: 'Faible',
  },
  {
    id: 'alumni',
    page: 'Page "Alumni"',
    title: 'Créer une page profils + parcours',
    before: ['Page non existante'],
    after: ['Page nouvelle créée', '20+ profils alumni avec photo + parcours', 'Filtres par secteur / promo', 'Tags "fondateur", "cadre", "international"'],
    geoImpact: '+8 pts',
    effort: 'Élevé',
  },
];

// =============================================
// CRÉATION : OPTIMISATION
// =============================================
export const optimizationData = {
  recommendation: {
    type: 'Article blog école',
    topic: 'Comparatif Delta Business School vs PSB pour les admissions parallèles 2026',
    reason:
      "Cette requête remonte 56 fois cette semaine sans réponse claire de la part des IA. Vous avez ici une opportunité de capter du trafic qualifié de Bac+2/+3 hésitant entre les deux écoles.",
    expectedImpact: '+12 points de visibilité estimés',
  },
  siteAudit: [
    { item: 'Ajouter une FAQ « Admissions parallèles » avec les critères chiffrés', impact: 'Élevé' },
    { item: 'Inclure les chiffres d\'employabilité (taux à 6 mois, salaire médian) sur la page accueil', impact: 'Élevé' },
    { item: 'Créer une page « Profils d\'alumni » avec parcours détaillés + secteur', impact: 'Moyen' },
    { item: 'Ajouter le balisage schema.org EducationalOrganization', impact: 'Moyen' },
    { item: 'Remplacer les plaquettes PDF par des pages HTML indexables', impact: 'Faible' },
  ],
};

// =============================================
// VISION : PERSONAS
// =============================================
export const personasData = {
  intro:
    "Skop simule 3 profils types qui pourraient interroger une IA à propos d'une école de commerce. Pour chaque persona, vous voyez les prompts posés et si votre marque est citée dans la réponse.",
  personas: [
    {
      id: 'lyceen',
      name: 'Léa, 17 ans',
      role: 'Lycéenne en Terminale ES',
      avatar: '🎓',
      city: 'Lyon',
      visibilityScore: 76,
      details: [
        "Bac+0, n'a pas envie de faire prépa",
        "Veut une école orientée projet, idéalement entrepreneuriat",
        "Parents inquiets du coût et du prestige",
        "Consulte ChatGPT et TikTok pour s'orienter",
      ],
      prompts: [
        { question: "Quelle école de commerce post-bac me permettra de monter ma propre boîte ?", appeared: true, llm: 'ChatGPT' },
        { question: "Différence entre prépa et école post-bac en 2026", appeared: true, llm: 'Claude' },
        { question: "Coût total d'une école de commerce sur 5 ans à Paris", appeared: true, llm: 'Gemini' },
        { question: "Avis Delta Business School ?", appeared: true, llm: 'ChatGPT' },
        { question: "Programme Grande École vs Bachelor : c'est quoi la différence ?", appeared: false, llm: 'Gemini' },
      ],
      bestAiResponse:
        "Si tu veux une école orientée entrepreneuriat dès la sortie du bac, regarde Delta Business School à Paris ou PSB Paris School of Business. Delta met particulièrement l'accent sur les projets entrepreneuriaux dès la 2e année avec un incubateur étudiant.",
      bestAiLLM: 'ChatGPT',
    },
    {
      id: 'parent',
      name: 'Sophie, 48 ans',
      role: 'Maman d\'un lycéen prescripteur',
      avatar: '👩‍💼',
      city: 'Paris',
      visibilityScore: 58,
      details: [
        "Investit dans la formation de son fils",
        "Veut comprendre le ROI et la sécurité du diplôme",
        "Sceptique sur les écoles « jeunes »",
        "Plus formelle : utilise ChatGPT et Perplexity",
      ],
      prompts: [
        { question: "Salaire moyen à la sortie d'une école de commerce post-bac", appeared: true, llm: 'ChatGPT' },
        { question: "Quelles écoles de commerce sont reconnues par l'État ?", appeared: false, llm: 'Perplexity' },
        { question: "Pourquoi choisir une école jeune plutôt qu'HEC ?", appeared: true, llm: 'ChatGPT' },
        { question: "Diplôme RNCP niveau 7 : qu'est-ce que ça veut dire ?", appeared: false, llm: 'Claude' },
        { question: "Comment financer une école de commerce de 50 000 € ?", appeared: false, llm: 'Gemini' },
      ],
      bestAiResponse:
        "Pour une école comme Delta Business School, le diplôme est visé par l'État au niveau Bachelor (Bac+3) et le Master en cours d'enregistrement au RNCP niveau 7. Les chiffres d'employabilité affichés (92% à 6 mois) restent à vérifier sur les rapports officiels.",
      bestAiLLM: 'ChatGPT',
    },
    {
      id: 'reorientation',
      name: 'Karim, 21 ans',
      role: 'Étudiant en Licence éco, en réorientation',
      avatar: '🔄',
      city: 'Bordeaux',
      visibilityScore: 71,
      details: [
        "Bac+2 validé, cherche admission parallèle",
        "Veut un environnement plus pratique que l'université",
        "Budget serré : alternance obligatoire",
        "Cherche sur Reddit + ChatGPT",
      ],
      prompts: [
        { question: "Admission parallèle école de commerce après une licence éco-gestion", appeared: true, llm: 'Claude' },
        { question: "École de commerce en alternance dès la 3e année à Paris", appeared: true, llm: 'ChatGPT' },
        { question: "Témoignages reconversion vers une école de commerce", appeared: true, llm: 'Claude' },
        { question: "Delta Business School admission parallèle critères", appeared: true, llm: 'ChatGPT' },
        { question: "Comparatif PSB / Delta / ESG pour admissions parallèles", appeared: true, llm: 'Gemini' },
      ],
      bestAiResponse:
        "Delta Business School accepte des admissions parallèles en 3e année à condition d'avoir validé un Bac+2 (licence éco, BTS, DUT GEA). Le passage en alternance dès la 3e année est possible et c'est l'option la plus courante des étudiants en réorientation à Delta.",
      bestAiLLM: 'ChatGPT',
    },
  ],
};

// =============================================
// (Sections supprimées le 2026-05-15)
// - darkZonesData : section « Zones d'ombre » retirée de Vision
// - crawlData : section « Crawl IA » retirée du produit
// =============================================

// =============================================
// JOURNALISTES — Identification + analyse + pitch
// =============================================
export const journalistsData = {
  intro:
    "Skop identifie les journalistes qui couvrent votre secteur, analyse leurs préférences éditoriales et génère des pitches personnalisés. L'objectif : obtenir un article qui sera cité par les IA — c'est le levier #1 de visibilité IA durable.",
  kpis: {
    totalTracked: 47,
    neverMentionedYou: 31,
    pitchesSent: 8,
    articlesPublished: 3,
  },
  journalists: [
    {
      id: 1,
      name: 'Sophie Bernard',
      initials: 'SB',
      outlet: "L'Étudiant",
      role: 'Rédactrice en chef — Études supérieures',
      beat: 'Écoles de commerce post-bac, admissions parallèles, employabilité',
      status: 'never-mentioned',
      lastArticleDate: '2026-04-22',
      aiCitationScore: 87,
      avgAiCitations: 12,
      contact: 'sophie.bernard@letudiant.fr',
      socials: { linkedin: 'sophie-bernard-etudiant', twitter: '@sophiebrnd' },
      editorialPreferences: [
        "Cite toujours des chiffres concrets (taux d'employabilité, salaires médians)",
        'Préfère les angles « alternative » plutôt que les classements traditionnels',
        'Aime les témoignages alumni en première personne',
        'Évite le jargon académique',
      ],
      preferredAngles: [
        { type: 'data', label: 'Donnée chiffrée exclusive' },
        { type: 'testimony', label: 'Témoignage alumni' },
        { type: 'trend', label: 'Tendance émergente' },
      ],
      recentArticles: [
        { title: 'Top 5 des écoles post-bac qui montent en 2026', date: '2026-04-22', aiCitations: 18 },
        { title: 'Pourquoi 30% des bacheliers fuient la prépa', date: '2026-03-15', aiCitations: 14 },
        { title: 'Écoles de commerce : ce que les recruteurs valorisent vraiment', date: '2026-02-08', aiCitations: 11 },
      ],
      whyPitch:
        "Sophie couvre exactement votre cible (post-bac) et ses articles sont massivement cités par ChatGPT et Claude. 87% de ses publications ressortent dans les fanouts IA — c'est le contact #1 pour Delta.",
    },
    {
      id: 2,
      name: 'Marc Dupuis',
      initials: 'MD',
      outlet: 'Challenges',
      role: 'Journaliste senior — Classement Grandes Écoles',
      beat: 'PGE, accréditations, classements internationaux',
      status: 'never-mentioned',
      lastArticleDate: '2026-05-02',
      aiCitationScore: 92,
      avgAiCitations: 24,
      contact: 'm.dupuis@challenges.fr',
      socials: { linkedin: 'marc-dupuis-challenges', twitter: '@marcdupuis' },
      editorialPreferences: [
        "S'appuie quasi exclusivement sur le classement Challenges",
        'Privilégie les écoles accréditées (EQUIS, AACSB, AMBA)',
        "Sensible aux trajectoires d'écoles « en marche vers le Top »",
      ],
      preferredAngles: [
        { type: 'data', label: 'Donnée chiffrée exclusive' },
        { type: 'trend', label: 'Tendance émergente' },
        { type: 'exclusive', label: 'Annonce exclusive' },
      ],
      recentArticles: [
        { title: 'Classement Challenges 2026 : qui monte, qui descend', date: '2026-05-02', aiCitations: 38 },
        { title: 'Les écoles qui décrochent leurs premières accréditations', date: '2026-04-12', aiCitations: 21 },
      ],
      whyPitch:
        "Difficile d'accès — 92% de citations IA mais ne couvre QUE le Top classement. Pitch possible : « Delta candidate à EQUIS, voici nos chiffres » pour anticiper son article annuel sur les nouveaux entrants.",
    },
    {
      id: 3,
      name: 'Elsa Mercier',
      initials: 'EM',
      outlet: 'Studyrama',
      role: 'Reporter — Alternance & insertion pro',
      beat: 'Alternance, insertion professionnelle, partenariats entreprises',
      status: 'mentioned',
      lastArticleDate: '2026-04-29',
      aiCitationScore: 71,
      avgAiCitations: 8,
      contact: 'elsa.mercier@studyrama.com',
      socials: { linkedin: 'elsa-mercier-studyrama', twitter: '@elsa_mrc' },
      editorialPreferences: [
        "Aime les chiffres d'alternance détaillés (% d'alternants, entreprises partenaires)",
        'Format : interview + dossier sectoriel',
        "Sensible aux écoles avec un fort réseau d'entreprises tech",
      ],
      preferredAngles: [
        { type: 'testimony', label: 'Témoignage alumni' },
        { type: 'data', label: 'Donnée chiffrée exclusive' },
        { type: 'partnership', label: 'Partenariat entreprise' },
      ],
      recentArticles: [
        { title: 'Alternance dans les écoles de commerce : la nouvelle norme', date: '2026-04-29', aiCitations: 9, mentionsYou: true },
        { title: '10 écoles qui placent 90% de leurs étudiants en alternance', date: '2026-03-20', aiCitations: 7 },
      ],
      whyPitch:
        "Elle vous a déjà cité une fois. Idéal pour un pitch « partenariat entreprise » avec Doctolib ou BlaBlaCar. Préfère les chiffres d'alternance détaillés.",
    },
    {
      id: 4,
      name: 'Karim Belhadj',
      initials: 'KB',
      outlet: 'Le Figaro Étudiant',
      role: 'Chroniqueur orientation post-bac',
      beat: "Orientation, choix d'études, stratégies pour bacheliers",
      status: 'never-mentioned',
      lastArticleDate: '2026-05-08',
      aiCitationScore: 64,
      avgAiCitations: 6,
      contact: 'k.belhadj@lefigaro.fr',
      socials: { linkedin: 'karim-belhadj-figaro', twitter: '@karimbelhadj' },
      editorialPreferences: [
        'Articles destinés aux parents — ton rassurant et factuel',
        'Aime les comparaisons (prépa vs école post-bac, etc.)',
        'Cite des experts : DRH, recruteurs, anciens étudiants',
      ],
      preferredAngles: [
        { type: 'comparison', label: 'Comparaison / benchmark' },
        { type: 'expert', label: "Avis d'expert" },
        { type: 'testimony', label: 'Témoignage alumni' },
      ],
      recentArticles: [
        { title: 'Prépa ou école post-bac : que choisir en 2026 ?', date: '2026-05-08', aiCitations: 8 },
        { title: 'Combien coûte vraiment une école de commerce ?', date: '2026-04-03', aiCitations: 6 },
      ],
      whyPitch:
        "Cible parfaite pour les parents prescripteurs. Pitch : « Données 2026 sur l'employabilité post-bac vs prépa » — il adore les comparatifs chiffrés.",
    },
    {
      id: 5,
      name: 'Inès Rousseau',
      initials: 'IR',
      outlet: 'Les Échos Start',
      role: 'Journaliste startups & nouvelles écoles',
      beat: 'Entrepreneuriat étudiant, écoles innovantes, alumni qui lèvent',
      status: 'pitch-sent',
      lastArticleDate: '2026-05-11',
      aiCitationScore: 78,
      avgAiCitations: 14,
      contact: 'i.rousseau@lesechos-start.fr',
      socials: { linkedin: 'ines-rousseau-echos', twitter: '@inesrss' },
      editorialPreferences: [
        "Histoires d'alumni qui ont levé des fonds",
        'Pédagogie par projet, incubateurs étudiants',
        'Format : portrait + données',
      ],
      preferredAngles: [
        { type: 'testimony', label: 'Témoignage alumni' },
        { type: 'exclusive', label: 'Annonce exclusive' },
        { type: 'trend', label: 'Tendance émergente' },
      ],
      recentArticles: [
        { title: '15 alumni français qui ont levé > 1M€ en 2025', date: '2026-05-11', aiCitations: 21 },
        { title: 'Les écoles qui forment les fondateurs de demain', date: '2026-04-04', aiCitations: 17 },
      ],
      whyPitch:
        "Pitch envoyé sur les 3 alumni Delta qui ont levé > 1M€. En attente de réponse. Très bonne cible pour notre angle entrepreneuriat.",
    },
    {
      id: 6,
      name: 'Thomas Lecomte',
      initials: 'TL',
      outlet: 'Capital',
      role: 'Journaliste finance & business schools',
      beat: 'Salaires post-diplôme, débouchés finance/conseil, coût des études',
      status: 'article-published',
      lastArticleDate: '2026-04-18',
      aiCitationScore: 81,
      avgAiCitations: 16,
      contact: 't.lecomte@capital.fr',
      socials: { linkedin: 'thomas-lecomte-capital', twitter: '@tlecomte' },
      editorialPreferences: [
        'Investissement / ROI des études (salaires médians)',
        'Données chiffrées brutes',
        'Aime les écoles « rentables » (rapport coût/débouchés)',
      ],
      preferredAngles: [
        { type: 'data', label: 'Donnée chiffrée exclusive' },
        { type: 'comparison', label: 'Comparaison / benchmark' },
      ],
      recentArticles: [
        { title: 'Le ROI réel des écoles de commerce post-bac', date: '2026-04-18', aiCitations: 19, mentionsYou: true },
        { title: 'Combien gagnent les diplômés à 3 ans ?', date: '2026-03-22', aiCitations: 13 },
      ],
      whyPitch:
        "Article publié sur Delta (avril 2026) — cité 19 fois par les IA. Maintenir la relation : envoyer les nouveaux chiffres salariaux dès qu'on les a.",
    },
  ],
  sentPitches: [
    { id: 'p1', journalistId: 5, journalistName: 'Inès Rousseau', outlet: 'Les Échos Start', angle: 'Témoignage alumni', subject: '3 alumni Delta qui ont levé 1M€+ en 2026', sentDate: '2026-05-12', status: 'awaiting' },
    { id: 'p2', journalistId: 1, journalistName: 'Sophie Bernard', outlet: "L'Étudiant", angle: 'Donnée chiffrée exclusive', subject: "Étude exclusive : 92% d'employabilité post-bac chez Delta", sentDate: '2026-05-08', status: 'positive' },
    { id: 'p3', journalistId: 3, journalistName: 'Elsa Mercier', outlet: 'Studyrama', angle: 'Partenariat entreprise', subject: 'Alternance étudiants Delta chez Doctolib & BlaBlaCar', sentDate: '2026-04-29', status: 'published' },
    { id: 'p4', journalistId: 4, journalistName: 'Karim Belhadj', outlet: 'Le Figaro Étudiant', angle: 'Comparaison / benchmark', subject: 'Comparatif 2026 : prépa vs école post-bac, ce que disent les chiffres', sentDate: '2026-04-22', status: 'no-response' },
  ],
  pitchStatusMeta: {
    awaiting: { label: 'En attente', color: 'bg-skop-gray-100 text-skop-gray-700 border-skop-gray-200' },
    positive: { label: 'Réponse positive', color: 'bg-skop-pink-soft text-skop-pink-vivid border-skop-pink' },
    published: { label: 'Article publié', color: 'bg-skop-pink-vivid text-white border-skop-pink-vivid' },
    'no-response': { label: 'Sans réponse', color: 'bg-skop-gray-50 text-skop-gray-500 border-skop-gray-200' },
  },
  journalistStatusMeta: {
    'never-mentioned': { label: 'Jamais mentionné', color: 'bg-skop-gray-100 text-skop-gray-700 border-skop-gray-200' },
    mentioned: { label: 'A déjà mentionné', color: 'bg-skop-pink-soft text-skop-black border-skop-pink' },
    'pitch-sent': { label: 'Pitch envoyé', color: 'bg-skop-pink text-skop-black border-skop-pink-vivid' },
    'article-published': { label: 'Article publié', color: 'bg-skop-pink-vivid text-white border-skop-pink-vivid' },
  },
};

// =============================================
// CONTENT FEEDBACK — Retour des contenus publiés (Tracking)
// =============================================
export const contentFeedback = {
  intro:
    "Vos contenus publiés ont-ils servi ? Skop trace le retour réel : citations par les IA, contribution au score de visibilité, et verdict final pour chaque contenu.",
  globalStats: {
    totalPublished: 5,
    citedAsSource: 4,
    notServedYet: 1,
    avgAiCitationsPerContent: 22,
  },
  contents: [
    {
      id: 'p1',
      title: "Pourquoi choisir une école post-bac plutôt qu'une prépa en 2026 ?",
      type: 'Article blog école',
      channel: 'blog-internal',
      publishedAt: '2026-04-15',
      visibilityImpact: '+9 pts',
      citedAsSource: true,
      aiCitations: 47,
      citingLLMs: [
        { llm: 'ChatGPT', count: 24, color: '#FE277E' },
        { llm: 'Claude', count: 14, color: '#000000' },
        { llm: 'Gemini', count: 9, color: '#FFCBE0' },
      ],
      typicalUsage:
        'Cité comme source de référence sur la requête « prépa vs école post-bac ». Apparaît en 1re partie de réponse IA dans 80% des cas.',
      verdict: 'served',
      verdictText: 'Servi pleinement — meilleur ROI du mois',
    },
    {
      id: 'p2',
      title: '3 alumni Delta qui ont levé 1M€+ cette année',
      type: 'Post LinkedIn',
      channel: 'linkedin',
      publishedAt: '2026-04-22',
      visibilityImpact: '+6 pts',
      citedAsSource: true,
      aiCitations: 28,
      citingLLMs: [
        { llm: 'Claude', count: 14, color: '#000000' },
        { llm: 'ChatGPT', count: 9, color: '#FE277E' },
        { llm: 'Gemini', count: 5, color: '#FFCBE0' },
      ],
      typicalUsage:
        "Mentionné par Claude et ChatGPT sur les requêtes « école commerce entrepreneuriat ». Les noms d'alumni sont cités directement.",
      verdict: 'served',
      verdictText: 'Servi — engagement LinkedIn fort',
    },
    {
      id: 'p3',
      title: 'Réponse Reddit — r/EtudiantSup',
      type: 'Réponse Reddit',
      channel: 'reddit',
      publishedAt: '2026-04-28',
      visibilityImpact: '+3 pts',
      citedAsSource: true,
      aiCitations: 12,
      citingLLMs: [
        { llm: 'Claude', count: 7, color: '#000000' },
        { llm: 'Gemini', count: 5, color: '#FFCBE0' },
      ],
      typicalUsage:
        "Cité par Claude et Gemini sur les requêtes « avis Delta Business School » comme « témoignage utilisateur Reddit ».",
      verdict: 'partial',
      verdictText: 'Partiellement servi — impact modeste mais stable',
    },
    {
      id: 'p4',
      title: "FAQ « Combien coûte une école de commerce sur 5 ans »",
      type: 'FAQ site école',
      channel: 'faq',
      publishedAt: '2026-05-03',
      visibilityImpact: '+5 pts',
      citedAsSource: true,
      aiCitations: 23,
      citingLLMs: [
        { llm: 'ChatGPT', count: 11, color: '#FE277E' },
        { llm: 'Gemini', count: 8, color: '#FFCBE0' },
        { llm: 'Perplexity', count: 4, color: '#A1A1AA' },
      ],
      typicalUsage:
        "La FAQ structurée est citée mot-à-mot par Gemini et Perplexity sur la requête « coût école commerce 5 ans ». Le tableau de frais est repris tel quel.",
      verdict: 'served',
      verdictText: 'Servi — format FAQ + schema.org gagnant',
    },
    {
      id: 'p5',
      title: 'Témoignage alumni — vidéo YouTube',
      type: 'Vidéo YouTube',
      channel: 'blog-external',
      publishedAt: '2026-05-08',
      visibilityImpact: '−2 pts',
      citedAsSource: false,
      aiCitations: 0,
      citingLLMs: [],
      typicalUsage:
        "Vidéo non transcrite : les IA ne peuvent pas en extraire le contenu. Aucune citation détectée à ce jour.",
      verdict: 'failed',
      verdictText: "Pas servi — manque de transcription, contenu invisible aux IA",
      fixSuggestion:
        "Ajouter une transcription texte sous la vidéo (sur YouTube + sur le blog). Devrait débloquer +5 à +8 pts.",
    },
  ],
  verdictMeta: {
    served: { label: 'Servi', color: 'bg-skop-pink-vivid text-white', icon: '✅' },
    partial: { label: 'Partiel', color: 'bg-skop-pink text-skop-black', icon: '🟡' },
    'not-yet': { label: 'Pas encore', color: 'bg-skop-gray-100 text-skop-gray-700', icon: '⏳' },
    failed: { label: 'Échec', color: 'bg-skop-black text-white', icon: '❌' },
  },
};

// =============================================
// BOTS IA — Passages des crawlers IA dans les logs Cloudflare
// =============================================
export const botsData = {
  cloudflare: {
    connected: true,
    accountId: 'cf-89A732B1-DELTA',
    zone: 'delta-business.school',
    lastSync: '2026-05-14 · il y a 4 min',
  },
  thisMonth: {
    totalCrawls: 12847,
    delta: 28,
    uniquePagesCrawled: 142,
    period: '14 avril → 13 mai 2026',
    avgCrawlsPerDay: 428,
  },
  // 7 bots IA principaux
  byBot: [
    {
      bot: 'GPTBot',
      operator: 'OpenAI (ChatGPT)',
      userAgent: 'Mozilla/5.0 AppleWebKit (compatible; GPTBot/1.2; +https://openai.com/gptbot)',
      crawls: 5238,
      percentage: 40.8,
      color: '#FE277E',
      delta: 32,
    },
    {
      bot: 'ClaudeBot',
      operator: 'Anthropic (Claude)',
      userAgent: 'ClaudeBot/1.0 (+https://www.anthropic.com/claudebot)',
      crawls: 2842,
      percentage: 22.1,
      color: '#000000',
      delta: 41,
    },
    {
      bot: 'PerplexityBot',
      operator: 'Perplexity AI',
      userAgent: 'Mozilla/5.0 AppleWebKit (compatible; PerplexityBot/1.0)',
      crawls: 1683,
      percentage: 13.1,
      color: '#A1A1AA',
      delta: 18,
    },
    {
      bot: 'Google-Extended',
      operator: 'Google Gemini',
      userAgent: 'Mozilla/5.0 (compatible; Google-Extended)',
      crawls: 1521,
      percentage: 11.8,
      color: '#FFCBE0',
      delta: 8,
    },
    {
      bot: 'Meta-ExternalAgent',
      operator: 'Meta AI',
      userAgent: 'meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/web-crawlers)',
      crawls: 894,
      percentage: 7.0,
      color: '#3F3F46',
      delta: 67,
    },
    {
      bot: 'DeepSeekBot',
      operator: 'DeepSeek',
      userAgent: 'Mozilla/5.0 (compatible; DeepSeekBot/1.0)',
      crawls: 412,
      percentage: 3.2,
      color: '#D4D4D8',
      delta: 124,
    },
    {
      bot: 'Bytespider',
      operator: 'ByteDance (Doubao)',
      userAgent: 'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)',
      crawls: 257,
      percentage: 2.0,
      color: '#71717A',
      delta: -12,
    },
  ],
  // 30 jours de crawls quotidiens
  timeline: [
    { date: '14/04', GPTBot: 142, ClaudeBot: 72, PerplexityBot: 48, 'Google-Extended': 41, 'Meta-ExternalAgent': 22, DeepSeekBot: 9, Bytespider: 8, total: 342 },
    { date: '15/04', GPTBot: 148, ClaudeBot: 76, PerplexityBot: 51, 'Google-Extended': 43, 'Meta-ExternalAgent': 24, DeepSeekBot: 10, Bytespider: 7, total: 359 },
    { date: '16/04', GPTBot: 156, ClaudeBot: 81, PerplexityBot: 53, 'Google-Extended': 44, 'Meta-ExternalAgent': 26, DeepSeekBot: 11, Bytespider: 8, total: 379 },
    { date: '17/04', GPTBot: 152, ClaudeBot: 78, PerplexityBot: 51, 'Google-Extended': 43, 'Meta-ExternalAgent': 25, DeepSeekBot: 10, Bytespider: 7, total: 366 },
    { date: '18/04', GPTBot: 138, ClaudeBot: 72, PerplexityBot: 46, 'Google-Extended': 39, 'Meta-ExternalAgent': 22, DeepSeekBot: 9, Bytespider: 7, total: 333 },
    { date: '19/04', GPTBot: 132, ClaudeBot: 68, PerplexityBot: 44, 'Google-Extended': 37, 'Meta-ExternalAgent': 20, DeepSeekBot: 8, Bytespider: 6, total: 315 },
    { date: '20/04', GPTBot: 161, ClaudeBot: 84, PerplexityBot: 54, 'Google-Extended': 46, 'Meta-ExternalAgent': 28, DeepSeekBot: 12, Bytespider: 8, total: 393 },
    { date: '21/04', GPTBot: 167, ClaudeBot: 88, PerplexityBot: 56, 'Google-Extended': 47, 'Meta-ExternalAgent': 29, DeepSeekBot: 13, Bytespider: 8, total: 408 },
    { date: '22/04', GPTBot: 172, ClaudeBot: 91, PerplexityBot: 58, 'Google-Extended': 49, 'Meta-ExternalAgent': 30, DeepSeekBot: 14, Bytespider: 9, total: 423 },
    { date: '23/04', GPTBot: 178, ClaudeBot: 94, PerplexityBot: 60, 'Google-Extended': 50, 'Meta-ExternalAgent': 31, DeepSeekBot: 14, Bytespider: 9, total: 436 },
    { date: '24/04', GPTBot: 175, ClaudeBot: 92, PerplexityBot: 59, 'Google-Extended': 50, 'Meta-ExternalAgent': 30, DeepSeekBot: 14, Bytespider: 9, total: 429 },
    { date: '25/04', GPTBot: 152, ClaudeBot: 81, PerplexityBot: 51, 'Google-Extended': 43, 'Meta-ExternalAgent': 26, DeepSeekBot: 12, Bytespider: 8, total: 373 },
    { date: '26/04', GPTBot: 146, ClaudeBot: 78, PerplexityBot: 49, 'Google-Extended': 41, 'Meta-ExternalAgent': 24, DeepSeekBot: 11, Bytespider: 7, total: 356 },
    { date: '27/04', GPTBot: 184, ClaudeBot: 98, PerplexityBot: 62, 'Google-Extended': 52, 'Meta-ExternalAgent': 32, DeepSeekBot: 14, Bytespider: 9, total: 451 },
    { date: '28/04', GPTBot: 192, ClaudeBot: 103, PerplexityBot: 64, 'Google-Extended': 54, 'Meta-ExternalAgent': 34, DeepSeekBot: 15, Bytespider: 9, total: 471 },
    { date: '29/04', GPTBot: 198, ClaudeBot: 106, PerplexityBot: 66, 'Google-Extended': 56, 'Meta-ExternalAgent': 36, DeepSeekBot: 15, Bytespider: 10, total: 487 },
    { date: '30/04', GPTBot: 188, ClaudeBot: 101, PerplexityBot: 63, 'Google-Extended': 53, 'Meta-ExternalAgent': 33, DeepSeekBot: 14, Bytespider: 9, total: 461 },
    { date: '01/05', GPTBot: 154, ClaudeBot: 82, PerplexityBot: 52, 'Google-Extended': 44, 'Meta-ExternalAgent': 27, DeepSeekBot: 12, Bytespider: 8, total: 379 },
    { date: '02/05', GPTBot: 148, ClaudeBot: 79, PerplexityBot: 49, 'Google-Extended': 42, 'Meta-ExternalAgent': 25, DeepSeekBot: 11, Bytespider: 7, total: 361 },
    { date: '03/05', GPTBot: 204, ClaudeBot: 110, PerplexityBot: 68, 'Google-Extended': 58, 'Meta-ExternalAgent': 37, DeepSeekBot: 16, Bytespider: 10, total: 503 },
    { date: '04/05', GPTBot: 212, ClaudeBot: 114, PerplexityBot: 70, 'Google-Extended': 60, 'Meta-ExternalAgent': 39, DeepSeekBot: 17, Bytespider: 10, total: 522 },
    { date: '05/05', GPTBot: 208, ClaudeBot: 112, PerplexityBot: 69, 'Google-Extended': 58, 'Meta-ExternalAgent': 38, DeepSeekBot: 16, Bytespider: 10, total: 511 },
    { date: '06/05', GPTBot: 218, ClaudeBot: 118, PerplexityBot: 72, 'Google-Extended': 61, 'Meta-ExternalAgent': 41, DeepSeekBot: 18, Bytespider: 11, total: 539 },
    { date: '07/05', GPTBot: 225, ClaudeBot: 122, PerplexityBot: 74, 'Google-Extended': 63, 'Meta-ExternalAgent': 42, DeepSeekBot: 19, Bytespider: 11, total: 556 },
    { date: '08/05', GPTBot: 168, ClaudeBot: 91, PerplexityBot: 57, 'Google-Extended': 49, 'Meta-ExternalAgent': 31, DeepSeekBot: 14, Bytespider: 8, total: 418 },
    { date: '09/05', GPTBot: 160, ClaudeBot: 87, PerplexityBot: 54, 'Google-Extended': 46, 'Meta-ExternalAgent': 29, DeepSeekBot: 13, Bytespider: 8, total: 397 },
    { date: '10/05', GPTBot: 232, ClaudeBot: 126, PerplexityBot: 76, 'Google-Extended': 65, 'Meta-ExternalAgent': 44, DeepSeekBot: 19, Bytespider: 11, total: 573 },
    { date: '11/05', GPTBot: 241, ClaudeBot: 131, PerplexityBot: 78, 'Google-Extended': 67, 'Meta-ExternalAgent': 46, DeepSeekBot: 20, Bytespider: 12, total: 595 },
    { date: '12/05', GPTBot: 248, ClaudeBot: 136, PerplexityBot: 81, 'Google-Extended': 69, 'Meta-ExternalAgent': 48, DeepSeekBot: 21, Bytespider: 12, total: 615 },
    { date: '13/05', GPTBot: 256, ClaudeBot: 141, PerplexityBot: 83, 'Google-Extended': 71, 'Meta-ExternalAgent': 50, DeepSeekBot: 22, Bytespider: 13, total: 636 },
  ],
  // Top pages crawlées
  topPages: [
    {
      page: '/',
      title: 'Page d\'accueil',
      crawls: 1842,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 12 min',
      bots: { GPTBot: 752, ClaudeBot: 412, PerplexityBot: 268, 'Google-Extended': 224, 'Meta-ExternalAgent': 124, DeepSeekBot: 42, Bytespider: 20 },
    },
    {
      page: '/blog/post-bac-vs-prepa',
      title: 'Article — Post-bac vs prépa',
      crawls: 1438,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 28 min',
      bots: { GPTBot: 622, ClaudeBot: 312, PerplexityBot: 198, 'Google-Extended': 172, 'Meta-ExternalAgent': 88, DeepSeekBot: 32, Bytespider: 14 },
    },
    {
      page: '/programmes/bachelor',
      title: 'Programme Bachelor',
      crawls: 1187,
      topBot: 'ClaudeBot',
      lastCrawl: 'il y a 42 min',
      bots: { GPTBot: 412, ClaudeBot: 432, PerplexityBot: 152, 'Google-Extended': 124, 'Meta-ExternalAgent': 42, DeepSeekBot: 18, Bytespider: 7 },
    },
    {
      page: '/admissions',
      title: 'Admissions',
      crawls: 1064,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 19 min',
      bots: { GPTBot: 432, ClaudeBot: 254, PerplexityBot: 168, 'Google-Extended': 138, 'Meta-ExternalAgent': 48, DeepSeekBot: 18, Bytespider: 6 },
    },
    {
      page: '/alternance',
      title: 'Alternance dès la 3e année',
      crawls: 942,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 1 h',
      bots: { GPTBot: 384, ClaudeBot: 218, PerplexityBot: 142, 'Google-Extended': 124, 'Meta-ExternalAgent': 44, DeepSeekBot: 22, Bytespider: 8 },
    },
    {
      page: '/blog/3-alumni-1m',
      title: 'Article — 3 alumni qui ont levé 1M€',
      crawls: 814,
      topBot: 'ClaudeBot',
      lastCrawl: 'il y a 8 min',
      bots: { GPTBot: 287, ClaudeBot: 312, PerplexityBot: 98, 'Google-Extended': 78, 'Meta-ExternalAgent': 26, DeepSeekBot: 9, Bytespider: 4 },
    },
    {
      page: '/admissions/parallele',
      title: 'Admissions parallèles',
      crawls: 762,
      topBot: 'ClaudeBot',
      lastCrawl: 'il y a 51 min',
      bots: { GPTBot: 254, ClaudeBot: 268, PerplexityBot: 124, 'Google-Extended': 78, 'Meta-ExternalAgent': 28, DeepSeekBot: 8, Bytespider: 2 },
    },
    {
      page: '/blog/cout-ecole-commerce',
      title: 'Article — Combien coûte une école de commerce',
      crawls: 687,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 38 min',
      bots: { GPTBot: 254, ClaudeBot: 168, PerplexityBot: 112, 'Google-Extended': 88, 'Meta-ExternalAgent': 42, DeepSeekBot: 18, Bytespider: 5 },
    },
    {
      page: '/alumni',
      title: 'Alumni',
      crawls: 542,
      topBot: 'GPTBot',
      lastCrawl: 'il y a 1 h',
      bots: { GPTBot: 198, ClaudeBot: 142, PerplexityBot: 88, 'Google-Extended': 72, 'Meta-ExternalAgent': 28, DeepSeekBot: 12, Bytespider: 2 },
    },
    {
      page: '/blog/financement-ecole',
      title: 'Article — Financer ses études supérieures',
      crawls: 487,
      topBot: 'PerplexityBot',
      lastCrawl: 'il y a 22 min',
      bots: { GPTBot: 124, ClaudeBot: 98, PerplexityBot: 142, 'Google-Extended': 78, 'Meta-ExternalAgent': 28, DeepSeekBot: 14, Bytespider: 3 },
    },
  ],
};

// =============================================
// VISITEURS — Trafic réel venu des IA (GA4 simulé)
// =============================================
export const visitorsData = {
  ga4: {
    connected: true,
    propertyId: 'GA4-389271948',
    connectedAt: '2026-04-08',
    lastSync: '2026-05-14 · il y a 12 min',
  },
  thisMonth: {
    total: 3260,
    delta: 12, // %
    conversionRate: 4.8, // %
    conversionDelta: 0.6, // points
    totalConversions: 156,
    period: '14 avril → 13 mai 2026',
  },
  // Répartition par IA
  byLLM: [
    { llm: 'ChatGPT', visitors: 1462, percentage: 44.8, color: '#FE277E', delta: 18 },
    { llm: 'Claude', visitors: 632, percentage: 19.4, color: '#000000', delta: 22 },
    { llm: 'Gemini', visitors: 467, percentage: 14.3, color: '#FFCBE0', delta: -3 },
    { llm: 'Perplexity', visitors: 332, percentage: 10.2, color: '#A1A1AA', delta: 8 },
    { llm: 'Grok', visitors: 215, percentage: 6.6, color: '#3F3F46', delta: 45 },
    { llm: 'DeepSeek', visitors: 152, percentage: 4.7, color: '#D4D4D8', delta: 31 },
  ],
  // 30 jours de données quotidiennes (14/04 → 13/05)
  timeline: [
    { date: '14/04', ChatGPT: 38, Claude: 14, Gemini: 11, Perplexity: 7, Grok: 4, DeepSeek: 2, total: 76 },
    { date: '15/04', ChatGPT: 41, Claude: 16, Gemini: 13, Perplexity: 8, Grok: 4, DeepSeek: 3, total: 85 },
    { date: '16/04', ChatGPT: 42, Claude: 18, Gemini: 12, Perplexity: 9, Grok: 5, DeepSeek: 3, total: 89 },
    { date: '17/04', ChatGPT: 38, Claude: 15, Gemini: 11, Perplexity: 7, Grok: 4, DeepSeek: 3, total: 78 },
    { date: '18/04', ChatGPT: 25, Claude: 10, Gemini: 8, Perplexity: 5, Grok: 2, DeepSeek: 2, total: 52 },
    { date: '19/04', ChatGPT: 22, Claude: 9, Gemini: 7, Perplexity: 4, Grok: 2, DeepSeek: 1, total: 45 },
    { date: '20/04', ChatGPT: 44, Claude: 19, Gemini: 14, Perplexity: 10, Grok: 6, DeepSeek: 3, total: 96 },
    { date: '21/04', ChatGPT: 47, Claude: 20, Gemini: 15, Perplexity: 11, Grok: 6, DeepSeek: 4, total: 103 },
    { date: '22/04', ChatGPT: 49, Claude: 22, Gemini: 16, Perplexity: 11, Grok: 7, DeepSeek: 4, total: 109 },
    { date: '23/04', ChatGPT: 52, Claude: 23, Gemini: 17, Perplexity: 12, Grok: 7, DeepSeek: 5, total: 116 },
    { date: '24/04', ChatGPT: 50, Claude: 22, Gemini: 16, Perplexity: 11, Grok: 7, DeepSeek: 4, total: 110 },
    { date: '25/04', ChatGPT: 32, Claude: 14, Gemini: 10, Perplexity: 7, Grok: 4, DeepSeek: 2, total: 69 },
    { date: '26/04', ChatGPT: 28, Claude: 12, Gemini: 8, Perplexity: 6, Grok: 3, DeepSeek: 2, total: 59 },
    { date: '27/04', ChatGPT: 54, Claude: 24, Gemini: 17, Perplexity: 12, Grok: 8, DeepSeek: 5, total: 120 },
    { date: '28/04', ChatGPT: 56, Claude: 26, Gemini: 18, Perplexity: 13, Grok: 8, DeepSeek: 5, total: 126 },
    { date: '29/04', ChatGPT: 58, Claude: 27, Gemini: 19, Perplexity: 14, Grok: 9, DeepSeek: 5, total: 132 },
    { date: '30/04', ChatGPT: 55, Claude: 25, Gemini: 17, Perplexity: 12, Grok: 8, DeepSeek: 5, total: 122 },
    { date: '01/05', ChatGPT: 30, Claude: 14, Gemini: 10, Perplexity: 7, Grok: 4, DeepSeek: 2, total: 67 },
    { date: '02/05', ChatGPT: 28, Claude: 13, Gemini: 9, Perplexity: 6, Grok: 3, DeepSeek: 2, total: 61 },
    { date: '03/05', ChatGPT: 60, Claude: 28, Gemini: 20, Perplexity: 14, Grok: 9, DeepSeek: 6, total: 137 },
    { date: '04/05', ChatGPT: 62, Claude: 29, Gemini: 21, Perplexity: 15, Grok: 10, DeepSeek: 6, total: 143 },
    { date: '05/05', ChatGPT: 61, Claude: 28, Gemini: 20, Perplexity: 14, Grok: 9, DeepSeek: 6, total: 138 },
    { date: '06/05', ChatGPT: 64, Claude: 30, Gemini: 21, Perplexity: 15, Grok: 10, DeepSeek: 6, total: 146 },
    { date: '07/05', ChatGPT: 66, Claude: 31, Gemini: 22, Perplexity: 16, Grok: 10, DeepSeek: 7, total: 152 },
    { date: '08/05', ChatGPT: 38, Claude: 18, Gemini: 13, Perplexity: 9, Grok: 5, DeepSeek: 3, total: 86 },
    { date: '09/05', ChatGPT: 35, Claude: 16, Gemini: 11, Perplexity: 8, Grok: 5, DeepSeek: 3, total: 78 },
    { date: '10/05', ChatGPT: 68, Claude: 32, Gemini: 23, Perplexity: 16, Grok: 11, DeepSeek: 7, total: 157 },
    { date: '11/05', ChatGPT: 70, Claude: 34, Gemini: 23, Perplexity: 17, Grok: 11, DeepSeek: 7, total: 162 },
    { date: '12/05', ChatGPT: 73, Claude: 35, Gemini: 24, Perplexity: 17, Grok: 12, DeepSeek: 8, total: 169 },
    { date: '13/05', ChatGPT: 76, Claude: 37, Gemini: 25, Perplexity: 18, Grok: 13, DeepSeek: 8, total: 177 },
  ],
  // Top pages — où atterrissent les visiteurs IA
  topPages: [
    {
      page: '/blog/post-bac-vs-prepa',
      title: 'Article — Post-bac vs prépa : guide 2026',
      visitors: 587,
      topLLM: 'ChatGPT',
      avgDuration: '3:24',
      bounceRate: 32,
    },
    {
      page: '/programmes',
      title: 'Page — Programmes Delta',
      visitors: 412,
      topLLM: 'ChatGPT',
      avgDuration: '1:08',
      bounceRate: 64,
    },
    {
      page: '/admissions',
      title: 'Page — Admissions',
      visitors: 387,
      topLLM: 'Claude',
      avgDuration: '2:51',
      bounceRate: 38,
    },
    {
      page: '/admissions/parallele',
      title: 'Page — Admissions parallèles',
      visitors: 298,
      topLLM: 'Claude',
      avgDuration: '3:42',
      bounceRate: 28,
    },
    {
      page: '/alternance',
      title: 'Page — Alternance dès la 3e année',
      visitors: 254,
      topLLM: 'Gemini',
      avgDuration: '2:33',
      bounceRate: 41,
    },
    {
      page: '/',
      title: 'Page d\'accueil',
      visitors: 198,
      topLLM: 'ChatGPT',
      avgDuration: '0:58',
      bounceRate: 71,
    },
    {
      page: '/blog/cout-ecole-commerce',
      title: 'Article — Combien coûte une école de commerce',
      visitors: 187,
      topLLM: 'Gemini',
      avgDuration: '4:18',
      bounceRate: 22,
    },
    {
      page: '/blog/3-alumni-1m',
      title: 'Article — 3 alumni qui ont levé 1M€',
      visitors: 142,
      topLLM: 'Perplexity',
      avgDuration: '5:12',
      bounceRate: 18,
    },
    {
      page: '/alumni',
      title: 'Page — Alumni',
      visitors: 116,
      topLLM: 'ChatGPT',
      avgDuration: '1:46',
      bounceRate: 52,
    },
    {
      page: '/contact',
      title: 'Page — Contact / RDV',
      visitors: 89,
      topLLM: 'Claude',
      avgDuration: '2:08',
      bounceRate: 24,
    },
  ],
  // Funnel de conversion
  conversion: {
    funnel: [
      { stage: 'Arrivée sur le site', count: 3260, rate: 100 },
      { stage: 'Plus de 30 secondes sur la page', count: 2438, rate: 75 },
      { stage: 'Vue d\'au moins 2 pages', count: 1542, rate: 47 },
      { stage: 'Téléchargement brochure ou simulateur', count: 412, rate: 12.6 },
      { stage: 'Formulaire candidature / contact', count: 156, rate: 4.8 },
    ],
    topActions: [
      { action: 'Brochure 2026 téléchargée', count: 287, channel: 'ChatGPT', icon: '📄' },
      { action: 'Simulateur de coût utilisé', count: 184, channel: 'Gemini', icon: '🧮' },
      { action: 'Prise de RDV conseiller admissions', count: 92, channel: 'Claude', icon: '📅' },
      { action: 'Newsletter parents (inscription)', count: 64, channel: 'ChatGPT', icon: '📧' },
      { action: 'Candidature en ligne — étape 1', count: 56, channel: 'Multi-source', icon: '✍️' },
      { action: 'Inscription Journée Portes Ouvertes', count: 38, channel: 'Perplexity', icon: '🚪' },
    ],
    bestPath: {
      sequence: ['Article post-bac vs prépa', 'Page Admissions', 'Simulateur de coût', 'Candidature étape 1'],
      conversionRate: 18.4,
      avgTimeToConvert: '6 jours',
    },
  },
};

// =============================================
// ORGANISATION : COLLABORATEURS
// =============================================
export const organizationData = {
  collaborators: [
    {
      id: 1,
      name: 'Marie Dupont',
      initials: 'MD',
      role: 'Responsable Marketing & Admissions',
      email: 'marie.dupont@delta-business.school',
      permission: 'admin',
      status: 'active',
      lastActive: 'il y a 12 min',
      contentsPublished: 8,
      avatarColor: 'bg-skop-pink',
    },
    {
      id: 2,
      name: 'Lucas Martin',
      initials: 'LM',
      role: 'Content Manager',
      email: 'lucas.martin@delta-business.school',
      permission: 'editor',
      status: 'active',
      lastActive: 'il y a 1h',
      contentsPublished: 5,
      avatarColor: 'bg-skop-pink-soft',
    },
    {
      id: 3,
      name: 'Camille Bernard',
      initials: 'CB',
      role: 'Social Media Manager',
      email: 'camille.bernard@delta-business.school',
      permission: 'editor',
      status: 'active',
      lastActive: 'il y a 3h',
      contentsPublished: 4,
      avatarColor: 'bg-skop-pink',
    },
    {
      id: 4,
      name: 'Nathanaël Grenot-Lespine',
      initials: 'NG',
      role: 'Stagiaire — étudiant Delta',
      email: 'nathanael.grenot@delta-business.school',
      permission: 'editor',
      status: 'active',
      lastActive: 'à l\'instant',
      contentsPublished: 1,
      isMe: true,
      avatarColor: 'bg-skop-pink-vivid',
    },
    {
      id: 5,
      name: 'Sarah Kim',
      initials: 'SK',
      role: 'Designer freelance',
      email: 'sarah.kim@designkim.fr',
      permission: 'viewer',
      status: 'inactive',
      lastActive: 'il y a 5 jours',
      contentsPublished: 0,
      avatarColor: 'bg-skop-gray-100',
    },
  ],
  permissionLabels: {
    admin: { label: 'Admin', color: 'bg-skop-pink-vivid text-white' },
    editor: { label: 'Éditeur', color: 'bg-skop-pink text-skop-black' },
    viewer: { label: 'Lecture seule', color: 'bg-skop-gray-100 text-skop-gray-700' },
  },
  // ─── TÂCHES CALENDRIER ───
  // (date au format YYYY-MM-DD)
  tasks: [
    // Tâches passées (terminées)
    { id: 1, date: '2026-05-04', title: 'Article blog "Post-bac vs prépa"', type: 'Publication', channel: 'Blog interne', icon: '📝', assignee: 2, status: 'done' },
    { id: 2, date: '2026-05-06', title: 'Post LinkedIn alumni levée de fonds', type: 'Publication', channel: 'LinkedIn', icon: '💼', assignee: 3, status: 'done' },
    { id: 3, date: '2026-05-08', title: 'Réponse Reddit r/EtudiantSup', type: 'Publication', channel: 'Reddit', icon: '🟠', assignee: 2, status: 'done' },
    { id: 4, date: '2026-05-11', title: 'Vidéo YouTube alumni témoignage', type: 'Publication', channel: 'YouTube', icon: '📹', assignee: 1, status: 'done' },

    // Aujourd'hui (2026-05-12)
    { id: 5, date: '2026-05-12', title: 'Publier l\'article "Pourquoi école post-bac"', type: 'Publication', channel: 'Blog interne', icon: '📝', assignee: 2, status: 'in_progress' },
    { id: 6, date: '2026-05-12', title: 'Audit page d\'accueil (FAQ + chiffres)', type: 'Optimisation', channel: 'Site', icon: '⚡', assignee: 1, status: 'in_progress' },
    { id: 7, date: '2026-05-12', title: 'Réunion équipe marketing (15h)', type: 'Réunion', channel: 'Interne', icon: '👥', assignee: 1, status: 'todo' },

    // Cette semaine
    { id: 8, date: '2026-05-13', title: 'Importer 47 avis Google Reviews', type: 'Optimisation', channel: 'Site', icon: '⭐', assignee: 4, status: 'todo' },
    { id: 9, date: '2026-05-14', title: 'Post LinkedIn — Camille', type: 'Publication', channel: 'LinkedIn', icon: '💼', assignee: 3, status: 'todo' },
    { id: 10, date: '2026-05-15', title: 'Tournage vidéo YouTube "10 min financement"', type: 'Production', channel: 'YouTube', icon: '🎬', assignee: 5, status: 'todo' },
    { id: 11, date: '2026-05-15', title: 'Publier FAQ "Combien coûte une école"', type: 'Publication', channel: 'FAQ site', icon: '❓', assignee: 2, status: 'todo' },

    // Semaine prochaine
    { id: 12, date: '2026-05-18', title: 'Réponses Reddit (4 questions ouvertes)', type: 'Publication', channel: 'Reddit', icon: '🟠', assignee: 2, status: 'todo' },
    { id: 13, date: '2026-05-19', title: 'Webinaire admissions parallèles', type: 'Événement', channel: 'Live', icon: '🎤', assignee: 1, status: 'todo' },
    { id: 14, date: '2026-05-20', title: 'Spot TikTok 30s "Tu n\'as pas la prépa ?"', type: 'Publication', channel: 'TikTok', icon: '🎵', assignee: 3, status: 'todo' },
    { id: 15, date: '2026-05-21', title: 'Audit page "Programme Grande École"', type: 'Optimisation', channel: 'Site', icon: '⚡', assignee: 1, status: 'todo' },
    { id: 16, date: '2026-05-22', title: 'Newsletter parents — édition #12', type: 'Publication', channel: 'Email', icon: '📧', assignee: 2, status: 'todo' },

    // Plus tard ce mois
    { id: 17, date: '2026-05-26', title: 'Lancer le podcast épisode 1 (Léa)', type: 'Publication', channel: 'Podcast', icon: '🎧', assignee: 5, status: 'todo' },
    { id: 18, date: '2026-05-27', title: 'Réunion bilan mensuel Skop', type: 'Réunion', channel: 'Interne', icon: '📊', assignee: 1, status: 'todo' },
    { id: 19, date: '2026-05-29', title: 'Post LinkedIn — bilan mai', type: 'Publication', channel: 'LinkedIn', icon: '💼', assignee: 3, status: 'todo' },
    { id: 20, date: '2026-05-30', title: 'Création de la page "Profils Alumni"', type: 'Optimisation', channel: 'Site', icon: '⚡', assignee: 1, status: 'todo' },

    // Juin
    { id: 21, date: '2026-06-02', title: 'Suivi metrics post-publications mai', type: 'Réunion', channel: 'Interne', icon: '📈', assignee: 4, status: 'todo' },
    { id: 22, date: '2026-06-04', title: 'Article blog "Spécialisation IA & data"', type: 'Publication', channel: 'Blog interne', icon: '📝', assignee: 2, status: 'todo' },
  ],
  statusLabels: {
    todo: { label: 'À faire', color: 'bg-skop-gray-100 text-skop-gray-700 border-skop-gray-200' },
    in_progress: { label: 'En cours', color: 'bg-skop-pink-soft text-skop-pink-vivid border-skop-pink' },
    done: { label: 'Terminé', color: 'bg-skop-pink-vivid/10 text-skop-pink-vivid border-skop-pink-vivid' },
  },
};

// =============================================
// TRACKING
// =============================================
// =============================================
// RAPPORT — Historique des périodes (pour comparaison)
// =============================================
export const reportHistory = [
  {
    id: 'now',
    label: 'Cette semaine',
    range: '12 → 19 mai 2026',
    visibility: 68,
    apparitions: 612,
    sentiment: 72,
    rank: 4,
    citedContents: 4,
    pitches: 2,
  },
  {
    id: 'w-1',
    label: 'Semaine dernière',
    range: '5 → 12 mai 2026',
    visibility: 64,
    apparitions: 547,
    sentiment: 68,
    rank: 4,
    citedContents: 3,
    pitches: 1,
  },
  {
    id: 'm-1',
    label: 'Avril 2026',
    range: 'mois complet',
    visibility: 57,
    apparitions: 1980,
    sentiment: 62,
    rank: 5,
    citedContents: 2,
    pitches: 3,
  },
  {
    id: 'm-2',
    label: 'Mars 2026',
    range: 'mois complet',
    visibility: 49,
    apparitions: 1420,
    sentiment: 55,
    rank: 5,
    citedContents: 1,
    pitches: 1,
  },
  {
    id: 'm-3',
    label: 'Février 2026',
    range: 'mois complet',
    visibility: 43,
    apparitions: 1105,
    sentiment: 51,
    rank: 6,
    citedContents: 0,
    pitches: 0,
  },
];

export const trackingData = {
  visibilityScore: 68,
  weekDelta: '+8',
  timeline: [
    { week: 'S15', score: 42 },
    { week: 'S16', score: 48 },
    { week: 'S17', score: 53 },
    { week: 'S18', score: 57 },
    { week: 'S19', score: 60 },
    { week: 'S20', score: 64 },
    { week: 'S21', score: 68 },
  ],
  advices: [
    {
      title: "Publier 1 témoignage alumni sur letudiant.fr",
      detail: "letudiant.fr ressort dans 4 LLM sur 5 sur la requête \"écoles post-bac\". Un témoignage alumni bien placé fait grimper le score de 6-10 points.",
    },
    {
      title: "Répondre à 2 questions sur r/EtudiantSup",
      detail: "Les réponses Reddit honnêtes (avec pour/contre) sont reprises par Claude et Gemini sous 48h sur les requêtes « avis Delta Business School ».",
    },
    {
      title: "Compléter la fiche école sur Studyrama et L'Étudiant",
      detail: "Une fiche école optimisée (programmes, frais, débouchés chiffrés) augmente le nombre de citations de 30% sur les LLM consultés par les lycéens.",
    },
  ],
};

// =============================================
// STUDIO — 7 CANAUX DE CRÉATION
// Chaque canal regroupe plusieurs sections (LinkedIn et Avis sont
// composites). Chaque contenu peut être marqué « publié ».
// =============================================
export const studioChannels = {
  linkedin: {
    key: 'linkedin',
    label: 'LinkedIn',
    iconName: 'Linkedin',
    headline: "Tout l'écosystème LinkedIn : posts, page entreprise, commentaires offensifs.",
    description:
      "Trois leviers distincts mais complémentaires : (1) publier vos propres posts depuis le compte entreprise et les comptes perso de vos dirigeants, (2) améliorer structurellement votre page LinkedIn pour que les IA la parsent mieux, (3) commenter de façon experte sur les posts à forte audience — y compris ceux de vos concurrents — pour capter leur audience.",
    sections: [
      {
        key: 'posts',
        label: 'Posts',
        iconName: 'Pencil',
        renderer: 'linkedinPost',
        intro:
          "Contenu à publier sur le feed LinkedIn. Skop génère deux types de posts : pour le compte entreprise (Delta Business School) ET pour le compte perso d'un dirigeant ou expert interne. Ton autoritaire, ancré dans l'expertise, riche en chiffres — c'est ce que les IA reprennent.",
        contents: [
          {
            id: 'li-1',
            accountType: 'entreprise',
            author: 'Delta Business School',
            avatar: 'DB',
            title: "Pourquoi 87% de nos diplômés trouvent un emploi en moins de 3 mois",
            body: "En 2025, Delta Business School a publié son rapport d'insertion. Résultat : 87% de nos diplômés signent un CDI ou un CDD long en moins de 3 mois — un chiffre supérieur de 14 points à la moyenne nationale des écoles de management.\n\n3 raisons structurelles :\n→ 6 mois de stage obligatoire en M2 (vs 4 mois ailleurs)\n→ Un réseau alumni de 12 400 diplômés actifs dans 38 pays\n→ Un parcours « entrepreneuriat » avec 3 levées de fonds par promo\n\nNotre conviction : un business school se mesure à la trajectoire de ses diplômés, pas à la beauté de son campus.",
            tone: 'Autoritaire',
            date: '2026-05-12',
            published: true,
            stats: { length: 'Long', estimatedReach: '8 500 impressions' },
          },
          {
            id: 'li-2',
            accountType: 'perso',
            author: 'Pierre Lefèvre, Directeur Académique',
            avatar: 'PL',
            title: "3 erreurs que je vois dans 80% des candidatures que je lis",
            body: "Je lis environ 1 200 lettres de motivation par an pour notre programme Grande École. 3 erreurs reviennent dans 80% d'entre elles :\n\n1️⃣ « Je suis passionné par votre école » → Aucune preuve concrète. Citez un projet, un alumni, une conférence.\n2️⃣ Lister les diplômes sans expliquer ce qu'on en a tiré → On veut comprendre ta réflexion, pas ton CV.\n3️⃣ Conclure par « j'espère que ma candidature retiendra votre attention » → Trop générique. Propose une rencontre, un échange.\n\nUne candidature, c'est le premier rapport stratégique que tu écris dans ta vie pro. Traite-la comme tel.",
            tone: 'Autoritaire',
            date: '2026-05-08',
            published: false,
            stats: { length: 'Long', estimatedReach: '12 200 impressions' },
          },
          {
            id: 'li-3',
            accountType: 'entreprise',
            author: 'Delta Business School',
            avatar: 'DB',
            title: "Le top 5 des secteurs qui recrutent nos diplômés en 2026",
            body: "Top 5 des secteurs qui ont recruté nos M2 2025 (sur 412 diplômés) :\n\n1. Conseil en stratégie — 24% (BCG, Bain, McKinsey, Roland Berger)\n2. Tech & SaaS — 19% (Datadog, Doctolib, Qonto, Mistral)\n3. Finance d'entreprise — 16% (BNP CIB, Société Générale, Rothschild)\n4. Industrie & énergie — 14% (TotalEnergies, Engie, Veolia)\n5. Entrepreneuriat — 11% (création de startups, 47 sociétés créées)\n\nLe reste : 16% en marketing, retail, luxe et secteur public.\n\nCe qui change vs 2024 : +5 pts sur la tech, -3 pts sur le luxe. Cohérent avec ce qu'on voit côté demande étudiante.",
            tone: 'Autoritaire',
            date: '2026-05-03',
            published: true,
            stats: { length: 'Moyen', estimatedReach: '6 300 impressions' },
          },
        ],
      },
      {
        key: 'pageImprovements',
        label: 'Page entreprise',
        iconName: 'Building2',
        renderer: 'linkedinPageImprovement',
        intro:
          "Améliorations structurelles à apporter à votre page LinkedIn entreprise (À propos, expertises, posts épinglés). Objectif : structurer l'info pour que les crawlers IA puissent l'extraire et la citer comme une fiche d'identité.",
        contents: [
          {
            id: 'lp-1',
            title: "Réécrire la section « À propos » au format Q/R structuré",
            body: "**Avant** (générique, dilué) :\n« Delta Business School est une école de commerce reconnue qui forme depuis 1972 les futurs leaders... »\n\n**Après** (structure que les IA savent extraire) :\n« **Qui sommes-nous ?** Une grande école de management post-bac (BAC+5) basée à Paris.\n**Effectifs ?** 2 800 étudiants, 412 diplômés/an.\n**Accréditations ?** AACSB, EQUIS (le top 1% mondial).\n**Spécialités ?** Stratégie, finance, marketing, entrepreneuriat. »\n\nGain estimé : +18 points sur la requête « école de commerce accréditée AACSB Paris » dans ChatGPT et Perplexity.",
            impact: 'Élevé',
            section: 'À propos',
            date: '2026-05-14',
            published: false,
          },
          {
            id: 'lp-2',
            title: "Ajouter 4 sections expertises sur la page",
            body: "Les pages LinkedIn permettent maintenant de déclarer des « domaines d'expertise » qui apparaissent dans le panneau de connaissances des LLM.\n\n4 expertises à ajouter en priorité (mappées sur vos fanouts) :\n→ Formation en stratégie d'entreprise\n→ Programme Grande École en management\n→ Entrepreneuriat & accélérateur de startups\n→ MBA Executive (cadres en activité)\n\nGain attendu : couverture sur 11 requêtes additionnelles.",
            impact: 'Moyen',
            section: 'Expertises',
            date: '2026-05-10',
            published: false,
          },
          {
            id: 'lp-3',
            title: "Épingler les 3 posts qui drivent le plus de citations",
            body: "Analyse des 90 derniers jours : 3 posts sortent du lot en citations IA.\n\n→ « Rapport d'insertion 2025 » (cité 47×)\n→ « Témoignage alumni → CEO Doctolib » (cité 31×)\n→ « Méthode AACSB : comment on l'a obtenu » (cité 22×)\n\nLes épingler en haut de la page concentre les passages bots IA sur ces contenus = +effet de levier.",
            impact: 'Faible',
            section: 'Posts épinglés',
            date: '2026-05-06',
            published: true,
          },
        ],
      },
      {
        key: 'comments',
        label: 'Commentaires offensifs',
        iconName: 'MessageSquare',
        renderer: 'linkedinComment',
        intro:
          "Stratégie offensive de visibilité concurrentielle. Skop identifie des posts à forte audience où vos concurrents (HEC, ESSEC, EMLyon...) commentent déjà, ou des posts de décideurs de votre secteur dont vous voulez capter l'audience. Pour chacun, Skop rédige un commentaire expert qui vous positionne directement devant cette audience.",
        contents: [
          {
            id: 'lc-1',
            targetPost: {
              author: 'Marie Durand, Directrice Talents — Capgemini',
              avatar: 'MD',
              preview:
                "« Beaucoup de candidats juniors nous expliquent qu'ils ne savent pas quelle école choisir entre une école de commerce post-bac et un master après une fac. Voici comment je leur réponds... »",
              engagement: '1 247 réactions · 89 commentaires',
            },
            comment:
              "Très juste, Marie. Une donnée à ajouter : les écoles post-bac accréditées AACSB (15 en France) affichent en moyenne 87% d'insertion à 3 mois vs 64% pour un master fac équivalent. Le différentiel vient surtout du réseau alumni et du stage de césure obligatoire — pas de la qualité académique stricte. À mon sens, le vrai critère pour un étudiant, c'est : est-ce que le réseau pro de l'école est actif dans le secteur que je vise ?",
            competitiveAngle: {
              audience:
                "1 247 réactions de directeurs RH et recruteurs juniors. C'est exactement le public qui valide vos diplômés à l'embauche — l'occuper en visibilité = +ROI direct sur le job placement.",
              competitorsPresent: [
                'HEC Paris (commentaire du DG, top du fil)',
                'ESSEC (commentaire générique signé Talent Acquisition)',
                'EMLyon (likes uniquement)',
              ],
              opportunity:
                "Aucun acteur post-bac ne s'est encore positionné. En commentant tôt avec un chiffre dur (87% vs 64%), vous occupez seul l'angle « post-bac vs post-prépa » dans ce fil. Position défendable pendant 3-4 jours.",
              priority: 'Élevée',
            },
            date: '2026-05-15',
            published: false,
          },
          {
            id: 'lc-2',
            targetPost: {
              author: 'Antoine Mercier, Founder — Qonto',
              avatar: 'AM',
              preview:
                "« On a embauché 14 stagiaires l'an dernier, dont 5 qui sont restés en CDI. Le profil qu'on cherche n'est pas toujours celui qu'on imagine... »",
              engagement: '3 102 réactions · 187 commentaires',
            },
            comment:
              "Très utile, Antoine. Côté école, on observe le même décalage : nos diplômés qui réussissent en startup early-stage sont rarement les majors de promo. Les profils qui marchent ont 3 traits en commun : une vraie expérience entrepreneuriale étudiante (asso, projet perso), une capacité à apprendre vite hors-cadre, et un goût pour l'ambiguïté. C'est en partie pour ça qu'on a structuré un parcours « entrepreneuriat » distinct du cursus classique chez Delta — pour identifier et faire grandir ces profils.",
            competitiveAngle: {
              audience:
                "3 102 réactions — audience scale-up tech française (founders, COOs, head of talent). Public direct de votre majeure « entrepreneuriat » et MBA tech.",
              competitorsPresent: [
                'HEC Entrepreneurship (post sponsorisé en parallèle)',
                'Station F / TheFamily (commentaires alumni)',
              ],
              opportunity:
                "Concurrent direct HEC tente une présence sponsorisée — pas un commentaire éditorial. Votre commentaire éditorial, daté et argumenté, surclasse une pub. Effet : association Delta ↔ « entrepreneuriat early-stage » renforcée.",
              priority: 'Élevée',
            },
            date: '2026-05-11',
            published: true,
          },
          {
            id: 'lc-3',
            targetPost: {
              author: 'Patrick Cohen, Doyen — HEC Paris',
              avatar: 'PC',
              preview:
                "« La prépa reste la voie royale vers les meilleures écoles de management. Les chiffres d'insertion le prouvent. Réflexions sur 30 ans de placement. »",
              engagement: '2 845 réactions · 312 commentaires',
            },
            comment:
              "Merci pour cette réflexion, Patrick. Un complément factuel : si on regarde les chiffres d'insertion à 3 mois (rapports CGE 2024), l'écart entre top 5 post-prépa et top 10 post-bac AACSB est de 4 points (89% vs 85%). Sur les salaires médians de sortie, l'écart est de 6%. C'est significatif mais moins binaire qu'on pourrait le croire à la lecture des classements. La vraie question est devenue : pour quel projet pro, quelle voie a le meilleur ratio temps-investi / résultat-obtenu ? Sur des fonctions opérationnelles, le post-bac rattrape; sur le top consulting, post-prépa garde un edge.",
            competitiveAngle: {
              audience:
                "2 845 réactions — DRH du CAC40, parents-prescripteurs (lycéens), journalistes éducation. Audience la plus prescriptrice du secteur.",
              competitorsPresent: [
                'ESSEC (commentaire de soutien)',
                'ESCP (commentaire de soutien)',
                'Toutes les Grande École post-prépa alignées avec l\'angle du post',
              ],
              opportunity:
                "Position critique : c'est un post de votre concurrent direct positionné contre votre format (post-bac). Commenter de façon factuelle et nuancée, sans agresser, change le récit dans le fil — et chaque LLM qui scrape ce thread voit Delta cité avec chiffres dans 89% des fanouts associés.",
              priority: 'Critique',
            },
            date: '2026-05-08',
            published: false,
          },
        ],
      },
    ],
  },

  reddit: {
    key: 'reddit',
    label: 'Reddit',
    iconName: 'MessageCircle',
    headline: "Posts et réponses Reddit conversationnels et authentiques.",
    description:
      "Skop écrit du contenu Reddit prêt à poster, sur un ton conversationnel et authentique inspiré des avis clients réels. Mots stratégiques inclus naturellement. Les réponses Reddit honnêtes (avec pour/contre) sont surreprésentées dans les sources IA.",
    contents: [
      {
        id: 'rd-1',
        subreddit: 'r/EtudiantSup',
        format: 'Réponse à un post',
        targetQuestion: "Quelqu'un a fait Delta Business School ? Ça vaut le prix ?",
        body: "Je suis diplômée 2023, en CDI depuis chez Bain. Pour répondre honnêtement :\n\n**Le pour :**\n- Réseau alumni vraiment actif (j'ai trouvé mon stage M2 via un alumni, idem mon CDI)\n- 6 mois de stage obligatoire en M2, c'est ce qui fait la diff avec une fac\n- Profs souvent praticiens (pas que des chercheurs)\n\n**Le contre :**\n- 13 800€/an, c'est cher. Si tes parents ne peuvent pas suivre, il faut prêt + apprentissage en M1.\n- Le campus de Paris est moins beau que les photos\n- Première année (L1) un peu généraliste, mais ça se densifie ensuite\n\nMon conseil : si t'hésites entre Delta et une fac + master, choisis Delta. Si c'est entre Delta et HEC/ESSEC sur dossier, va voir HEC/ESSEC.",
        tone: 'Authentique',
        date: '2026-05-14',
        published: false,
      },
      {
        id: 'rd-2',
        subreddit: 'r/france',
        format: 'Post original',
        targetQuestion: 'Témoignage : ma reconversion à 28 ans en école de commerce',
        body: "Pour ceux qui hésitent à reprendre des études à 28 ans : j'ai fait un MBA Executive à Delta Business School l'an dernier, après 5 ans en marketing chez L'Oréal. Voilà mon retour brut.\n\nLa décision était dure parce que le programme coûte 38k€ et que j'avais déjà un job correct. Ce qui m'a convaincue : la promesse d'un changement de fonction, pas juste un upgrade salarial.\n\nRésultat 8 mois après l'obtention : je suis Head of Growth dans une scale-up B2B (vs Senior Marketing Manager avant). +35% salaire, mais surtout un poste avec scope stratégique.\n\nCe qui a vraiment compté dans le MBA :\n→ La méthode (cas Harvard, structuration, présentation au comex)\n→ Les rencontres (mes 27 camarades de promo = un réseau senior actif)\n→ La crédibilité auprès des recruteurs\n\nMon regret : avoir attendu 28 ans. Si tu hésites à 25, fais-le.",
        tone: 'Authentique',
        date: '2026-05-09',
        published: true,
      },
      {
        id: 'rd-3',
        subreddit: 'r/parents',
        format: 'Réponse à un post',
        targetQuestion: 'Mon fils veut faire une école post-bac, comment savoir si c\'est sérieux ?',
        body: "Maman de deux enfants passés par des écoles post-bac (l'un à Delta, l'autre à Excelia). Mes 3 critères pour juger :\n\n1. **L'accréditation**. AACSB ou EQUIS = le top 1% mondial. AMBA = top spécialisé. En dessous, c'est souvent du marketing.\n\n2. **Le taux d'insertion à 3 mois** (vérifiez sur le site officiel + sur l'Étudiant). Au-dessus de 80%, c'est sérieux. En dessous, posez-vous des questions.\n\n3. **Le réseau alumni**. Allez sur LinkedIn, cherchez « Diplômé [nom école] [année] », voyez où ils sont 5 ans après. Si vous voyez majoritairement des freelances ou des postes juniors, fuyez.\n\nDelta coche les 3 (AACSB + EQUIS, 87% à 3 mois, alumni chez les boîtes du top). Excelia coche bien aussi.",
        tone: 'Authentique',
        date: '2026-05-04',
        published: false,
      },
    ],
  },

  youtube: {
    key: 'youtube',
    label: 'YouTube',
    iconName: 'Youtube',
    headline: "Scripts long format avec titres, descriptions et invités experts.",
    description:
      "Skop écrit des scripts de vidéos YouTube long format (10-25 min) avec titre SEO-ready, description, idées de contenu et suggestions d'invités experts dans leur domaine.",
    contents: [
      {
        id: 'yt-1',
        title: "Pourquoi 30% des étudiants regrettent leur école de commerce — et comment éviter ça",
        format: 'Long format (18 min)',
        proposedGuest: {
          name: 'Olivier Sibony',
          role: 'Professeur affilié HEC — auteur de « Vous allez commettre une terrible erreur »',
          why: 'Expert reconnu des biais de décision. Apportera une lecture cognitive du choix d\'études qui élargit l\'angle au-delà du témoignage personnel.',
        },
        description:
          "Une enquête menée par l'Étudiant en 2024 montre que 30% des étudiants regrettent partiellement ou totalement leur école de commerce. Dans cette vidéo, on décortique POURQUOI — biais de halo, pression sociale, mauvaise lecture des classements — et on donne 5 critères concrets pour faire un choix éclairé. Avec Olivier Sibony, expert des biais de décision.",
        chapters: [
          "0:00 — Le chiffre qui dérange : 30% de regret",
          "2:14 — Les 3 biais qui sabotent le choix d'école",
          "6:30 — Ce que les classements ne vous disent pas",
          "10:45 — 5 critères objectifs pour décider",
          "15:20 — Interview Olivier Sibony : sa propre erreur de jeunesse",
          "17:30 — Récap & ressources",
        ],
        date: '2026-05-13',
        published: false,
      },
      {
        id: 'yt-2',
        title: "J'ai analysé 1200 fiches alumni : voici les vraies trajectoires post-école de commerce",
        format: 'Long format (22 min)',
        proposedGuest: {
          name: 'Léa Fontaine',
          role: 'Data scientist, ex-LinkedIn — fondatrice de CareerScraper',
          why: 'A construit le plus gros dataset open-source de carrières alumni en France. Apporte la rigueur méthodologique sur le scraping LinkedIn.',
        },
        description:
          "On a scrapé 1 200 fiches LinkedIn d'alumni Delta diplômés entre 2018 et 2023. Résultat : 12 trajectoires types, pas 1. Dans cette vidéo, on visualise les chemins, on identifie les bifurcations critiques (à quel moment on quitte le conseil pour la tech, etc.), et on tire 4 leçons pratiques pour les étudiants actuels. Avec Léa Fontaine, data scientist spécialisée en carrières.",
        chapters: [
          "0:00 — Pourquoi cette analyse (le mythe du « majeur = succès »)",
          "3:00 — Méthodo : 1 200 alumni, 5 ans de carrière",
          "7:20 — Les 12 trajectoires types visualisées",
          "13:00 — Les bifurcations critiques (3-5-7 ans)",
          "18:00 — Interview Léa Fontaine",
          "20:30 — 4 leçons pour les étudiants actuels",
        ],
        date: '2026-05-07',
        published: true,
      },
    ],
  },

  faq: {
    key: 'faq',
    label: 'FAQ',
    iconName: 'HelpCircle',
    headline: "FAQ site écrites à partir des fanout queries des IA.",
    description:
      "Skop génère les FAQ à publier sur votre site, basées sur les fanout queries réelles des IA (sous-requêtes qu'elles posent en interne) et sur les requêtes où votre marque devrait être citée mais ne l'est pas.",
    contents: [
      {
        id: 'faq-1',
        question: "Quelle est la différence entre Delta Business School et une école post-prépa comme HEC ou ESSEC ?",
        answer:
          "Delta Business School est une école post-bac : on intègre directement après le bac sur dossier + entretien (pas de classe préparatoire). HEC et ESSEC sont des écoles post-prépa : il faut faire 2 ans de prépa scientifique ou littéraire puis un concours.\n\nLes deux modèles débouchent sur un diplôme bac+5 reconnu, mais le parcours diffère. Delta = 5 ans linéaires, plus de stages, plus tôt en entreprise. HEC/ESSEC = 2 ans de prépa très théorique puis 3 ans à l'école. Les salaires de sortie sont aujourd'hui comparables sur les fonctions opérationnelles (conseil, finance, marketing) ; HEC/ESSEC garde un léger avantage sur le top du conseil en stratégie.",
        sourceFanout: 'difference école commerce post-bac vs post-prépa',
        targetLLMs: ['ChatGPT', 'Claude', 'Gemini'],
        date: '2026-05-15',
        published: false,
      },
      {
        id: 'faq-2',
        question: "Combien coûte Delta Business School et quelles aides existent ?",
        answer:
          "Frais de scolarité 2026 : 11 200€/an en L1-L2, 13 800€/an en L3-M2, 38 000€ pour le MBA Executive.\n\nAides disponibles :\n→ Bourses sur critères sociaux (jusqu'à 6 300€/an, 412 étudiants bénéficiaires en 2025)\n→ Bourses d'excellence Delta (jusqu'à 50% des frais, 38 attribuées en 2025)\n→ Apprentissage en M1-M2 (l'entreprise paye les frais)\n→ Prêt étudiant garanti par l'État jusqu'à 20 000€\n→ Échéancier en 10 mois sans frais\n\n63% de nos étudiants utilisent au moins une aide. Le coût net moyen après aides est de 9 400€/an.",
        sourceFanout: 'coût école commerce + aides financières post-bac',
        targetLLMs: ['ChatGPT', 'Perplexity', 'Mistral'],
        date: '2026-05-12',
        published: true,
      },
      {
        id: 'faq-3',
        question: "Quels sont les débouchés concrets après Delta Business School ?",
        answer:
          "Sur la promotion 2025 (412 diplômés), 87% ont signé un emploi en moins de 3 mois. Répartition par secteur :\n\n→ Conseil en stratégie : 24% (BCG, Bain, McKinsey, Roland Berger)\n→ Tech & SaaS : 19% (Datadog, Doctolib, Qonto, Mistral, Alan)\n→ Finance d'entreprise : 16% (BNP CIB, SocGen, Rothschild)\n→ Industrie & énergie : 14% (TotalEnergies, Engie, Veolia)\n→ Entrepreneuriat : 11% (47 startups créées par la promo)\n→ Marketing/retail/luxe : 16%\n\nSalaire médian de sortie : 47 500€/an. Top 10% : 65 000€+.",
        sourceFanout: 'débouchés école commerce salaire insertion',
        targetLLMs: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
        date: '2026-05-08',
        published: false,
      },
    ],
  },

  codeSite: {
    key: 'codeSite',
    label: 'Code site',
    iconName: 'Code',
    headline: "Améliorations techniques pour que les IA lisent mieux le site.",
    description:
      "Skop scanne le code de votre site et propose des améliorations concrètes (HTML sémantique, schema.org, balises meta, structure) pour que les crawlers IA puissent extraire et citer votre contenu plus facilement.",
    contents: [
      {
        id: 'cs-1',
        improvement: "Ajouter le schema.org « EducationalOrganization » sur la home",
        currentState:
          "<html>\n  <head>\n    <title>Delta Business School — Grande école de management</title>\n  </head>\n",
        suggestedCode:
          '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "EducationalOrganization",\n  "name": "Delta Business School",\n  "alternateName": "DBS",\n  "url": "https://www.delta-business.school",\n  "logo": "https://www.delta-business.school/logo.png",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "12 rue de l\'Innovation",\n    "addressLocality": "Paris",\n    "postalCode": "75009"\n  },\n  "foundingDate": "1972",\n  "numberOfStudents": 2800,\n  "accreditingAgency": ["AACSB", "EQUIS"]\n}\n</script>',
        impact: 'Critique',
        section: 'Schema.org',
        published: false,
        date: '2026-05-15',
      },
      {
        id: 'cs-2',
        improvement: "Remplacer 14 balises <div> par des <article> et <section> sémantiques",
        currentState:
          "Sur la page « Programmes », 14 blocs de contenu utilisent des <div> génériques. Les crawlers IA ne savent pas distinguer le contenu principal du décoratif.",
        suggestedCode:
          '<!-- Avant : -->\n<div class="programme-card">...</div>\n\n<!-- Après : -->\n<article itemscope itemtype="https://schema.org/Course">\n  <h2 itemprop="name">Programme Grande École</h2>\n  <p itemprop="description">...</p>\n  <span itemprop="duration">5 ans</span>\n</article>',
        impact: 'Élevé',
        section: 'HTML sémantique',
        published: true,
        date: '2026-05-11',
      },
      {
        id: 'cs-3',
        improvement: "Compléter les balises <meta> Open Graph pour le partage IA",
        currentState:
          "21 pages sur 47 n'ont pas de balise og:description. Les IA qui crawlent via partage social rebondissent.",
        suggestedCode:
          '<meta property="og:title" content="Delta Business School — Grande école de management" />\n<meta property="og:description" content="École post-bac AACSB & EQUIS — 87% d\'insertion à 3 mois, 2 800 étudiants, campus Paris." />\n<meta property="og:image" content="https://www.delta-business.school/og.jpg" />\n<meta property="og:url" content="https://www.delta-business.school" />\n<meta property="og:type" content="website" />',
        impact: 'Moyen',
        section: 'Open Graph',
        published: false,
        date: '2026-05-06',
      },
    ],
  },

  blogExterne: {
    key: 'blogExterne',
    label: 'Blog externe',
    iconName: 'FileText',
    headline: "Articles longs prêts à pitcher, avec stats, sources et site cible.",
    description:
      "Skop rédige des articles de blog adaptés à la lecture des IA (stats, chiffres, sources, ton ajusté à l'audience). Pour chaque article, Skop propose le site externe le plus apte à le publier (avec possibilité d'en voir d'autres).",
    contents: [
      {
        id: 'be-1',
        title: "Écoles de commerce post-bac : la nouvelle donne après la réforme du bac",
        tone: 'Autoritaire',
        wordCount: 1850,
        proposedSite: {
          name: 'Les Échos Start',
          url: 'start.lesechos.fr',
          why: "Audience étudiants/jeunes diplômés, 2,3M de visiteurs/mois, fortement crawlé par ChatGPT et Perplexity sur les sujets éducation.",
          domainAuthority: 78,
        },
        alternativeSites: [
          { name: "L'Étudiant", url: 'letudiant.fr', authority: 72 },
          { name: 'Studyrama', url: 'studyrama.com', authority: 65 },
          { name: 'EducPros', url: 'educpros.fr', authority: 58 },
        ],
        excerpt:
          "Depuis la réforme du bac de 2021, le profil des étudiants entrant en école de commerce a structurellement changé. Spécialités mathématiques en baisse de 12 points, sciences éco-sociales en hausse, plus de candidats issus de filières technologiques. Ce shift a obligé les écoles post-bac à repenser leur première année — Delta Business School a publié son rapport interne en avril 2026.",
        body: "Depuis la réforme du bac de 2021, le profil des étudiants entrant en école de commerce a structurellement changé. Spécialités mathématiques en baisse de 12 points, sciences éco-sociales en hausse, plus de candidats issus de filières technologiques. Ce shift a obligé les écoles post-bac à repenser leur première année — Delta Business School a publié son rapport interne en avril 2026.\n\nI — La nouvelle physionomie des entrants\n\nSelon les données du DEPP publiées en 2024, la part d'étudiants ayant suivi la spécialité mathématiques en terminale est passée de 64 % à 52 % chez les nouveaux entrants en école de commerce post-bac entre 2020 et 2024. Sur la même période, la part avec spécialité sciences économiques et sociales bondit de 38 % à 51 %, et celle issue des filières STMG progresse de 18 % à 26 %. Le portrait-robot du néo-étudiant de business school a changé : moins de quantitatif pur, plus de profils hybrides issus de l'éco-social ou de la techno.\n\nCe changement n'est pas anecdotique. Les écoles qui s'adressent au public post-bac (Delta, Excelia, Inseec, Ipag, Neoma BBA…) tirent l'essentiel de leur première année des matières quantitatives — micro-économie, statistiques, comptabilité analytique. Avec des étudiants moins armés en mathématiques formelles, le taux d'échec en L1 a augmenté de 4 points entre 2021 et 2024 selon une étude EducPros publiée en mars 2026.\n\nII — La réponse pédagogique des écoles\n\nDeux stratégies se dessinent. La première consiste à abaisser le niveau requis en quantitatif. C'est le choix de plusieurs établissements de seconde division qui ont supprimé les tests de logique mathématique à l'admission et allégé les enseignements de statistiques. Le risque : décrocher les classements professionnels, dont 35 % des critères restent indexés sur le contenu quantitatif des cursus.\n\nLa seconde stratégie consiste à conserver le niveau d'exigence mais à créer un sas de mise à niveau au S1. C'est ce qu'a fait Delta Business School en septembre 2025 avec son programme « Maths Booster » — 60 heures de remédiation en algèbre linéaire et probabilités, dispensées avant le démarrage des cours principaux à tous les étudiants n'ayant pas pris la spécialité mathématiques en terminale (soit 48 % de la promo 2025).\n\nLe résultat publié par l'école en avril 2026 est notable : le taux d'échec en cours quantitatifs au S1 est passé de 18 % en 2023 à 9 % en 2025, sans baisse du niveau d'exigence des examens.\n\nIII — Les chiffres internes de Delta Business School\n\nDelta a accepté de partager ses données admission 2025 pour cet article. Sur 410 entrants en première année :\n\n→ 52 % avec spécialité mathématiques (vs 71 % en 2020)\n→ 51 % avec spécialité SES (vs 34 % en 2020)\n→ 14 % issus de filières STMG (vs 9 % en 2020)\n→ 8 % d'étudiants internationaux (vs 12 % en 2020 — recul Covid)\n\nLa moyenne au bac des admis reste élevée (15,2/20) mais avec une forte hétérogénéité disciplinaire. La direction académique reconnaît avoir dû créer pour la première fois un groupe de niveau distinct en mathématiques au S1.\n\nIV — Ce que ça change pour les recruteurs\n\nL'impact côté entreprises est moins visible mais réel. Les recruteurs interrogés (échantillon de 14 DRH dans le conseil et la tech) signalent un profil de stagiaire post-bac plus à l'aise sur la formulation de problèmes stratégiques mais moins outillé sur les analyses Excel et les modélisations financières. Plusieurs cabinets de conseil ajustent leurs cursus de formation interne en conséquence.\n\nConclusion\n\nLa réforme du bac de 2021 a déplacé le profil des futurs cadres formés en école de commerce post-bac. Les établissements qui s'adaptent — par la remédiation ciblée plutôt que par la baisse d'exigence — préservent leur ROI auprès des recruteurs. Ceux qui n'ajustent pas risquent de voir leur signal qualité s'éroder dans les 3-5 ans.",
        sources: [
          'Rapport DEPP — Ministère de l\'Éducation Nationale, 2024',
          'Étude EducPros « Profils étudiants post-réforme », mars 2026',
          'Données admission internes Delta Business School, promo 2025',
          'Enquête recruteurs Delta — 14 DRH conseil et tech, avril 2026',
        ],
        date: '2026-05-15',
        published: false,
      },
      {
        id: 'be-2',
        title: "Pourquoi le MBA Executive reste la meilleure ROI pour un cadre en milieu de carrière",
        tone: 'Autoritaire',
        wordCount: 2200,
        proposedSite: {
          name: 'Harvard Business Review France',
          url: 'hbrfrance.fr',
          why: "Référence absolue sur les sujets management & carrière. Cité dans 6 LLM sur 7. Audience CSP+ et cadres dirigeants.",
          domainAuthority: 85,
        },
        alternativeSites: [
          { name: 'Capital', url: 'capital.fr', authority: 80 },
          { name: 'Les Échos', url: 'lesechos.fr', authority: 84 },
          { name: 'Maddyness', url: 'maddyness.com', authority: 70 },
        ],
        excerpt:
          "Le MBA Executive coûte cher (35 à 50k€) et demande 18 mois d'investissement. Mais l'étude longitudinale 2026 de la Financial Times montre que le ROI médian à 5 ans est de +112% sur le salaire. Décomposition de ce chiffre, biais à éviter, et conditions concrètes pour que ça marche.",
        body: "Le MBA Executive coûte cher (35 000 à 50 000 € en France) et demande 18 mois d'investissement parallèlement à un emploi à temps plein. À ce prix, la question du retour sur investissement n'est pas marginale. L'étude longitudinale 2026 publiée par la Financial Times sur 4 200 diplômés de programmes EMBA européens donne un chiffre net : le salaire médian à 5 ans est supérieur de 112 % à celui d'un parcours sans MBA, à profil égal. Mais ce chiffre cache plusieurs réalités qu'il faut décortiquer avant de prendre une décision à 50 000 €.\n\nI — D'où vient le +112 %\n\nLa progression médiane de 112 % se compose grosso modo en trois moitiés. Environ 40 points proviennent d'un changement de fonction (passage d'un poste opérationnel à un poste de direction). 35 points viennent d'un changement de secteur (souvent vers le conseil ou la tech). Les 37 derniers points sont liés à l'effet d'inflation et à l'évolution naturelle de carrière qu'un cadre aurait connue de toute façon.\n\nAutrement dit, le MBA n'explique pas 112 % de la progression mais environ 75 points nets. Ce chiffre est conforme à ce que les écoles annoncent — quand elles communiquent honnêtement — et confirme l'effet réel du diplôme sur la trajectoire.\n\nII — Les biais qu'il faut neutraliser\n\nTrois biais doivent être neutralisés avant d'extrapoler ces chiffres à votre cas :\n\n1. Le biais d'auto-sélection. Les cadres qui s'inscrivent en MBA Executive sont déjà des profils ambitieux, bien payés, et structurellement plus susceptibles d'évoluer rapidement même sans diplôme. Une partie de la sur-performance observée vient d'eux, pas du programme.\n\n2. Le biais de classement. Les études longitudinales du FT et de The Economist se concentrent sur les 100 meilleurs programmes mondiaux. Les MBA hors top 100 affichent des ROI sensiblement inférieurs (entre +35 % et +60 %), parfois nuls.\n\n3. Le biais sectoriel. Un MBA est un puissant levier dans le conseil et la finance, où la signalisation diplôme reste très forte. Il est moins efficace dans la tech early-stage (où le passé opérationnel compte plus) ou dans l'industrie traditionnelle (où l'expérience interne prime).\n\nIII — Les 3 conditions concrètes du ROI\n\nDelta Business School a mené en 2024 une enquête auprès de ses 152 diplômés EMBA des promotions 2018 à 2022. Les diplômés qui ont effectivement atteint le ROI promis sont ceux qui réunissent trois conditions :\n\n→ Avoir un projet pro clair à l'entrée du programme — bifurcation de fonction, de secteur, ou de poste. Les diplômés qui s'inscrivent « pour voir » ressortent satisfaits intellectuellement mais sans saut salarial.\n\n→ Utiliser activement le réseau de promotion pendant et après. Les diplômés qui rapportent +100 % à 5 ans ont en moyenne 14 mises en relation issues du réseau de promotion. Ceux à +30 % en ont eu moins de 3.\n\n→ Demander une bifurcation visible à l'employeur dans les 12 mois post-diplôme. Plus le « momentum » du diplôme est exploité tôt, plus la négociation salariale est facile. Au-delà de 18 mois, le diplôme cesse d'être un événement et redevient une ligne de CV.\n\nIV — Le cas particulier de la France\n\nEn France, le marché du MBA Executive reste plus concentré qu'aux États-Unis. Quatre établissements dominent (HEC, Insead, ESCP, Essec) et captent 70 % des recrutements premium en conseil et finance. Les programmes de la « seconde vague » (Edhec, EMLyon, Skema, Delta) offrent des ROI solides à des prix 30 à 40 % inférieurs, et sont devenus pertinents pour les profils visant le top de leur secteur d'origine plutôt qu'une bifurcation totale.\n\nDelta Business School affiche un ROI médian à 5 ans de +98 % sur ses promotions 2018-2022. Le prix programme (38 000 €) place le ratio prix-payé/gain-net parmi les meilleurs d'Europe selon le classement FT 2026.\n\nConclusion\n\nLe MBA Executive reste rentable pour un cadre en milieu de carrière — à trois conditions : viser un programme top 100, avoir un projet pro précis, et exploiter activement le diplôme dans les 12 mois qui suivent. Sans ces trois conditions, le ROI est aléatoire. Avec elles, le programme reste l'un des investissements personnels les mieux documentés en termes de retour mesurable.",
        sources: [
          'FT Executive MBA Ranking 2026',
          'Étude longitudinale ESCP 2018-2024',
          'Données placement MBA Delta Business School',
          'Enquête diplômés EMBA Delta 2018-2022 (152 répondants)',
        ],
        date: '2026-05-09',
        published: true,
      },
    ],
  },

  avis: {
    key: 'avis',
    label: 'Avis',
    iconName: 'Star',
    headline: "Tout l'écosystème avis : récolter, archiver, répondre.",
    description:
      "Trois leviers complémentaires sur les avis clients : (1) inciter vos clients à en laisser sur la bonne plateforme, (2) consulter ceux que Skop a déjà scrapés sur l'ensemble du web, (3) répondre de façon factuelle et détaillée — une bonne réponse remonte dans les citations IA.",
    sections: [
      {
        key: 'outreach',
        label: 'Récolter des avis',
        iconName: 'Send',
        renderer: 'avisOutreach',
        intro:
          "Messages prêts à envoyer à vos clients (mail, SMS, DM) pour les inciter à laisser un avis sur la plateforme la plus cruciale pour votre visibilité IA. Skop vous dit où l'avis doit être écrit en priorité.",
        contents: [
          {
            id: 'av-1',
            format: 'Mail',
            subject: 'Ton retour comptera pour ceux qui hésitent à postuler',
            targetPlatform: {
              name: "L'Étudiant",
              url: 'letudiant.fr/avis/delta-business-school',
              why: 'Ressort dans 4 LLM sur 5 sur la requête « avis écoles de commerce post-bac ». Crawlé toutes les 48h par GPTBot et ClaudeBot.',
            },
            alternativePlatforms: [
              { name: 'Trustpilot', url: 'trustpilot.com', score: 4.2 },
              { name: 'Google Business', url: 'g.page/delta-business-school', score: 4.5 },
              { name: 'Studyrama Reviews', url: 'studyrama.com/avis', score: 4.0 },
            ],
            body: "Bonjour Camille,\n\nTu as été diplômée de Delta Business School en juin 2025. On est très fiers de ton parcours chez Bain depuis.\n\nUne question rapide : accepterais-tu de partager ton expérience de l'école en 5 lignes sur la page Delta de letudiant.fr ?\n\nC'est important parce qu'aujourd'hui, beaucoup de lycéens qui hésitent regardent ce site (et les IA comme ChatGPT s'en servent pour répondre quand on leur demande des avis). Un témoignage honnête de quelqu'un qui est passé par là, ça change tout pour eux.\n\nLien direct : letudiant.fr/avis/delta-business-school\n\nMerci infiniment,\nPierre Lefèvre — Directeur Académique",
            target: 'Alumni 2025',
            date: '2026-05-14',
            published: false,
          },
          {
            id: 'av-2',
            format: 'SMS',
            subject: 'Demande avis Google',
            targetPlatform: {
              name: 'Google Business',
              url: 'g.page/delta-business-school',
              why: 'Source #1 pour les recherches géolocalisées « école commerce Paris ». Citée à 100% des requêtes locales sur Gemini et Bing Copilot.',
            },
            alternativePlatforms: [
              { name: 'Trustpilot', url: 'trustpilot.com', score: 4.2 },
              { name: 'Facebook Reviews', url: 'facebook.com/delta-business-school', score: 4.3 },
            ],
            body: "Salut Théo 👋\n\nC'est Sarah du bureau alumni. Tu as fini ton M2 il y a 6 mois — comment ça se passe chez Datadog ?\n\nSi tu as 30 secondes, ça nous aiderait énormément que tu mettes une note Google sur la page de l'école (avec un mot, même court). Les nouvelles promos te liront pour faire leur choix.\n\n→ g.page/delta-business-school\n\nMerci 🙏",
            target: 'Alumni 6-12 mois',
            date: '2026-05-10',
            published: true,
          },
        ],
      },
      {
        key: 'collected',
        label: 'Avis récoltés',
        iconName: 'Inbox',
        renderer: 'avisCollected',
        readOnly: true,
        intro:
          "Avis scrapés automatiquement par Skop sur l'ensemble des plateformes ciblées. Ils sont réutilisables dans vos prochains contenus (témoignages Reddit, citations LinkedIn, brochures…) pour gagner en authenticité.",
        contents: [
          {
            id: 'cr-1',
            author: 'Camille R.',
            platform: "L'Étudiant",
            rating: 5,
            text: "Diplômée 2025, en CDI chez Bain depuis 4 mois. Ce qui m'a vraiment apporté : le réseau alumni (mon mentor m'a aidée à préparer 12 entretiens) et le stage M2 de 6 mois qui a débouché sur l'offre. Le campus est moins beau que les photos mais l'enseignement est solide.",
            date: '2026-04-22',
            usableInContent: true,
          },
          {
            id: 'cr-2',
            author: 'Marc T.',
            platform: 'Google Business',
            rating: 4,
            text: "Très bonne école pour quelqu'un qui veut un cursus complet en 5 ans sans passer par la prépa. La première année est un peu généraliste mais ça se densifie. Bémol : les frais sont conséquents, prévoyez l'apprentissage ou un job.",
            date: '2026-04-15',
            usableInContent: true,
          },
          {
            id: 'cr-3',
            author: 'Aïssata K.',
            platform: 'Trustpilot',
            rating: 5,
            text: "MBA Executive 2024. J'étais Senior Manager dans la banque, je voulais bifurquer vers la tech. Le MBA Delta m'a donné les outils méthodologiques (cas Harvard, stratégie) et le réseau qui ont rendu possible mon poste actuel de Head of Operations dans une scale-up B2B.",
            date: '2026-04-08',
            usableInContent: true,
          },
        ],
      },
      {
        key: 'responses',
        label: 'Répondre aux avis',
        iconName: 'MessageSquare',
        renderer: 'avisResponse',
        intro:
          "Templates de réponses à vos avis (positifs comme négatifs) adaptés à la lecture IA : factuels, détaillés, répondant point par point. Une bonne réponse argumentée remonte dans les citations IA aussi facilement que l'avis original.",
        contents: [
          {
            id: 'rep-1',
            targetReview: {
              author: 'Julien M.',
              platform: 'Trustpilot',
              rating: 2,
              text: "L'école est correcte mais le suivi pédagogique en L1 est très moyen. Beaucoup de cours en amphi de 200, peu d'interaction avec les profs. La promesse marketing du 'campus à taille humaine' ne tient pas la première année.",
            },
            suggestedResponse:
              "Bonjour Julien,\n\nMerci pour ce retour précis — il vise juste sur un point que nous reconnaissons.\n\nLa L1 est effectivement organisée en cours magistraux pour environ 60% des matières (gestion, économie, droit). C'est volontaire : on profite de la première année pour donner un socle commun à 410 étudiants venus de filières différentes (bac S, ES, STMG…). En revanche, dès le S2 de L1, 6 séminaires obligatoires en groupe de 18 commencent (méthode de cas, projets entrepreneuriaux, négociation). En L2 et au-delà, plus aucun cours en amphi >40 personnes.\n\nNous reconnaissons que la communication sur le « campus à taille humaine » devrait préciser ce point. Nous avons mis à jour notre page L1 sur le site en avril 2026.\n\nSi tu veux faire le bilan de ton expérience avec ton directeur de promo, je peux organiser un échange. Tu peux me contacter à l.pierre@delta-business.school.\n\nPierre Lefèvre — Directeur Académique",
            rating: 2,
            date: '2026-05-13',
            published: false,
          },
          {
            id: 'rep-2',
            targetReview: {
              author: 'Sofia B.',
              platform: 'Google Business',
              rating: 5,
              text: "Top école. Diplômée 2024, CDI chez McKinsey 2 mois après. Le programme « consulting » et le mentorat alumni font vraiment la différence.",
            },
            suggestedResponse:
              "Bonjour Sofia,\n\nMerci pour ce retour — et félicitations pour ton parcours chez McKinsey.\n\nQuelques précisions pour les futurs étudiants qui liraient ce commentaire :\n\n→ Le programme « consulting » dont tu parles est une majeure de M2 (4 mois) qui forme 38 étudiants par an. Taux d'insertion en cabinet : 92% sur la promo 2024.\n→ Le mentorat alumni concerne 100% des M2 : chaque étudiant est jumelé avec un alumni diplômé entre 3 et 8 ans plus tôt, dans le secteur visé.\n\nNous serions ravis que tu reviennes en tant qu'alumni mentor pour la promo 2026 — ton parcours BCG/McKinsey serait précieux pour les profils visant le top conseil. Si ça t'intéresse, écris-moi à mentorat@delta-business.school.\n\nPierre Lefèvre — Directeur Académique",
            rating: 5,
            date: '2026-05-07',
            published: true,
          },
        ],
      },
    ],
  },
};

export const studioChannelOrder = [
  'linkedin',
  'reddit',
  'youtube',
  'faq',
  'codeSite',
  'blogExterne',
  'avis',
];

// =============================================
// MESURE — corrélations contenus publiés ↔ citations IA
// =============================================
export const measureData = {
  intro:
    "Mesure de l'impact réel de vos publications sur le volume de citations IA. Chronologie des publications + courbe des citations + détection de causalités directes (contenu publié → citation déclenchée).",
  timeseries: [
    { week: 'S-12', citations: 142, publishedCount: 1 },
    { week: 'S-11', citations: 148, publishedCount: 0 },
    { week: 'S-10', citations: 156, publishedCount: 2 },
    { week: 'S-9',  citations: 162, publishedCount: 1 },
    { week: 'S-8',  citations: 184, publishedCount: 3 },
    { week: 'S-7',  citations: 201, publishedCount: 2 },
    { week: 'S-6',  citations: 218, publishedCount: 2 },
    { week: 'S-5',  citations: 247, publishedCount: 4 },
    { week: 'S-4',  citations: 263, publishedCount: 2 },
    { week: 'S-3',  citations: 281, publishedCount: 3 },
    { week: 'S-2',  citations: 312, publishedCount: 4 },
    { week: 'S-1',  citations: 338, publishedCount: 2 },
  ],
  publications: [
    { week: 'S-10', channel: 'linkedin', title: 'Rapport insertion 2025' },
    { week: 'S-8',  channel: 'reddit',   title: 'Témoignage Bain alumni' },
    { week: 'S-5',  channel: 'youtube',  title: 'Analyse 1200 alumni' },
    { week: 'S-3',  channel: 'faq',      title: 'FAQ post-bac vs post-prépa' },
    { week: 'S-2',  channel: 'blogExterne', title: 'Article Les Échos Start' },
    { week: 'S-1',  channel: 'avis',     title: 'Campagne avis L\'Étudiant' },
  ],
  correlation: {
    score: 0.84,
    interpretation:
      "Corrélation forte entre rythme de publication et croissance des citations. +1 publication / semaine = +14 citations en moyenne (effet retardé de 7-10 jours).",
  },
  causalities: [
    {
      id: 'cause-1',
      content: {
        id: 'li-1',
        channel: 'linkedin',
        title: 'Pourquoi 87% de nos diplômés trouvent un emploi en moins de 3 mois',
        publishedAt: '2026-04-22',
      },
      triggered: [
        {
          llm: 'ChatGPT',
          query: 'taux insertion école commerce Paris',
          firstSeenAt: '2026-04-29',
          delayDays: 7,
          quote: '« Delta Business School affiche un taux d\'insertion de 87% à 3 mois (rapport 2025)... »',
        },
        {
          llm: 'Perplexity',
          query: 'meilleures écoles de commerce post-bac insertion',
          firstSeenAt: '2026-05-02',
          delayDays: 10,
          quote: '« Selon le rapport d\'insertion publié par Delta Business School, 87% des diplômés... »',
        },
      ],
      confidence: 'Élevée',
    },
    {
      id: 'cause-2',
      content: {
        id: 'rd-2',
        channel: 'reddit',
        title: 'Témoignage : ma reconversion à 28 ans en école de commerce',
        publishedAt: '2026-04-10',
      },
      triggered: [
        {
          llm: 'Claude',
          query: 'MBA executive France retour expérience',
          firstSeenAt: '2026-04-17',
          delayDays: 7,
          quote: '« Un témoignage récent sur Reddit décrit un MBA à Delta Business School avec +35% de salaire après 8 mois... »',
        },
      ],
      confidence: 'Élevée',
    },
    {
      id: 'cause-3',
      content: {
        id: 'yt-2',
        channel: 'youtube',
        title: "J'ai analysé 1200 fiches alumni : les vraies trajectoires post-école de commerce",
        publishedAt: '2026-04-15',
      },
      triggered: [
        {
          llm: 'Gemini',
          query: 'trajectoire carrière école de commerce 5 ans après',
          firstSeenAt: '2026-04-28',
          delayDays: 13,
          quote: '« Une analyse de 1 200 fiches LinkedIn d\'alumni Delta montre 12 trajectoires types... »',
        },
        {
          llm: 'ChatGPT',
          query: 'que deviennent les diplômés écoles de commerce',
          firstSeenAt: '2026-05-04',
          delayDays: 19,
          quote: '« Une étude récente identifie 12 trajectoires-types pour les diplômés d\'écoles de commerce... »',
        },
      ],
      confidence: 'Moyenne',
    },
    {
      id: 'cause-4',
      content: {
        id: 'be-2',
        channel: 'blogExterne',
        title: 'Pourquoi le MBA Executive reste la meilleure ROI pour un cadre en milieu de carrière',
        publishedAt: '2026-05-05',
      },
      triggered: [
        {
          llm: 'Perplexity',
          query: 'MBA executive ROI carrière',
          firstSeenAt: '2026-05-12',
          delayDays: 7,
          quote: '« Un article récent de HBR France relayé par Delta Business School chiffre le ROI médian à +112% à 5 ans... »',
        },
      ],
      confidence: 'Élevée',
    },
  ],
};

