import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { userFeeling } = req.body;

    if (!userFeeling || typeof userFeeling !== 'string') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Limit input length to prevent abuse
    const sanitizedFeeling = userFeeling.slice(0, 500);

    const prompt = `You are a calming, spiritually-aligned wellness assistant for a faith-based pilates studio called "Leen On Christ".
A client has described how they are feeling today: "${sanitizedFeeling}"

Respond with a JSON object containing two fields:
1. "mantra": A short, comforting, faith-inspired affirmation (max 15 words).
2. "recommendation": One of the following class types that best suits their need: "Reformer: Ascension", "Mat: Grounded Faith", or "Private: Soul Architecture". Just the name, no explanation.

Example output format:
{"mantra": "Your spirit is resilient; let peace flow through you.", "recommendation": "Mat: Grounded Faith"}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse the JSON response from Gemini
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return res.status(200).json(parsed);
    }

    // Fallback response
    return res.status(200).json({
      mantra: "Breathe in peace, exhale doubt. You are held.",
      recommendation: "Mat: Grounded Faith"
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(200).json({
      mantra: "Breathe in peace, exhale doubt. You are held.",
      recommendation: "Mat: Grounded Faith"
    });
  }
}
