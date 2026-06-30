import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [showSearchNotice, setShowSearchNotice] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Keyboard shortcut listener to close modal or trigger focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsBetaModalOpen(false);
        setShowSearchNotice(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email signature required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid security signature format");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate cryptographic sync and registration
    setTimeout(() => {
      const parts = [
        "IDX",
        Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase(),
        Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase(),
        Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase(),
      ];
      setGeneratedId(parts.join("-"));
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleCopyId = () => {
    if (!generatedId) return;
    navigator.clipboard.writeText(generatedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative w-screen h-screen bg-[#0b0b0b] text-[#f4f4f4] font-sans overflow-hidden flex items-center justify-center">
      {/* CORE CONTENT PANEL */}
      <section className="relative w-full max-w-md px-6 z-10 text-center flex flex-col items-center justify-center gap-6">
        {/* Logo Image */}
        <div className="select-none animate-fade-in flex justify-center items-center">
          <motion.img 
            src="https://iili.io/C5DalPj.md.png" 
            alt="Logo" 
            referrerPolicy="no-referrer"
            className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] object-contain opacity-95 hover:opacity-100 transition-opacity duration-700"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          />
        </div>

        {/* Inactive Search Bar Container */}
        <div className="relative w-full">
          <div 
            onClick={() => setShowSearchNotice(prev => !prev)}
            className="w-full bg-[#0a0a0a] border border-neutral-900 hover:border-neutral-800 hover:bg-[#0c0c0c] transition-all duration-700 ease-out cursor-pointer h-12 flex items-center justify-start px-5 select-none rounded-full"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-3.5 bg-neutral-600 animate-pulse shrink-0" />
            </div>
          </div>
          
          {/* Custom Interactive Status Box */}
          <AnimatePresence>
            {showSearchNotice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="text-[11px] font-mono tracking-[0.08em] leading-relaxed text-neutral-500 italic text-left border-l border-neutral-800 pl-4 py-2 mt-3 flex items-start justify-between gap-4">
                  <span>Awaiting core index synchronization. Register your email below to request an authorization slot for pre-launch evaluation.</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSearchNotice(false);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 uppercase text-[9px] font-mono tracking-wider shrink-0"
                  >
                    [ Dismiss ]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Actions */}
        <div className="flex items-center justify-center gap-10 select-none">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-200 transition-colors duration-500 py-1"
          >
            GitHub
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-500 group-hover:w-full transition-all duration-500 ease-out" />
          </a>
          
          <button 
            onClick={() => {
              setIsBetaModalOpen(true);
              setSubmitted(false);
              setEmail("");
              setError("");
            }}
            className="group relative text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-200 transition-colors duration-500 py-1 cursor-pointer"
          >
            Apply for Beta
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-500 group-hover:w-full transition-all duration-500 ease-out" />
          </button>
        </div>
      </section>

      {/* MINIMALIST MODAL OVERLAY */}
      <AnimatePresence>
        {isBetaModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-[#0b0b0b]/90"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0e0e0e] border border-neutral-800/80 p-8 md:p-12 z-10"
            >
              {!submitted ? (
                <div>
                  <h2 className="font-display text-neutral-200 font-light text-[11px] tracking-[0.35em] uppercase mb-4 text-center select-none">
                    Apply for Beta Access
                  </h2>
                  
                  <p className="font-serif italic text-neutral-400 text-sm md:text-[15px] text-center leading-relaxed mb-8 select-none">
                    Provide your email to register for experimental testing slots. Permissions are allocated sequentially in automated weekly cycles.
                  </p>

                  <form onSubmit={handleBetaSubmit} className="space-y-6">
                    <div className="relative">
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter email address"
                        className="w-full bg-[#070707] border border-neutral-900 hover:border-neutral-800 focus:border-neutral-700 focus:outline-none h-12 px-4 text-center font-mono text-xs text-neutral-200 placeholder-neutral-600 transition-all duration-500"
                        autoFocus
                      />
                      
                      {error && (
                        <div className="mt-3 text-center animate-fade-in">
                          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase italic">
                            [ {error} ]
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-10 pt-2 select-none">
                      <button 
                        type="button"
                        onClick={() => setIsBetaModalOpen(false)}
                        className="group relative text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-200 transition-colors duration-500 py-1"
                      >
                        Cancel
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-500 group-hover:w-full transition-all duration-500 ease-out" />
                      </button>
                      
                      <button 
                        type="submit"
                        disabled={loading}
                        className="group relative text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-300 hover:text-white transition-colors duration-500 py-1"
                      >
                        {loading ? "Registering..." : "Submit"}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-300 group-hover:w-full transition-all duration-500 ease-out" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <h2 className="font-display text-neutral-200 font-light text-[11px] tracking-[0.35em] uppercase mb-4 select-none">
                    Request Documented
                  </h2>
                  
                  <p className="font-serif italic text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-8 select-none">
                    Security credentials stored successfully. You have been cataloged in Epoch <span className="font-mono text-neutral-200 text-xs">#2624</span>.
                  </p>

                  <div className="bg-[#070707] border border-neutral-900 py-5 px-6 mb-8 flex flex-col items-center justify-center select-text">
                    <span className="text-[8px] font-mono tracking-[0.3em] text-neutral-600 uppercase mb-2.5">
                      Invitation Reference ID
                    </span>
                    <span className="font-mono text-xs md:text-sm tracking-[0.18em] text-neutral-200 font-medium">
                      {generatedId}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-10 select-none">
                    <button 
                      type="button"
                      onClick={handleCopyId}
                      className="group relative text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-400 hover:text-white transition-colors duration-500 py-1"
                    >
                      {copied ? "Copied" : "Copy Code"}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-300 group-hover:w-full transition-all duration-500 ease-out" />
                    </button>

                    <button 
                      type="button"
                      onClick={() => setIsBetaModalOpen(false)}
                      className="group relative text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-200 transition-colors duration-500 py-1"
                    >
                      Close
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
