
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ToneSelector from './components/ToneSelector';
import EmailOutput from './components/EmailOutput';
import { ToneType, EmailResult } from './types';
import { rewriteAsBusinessEmail } from './geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<ToneType>('polite');
  const [result, setResult] = useState<EmailResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const refined = await rewriteAsBusinessEmail(input, tone);
      setResult(refined);
      // Scroll to result on small screens
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || '요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            당신의 생각을 <span className="text-indigo-600">완벽한 비즈니스 언어</span>로
          </h2>
          <p className="text-lg text-slate-600">
            대충 적은 메모나 거친 초안을 던져주세요. 품격 있는 이메일로 다듬어 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                1. 원하는 톤(Tone) 선택
              </label>
              <ToneSelector selectedTone={tone} onSelect={setTone} />

              <label className="block text-sm font-semibold text-slate-700 mb-3">
                2. 원문 입력 (생각나는 대로 적어보세요)
              </label>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: 김대리님, 어제 주신 보고서 잘 봤습니다. 근데 3페이지 숫자가 좀 이상한 것 같아요. 다시 확인해서 오늘 퇴근 전까지 보내주세요."
                  className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-800"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {input.length} characters
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleRewrite}
                  disabled={loading || !input.trim()}
                  className={`flex-grow flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-200 ${
                    loading || !input.trim()
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      정중하게 다듬는 중...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      이메일로 변환하기
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3.5 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  초기화
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </section>

          {/* Output Section */}
          <section id="result-section" className="relative lg:sticky lg:top-28">
            {result ? (
              <EmailOutput result={result} />
            ) : (
              <div className="bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-2xl h-[500px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-600 mb-2">변환된 결과가 여기에 나타납니다</h3>
                <p className="text-sm max-w-[240px]">왼쪽 입력창에 내용을 작성하고 버튼을 눌러보세요.</p>
              </div>
            )}
            
            {loading && !result && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-slate-900 font-medium">AI가 문장을 분석하고 있습니다...</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-slate-800 p-1.5 rounded-lg">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight">BizWrite</span>
          </div>
          <p className="text-sm">© 2024 BizWrite. Your Professional Assistant.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
