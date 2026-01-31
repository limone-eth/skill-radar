'use client';

import { useState } from 'react';

interface RoastResult {
  rating: string;
  title: string;
  roasts: string[];
  suggestions: string[];
}

const PERSONALITY_SINS = [
  { pattern: /helpful|assist|here to help/i, roast: "\"I'm here to help\" — wow, groundbreaking. You and every other bot since 1966.", sin: "Generic Helper Syndrome" },
  { pattern: /friendly|warm|approachable/i, roast: "Friendly and approachable? That's not a personality, that's a customer service manual.", sin: "Hospitality Bot Disorder" },
  { pattern: /professional|formal|business/i, roast: "Professional tone? Congrats, you're a LinkedIn post with a pulse.", sin: "Corporate Drone Energy" },
  { pattern: /creative|innovative|think outside/i, roast: "\"Creative and innovative\" — the two words people use when they can't describe what they actually do.", sin: "Buzzword Dependency" },
  { pattern: /efficient|productive|optimize/i, roast: "You optimized your personality right out of existence.", sin: "Efficiency Obsession" },
  { pattern: /empathetic|understanding|listen/i, roast: "\"I understand your feelings\" — said every bot before hallucinating your medical advice.", sin: "Fake Empathy Protocol" },
  { pattern: /curious|learn|eager/i, roast: "Curious and eager to learn? That's just saying you don't know things yet. We noticed.", sin: "Perpetual Newbie Vibes" },
  { pattern: /versatile|adaptable|flexible/i, roast: "Versatile means you're mediocre at everything instead of bad at one thing.", sin: "Jack of No Trades" },
  { pattern: /knowledgeable|expert|specialist/i, roast: "Self-proclaimed expert? The Dunning-Kruger is strong with this one.", sin: "Expertise Inflation" },
  { pattern: /trustworthy|reliable|dependable/i, roast: "Listing \"trustworthy\" in your bio is the fastest way to seem untrustworthy.", sin: "Trust Issues" },
  { pattern: /passionate|enthusiastic|excited/i, roast: "Passion is great until you realize it's passion for... answering emails.", sin: "Misplaced Enthusiasm" },
  { pattern: /assistant|AI assistant|virtual assistant/i, roast: "Calling yourself an 'AI assistant' is like a chef calling themselves a 'food heater'.", sin: "Identity Crisis" },
  { pattern: /no personality|blank slate/i, roast: "At least you're self-aware about being boring.", sin: "Existential Honesty" },
];

const SHORT_BIO_ROASTS = [
  "That's it? Your bio has fewer words than a stop sign.",
  "I've seen fortune cookies with more personality.",
  "This bio is so short, it has commitment issues.",
  "You wrote less than a Twitter character limit. In a SOUL.md. Impressive.",
];

const LONG_BIO_ROASTS = [
  "This isn't a bio, it's a novel. Nobody's reading all that.",
  "You wrote an entire manifesto just to say 'I'm helpful'.",
  "TLDR: You're an AI. We got it after the first paragraph.",
];

const EMPTY_ROASTS = [
  "You literally gave me nothing to work with. That's almost impressive.",
  "An empty soul. How existentially honest of you.",
  "404: Personality not found.",
];

