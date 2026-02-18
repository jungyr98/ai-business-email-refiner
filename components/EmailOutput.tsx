
import React, { useState } from 'react';
import { EmailResult } from '../types';

interface EmailOutputProps {
  result: EmailResult;
}

const EmailOutput: React.FC<EmailOutputProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const fullContent = `Subject: ${result.subject}\n\n${result.body}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Refined Draft
        </h3>
        <button
          onClick={copyToClipboard}
          className={`flex items-center px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Draft
            </>
          )}
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Line</label>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-medium text-slate-900">
            {result.subject}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Body</label>
          <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-normal min-h-[200px] p-4 bg-white border border-slate-100 rounded-lg italic">
            {result.body}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 italic">Communication Insights</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/50 text-xs text-indigo-900">
                <span className="mr-2 mt-0.5">💡</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOutput;
