module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt, providerName } = req.body;
  const groqKey = process.env.REACT_APP_GROQ_KEY;
  const chKey = process.env.COMPANIES_HOUSE_KEY;

  // Companies House lookup
  const checkCompaniesHouse = async (name) => {
    try {
      const r = await fetch(`https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(name)}&items_per_page=1`, {
        headers: { "Authorization": "Basic " + Buffer.from(chKey + ":").toString("base64") }
      });
      const data = await r.json();
      return data?.items?.[0] || null;
    } catch { return null; }
  };

  try {
    const [groqRes, chData] = await Promise.all([
      fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${groqKey}` },
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
      checkCompaniesHouse(providerName)
    ]);

    const groqData = await groqRes.json();
    const text = groqData.choices?.[0]?.message?.content || "";
    res.status(200).json({ text, companiesHouse: chData });
  } catch(e) {
    res.status(200).json({ error: e.message });
  }
};