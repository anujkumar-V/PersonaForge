"use client";
import { useState } from "react";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const nicheSuggestions = ["Cybersecurity", "Web3 & Crypto", "True Crime", "Tech Review", "AI & Future"];
  const toneSuggestions = ["Cinematic & Intense", "Educational", "Dark & Mysterious", "Satirical & Funny"];
  const topicSuggestions = ["The Evolution of AI", "Anatomy of a Cyber Attack", "Rise of Bitcoin", "Hidden History Secrets"];

  const handleGenerate = async () => {
    if (!niche || !tone || !topic) {
      alert("Please fill in all the details first!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, tone, topic }),
      });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend se connect nahi ho paya!");
    }
    setLoading(false);
  };

  const handleSuggestionClick = (setValue: any, value: string) => {
    setValue(value);
    setActiveInput(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#D97757]/30 selection:text-white">
      {/* Ultra-Minimal Dark Navbar */}
      <nav className="border-b border-[#222222] bg-[#0A0A0A]/80 backdrop-blur-md px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="text-xl font-medium tracking-tight flex items-center gap-2">
          <span className="text-[#D97757]">✦</span> PersonaForge
        </div>
        <div className="text-sm text-gray-500 font-medium tracking-wide uppercase">WOC 2026</div>
      </nav>

      <main className="flex-grow max-w-3xl mx-auto py-16 px-6 w-full">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            Forge Your AI Persona
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Describe your vision below, and let our AI craft the perfect production-ready narrative.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#141414] p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#222222] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* Niche Input */}
            <div className="relative flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Niche / Domain</label>
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onFocus={() => setActiveInput('niche')}
                onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                className="p-3.5 bg-[#1E1E1E] rounded-xl border border-[#333333] focus:bg-[#252525] focus:border-[#D97757] focus:ring-4 focus:ring-[#D97757]/10 outline-none transition-all duration-200 text-white placeholder-gray-600"
                placeholder="e.g., Cybersecurity..."
              />
              {activeInput === 'niche' && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {nicheSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion}
                      onMouseDown={() => handleSuggestionClick(setNiche, suggestion)}
                      className="px-4 py-3 text-sm text-gray-300 hover:bg-[#252525] hover:text-[#D97757] cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#D97757]/60 text-xs">✨</span> {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tone Input */}
            <div className="relative flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Content Tone</label>
              <input 
                type="text" 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                onFocus={() => setActiveInput('tone')}
                onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                className="p-3.5 bg-[#1E1E1E] rounded-xl border border-[#333333] focus:bg-[#252525] focus:border-[#D97757] focus:ring-4 focus:ring-[#D97757]/10 outline-none transition-all duration-200 text-white placeholder-gray-600"
                placeholder="e.g., Cinematic..."
              />
              {activeInput === 'tone' && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {toneSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion}
                      onMouseDown={() => handleSuggestionClick(setTone, suggestion)}
                      className="px-4 py-3 text-sm text-gray-300 hover:bg-[#252525] hover:text-[#D97757] cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#D97757]/60 text-xs">✨</span> {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Topic Input */}
            <div className="relative md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Video Topic</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onFocus={() => setActiveInput('topic')}
                onBlur={() => setTimeout(() => setActiveInput(null), 200)}
                className="p-3.5 bg-[#1E1E1E] rounded-xl border border-[#333333] focus:bg-[#252525] focus:border-[#D97757] focus:ring-4 focus:ring-[#D97757]/10 outline-none transition-all duration-200 text-white placeholder-gray-600"
                placeholder="What should the AI talk about?"
              />
              {activeInput === 'topic' && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {topicSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion}
                      onMouseDown={() => handleSuggestionClick(setTopic, suggestion)}
                      className="px-4 py-3 text-sm text-gray-300 hover:bg-[#252525] hover:text-[#D97757] cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#D97757]/60 text-xs">⚡</span> {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#EDEDED] hover:bg-white text-[#0A0A0A] font-semibold text-base py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(217,119,87,0.1)] hover:shadow-[0_0_25px_rgba(217,119,87,0.2)]"
          >
            {loading ? (
              <span className="animate-pulse">✨ Generating Magic...</span>
            ) : (
              "Generate AI Script ✦"
            )}
          </button>
        </div>

        {/* Clean Output Section */}
        {result && (
          <div className="bg-[#141414] p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[#222222] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2 text-white">
              <span className="text-[#D97757]">✦</span> Generated Output
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-2 border-[#D97757] pl-5">
                <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Persona Setup</h3>
                <p className="text-white text-lg font-medium">{result.persona}</p>
              </div>
              
              <div className="border-l-2 border-[#444] pl-5">
                <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Visual Prompt</h3>
                <p className="text-gray-400 italic leading-relaxed">{result.visual_prompt}</p>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333] mt-6 shadow-inner">
                <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">Final Video Script</h3>
                <p className="text-gray-300 leading-loose whitespace-pre-wrap font-serif text-lg">{result.generated_script}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Premium Maker Footer */}
      <footer className="pb-8 w-full text-center mt-auto">
        <p className="text-sm text-gray-500 font-medium tracking-wide flex items-center justify-center gap-2">
          Crafted with <span className="text-[#D97757]">✦</span> by <span className="text-gray-300 font-semibold hover:text-[#D97757] transition-colors cursor-pointer">Anujkumar Gupta</span>
        </p>
      </footer>
    </div>
  );
}