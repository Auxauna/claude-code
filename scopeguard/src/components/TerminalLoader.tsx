'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  timestamp: number;
  prefix: string;
  message: string;
  type: 'system' | 'ocr' | 'filter' | 'logic' | 'alert';
}

const LOG_SEQUENCE: Omit<LogEntry, 'timestamp'>[] = [
  { prefix: 'SYSTEM', message: 'INGESTING: Bulletin_04_Rev2.pdf (14.2 MB)', type: 'system' },
  { prefix: 'OCR', message: 'THREAD_1: Parsing Sheet A-101 (Architectural)...', type: 'ocr' },
  { prefix: 'OCR', message: 'THREAD_2: Parsing Sheet E-501 (Electrical)...', type: 'ocr' },
  { prefix: 'OCR', message: 'THREAD_1: Parsing Sheet M-201 (Mechanical)...', type: 'ocr' },
  { prefix: 'OCR', message: 'THREAD_2: Complete. 847 elements extracted.', type: 'ocr' },
  { prefix: 'FILTER', message: 'Scanning for elevator-related scope...', type: 'filter' },
  { prefix: 'FILTER', message: 'MATCH_FOUND: "Sump Pump" (Page 12)', type: 'filter' },
  { prefix: 'FILTER', message: 'MATCH_FOUND: "Pit Lighting" (Page 12)', type: 'filter' },
  { prefix: 'FILTER', message: 'MATCH_FOUND: "Feeder Circuit" (Page 14)', type: 'filter' },
  { prefix: 'LOGIC', message: 'X-REF: Checking against Submittal #14 (Approved)', type: 'logic' },
  { prefix: 'LOGIC', message: 'X-REF: Comparing voltage specifications...', type: 'logic' },
  { prefix: 'LOGIC', message: 'X-REF: Analyzing phase requirements...', type: 'logic' },
  { prefix: 'ALERT', message: 'CRITICAL_CONFLICT_DETECTED', type: 'alert' },
];

const getTypeColor = (type: LogEntry['type']): string => {
  switch (type) {
    case 'system':
      return 'text-[#268bd2]'; // blue
    case 'ocr':
      return 'text-[#859900]'; // green
    case 'filter':
      return 'text-[#b58900]'; // yellow
    case 'logic':
      return 'text-[#6c71c4]'; // violet
    case 'alert':
      return 'text-[#dc322f]'; // red
    default:
      return 'text-[#657b83]';
  }
};

interface TerminalLoaderProps {
  onComplete: () => void;
}

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const totalLogs = LOG_SEQUENCE.length;

    const addLog = () => {
      if (currentIndex < totalLogs) {
        const entry = LOG_SEQUENCE[currentIndex];
        setLogs((prev) => [
          ...prev,
          { ...entry, timestamp: Date.now() },
        ]);
        setProgress(Math.floor(((currentIndex + 1) / totalLogs) * 100));
        currentIndex++;

        // Vary timing based on log type for realism
        const delay = entry.type === 'alert' ? 400 : Math.random() * 200 + 150;
        setTimeout(addLog, delay);
      } else {
        // Complete after final log
        setTimeout(onComplete, 800);
      }
    };

    // Start after initial mount
    const timer = setTimeout(addLog, 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const progressBarFilled = Math.floor((progress / 100) * 20);
  const progressBar = '[' + '#'.repeat(progressBarFilled) + '-'.repeat(20 - progressBarFilled) + ']';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-[#fdf6e3] z-50 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-3xl">
        {/* Terminal Window */}
        <div className="bg-[#002b36] rounded-sm border border-[#073642] overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#073642] px-4 py-2 flex items-center gap-2 border-b border-[#586e75]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#dc322f]" />
              <div className="w-3 h-3 rounded-full bg-[#b58900]" />
              <div className="w-3 h-3 rounded-full bg-[#859900]" />
            </div>
            <span className="font-mono text-xs text-[#839496] ml-2">
              scopeguard://ingestion-engine
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={logContainerRef}
            className="h-80 overflow-y-auto p-4 font-mono text-sm"
          >
            <AnimatePresence mode="popLayout">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-start gap-1 mb-1"
                >
                  <span className="text-[#586e75] select-none">&gt;</span>
                  <span className={`${getTypeColor(log.type)} font-semibold`}>
                    [{log.prefix}]
                  </span>
                  <span className={`${log.type === 'alert' ? 'text-[#dc322f] font-bold' : 'text-[#839496]'}`}>
                    {log.message}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-2 h-4 bg-[#839496] ml-1"
            />
          </div>

          {/* Progress Bar */}
          <div className="border-t border-[#073642] px-4 py-3 bg-[#073642]">
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-[#839496]">
                {progressBar} {progress}%
              </span>
              <span className="text-[#586e75] text-xs">
                {progress < 100 ? 'Processing...' : 'Complete'}
              </span>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-[#93a1a1] uppercase tracking-widest">
            Analyzing Document Structure
          </p>
        </div>
      </div>
    </motion.div>
  );
}
