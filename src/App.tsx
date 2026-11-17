/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PWAInstall } from './components/PWAInstall';

import { Home } from './pages/Home';
import { Gate } from './pages/Gate';
import { Objectives } from './pages/Objectives';
import { Explore } from './pages/Explore';
import { Simulation } from './pages/Simulation';
import { Design } from './pages/Design';
import { Assistant } from './pages/Assistant';
import { Assess } from './pages/Assess';
import { Passport } from './pages/Passport';
import { Gallery } from './pages/Gallery';
import { Teacher } from './pages/Teacher';

export default function App() {
  const { currentRoute } = useStore();

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home />;
      case '/gate':
        return <Gate />;
      case '/objectives':
        return <Objectives />;
      case '/explore':
        return <Explore />;
      case '/simulation':
        return <Simulation />;
      case '/design':
        return <Design />;
      case '/assistant':
        return <Assistant />;
      case '/assess':
        return <Assess />;
      case '/passport':
        return <Passport />;
      case '/gallery':
        return <Gallery />;
      case '/teacher':
        return <Teacher />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['IBM_Plex_Sans_Arabic',sans-serif]" dir="rtl">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <PWAInstall />
    </div>
  );
}
