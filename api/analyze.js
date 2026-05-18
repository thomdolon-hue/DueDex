module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt } = req.body;
  const apiKey = process.env.REACT_APP_GROQ_KEY;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a KYC/KYB due diligence expert. Always respond with valid JSON only. No markdown, no backticks, no explanation." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 4000
      })
    });
    const data = await response.json();
    if (data.error) return res.status(200).json({ error: data.error.message });
const text = data.choices?.[0]?.message?.content || "";
res.status(200).json({ text });
  } catch(e) {
    res.status(200).json({ error: e.message });
  }
};