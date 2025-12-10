'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, FileCheck, FileWarning, MapPin, DollarSign, ArrowLeft } from 'lucide-react';

interface Conflict {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  type: string;
  location: string;
  old_spec: string;
  new_spec: string;
  cost_impact: number;
  sheet_ref: string;
}

interface MockData {
  project: string;
  gc: string;
  bulletin: string;
  conflicts: Conflict[];
}

const MOCK_DATA: MockData = {
  project: "Skyline Tower",
  gc: "Turner Construction",
  bulletin: "ASI #04 - Electrical Revisions",
  conflicts: [
    {
      id: "C-102",
      severity: "CRITICAL",
      type: "ELECTRICAL_SCOPE",
      location: "Pit 2 (Service Car)",
      old_spec: "120V / 1-Phase / 60Hz",
      new_spec: "208V / 3-Phase",
      cost_impact: 2850.00,
      sheet_ref: "E-501, Note 4"
    }
  ]
};

interface DiffViewProps {
  onBack: () => void;
  onGenerateRFI: () => void;
}

export default function DiffView({ onBack, onGenerateRFI }: DiffViewProps) {
  const conflict = MOCK_DATA.conflicts[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#fdf6e3] pb-24"
    >
      {/* Header */}
      <header className="bg-[#eee8d5] border-b border-[#93a1a1] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#657b83] hover:text-[#586e75] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">Back</span>
          </button>
          <div className="h-4 w-px bg-[#93a1a1]" />
          <div>
            <h1 className="font-mono text-lg font-bold text-[#586e75]">
              {MOCK_DATA.project}
            </h1>
            <p className="font-mono text-xs text-[#93a1a1]">
              {MOCK_DATA.bulletin}
            </p>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        {/* Hero Card - Conflict Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#fdf6e3] border border-[#93a1a1] border-l-4 border-l-[#dc322f] rounded-sm mb-6"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#dc322f]/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#dc322f]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs px-2 py-1 bg-[#dc322f] text-[#fdf6e3] rounded-sm font-semibold">
                    {conflict.severity}
                  </span>
                  <span className="font-mono text-xs text-[#93a1a1]">
                    ID: {conflict.id}
                  </span>
                </div>
                <h2 className="font-mono text-xl font-bold text-[#586e75]">
                  CONFLICT DETECTED: VOLTAGE MISMATCH
                </h2>
                <div className="flex items-center gap-4 mt-3 text-sm text-[#657b83]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#93a1a1]" />
                    <span>{conflict.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileWarning className="w-3.5 h-3.5 text-[#93a1a1]" />
                    <span className="font-mono text-xs">{conflict.sheet_ref}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Grid - The "Money Shot" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          {/* Left Column - Truth (Approved Submittal) */}
          <div className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm">
            <div className="px-4 py-3 border-b border-[#93a1a1] bg-[#eee8d5]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#859900]" />
                <span className="label-upper text-[#586e75]">SOURCE: APPROVED SUBMITTAL</span>
              </div>
            </div>
            <div className="p-4">
              <div className="font-mono text-sm text-[#93a1a1] mb-2">
                Submittal #14 (Approved 2024-08-15)
              </div>
              <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-sm p-4">
                <div className="font-mono text-sm text-[#657b83] mb-1">
                  Sump Pump Motor Specification:
                </div>
                <div className="font-mono text-lg font-bold text-[#859900]">
                  {conflict.old_spec}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#859900]" />
                <span className="text-xs text-[#657b83]">Currently ordered / In fabrication</span>
              </div>
            </div>
          </div>

          {/* Right Column - Change (Bulletin) */}
          <div className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm">
            <div className="px-4 py-3 border-b border-[#93a1a1] bg-[#eee8d5]">
              <div className="flex items-center gap-2">
                <FileWarning className="w-4 h-4 text-[#dc322f]" />
                <span className="label-upper text-[#586e75]">SOURCE: BULLETIN #04 (SHEET E-501)</span>
              </div>
            </div>
            <div className="p-4">
              <div className="font-mono text-sm text-[#93a1a1] mb-2">
                ASI #04 - Electrical Revisions (2024-11-28)
              </div>
              <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-sm p-4">
                <div className="font-mono text-sm text-[#657b83] mb-1">
                  Pit Sump Pump Feeder Circuit:
                </div>
                <div className="font-mono text-lg font-bold">
                  <span className="bg-[#dc322f]/20 text-[#dc322f] px-1 rounded-sm">
                    {conflict.new_spec}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dc322f]" />
                <span className="text-xs text-[#657b83]">Revised by GC (No prior coordination)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Context Footer - Reasoning & Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm"
        >
          <div className="px-4 py-3 border-b border-[#93a1a1]">
            <span className="label-upper text-[#586e75]">Analysis & Impact Assessment</span>
          </div>
          <div className="p-4 space-y-4">
            {/* Reasoning */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="label-upper text-[#93a1a1]">Reasoning</span>
              </div>
              <p className="text-sm text-[#657b83] leading-relaxed">
                The electrical drawings were re-issued. The GC changed the power feed from single-phase
                to three-phase without coordination. We have already ordered 120V single-phase pumps per
                the approved submittal. Installing without a change order will result in equipment burnout
                and potential safety hazards.
              </p>
            </div>

            {/* Cost Impact */}
            <div className="flex items-center justify-between pt-4 border-t border-[#93a1a1]/30">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#b58900]" />
                <span className="label-upper text-[#93a1a1]">Est. Impact</span>
              </div>
              <div className="font-mono text-xl font-bold text-[#b58900]">
                ${conflict.cost_impact.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-xs text-[#93a1a1]">
              Includes: New 208V pump motor ($1,850) + Restocking fee for returned equipment ($650) + Expedited shipping ($350)
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Bar - Fixed Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-[#eee8d5] border-t border-[#93a1a1] px-6 py-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-sm text-[#657b83]">
            <span className="font-mono text-xs text-[#93a1a1]">Action Required: </span>
            Submit RFI to General Contractor for clarification
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="font-mono text-sm px-4 py-2 border border-[#93a1a1] rounded-sm text-[#657b83] bg-[#fdf6e3] hover:bg-[#657b83] hover:text-[#fdf6e3] transition-colors"
            >
              [ IGNORE ]
            </button>
            <button
              onClick={onGenerateRFI}
              className="font-mono text-sm px-4 py-2 border border-[#2aa198] rounded-sm text-[#fdf6e3] bg-[#2aa198] hover:bg-[#fdf6e3] hover:text-[#2aa198] transition-colors font-semibold"
            >
              [ GENERATE RFI DRAFT ]
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
