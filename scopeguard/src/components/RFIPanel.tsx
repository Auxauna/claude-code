'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface RFIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const RFI_CONTENT = {
  subject: "RFI - Bulletin 04 Voltage Conflict - Skyline Tower",
  to: "John Miller <jmiller@turner.com>",
  cc: "Sarah Chen <schen@skylinedev.com>",
  body: `Hi John,

ScopeGuard detected a discrepancy on Sheet E-501 of ASI #04 that requires clarification before we can proceed.

CONFLICT SUMMARY:
- Location: Pit 2 (Service Car) - Sump Pump Installation
- Approved Submittal #14: 120V / 1-Phase / 60Hz motor
- ASI #04 Revision: 208V / 3-Phase feeder circuit

The electrical drawings have been revised to show a 208V/3-Phase power feed to the sump pump location. However, our approved submittal specifies a 120V/1-Phase pump motor, which is currently in fabrication.

QUESTIONS:
1. Please confirm the intended power supply for the sump pump circuit.
2. If 208V/3-Phase is correct, please issue a formal change order for the pump motor swap.
3. Please advise on schedule impact if motor specification changes.

ESTIMATED IMPACT:
If 208V specification is confirmed: $2,850.00 (New motor + restocking + expedite)

Please respond by EOD Friday to maintain schedule. We are holding pump installation until this is resolved.

Best regards,
[Your Name]
Elevator Project Manager`
};

export default function RFIPanel({ isOpen, onClose }: RFIPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullContent = `Subject: ${RFI_CONTENT.subject}\nTo: ${RFI_CONTENT.to}\nCC: ${RFI_CONTENT.cc}\n\n${RFI_CONTENT.body}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#002b36]/30 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#fdf6e3] border-t border-[#93a1a1] rounded-t-sm max-h-[85vh] overflow-hidden"
          >
            {/* Panel Header */}
            <div className="bg-[#eee8d5] border-b border-[#93a1a1] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#2aa198]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#2aa198]" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#586e75]">
                    RFI DRAFT GENERATED
                  </h3>
                  <p className="text-xs text-[#93a1a1]">
                    Review and send to General Contractor
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-sm border border-[#93a1a1] flex items-center justify-center text-[#657b83] hover:bg-[#657b83] hover:text-[#fdf6e3] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Preview */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Email Header Fields */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="label-upper text-[#93a1a1] w-16 pt-0.5">Subject</span>
                  <span className="font-mono text-sm text-[#586e75] font-semibold">
                    {RFI_CONTENT.subject}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="label-upper text-[#93a1a1] w-16 pt-0.5">To</span>
                  <span className="font-mono text-sm text-[#657b83]">
                    {RFI_CONTENT.to}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="label-upper text-[#93a1a1] w-16 pt-0.5">CC</span>
                  <span className="font-mono text-sm text-[#657b83]">
                    {RFI_CONTENT.cc}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#93a1a1]/30 my-4" />

              {/* Email Body */}
              <div className="bg-[#eee8d5] border border-[#93a1a1] rounded-sm p-4">
                <pre className="font-mono text-sm text-[#657b83] whitespace-pre-wrap leading-relaxed">
                  {RFI_CONTENT.body}
                </pre>
              </div>
            </div>

            {/* Panel Footer - Actions */}
            <div className="border-t border-[#93a1a1] px-6 py-4 bg-[#eee8d5] flex items-center justify-between">
              <div className="text-xs text-[#93a1a1]">
                <span className="font-mono">Generated by ScopeGuard v1.0</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="font-mono text-sm px-4 py-2 border border-[#93a1a1] rounded-sm text-[#657b83] bg-[#fdf6e3] hover:bg-[#657b83] hover:text-[#fdf6e3] transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#859900]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="font-mono text-sm px-4 py-2 border border-[#2aa198] rounded-sm text-[#fdf6e3] bg-[#2aa198] hover:bg-[#fdf6e3] hover:text-[#2aa198] transition-colors font-semibold flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Open in Email Client</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
