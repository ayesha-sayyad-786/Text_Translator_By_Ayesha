import React, { useState } from 'react';
import axios from 'axios';
import { Languages, ArrowRightLeft, Copy, Trash2, Loader2 } from 'lucide-react';

const App = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [loading, setLoading] = useState(false);

  // API 
  const RAPID_API_KEY = 'f080da95d1msh093447944bd78a1p189cd3jsn975cfef9d532';
  const RAPID_API_HOST = 'free-google-translator.p.rapidapi.com';

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setLoading(true);
    const options = {
      method: 'POST',
      url: `https://${RAPID_API_HOST}/external-api/free-google-translator`,
      params: {
        from: sourceLang,
        to: targetLang,
        query: sourceText
      },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
        'Content-Type': 'application/json'
      },
      data: {
        translate: 'rapidapi'
      }
    };

    try {
      const response = await axios.request(options);
      console.log("Full API Response:", response.data);
      const result = response.data.translation || "Translation not found";
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation Error:", error);
      alert("Failed to translate. Please check API quota or connection.");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-blue-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <Languages className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Ayesha's <span className="text-blue-600">Translator</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Simple. Fast. Accurate.</p>
        </header>

        <main className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between px-8 py-5 bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-4 w-full">
              <select 
                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer shadow-sm"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="ur">Urdu</option>
                <option value="ja">Japanese</option>
              </select>

              <button 
                onClick={swapLanguages}
                className="p-2 hover:bg-blue-50 hover:text-blue-600 text-slate-400 rounded-full transition-all duration-200 border border-transparent hover:border-blue-100 shadow-sm bg-white"
                title="Swap Languages"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              <select 
                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer shadow-sm"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="mr">Marathi</option>
                <option value="ur">Urdu</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          {/* Translation Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Input Side */}
            <div className="p-8">
              <textarea
                className="w-full h-64 text-xl resize-none outline-none text-slate-800 placeholder-slate-300 font-medium leading-relaxed bg-transparent"
                placeholder="Type something here..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {sourceText.length} Characters
                </span>
                <button 
                  onClick={() => setSourceText('')}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Clear"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-8 bg-slate-50/30">
              <div className="w-full h-64 text-xl text-slate-800 font-medium leading-relaxed overflow-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-blue-500">
                    <Loader2 className="animate-spin w-8 h-8" />
                    <span className="text-sm font-bold uppercase tracking-widest">Translating</span>
                  </div>
                ) : (
                  translatedText || <span className="text-slate-300 italic">Your translation will appear here...</span>
                )}
              </div>
              <div className="flex justify-end mt-6 pt-4 border-t border-slate-50">
                <button 
                  disabled={!translatedText}
                  onClick={() => {
                      navigator.clipboard.writeText(translatedText);
                      alert("Copied to clipboard!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-20 transition-all font-semibold text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Result
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-white border-t border-slate-50 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={loading || !sourceText}
              className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 shadow-xl shadow-blue-200 disabled:shadow-none active:scale-95"
            >
              Translate Now
            </button>
          </div>
        </main>
        
        <footer className="mt-8 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
        </footer>
      </div>
    </div>
  );
};

export default App;