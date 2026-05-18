module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt } = req.body;
  const apiKey = process.env.REACT_APP_GEMINI_KEY;

  const fullPrompt = prompt + "\n\nCRITICAL: Your response must be ONLY a valid JSON object. No markdown, no backticks, no explanation, no text before or after. Start your response with { and end with }";

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 4000 }
    })
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  res.status(200).json({ text });
};