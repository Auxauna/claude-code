'use client';

import { motion } from 'framer-motion';
import { Upload, FileText, Clock, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  gc: string;
  lastScan: string;
  rfiStatus: 'PENDING' | 'OPEN' | 'CLOSED' | 'NONE';
}

const PROJECTS: Project[] = [
  { id: 'P-001', name: 'Skyline Tower', gc: 'Turner Construction', lastScan: '2h ago', rfiStatus: 'PENDING' },
  { id: 'P-002', name: 'Metro Center Phase II', gc: 'Skanska USA', lastScan: '1d ago', rfiStatus: 'OPEN' },
  { id: 'P-003', name: 'Harbor View Medical', gc: 'DPR Construction', lastScan: '3d ago', rfiStatus: 'CLOSED' },
  { id: 'P-004', name: 'Union Station Retrofit', gc: 'Clark Construction', lastScan: '5d ago', rfiStatus: 'NONE' },
  { id: 'P-005', name: 'Tech Campus Building C', gc: 'Webcor Builders', lastScan: '1w ago', rfiStatus: 'PENDING' },
];

const getStatusColor = (status: Project['rfiStatus']) => {
  switch (status) {
    case 'PENDING':
      return 'text-[#b58900] bg-[#b58900]/10';
    case 'OPEN':
      return 'text-[#dc322f] bg-[#dc322f]/10';
    case 'CLOSED':
      return 'text-[#859900] bg-[#859900]/10';
    default:
      return 'text-[#93a1a1] bg-[#93a1a1]/10';
  }
};

interface PlanTableProps {
  onUpload: () => void;
}

export default function PlanTable({ onUpload }: PlanTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#fdf6e3] p-6"
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-mono text-xl font-bold text-[#586e75] tracking-tight">
          SCOPEGUARD v1.0 <span className="text-[#b58900]">[BETA]</span>
        </h1>
        <p className="font-mono text-xs text-[#93a1a1] mt-1">
          Document Analysis Tool for Elevator Project Managers
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm">
            {/* Table Header */}
            <div className="px-4 py-3 border-b border-[#93a1a1] bg-[#eee8d5]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#586e75]" />
                <span className="label-upper text-[#586e75]">Active Projects</span>
                <span className="font-mono text-xs text-[#93a1a1] ml-auto">
                  {PROJECTS.length} jobs
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#93a1a1]">
                    <th className="px-4 py-2 text-left label-upper text-[#93a1a1]">Project Name</th>
                    <th className="px-4 py-2 text-left label-upper text-[#93a1a1]">GC</th>
                    <th className="px-4 py-2 text-left label-upper text-[#93a1a1]">Last Scan</th>
                    <th className="px-4 py-2 text-left label-upper text-[#93a1a1]">RFI Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((project, index) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#93a1a1]/30 hover:bg-[#fdf6e3]/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-semibold text-[#586e75]">
                          {project.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#657b83]">
                          {project.gc}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#93a1a1]" />
                          <span className="font-mono text-xs text-[#93a1a1]">
                            {project.lastScan}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-xs px-2 py-1 rounded-sm ${getStatusColor(project.rfiStatus)}`}>
                          {project.rfiStatus}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Drop Zone - 1 column */}
        <div className="lg:col-span-1">
          <motion.button
            onClick={onUpload}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-full min-h-[300px] bg-[#eee8d5] border-2 border-dashed border-[#93a1a1] rounded-sm p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors hover:border-[#2aa198] hover:bg-[#fdf6e3] group"
          >
            <div className="w-16 h-16 rounded-sm bg-[#fdf6e3] border border-[#93a1a1] flex items-center justify-center group-hover:border-[#2aa198] transition-colors">
              <Upload className="w-8 h-8 text-[#93a1a1] group-hover:text-[#2aa198] transition-colors" />
            </div>

            <div className="text-center">
              <p className="font-mono text-sm text-[#586e75] font-semibold">
                // DRAG_BULLETIN_PDF_HERE
              </p>
              <p className="text-xs text-[#93a1a1] mt-2">
                Accepts .PDF (ASI, Bulletins, Addendums)
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#93a1a1] mt-4">
              <AlertCircle className="w-3 h-3" />
              <span>Click to simulate upload</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <div className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm">
          <div className="px-4 py-3 border-b border-[#93a1a1]">
            <span className="label-upper text-[#586e75]">Recent Activity Log</span>
          </div>
          <div className="p-4 font-mono text-xs text-[#657b83] space-y-1">
            <p><span className="text-[#93a1a1]">[12:45:02]</span> Skyline Tower: ASI #03 processed - No conflicts detected</p>
            <p><span className="text-[#93a1a1]">[11:30:15]</span> Metro Center Phase II: RFI #127 submitted to GC</p>
            <p><span className="text-[#93a1a1]">[09:15:44]</span> Harbor View Medical: Submittal #22 cross-referenced</p>
            <p><span className="text-[#93a1a1]">[Yesterday]</span> System update: OCR engine upgraded to v2.4.1</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
