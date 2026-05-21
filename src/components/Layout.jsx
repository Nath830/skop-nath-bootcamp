import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen bg-skop-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 px-8 py-10 lg:px-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
