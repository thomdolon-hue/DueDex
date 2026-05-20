import { useState } from "react";

const BUSINESS_MODELS = [
  "Adult / Entertainment","CBD / Hemp","Cryptocurrency / Crypto Exchange","Forex / FX Trading",
  "Gift Cards","Online Gaming / Gambling","Travel & Ticketing","Nutraceuticals / Supplements",
  "Firearms / Weapons","Tobacco / Vaping","Debt Collection","Telemarketing",
  "eCommerce (General)","SaaS / Software","Healthcare / Telemedicine","Financial Services",
];
const RISK_LEVELS = ["Low","Medium","High"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif}
  .wrap{background:#0b0f1a;min-height:100vh;padding:2rem 1rem;color:#e2e8f0}
  .glass{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;backdrop-filter:blur(8px)}
  .header{text-align:center;margin-bottom:2rem}
  .logo-row{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:.5rem}
  .logo-icon{width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px}
  .brand{font-size:22px;font-weight:600;color:#fff;letter-spacing:-.3px}
  .brand span{color:#818cf8}
  .subtitle{font-size:13px;color:#64748b}
  .form-card{padding:1.5rem}
  .field{margin-bottom:1rem}
  .field label{display:block;font-size:12px;font-weight:500;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px}
  .field input,.field select{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;color:#e2e8f0;font-size:14px;outline:none;transition:border .2s}
  .field input::placeholder{color:#475569}
  .field input:focus,.field select:focus{border-color:#6366f1;background:rgba(99,102,241,0.08)}
  .field select option{background:#1e293b;color:#e2e8f0}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .btn{width:100%;padding:12px;border-radius:10px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:.2px;transition:opacity .2s,transform .1s}
  .btn:disabled{opacity:.4;cursor:not-allowed}
  .btn:not(:disabled):hover{opacity:.9}
  .btn:not(:disabled):active{transform:scale(.98)}
  .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
  .tag{font-size:11px;padding:4px 10px;border-radius:20px;font-weight:500}
  .tag-low{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(52,211,153,.25)}
  .tag-mid{background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(251,191,36,.25)}
  .tag-high{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(248,113,113,.25)}
  .tag-type{background:rgba(99,102,241,.15);color:#818cf8;border:1px solid rgba(129,140,248,.2)}
  .result-card{padding:1.5rem}
  .result-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem}
  .provider-name{font-size:20px;font-weight:600;color:#fff;margin-bottom:4px}
  .verdict{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:24px;font-size:13px;font-weight:600}
          .verdict-mid{background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(251,191,36,.3)}
  .verdict-no{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(248,113,113,.3)}
  .metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:1.25rem}
  .metric{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 12px}
  .metric-label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
  .metric-value{font-size:13px;font-weight:500;color:#cbd5e1}
  .section{border-top:1px solid rgba(255,255,255,0.07);padding-top:1rem;margin-top:1rem}
  .section-title{font-size:12px;font-weight:500;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;margin-bottom:.75rem}
  .body-text{font-size:13px;color:#94a3b8;line-height:1.7}
  .chip{display:inline-block;font-size:11px;padding:3px 9px;border-radius:20px;margin:3px;background:rgba(99,102,241,.12);color:#a5b4fc;border:1px solid rgba(165,180,252,.15)}
  .flag{font-size:13px;color:#94a3b8;padding:5px 0;display:flex;align-items:flex-start;gap:8px}
  .flag::before{content:'⚠';color:#fbbf24;font-size:12px;margin-top:1px;flex-shrink:0}
  .loader{text-align:center;padding:2.5rem;color:#64748b}
  .spinner{width:32px;height:32px;border:2px solid rgba(99,102,241,.3);border-top-color:#6366f1;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 12px}
  @keyframes spin{to{transform:rotate(360deg)}}
  .err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:12px 14px;color:#f87171;font-size:13px;margin-top:1rem}
  .disclaimer{font-size:11px;color:#334155;text-align:center;line-height:1.6;margin-top:1rem}
  .glow{box-shadow:0 0 40px rgba(99,102,241,.08),0 0 80px rgba(139,92,246,.04)}
  .lic-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:10px;margin-bottom:8px;border:1px solid}
  .lic-valid{background:rgba(16,185,129,.07);border-color:rgba(52,211,153,.2)}
  .lic-invalid{background:rgba(239,68,68,.07);border-color:rgba(248,113,113,.2)}
  .lic-unverified{background:rgba(245,158,11,.07);border-color:rgba(251,191,36,.2)}
  .lic-badge{font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0;margin-top:1px}
  .lic-badge-valid{background:rgba(16,185,129,.2);color:#34d399}
  .lic-badge-invalid{background:rgba(239,68,68,.2);color:#f87171}
  .lic-badge-unverified{background:rgba(245,158,11,.2);color:#fbbf24}
  .lic-name{font-size:13px;font-weight:500;color:#e2e8f0;margin-bottom:2px}
  .lic-detail{font-size:12px;color:#64748b;line-height:1.5}
  @media(max-width:480px){.grid2{grid-template-columns:1fr}}
`;

function LicenseRow({ lic }) {
  const s = lic.status?.toLowerCase();
  const isValid = s === "verified" || s === "valid";
  const isInvalid = s === "invalid" || s === "unverified" || s === "suspicious" || s === "not found";
  const rowClass = isValid ? "lic-row lic-valid" : isInvalid ? "lic-row lic-invalid" : "lic-row lic-unverified";
  const badgeClass = isValid ? "lic-badge lic-badge-valid" : isInvalid ? "lic-badge lic-badge-invalid" : "lic-badge lic-badge-unverified";
  const icon = isValid ? "✓" : isInvalid ? "✕" : "?";
  return (
    <div className={rowClass}>
      <div style={{flex:1}}>
        <div className="lic-name">{lic.name}</div>
        <div className="lic-detail">
          {lic.licenseNumber && <span style={{color:"#94a3b8",marginRight:8}}>#{lic.licenseNumber}</span>}
          {lic.issuingAuthority && <span style={{color:"#64748b"}}>{lic.issuingAuthority}</span>}
        </div>
        {lic.notes && <div className="lic-detail" style={{marginTop:3,color:"#64748b"}}>{lic.notes}</div>}
      </div>
      <span className={badgeClass}>{icon} {lic.status}</span>
    </div>
  );
}

function ProviderResult({ data }) {
  const rec = data.recommendation?.toLowerCase();
  const isApply = rec?.includes("apply") && !rec?.includes("not");
  const isConditional = rec?.includes("conditional") || rec?.includes("condition");
  const verdictClass = isConditional ? "verdict-mid" : isApply ? "verdict-yes" : "verdict-no";
  const verdictIcon = isConditional ? "!" : isApply ? "✓" : "✕";
  const verdictText = isConditional ? "Conditional Apply" : isApply ? "Recommended" : "Do Not Apply";
  const licenses = data.licenses || [];
  const validCount = licenses.filter(l => ["verified","valid"].includes(l.status?.toLowerCase())).length;
  const invalidCount = licenses.filter(l => ["invalid","unverified","suspicious","not found"].includes(l.status?.toLowerCase())).length;

  return (
    <div className="glass result-card glow" style={{marginTop:"1rem"}}>
      <div className="result-header">
        <div>
          <div className="provider-name">{data.providerName}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6}}>
            <span className="tag tag-type">{data.providerType}</span>
            <span className="tag tag-type" style={{background:"rgba(148,163,184,.08)",color:"#94a3b8",borderColor:"rgba(148,163,184,.15)"}}>{data.country}</span>
          </div>
        </div>
        <div className={`verdict ${verdictClass}`}>
          <span>{verdictIcon}</span>
          {verdictText}
        </div>
      </div>

      <div className="metrics">
        {[
          {label:"Reg. Number", value: data.registrationNumber || "N/A"},
          {label:"Jurisdiction", value: data.country || "N/A"},
          {label:"Entity Type", value: data.providerType || "N/A"},
          {label:"Licenses Found", value: `${licenses.length} (${validCount} verified${invalidCount > 0 ? `, ${invalidCount} flagged` : ""})`},
        ].map(m => (
          <div className="metric" key={m.label}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
          </div>
        ))}
      </div>

      {licenses.length > 0 && (
        <div className="section">
          <div className="section-title">Regulatory Licenses & Verification</div>
          {licenses.map((l, i) => <LicenseRow key={i} lic={l} />)}
        </div>
      )}

      <div className="section">
        <div className="section-title">Risk Assessment</div>
        <p className="body-text">{data.riskAssessment}</p>
      </div>

      {data.paymentMethods?.length > 0 && (
        <div className="section">
          <div className="section-title">Payment Methods Supported</div>
          <div>{data.paymentMethods.map(p => <span className="chip" key={p} style={{background:"rgba(99,102,241,.12)",color:"#a5b4fc",borderColor:"rgba(165,180,252,.2)"}}>{p}</span>)}</div>
        </div>
      )}

      {data.supportedRegions?.length > 0 && (
        <div className="section">
          <div className="section-title">Supported Regions</div>
          <div>{data.supportedRegions.map(r => <span className="chip" key={r} style={{background:"rgba(16,185,129,.08)",color:"#34d399",borderColor:"rgba(52,211,153,.2)"}}>{r}</span>)}</div>
        </div>
      )}

      {data.acceptedCategories?.length > 0 && (
        <div className="section">
          <div className="section-title">Accepted Business Types</div>
          <div>{data.acceptedCategories.map(c => <span className="chip" key={c}>{c}</span>)}</div>
        </div>
      )}

      {data.companiesHouse && data.companiesHouse.title?.toLowerCase().includes(data.providerName?.toLowerCase().split(" ")[0].toLowerCase()) && (
        <div className="section">
          <div className="section-title">Companies House (UK)</div>
          <div className="metrics" style={{marginBottom:0}}>
            {[
              {label:"Company Name", value: data.companiesHouse.title},
              {label:"Company Number", value: data.companiesHouse.company_number},
              {label:"Status", value: data.companiesHouse.company_status},
              {label:"Incorporated", value: data.companiesHouse.date_of_creation},
            ].map(m => (
              <div className="metric" key={m.label}>
                <div className="metric-label">{m.label}</div>
                <div className="metric-value" style={{color: m.label === "Status" && data.companiesHouse.company_status === "active" ? "#34d399" : m.label === "Status" ? "#f87171" : "#cbd5e1"}}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.adverseMedia && (
        <div className="section">
          <div className="section-title" style={{color: data.adverseMedia.found ? "#f87171" : "#34d399"}}>
            {data.adverseMedia.found ? "⚠ Adverse Media Found" : "✓ No Adverse Media Found"}
          </div>
          <p className="body-text" style={{marginBottom: data.adverseMedia.flags?.length > 0 ? "0.75rem" : 0}}>{data.adverseMedia.summary}</p>
          {data.adverseMedia.flags?.length > 0 && (
            <div>{data.adverseMedia.flags.map(f => <span className="chip" key={f} style={{background:"rgba(239,68,68,.1)",color:"#f87171",borderColor:"rgba(248,113,113,.2)"}}>{f}</span>)}</div>
          )}
        </div>
      )}

      {data.redFlags?.length > 0 && (
        <div className="section">
          <div className="section-title" style={{color:"#f87171"}}>Adverse Media & Red Flags</div>
          {data.redFlags.map((f,i) => <div className="flag" key={i}>{f}</div>)}
        </div>
      )}

      <div className="section">
        <div className="section-title">Recommendation</div>
        <p className="body-text">{data.recommendationDetail}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [biz, setBiz] = useState("");
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const canRun = query.trim() && biz && risk && !loading;

  async function run() {
    if (!canRun) return;
    setLoading(true); setResult(null); setError("");

    const providerInput = query.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "").split("/")[0];

    const prompt = `You are a KYC/KYB due diligence expert. Return ONLY a JSON object for this payment provider. No markdown, no backticks.

Provider: "${providerInput}", Business: "${biz}", Risk: "${risk}"

Check for any connection to: fraud, fraudulent, embezzlement, misappropriation, theft, forgery, falsification, misrepresentation, deceit, bribery, corruption, kickbacks, money laundering, financial crime, regulatory fine, enforcement action, cease and desist, sanctions, OFAC, SDN list, AML, KYC failure, BSA violation, insolvency, receivership, liquidation, data breach, cybersecurity incident, scandal, lawsuit, criminal charges, criminal investigation.

JSON format:
{"providerName":"","providerType":"PSP/Acquirer/ISO/EMI/Gateway","country":"","registrationNumber":"","riskAssessment":"","licenses":[{"name":"","licenseNumber":"","issuingAuthority":"","status":"Verified/Invalid/Unverified","notes":""}],"acceptedCategories":[],"supportedRegions":[],"paymentMethods":[],"redFlags":[],"recommendation":"Apply/Do Not Apply/Conditional","recommendationDetail":""}`;

    try {
      const res = await fetch("/api/analyze", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ prompt, providerName: providerInput })
      });
      if (!res.ok) { const e = await res.text(); throw new Error(`API error ${res.status}: ${e}`); }
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || "API returned an error");
      const raw = data.text || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      let jsonStr = jsonMatch[0];
      try {
        const parsed = JSON.parse(jsonStr);
      parsed.companiesHouse = data.companiesHouse || null;
      setResult(parsed);
      } catch {
        jsonStr = jsonStr
          .replace(/,\s*([}\]])/g, "$1")
          // eslint-disable-next-line
          .replace(/([\{[\,])\s*,/g, "$1");
        const lastBrace = jsonStr.lastIndexOf("}");
        jsonStr = jsonStr.substring(0, lastBrace + 1);
        const parsed2 = JSON.parse(jsonStr);
        parsed2.companiesHouse = data.companiesHouse || null;
        setResult(parsed2);
      }
    } catch(e) {
      setError(`Error: ${e.message || "Could not retrieve results. Please try again."}`);
    } finally { setLoading(false); }
  }

  const tagClass = risk === "Low" ? "tag-low" : risk === "High" ? "tag-high" : "tag-mid";

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div style={{maxWidth:620,margin:"0 auto"}}>

          <div className="header">
            <div className="logo-row">
              <div className="logo-icon">🛡️</div>
              <div className="brand">Due<span>Dex</span></div>
            </div>
            <div className="subtitle">Smart compliance for payment professionals.</div>
          </div>

          <div style={{textAlign:"center",margin:"0 0 1.5rem",padding:"1.25rem 1.5rem",background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:12}}>
            <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.8,margin:0}}>
              <strong style={{color:"#a5b4fc",fontWeight:500}}>DueDex</strong> is a KYC/KYB due diligence platform built for payment professionals. Enter any <strong style={{color:"#a5b4fc",fontWeight:500}}>Acquirer, PSP, ISO, EMI, or Payment Gateway</strong> and instantly get a compliance review — including business registration, regulatory licenses with legitimacy checks, accepted business types, red flags, and an AI-powered <strong style={{color:"#a5b4fc",fontWeight:500}}>Apply or Do Not Apply</strong> recommendation tailored to your business model and risk tier.
            </p>
          </div>

          <div className="glass form-card">
            <div className="field">
              <label>Provider name or website</label>
              <input type="text" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()} placeholder="e.g. Stripe, Worldpay, checkout.com, adyen.com"/>
            </div>
            <div className="grid2">
              <div className="field">
                <label>Business model</label>
                <select value={biz} onChange={e=>setBiz(e.target.value)}>
                  <option value="">Select model...</option>
                  {BUSINESS_MODELS.map(m=><option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Risk tier</label>
                <select value={risk} onChange={e=>setRisk(e.target.value)}>
                  <option value="">Select risk...</option>
                  {RISK_LEVELS.map(r=><option key={r}>{r} Risk</option>)}
                </select>
              </div>
            </div>
            {(biz||risk) && (
              <div className="tags">
                {risk && <span className={`tag ${tagClass}`}>{risk} Risk</span>}
                {biz && <span className="tag tag-type">{biz}</span>}
              </div>
            )}
            <div style={{marginTop:"1rem"}}>
              <button className="btn" onClick={run} disabled={!canRun}>
                {loading ? "Analyzing provider..." : "Run Due Diligence →"}
              </button>
            </div>
          </div>

          {loading && (
            <div className="loader">
              <div className="spinner"></div>
              <div style={{fontSize:13}}>Reviewing compliance profile and verifying licenses...</div>
            </div>
          )}

          {error && <div className="err">{error}</div>}
          {result && <ProviderResult data={result} />}

          <div className="disclaimer">
            Results are AI-generated for research purposes only and do not constitute legal or financial advice.<br/>
            Always verify licenses directly with the relevant regulatory authority before making decisions.<br/><br/>
            Developed by <span style={{color:"#818cf8",fontWeight:500}}>Thomas Dolon</span>
          </div>
        </div>
      </div>
    </>
  );
}