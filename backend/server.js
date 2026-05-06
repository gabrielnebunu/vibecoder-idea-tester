const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------------------
// POST /api/simulate-idea
// Receives an app idea, returns a fake
// MiroFish report (stub for now).
// In Phase 3 we will replace this with
// a real MiroFish call.
// -----------------------------------------
app.post('/api/simulate-idea', (req, res) => {
  const idea = req.body;

  console.log('Received idea:', idea.title);

  // Stub / fake MiroFish report
  const fakeReport = {
    success: true,
    data: {
      globalSentiment: 'neutral',
      sentimentClusters: [
        {
          reason: 'Too niche',
          frequency: 40,
          exampleQuotes: ['I have seen this idea 3 times already']
        },
        {
          reason: 'No clear pricing',
          frequency: 35,
          exampleQuotes: ['I don\'t get who pays for this']
        },
        {
          reason: 'Interesting concept',
          frequency: 25,
          exampleQuotes: ['I would try this if it were free']
        }
      ],
      pricingPerception: 'fair',
      narrative:
        'People feel this is a hobby project, not a serious product. ' +
        'The concept is interesting but the value proposition is unclear.'
    }
  };

  res.json(fakeReport);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
