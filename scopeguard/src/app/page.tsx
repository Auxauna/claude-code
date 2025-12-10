'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import PlanTable from '@/components/PlanTable';
import TerminalLoader from '@/components/TerminalLoader';
import DiffView from '@/components/DiffView';
import RFIPanel from '@/components/RFIPanel';

type AppState = 'dashboard' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [rfiPanelOpen, setRfiPanelOpen] = useState(false);

  const handleUpload = useCallback(() => {
    setAppState('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setAppState('results');
  }, []);

  const handleBack = useCallback(() => {
    setAppState('dashboard');
    setRfiPanelOpen(false);
  }, []);

  const handleGenerateRFI = useCallback(() => {
    setRfiPanelOpen(true);
  }, []);

  const handleCloseRFI = useCallback(() => {
    setRfiPanelOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-[#fdf6e3]">
      <AnimatePresence mode="wait">
        {appState === 'dashboard' && (
          <PlanTable key="dashboard" onUpload={handleUpload} />
        )}

        {appState === 'loading' && (
          <TerminalLoader key="loading" onComplete={handleLoadingComplete} />
        )}

        {appState === 'results' && (
          <DiffView
            key="results"
            onBack={handleBack}
            onGenerateRFI={handleGenerateRFI}
          />
        )}
      </AnimatePresence>

      {/* RFI Panel - Slides up from bottom */}
      <RFIPanel isOpen={rfiPanelOpen} onClose={handleCloseRFI} />
    </main>
  );
}
