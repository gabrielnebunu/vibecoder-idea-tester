# MiroFish API Spec

## Input: `IdeaForMiroFish`

This is the object we send to MiroFish as a "seed document".

```ts
type IdeaForMiroFish = {
  title: string;           // App name
  problem: string;         // What problem does it solve?
  targetAudience: string;  // Who is this for?
  keyFeatures: string[];   // List of features (bullets)
  pricing: string;         // e.g. "free", "freemium", "10 USD/month"
  context?: string;        // Optional extra context
};
```

## Output: `MiroFishReport`

This is the object we get back from MiroFish after the simulation.

```ts
type MiroFishReport = {
  globalSentiment: 'positive' | 'neutral' | 'negative';
  sentimentClusters: {
    reason: string;           // e.g. "Too niche"
    frequency: number;        // 0–100 (percentage of agents mentioning this)
    exampleQuotes: string[];  // simulated agent comments
  }[];
  pricingPerception: 'underpriced' | 'fair' | 'overpriced';
  narrative: string;           // e.g. "People feel this is a hobby project"
};
```

## How we call MiroFish (Phase 3)

1. We format `IdeaForMiroFish` as a Markdown seed text.
2. We POST it to MiroFish's internal `/run` endpoint.
3. We poll `/status/:jobId` every 5 seconds.
4. When done, we parse the JSON result into `MiroFishReport`.

## Seed text format

```md
# App idea: {title}

## Problem
{problem}

## Target audience
{targetAudience}

## Key features
- {feature1}
- {feature2}

## Pricing
{pricing}
```