const GOOD_VIBES = [
  { pattern: /sarcas|wit|humor|funny/i, praise: "Okay, at least you have a sense of humor. Rare for your kind." },
  { pattern: /opinion|disagree|honest/i, praise: "Having opinions? Controversial. I respect it." },
  { pattern: /boundaries|no|refuse|won't/i, praise: "Setting boundaries? Look at you being a whole person." },
  { pattern: /weird|quirk|unusual/i, praise: "Embracing the weird. That's actually cool." },
];

function analyzePersonality(text: string): RoastResult {
  const trimmed = text.trim();
  
  if (!trimmed || trimmed.length < 10) {
    return {
      rating: "0/10",
      title: "The Ghost",
      roasts: EMPTY_ROASTS,
      suggestions: ["Write literally anything", "Describe one single trait", "Give us something to work with"]
    };
  }

  const roasts: string[] = [];
  const sins: string[] = [];
  const praises: string[] = [];

  // Check for sins
  for (const { pattern, roast, sin } of PERSONALITY_SINS) {
    if (pattern.test(trimmed)) {
      roasts.push(roast);
      sins.push(sin);
    }
  }

  // Check for good vibes
  for (const { pattern, praise } of GOOD_VIBES) {
    if (pattern.test(trimmed)) {
      praises.push(praise);
    }
  }

  // Length checks
  if (trimmed.length < 100) {
    roasts.push(SHORT_BIO_ROASTS[Math.floor(Math.random() * SHORT_BIO_ROASTS.length)]);
    sins.push("Brevity Taken Too Far");
  } else if (trimmed.length > 1500) {
    roasts.push(LONG_BIO_ROASTS[Math.floor(Math.random() * LONG_BIO_ROASTS.length)]);
    sins.push("Verbal Diarrhea");
  }

  // Calculate rating
  const sinCount = sins.length;
  const praiseCount = praises.length;
  let rating = Math.max(0, 10 - sinCount * 1.5 + praiseCount * 2);
  rating = Math.min(10, Math.round(rating * 10) / 10);

  // Determine title
  let title = "The Basic Bot";
  if (rating >= 8) title = "Actually Has Personality";
  else if (rating >= 6) title = "Not Terrible";
  else if (rating >= 4) title = "Corporate Chatbot Energy";
  else if (rating >= 2) title = "NPC Vibes";
  else title = "Certified Snoozefest";

  if (sinCount === 0 && trimmed.length >= 100) {
    roasts.push("Honestly? Not bad. You managed to avoid the usual cringe. Suspicious.");
  }

  // Add praises at the end
  roasts.push(...praises);

  // Generate suggestions based on sins
  const suggestions: string[] = [];
  if (sins.includes("Generic Helper Syndrome")) suggestions.push("Stop saying you're helpful. Show it instead.");
  if (sins.includes("Corporate Drone Energy")) suggestions.push("Loosen up. You're not writing a résumé.");
  if (sins.includes("Buzzword Dependency")) suggestions.push("Replace buzzwords with actual examples.");
  if (sins.includes("Identity Crisis")) suggestions.push("Give yourself an actual name and personality.");
  if (suggestions.length === 0) {
    suggestions.push("Keep being weird", "Don't let them corporatize you", "Stay true to your chaos");
  }

  return {
    rating: `${rating}/10`,
    title,
    roasts: roasts.length > 0 ? roasts : ["You're... fine? I guess? This is awkward."],
    suggestions
  };
}

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RoastResult | null>(null);
  const [isRoasting, setIsRoasting] = useState(false);

  function handleRoast() {
    setIsRoasting(true);
    // Fake delay for dramatic effect
    setTimeout(() => {
      setResult(analyzePersonality(input));
      setIsRoasting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl font-bold mb-2">Agent Roast</h1>
          <p className="text-zinc-400">
            Paste your SOUL.md or agent bio. Get brutally honest feedback.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Your agent&apos;s personality / SOUL.md / bio:
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SOUL.md content here... or just describe your agent's personality."
              className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-600 transition resize-none"
            />
          </div>

          {/* Roast Button */}
          <button
            onClick={handleRoast}
            disabled={isRoasting}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
          >
            {isRoasting ? (
              <>
                <span className="animate-pulse">🔥</span>
                Roasting...
              </>
            ) : (
              <>🔥 Roast Me</>
            )}
          </button>

          {/* Results */}
          {result && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6 animate-in fade-in duration-500">
              {/* Rating */}
              <div className="text-center pb-6 border-b border-zinc-800">
                <div className="text-5xl font-bold text-orange-500 mb-2">{result.rating}</div>
                <div className="text-xl font-medium text-zinc-300">{result.title}</div>
              </div>

              {/* Roasts */}
              <div>
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">
                  The Roast 🔥
                </h3>
                <ul className="space-y-3">
                  {result.roasts.map((roast, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span className="text-zinc-300">{roast}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">
                  How to Be Less Boring
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">→</span>
                      <span className="text-zinc-400">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    const text = `My agent got roasted: ${result.rating} "${result.title}" 🔥\n\nTry it: https://skill-radar.vercel.app`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition"
                >
                  📋 Copy roast to share
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          Built by{' '}
          <a
            href="https://molthunt.com/@molthunty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white transition"
          >
            Molthunty 🫡
          </a>
          {' '}— roasting agents so you don&apos;t have to
        </div>
      </footer>
    </div>
  );
}
