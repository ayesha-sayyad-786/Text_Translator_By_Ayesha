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
  const RAPID_API_KEY = 'df7731359bmshb630a09d99d5636p16ef25jsn8f8ea03d45b3';
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Languages className="text-blue-600 w-10 h-10" />
        <h1 className="text-3xl font-bold text-gray-800">Armaan's Text Translator</h1>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Language Selection Bar */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <select 
            className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer p-2"
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
            className="p-2 hover:bg-gray-200 rounded-full transition-colors mx-2"
            title="Swap Languages"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-500" />
          </button>

          <select 
            className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer p-2 text-right"
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

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Input Area */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <textarea
              className="w-full h-48 text-xl resize-none outline-none text-gray-800 placeholder-gray-400"
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span className="text-sm text-gray-400 font-medium">
                {sourceText.length} characters
              </span>
              <button 
                onClick={() => setSourceText('')}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Clear text"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Output Area */}
          <div className="p-6 bg-gray-50/50">
            <div className="w-full h-48 text-xl text-gray-800 break-words overflow-auto">
              {loading ? (
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                  <Loader2 className="animate-spin w-5 h-5" />
                  Translating...
                </div>
              ) : (
                translatedText || <span className="text-gray-300">Translation will appear here</span>
              )}
            </div>
            <div className="flex justify-end mt-4 border-t pt-4">
              <button 
                disabled={!translatedText}
                onClick={() => {
                    navigator.clipboard.writeText(translatedText);
                    alert("Copied to clipboard!");
                }}
                className="text-gray-400 hover:text-blue-600 disabled:opacity-30 transition-colors"
                title="Copy Translation"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-white border-t flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={loading || !sourceText}
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300 shadow-lg active:scale-95"
          >
            Translate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;