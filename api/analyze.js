module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt, providerName } = req.body;
  const apiKey = process.env.REACT_APP_GROQ_KEY;

  // FCA Register lookup
  const checkFCA = async (name) => {
    try {
      const searchRes = await fetch(`https://register.fca.org.uk/services/V0.1/Search?q=${encodeURIComponent(name)}&type=firm`, {
        headers: {
          "Accept": "application/json",
          "X-AUTH-EMAIL": "duedex@demo.com",
          "X-AUTH-TOKEN": "demo"
        }
      });
      const data = await searchRes.json();
      return data?.Data?.[0] || null;
    } catch {
      return null;
    }
  };

  try {
    const [groqResponse, fcaData] = await Promise.all([
      fetch("https://api.groq.com/openai/v1/chat/completions", {
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
          max_tokens: 5000
        })
      }),
      checkFCA(providerName)
    ]);

    const groqData = await groqResponse.json();
    const text = groqData.choices?.[0]?.message?.content || "";
    res.status(200).json({ text, fcaData });
  } catch(e) {
    res.status(200).json({ error: e.message });
  }
};