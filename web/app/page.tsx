'use client';

import { useState } from 'react';

type SentimentCluster = {
  reason: string;
  frequency: number;
  exampleQuotes: string[];
};

type MiroFishReport = {
  globalSentiment: 'positive' | 'neutral' | 'negative';
  sentimentClusters: SentimentCluster[];
  pricingPerception: 'underpriced' | 'fair' | 'overpriced';
  narrative: string;
};

const sentimentColor = {
  positive: 'text-green-400',
  neutral: 'text-yellow-400',
  negative: 'text-red-400',
};

const pricingColor = {
  underpriced: 'bg-blue-600',
  fair: 'bg-green-600',
  overpriced: 'bg-red-600',
};

export default function Home() {
  const [form, setForm] = useState({
    title: '',
    problem: '',
    targetAudience: '',
    keyFeatures: '',
    pricing: 'free',
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MiroFishReport | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/simulate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          keyFeatures: form.keyFeatures.split('\n').filter(Boolean),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setReport(json.data);
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Could not reach the backend. Make sure it is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">🧪 Vibecoder Idea Tester</h1>
          <p className="text-gray-400 text-lg">
            Describe your app idea and simulate how the public would react — before you build it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 bg-gray-900 p-6 rounded-2xl">

          <div>
            <label className="block text-sm font-medium mb-1">App name</label>
            <input
              required
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. MiroIdeaTester"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">What problem does it solve?</label>
            <textarea
              required
              rows={3}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Vibecoders waste time building apps nobody wants."
              value={form.problem}
              onChange={e => setForm({ ...form, problem: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who is this for?</label>
            <input
              required
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Indie devs, 20–40, who build side projects"
              value={form.targetAudience}
              onChange={e => setForm({ ...form, targetAudience: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Key features <span className="text-gray-500">(one per line)</span></label>
            <textarea
              required
              rows={4}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Simulate public reaction to your idea\nGet pricing feedback\nSee top complaints before launch`}
              value={form.keyFeatures}
              onChange={e => setForm({ ...form, keyFeatures: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pricing model</label>
            <select
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.pricing}
              onChange={e => setForm({ ...form, pricing: e.target.value })}
            >
              <option value="free">Free</option>
              <option value="freemium">Freemium</option>
              <option value="6.99 USD/month">6.99 USD / month</option>
              <option value="19.99 USD/month">19.99 USD / month</option>
              <option value="one-time purchase">One-time purchase</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition rounded-xl py-3 font-semibold text-lg"
          >
            {loading ? '⏳ Simulating reaction...' : '🚀 Simulate public reaction'}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </form>

        {/* Results */}
        {report && (
          <div className="mt-10 space-y-6">

            <h2 className="text-2xl font-bold text-center">📊 Simulation Results</h2>

            {/* Global sentiment */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Overall public sentiment</p>
              <p className={`text-2xl font-bold capitalize ${sentimentColor[report.globalSentiment]}`}>
                {report.globalSentiment === 'positive' && '😊 Positive'}
                {report.globalSentiment === 'neutral' && '😐 Neutral'}
                {report.globalSentiment === 'negative' && '😠 Negative'}
              </p>
            </div>

            {/* Narrative */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Public vibe</p>
              <p className="text-white">{report.narrative}</p>
            </div>

            {/* Pricing perception */}
            <div className="bg-gray-900 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Pricing perception</p>
                <p className="text-white font-semibold capitalize">{report.pricingPerception}</p>
              </div>
              <span className={`px-4 py-1 rounded-full text-sm font-bold text-white ${pricingColor[report.pricingPerception]}`}>
                {report.pricingPerception.toUpperCase()}
              </span>
            </div>

            {/* Sentiment clusters */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-4">What people are saying</p>
              <div className="space-y-4">
                {report.sentimentClusters.map((cluster, i) => (
                  <div key={i} className="border border-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">{cluster.reason}</p>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{cluster.frequency}% of agents</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {cluster.exampleQuotes.map((q, j) => (
                        <li key={j}>💬 &quot;{q}&quot;</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => { setReport(null); setForm({ title: '', problem: '', targetAudience: '', keyFeatures: '', pricing: 'free' }); }}
              className="w-full border border-gray-600 hover:border-indigo-500 transition rounded-xl py-3 font-semibold text-gray-300 hover:text-white"
            >
              🔄 Test another idea
            </button>

          </div>
        )}
      </div>
    </main>
  );
}
