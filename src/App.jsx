import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Vision from './pages/Vision.jsx';
import FanoutQueries from './pages/FanoutQueries.jsx';
import Strategie from './pages/Strategie.jsx';
import Creation from './pages/Creation.jsx';
import Journalistes from './pages/Journalistes.jsx';
import Scanner from './pages/Scanner.jsx';
import Mesure from './pages/Mesure.jsx';
import BotsIA from './pages/BotsIA.jsx';
import Visiteurs from './pages/Visiteurs.jsx';
import Organisation from './pages/Organisation.jsx';

export default function App() {
  return (
    <>
      <CommandPalette />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/vision" replace />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/fanout" element={<FanoutQueries />} />
          <Route path="/strategie" element={<Strategie />} />
          <Route path="/creation" element={<Creation />} />
          <Route path="/journalistes" element={<Journalistes />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/mesure" element={<Mesure />} />
          {/* Anciennes URLs /audit et /crawl → /scanner */}
          <Route path="/audit" element={<Navigate to="/scanner" replace />} />
          <Route path="/crawl" element={<Navigate to="/scanner" replace />} />
          <Route path="/bots" element={<BotsIA />} />
          <Route path="/visiteurs" element={<Visiteurs />} />
          <Route path="/organisation" element={<Organisation />} />
          {/* /tracking et /rapport supprimés → rapport désormais en modale sur le Dashboard */}
          <Route path="/tracking" element={<Navigate to="/vision" replace />} />
          <Route path="/rapport" element={<Navigate to="/vision" replace />} />
          {/* Redirection de l'ancienne URL /entreprise vers /organisation */}
          <Route path="/entreprise" element={<Navigate to="/organisation" replace />} />
        </Route>
      </Routes>
    </>
  );
}
