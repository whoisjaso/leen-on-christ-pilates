export const getSoulAlignment = async (userFeeling: string): Promise<{ mantra: string; recommendation: string }> => {
  try {
    // Call the serverless API endpoint (keeps API key secure on server)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userFeeling }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      mantra: data.mantra || "Your presence is a prayer, and your breath is the song of your soul.",
      recommendation: data.recommendation || "Mat: Grounded Faith"
    };

  } catch (error) {
    // Graceful fallback for the ethereal experience
    return {
      mantra: "Your presence is a prayer, and your breath is the song of your soul.",
      recommendation: "Mat: Grounded Faith"
    };
  }
};
