import { useState, useRef, useCallback } from "react";

const CRITERIA = [
  {
    id: 1,
    title: "Хөтөлбөрийн ерөнхий мэдээлэл, дүн шинжилгээд тавигдах нийтлэг",
    items: [
      { id: "1.1", text: "Нэр, индекс, боловсролын түвшин, салбар шинжлэх ухааны нэр, хариуцах сургууль, тэнхимийн нэр, хариуцах нэгжийн хаяг, сургалт явуулж ирсэн түүх, туршлагыг хөтөлбөрт тусгасан байдал" },
      { id: "1.2", text: "Хөтөлбөрийн үзэл баримтлалыг боловсруулж тусгасан байдал" },
      { id: "1.3", text: "Хөтөлбөрийн эргэлт хэрэгцээний судалгааг хийж гүйцэтгэсэн байдал" },
      { id: "1.4", text: "Ажил олгогчдын шаардлагыг судалж хөтөлбөрт тусгасан байдал" },
      { id: "1.5", text: "Хөтөлбөрийн ирээдүйн чиг хандлагын судалгааг хийж хөтөлбөрт тусгасан байдал" },
      { id: "1.6", text: "Ижил төстэй дотоодын 2-дээш хөтөлбөртэй харьцуулсан судалгааг хийж хөтөлбөрт тусгасан байдал" },
      { id: "1.7", text: "Ижил төстэй гадаад 2-дээш хөтөлбөртэй харьцуулсан судалгааг хийж хөтөлбөрт тусгасан байдал" },
    ],
  },
  {
    id: 2,
    title: "Хөтөлбөрийн зорилго, зорилтын (PEO) нийтлэг шаардлага",
    items: [
      { id: "2.1", text: "Хөтөлбөрийг төгсөгчийн 4-5 жилийн дараа ажиллахад шаардлагатай мэдлэг, чадвар, хандлагыг судалж, загвар боловсруулан тусгасан байдал" },
      { id: "2.2", text: "Хөтөлбөрийн оролцогч талуудыг тодорхойлж хөтөлбөрийн зорилт, зорилгыг (PEO) хамтран боловсруулах, тэдний саналыг тусгасан байдал" },
      { id: "2.3", text: "Хөтөлбөрийн зорилго, зорилтыг (PEO) сургуулийн алсын хараа, эрхэм зорилготой уялдуулсан матрицыг боловсруулсан байдал" },
      { id: "2.4", text: "Хөтөлбөрийн зорилго, зорилтыг (PEO) дэд бакалавр, бакалавр, магистр, докторын түвшинд шатлан гүнзгийрсэн байдлаар тодорхойлж залгамж холбоог илэрхийлэх матрицыг боловсруулсан байдал" },
      { id: "2.5", text: "Хөтөлбөрийн зорилго, зорилтыг хэмжих шалгуурыг боловсруулсан байдал" },
    ],
  },
  {
    id: 3,
    title: "Хөтөлбөрийн суралцахуйн үр (PLO) дүнг нийтлэг шаардлагын дагуу боловсруулсан байдал",
    items: [
      { id: "3.1", text: "Суралцагчдын төгсөх үедээ эзэмсэн байх мэдлэг, чадвар, хандлагыг хөтөлбөрийн суралцахуйн үр дүнгийн жагсаалт байдлаар тодорхойлсон байдал" },
      { id: "3.2", text: "Суралцахуйн үр дүнг таксономи ашиглан хэмжигдэхүйц байдлаар тодорхойлсон байдал" },
      { id: "3.3", text: "Суралцах үр дүн нь хөтөлбөрийн сургалтын төлөвлөгөөтэй нийцсэн байх (Curriculum mapping хийх)" },
      { id: "3.4", text: "Хөтөлбөрийн суралцахуйн үр дүнгүүдийг шаталан боловсруулж залгамж холбооны матрицыг боловсруулсан байдал" },
      { id: "3.5", text: "Хөтөлбөрийн суралцахуйн үр дүнд үндэсний магадлан итгэмжлэлийн шаардлагын дагуу боловсруулсан байдал" },
      { id: "3.6", text: "Хөтөлбөрийн суралцахуйн үр дүнд олон улсын магадлан итгэмжлэлийн шалгуур, шаардлагын дагуу боловсруулсан байдал" },
      { id: "3.7", text: "Хөтөлбөрийн суралцахуйн үр дүнд мэргэшлийн шаталсан бүтцэд тусгагдсан чадамжуудыг тусгасан байдал" },
      { id: "3.8", text: "Хөтөлбөрийн суралцахуйн үр дүнд мэргэжлийн чиглэл, холбоодын шалгуур, шаардлагыг тусгасан байдал" },
      { id: "3.9", text: "Хөтөлбөрийн суралцахуйн үр дүнд мэргэжил, түвшинөөс үл хамааран ерөнхий ур чадваруудыг тусгасан байдал" },
      { id: "3.10", text: "Суралцахуйн үр дүнгүүдийн хоорондын нийцлийн шинжилгээ хийж матрицыг боловсруулсан байдал" },
    ],
  },
  {
    id: 4,
    title: "Хөтөлбөрийн сургалтын арга зүй",
    items: [
      { id: "4.1", text: "Сургалтын арга зүйг идэвхтэй, суралцагчдын оролцоонд тулгуурлан боловсруулсан байдал" },
      { id: "4.2", text: "Сургалтын арга зүйг суралцахуйн үр дүнтэй нийцүүлэн боловсруулж хамаарлын матрицыг боловсруулсан байдал" },
      { id: "4.3", text: "Сургалтын арга зүйг уламжлалт болон дэвшилтэд технологийг хослуулан боловсруулсан байдал" },
      { id: "4.4", text: "Сургалтын арга зүй болон хичээлийн хоорондын нийцлийн шинжилгээг хийсэн байдал" },
    ],
  },
  {
    id: 5,
    title: "Хөтөлбөрийн төлөвлөлт",
    items: [
      { id: "5.1", text: "Хөтөлбөрийн ерөнхий мэдээлэл болон судлах хичээлийн код, нэр, харгалзах багц цаг, өмнөх холбоо, улиралыг тусгасан байдал" },
      { id: "5.2", text: "Сургалтын төлөвлөгөөнд тухайн түвшинд хамаарах багц цагийг шаардлагын дагуу тусгасан байдал" },
      { id: "5.3", text: "Сургалтын төлөвлөгөөг хөтөлбөрийн боловсролын зэргийн ангилалын дагуу боловсруулсан байдал" },
      { id: "5.4", text: "Сургалтын төлөвлөгөө нь тухайн түвшний бүтэцийн дагуу боловсруулан байдал" },
    ],
  },
  {
    id: 6,
    title: "Хөтөлбөрийн үнэлгээ",
    items: [
      { id: "6.1", text: "Хөтөлбөрийн өөрийн үнэлгээг хоёр жил тутамд тогтмол хийж, үр дүнд үндэслэн сайжруулалтын арга хэмжээ авдаг байдал" },
      { id: "6.2", text: "Суралцахуйн үр дүнг шууд болон шууд бус аргаар үнэлэх төлөвлөлтийг боловсруулж, хэрэгжүүлсэн байдал" },
      { id: "6.3", text: "Шууд бус үнэлгээг төгсөх оюутан, төгсөгч, ажил олгогчийн судалгаанд үндэслэн суралцахуйн үр дүнг үнэлж, сайжруулах арга хэмжээг төлөвлөсөн байдал" },
      { id: "6.4", text: "Шууд үнэлгээний төлөвлөлтийг суралцахуйн үр дүнтэй нийцүүлсэн төлөвлөлтийг боловсруулсан байдал" },
      { id: "6.5", text: "Суралцахуйн үр дүнг шууд болон шууд бус аргаар үнэлэх байдлаар төлөвлөлтийг боловсруулсан байдал" },
      { id: "6.6", text: "Үнэлгээний төлөвлөлтийг хөтөлбөрийн зорилго, зорилт болон сургалтын хөтөлбөрийн суралцахуйн үр дүнтэй уялдуулан боловсруулсан байдал" },
    ],
  },
  {
    id: 7,
    title: "Сургалтын орчны нийтлэг шаардлага",
    items: [
      { id: "7.1", text: "Сургалт явуулах хичээлийн байр, анги танхимын үзүүлэлтүүд, ашиглах техник хэрэгслийн судалгааг хийсэн байдал" },
      { id: "7.2", text: "Сургалт, судалгааны зориулалттай лаборатори, туршилтын тоног төхөөрөмж, хэрэглэгдэхүүний судалгааг хийсэн байдал" },
      { id: "7.3", text: "Сургалт, судалгаанд ашиглах компьютер, программ хангамжийн судалгааг хийсэн байдал" },
      { id: "7.4", text: "Сургалт судалгаанд ашиглах ном, сурах бичиг, бусад цахим эх үүсвэрийн судалгааг хийсэн байдал" },
      { id: "7.5", text: "Сургуулийн интернэтийн орчин, сургалтын удирдлага мэдээллийн систем, онлайн сургалтын платформ, цахим хичээлийн материалын судалгааг хийсэн байдал" },
      { id: "7.6", text: "Сургууль дээр болон үйлдвэр, аж ахуйн газрыг түшиглэсэн дадлага, туршилт хийх баазын судалгааг хийсэн байдал" },
      { id: "7.7", text: "Сургалтын орчны судалгааг жил тутамд хийж гүйцэтгэдэг байдал" },
    ],
  },
  {
    id: 8,
    title: "Хөтөлбөр хэрэгжүүлэх багшид тавих шаардлага",
    items: [
      { id: "8.1", text: "Дэд бакалавр, бакалаврын хөтөлбөр хэрэгжүүлэх багш магистр байх шаардлагыг хангасан байдал" },
      { id: "8.2", text: "Ахисан түвшний сургалт зохион байгуулах багш доктор зэрэгтэй байх байх шаардлагыг хангасан байдал" },
      { id: "8.3", text: "Дэд бакалавр, бакалаврын хөтөлбөрийн мэргэжлийн суурь болон мэргэших хичээл заах 4-өөс доошгүй байх шаардлагыг хангасан байдал" },
      { id: "8.4", text: "Ахисан түвшний хөтөлбөрийн 2-оос доошгүй үндсэн багштай байх шаардлагыг хангасан байдал" },
      { id: "8.5", text: "Багшийн мэргэжлийн хөгжлийг дэмжих журмыг боловсруулж хэрэгжүүлдэг байдал" },
      { id: "8.6", text: "Хөтөлбөр хэрэгжүүлэх багшлах бүрэлдэхүүний боловсрол болон мэргэжлийн чадамжийг тусгасан байдал" },
      { id: "8.7", text: "Хөтөлбөр хэрэгжүүлэх багшлах бүрэлдэхүүний сургалт, судалгааны чиглэлийг тусгасан байдал" },
      { id: "8.8", text: "Багшид тавигдах шаардлагын дагуу чадавхжуулах хөтөлбөрийг боловсруулж хэрэгжүүлдэг байдал" },
    ],
  },
  {
    id: 9,
    title: "Элсэгч, төгсөгчид тавигдах шаардлага",
    items: [
      { id: "9.1", text: "Элсэгч, төгсөгчид тавигдах шаардлагыг холбогдох эрх зүйн орчинд нийцүүлэн хөтөлбөрт тусгасан байдал" },
      { id: "9.2", text: "Элсэгчийн өмнөх боловсролын түвшин, чиглэлийг хөтөлбөрт тусгасан байдал" },
      { id: "9.3", text: "Элсэгчийн элсэлтийн шалгалтын чиглэл, үнэлгээг хөтөлбөрт тусгасан байдал" },
      { id: "9.4", text: "Хөтөлбөрийн онцлогоос хамааран элсэгчид тавигдах нэмэлт шаардлагыг тодорхойлсон байдал" },
      { id: "9.5", text: "Төгсөгчийн суралцсан хугацааны үнэлгээний голч дүнгийн шаардлагыг тусгасан байдал" },
      { id: "9.6", text: "Төгсөгчийн багц цагийн болон багц цагийн бус шаардлагыг тусгасан байдал" },
      { id: "9.7", text: "Төгсөгчийн хөтөлбөрийн суралцахуйн үр дүнг эзэмшсэн түвшингийн шаардлагыг тусгасан байдал" },
      { id: "9.8", text: "Хөтөлбөрийн онцлогоос хамааран элсэгчид тавигдах нэмэлт шаардлагыг хангах түвшинг тодорхойлсон байдал" },
    ],
  },
];

const TOTAL_ITEMS = CRITERIA.reduce((s, c) => s + c.items.length, 0);
const MAX_SCORE = TOTAL_ITEMS * 4;

function getLevel(pct) {
  if (pct >= 90) return { level: "I", label: "Хангалттай", color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" };
  if (pct >= 80) return { level: "II", label: "Зарим засвар шаардлагатай", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" };
  if (pct >= 60) return { level: "III", label: "Сайжруулах шаардлагатай", color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)" };
  return { level: "IV", label: "Хангалтгүй — шинэчлэх шаардлагатай", color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" };
}

const ScoreButton = ({ value, selected, onClick }) => {
  const labels = { 0: "Хангаагүй", 2: "Хэсэгчилсэн", 4: "Бүрэн хангасан" };
  const configs = {
    0: { idle: "rgba(239,68,68,0.1)", active: "#ef4444", idleText: "#fca5a5", activeText: "#fff", border: "rgba(239,68,68,0.3)" },
    2: { idle: "rgba(245,158,11,0.1)", active: "#f59e0b", idleText: "#fcd34d", activeText: "#fff", border: "rgba(245,158,11,0.3)" },
    4: { idle: "rgba(16,185,129,0.1)", active: "#10b981", idleText: "#6ee7b7", activeText: "#fff", border: "rgba(16,185,129,0.3)" },
  };
  const c = configs[value];
  const isActive = selected === value;
  return (
    <button onClick={() => onClick(value)} style={{
      padding: "5px 13px", borderRadius: "8px",
      border: `1.5px solid ${isActive ? c.active : c.border}`,
      background: isActive ? c.active : c.idle,
      color: isActive ? c.activeText : c.idleText,
      fontWeight: isActive ? 700 : 500, fontSize: "12px",
      cursor: "pointer", transition: "all 0.18s", minWidth: "96px", textAlign: "center",
    }}>
      {value} — {labels[value]}
    </button>
  );
};

// Spinning loader
const Spinner = ({ size = 20, color = "#38bdf8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "spin 0.9s linear infinite" }}>
    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="40 20" strokeLinecap="round" />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
);

export default function App() {
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [evalType, setEvalType] = useState("self");
  const [programName, setProgramName] = useState("");
  const [evaluatorName, setEvaluatorName] = useState("");
  const [evalDate, setEvalDate] = useState(new Date().toISOString().split("T")[0]);
  const [activeSection, setActiveSection] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // PDF states
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState("");
  const [analyzeError, setAnalyzeError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const sectionRefs = useRef({});
  const fileInputRef = useRef(null);

  const setScore = useCallback((id, val) => {
    setScores((p) => ({ ...p, [id]: p[id] === val ? undefined : val }));
  }, []);
  const setComment = useCallback((id, val) => {
    setComments((p) => ({ ...p, [id]: val }));
  }, []);

  const totalScore = Object.values(scores).reduce((s, v) => s + (v ?? 0), 0);
  const answeredCount = Object.values(scores).filter((v) => v !== undefined).length;
  const rawPct = MAX_SCORE > 0 ? (totalScore / MAX_SCORE) * 100 : 0;
  const weightedPct = evalType === "self" ? rawPct * 0.35 : rawPct * 0.45;
  const levelInfo = getLevel(rawPct);

  const readFileAsBase64 = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(",")[1]);
      r.onerror = () => rej(new Error("Файл уншихад алдаа гарлаа"));
      r.readAsDataURL(file);
    });

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setAnalyzeError("Зөвхөн PDF файл оруулна уу.");
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setAnalyzeError("Файлын хэмжээ 30MB-аас хэтрэхгүй байх ёстой.");
      return;
    }
    setPdfFile(file);
    setPdfName(file.name);
    setAnalyzeError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const buildPrompt = () => {
    const allItems = CRITERIA.flatMap((c) =>
      c.items.map((item) => `${item.id}: ${item.text}`)
    ).join("\n");

    return `Та сургалтын хөтөлбөрийн баримт бичгийг дараах 55 шалгуурын дагуу үнэлнэ үү.

Шалгуур бүрт дараах оноог өгнө үү:
- 0: Хангаагүй (тусгаагүй эсвэл огт байхгүй)
- 2: Хэсэгчилсэн хангасан (дутуу, хангалтгүй тусгасан)
- 4: Бүрэн хангасан (бүрэн, хангалттай тусгасан)

ШАЛГУУРЫН ЖАГСААЛТ:
${allItems}

ХАРИУ ФОРМАТ (яг ийм JSON байх ёстой, өөр юм бичихгүй):
{
  "scores": {
    "1.1": 0,
    "1.2": 2,
    "1.3": 4,
    ... (бүх 55 шалгуурыг оруулна)
  },
  "comments": {
    "1.1": "тайлбар текст",
    ... (зөвхөн анхаарал татсан шалгуурт тайлбар)
  },
  "programName": "хөтөлбөрийн нэр (баримт бичгээс)"
}`;
  };

  const analyzeWithAI = async () => {
    if (!pdfFile) return;
    setAnalyzing(true);
    setAnalyzeError("");
    setAnalyzeProgress("PDF файл уншиж байна...");

    try {
      const base64Data = await readFileAsBase64(pdfFile);
      setAnalyzeProgress("AI шинжилгээ хийж байна... (30-60 секунд болж болно)");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: { type: "base64", media_type: "application/pdf", data: base64Data },
                },
                { type: "text", text: buildPrompt() },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API алдаа: ${response.status}`);
      }

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";

      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI-н хариуг задлах боломжгүй байна.");

      const parsed = JSON.parse(jsonMatch[0]);

      if (parsed.scores) {
        const newScores = {};
        for (const [k, v] of Object.entries(parsed.scores)) {
          if ([0, 2, 4].includes(Number(v))) newScores[k] = Number(v);
        }
        setScores(newScores);
      }
      if (parsed.comments) setComments(parsed.comments);
      if (parsed.programName && !programName) setProgramName(parsed.programName);

      setAnalyzeProgress("✓ Амжилттай шинжиллээ!");
      setTimeout(() => setAnalyzeProgress(""), 3000);
    } catch (err) {
      setAnalyzeError(err.message || "Шинжилгээ хийхэд алдаа гарлаа. Дахин оролдоно уу.");
      setAnalyzeProgress("");
    } finally {
      setAnalyzing(false);
    }
  };

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const resetAll = () => {
    setScores({});
    setComments({});
    setPdfFile(null);
    setPdfName("");
    setAnalyzeError("");
    setAnalyzeProgress("");
    setShowResults(false);
  };

  // ── Results page ────────────────────────────────────────────────
  if (showResults) {
    return (
      <div style={{ fontFamily: "'Noto Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "linear-gradient(160deg,#0a0f1e 0%,#0f1a2e 60%,#0a1628 100%)", color: "#e2e8f0", padding: "28px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "13px", color: "#475569", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>М.Ж.203-14.03</div>
            <h1 style={{ fontSize: "30px", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Үнэлгээний Үр Дүн</h1>
          </div>

          {/* Big score */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${levelInfo.border}`, borderRadius: "24px", padding: "32px", marginBottom: "20px", textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              {[
                { label: "Нийт оноо", value: `${totalScore}/${MAX_SCORE}`, color: "#f1f5f9" },
                { label: "Хувь", value: `${rawPct.toFixed(1)}%`, color: levelInfo.color },
                { label: `Жинлэсэн (${evalType === "self" ? "35%" : "45%"})`, value: `${weightedPct.toFixed(1)}%`, color: "#38bdf8" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "34px", fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 24px", borderRadius: "12px", background: levelInfo.bg, border: `1px solid ${levelInfo.border}`, display: "inline-block" }}>
              <span style={{ fontSize: "22px", fontWeight: 800, color: levelInfo.color }}>Түвшин {levelInfo.level}</span>
              <span style={{ margin: "0 10px", color: levelInfo.color, opacity: 0.5 }}>|</span>
              <span style={{ fontSize: "15px", color: levelInfo.color }}>{levelInfo.label}</span>
            </div>
          </div>

          {/* Category breakdown */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "18px", color: "#f1f5f9" }}>Үзүүлэлтийн задаргаа</h2>
            {CRITERIA.map((cat) => {
              const maxCat = cat.items.length * 4;
              const scoredCat = cat.items.reduce((s, item) => s + (scores[item.id] ?? 0), 0);
              const catPct = maxCat > 0 ? Math.round((scoredCat / maxCat) * 100) : 0;
              const ci = getLevel(catPct);
              return (
                <div key={cat.id} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                    <span style={{ fontSize: "13px", color: "#cbd5e1", flex: 1 }}>{cat.id}. {cat.title}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: ci.color, marginLeft: "16px" }}>{scoredCat}/{maxCat} ({catPct}%)</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "3px", background: "#1e293b", overflow: "hidden" }}>
                    <div style={{ width: `${catPct}%`, height: "100%", borderRadius: "3px", background: `linear-gradient(90deg, ${ci.color}aa, ${ci.color})`, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Meta */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "18px 22px", marginBottom: "24px", fontSize: "13px", color: "#94a3b8", lineHeight: 2 }}>
            {programName && <div><strong style={{ color: "#94a3b8" }}>Хөтөлбөр:</strong> {programName}</div>}
            {pdfName && <div><strong style={{ color: "#94a3b8" }}>PDF файл:</strong> {pdfName}</div>}
            {evaluatorName && <div><strong style={{ color: "#94a3b8" }}>Үнэлгээчин:</strong> {evaluatorName}</div>}
            <div><strong style={{ color: "#94a3b8" }}>Огноо:</strong> {evalDate}</div>
            <div><strong style={{ color: "#94a3b8" }}>Үнэлгээний төрөл:</strong> {evalType === "self" ? "Өөрийн үнэлгээ (35%)" : "Хөндлөнгийн үнэлгээ (45%)"}</div>
            <div><strong style={{ color: "#94a3b8" }}>Үнэлсэн шалгуур:</strong> {answeredCount}/{TOTAL_ITEMS}</div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => setShowResults(false)} style={{ padding: "12px 28px", borderRadius: "12px", background: "#1e293b", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>← Буцах</button>
            <button onClick={resetAll} style={{ padding: "12px 28px", borderRadius: "12px", background: "#ef4444", color: "#fff", border: "none", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Дахин эхлүүлэх</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main page ────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Noto Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "linear-gradient(160deg,#0a0f1e 0%,#0f1a2e 60%,#0a1628 100%)", color: "#e2e8f0" }}>
      {/* Sticky header */}
      <div style={{ background: "rgba(10,15,30,0.92)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 20px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "17px", fontWeight: 800, color: "#f8fafc", margin: 0 }}>Сургалтын Хөтөлбөрийн Чанарын Үнэлгээ</h1>
            <p style={{ fontSize: "11px", color: "#475569", margin: "2px 0 0", letterSpacing: "0.5px" }}>М.Ж.203-14.03 | Хувилбар 2</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: levelInfo.color, lineHeight: 1 }}>{rawPct.toFixed(0)}%</div>
              <div style={{ fontSize: "11px", color: "#475569" }}>{answeredCount}/{TOTAL_ITEMS} үнэлсэн</div>
            </div>
            {/* Mini donut */}
            <svg viewBox="0 0 36 36" style={{ width: "52px", height: "52px", transform: "rotate(-90deg)" }}>
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1e293b" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke={levelInfo.color} strokeWidth="3.5"
                strokeDasharray={`${(rawPct / 100) * 97.4} 97.4`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.5s" }} />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "18px", padding: "18px 16px" }}>
        {/* Sidebar */}
        <div style={{ width: "210px", flexShrink: 0, position: "sticky", top: "100px", alignSelf: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "16px" }}>
            {CRITERIA.map((cat) => {
              const maxCat = cat.items.length * 4;
              const scoredCat = cat.items.reduce((s, item) => s + (scores[item.id] ?? 0), 0);
              const catPct = maxCat > 0 ? Math.round((scoredCat / maxCat) * 100) : 0;
              const catInfo = getLevel(catPct);
              const isActive = activeSection === cat.id;
              const hasAny = cat.items.some((i) => scores[i.id] !== undefined);
              return (
                <button key={cat.id} onClick={() => scrollTo(cat.id)} style={{
                  padding: "7px 10px", borderRadius: "8px", border: "none",
                  background: isActive ? "rgba(56,189,248,0.12)" : "transparent",
                  color: isActive ? "#38bdf8" : "#64748b",
                  textAlign: "left", cursor: "pointer", fontSize: "12px",
                  fontWeight: isActive ? 700 : 500, transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: "7px",
                }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0, background: hasAny ? catInfo.color : "#334155" }} />
                  <span style={{ lineHeight: 1.3 }}>{cat.id}. {cat.title.length > 28 ? cat.title.slice(0, 28) + "…" : cat.title}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setShowResults(true)} disabled={answeredCount === 0} style={{
            width: "100%", padding: "11px", borderRadius: "10px", border: "none",
            background: answeredCount > 0 ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#1e293b",
            color: answeredCount > 0 ? "#fff" : "#475569",
            fontWeight: 700, fontSize: "14px", cursor: answeredCount > 0 ? "pointer" : "not-allowed",
          }}>
            Үр дүн харах →
          </button>
        </div>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── PDF Upload Panel ── */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "18px", padding: "22px", marginBottom: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(56,189,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#38bdf8", margin: 0 }}>AI шинжилгээ — PDF оруулах</h2>
                <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>Хөтөлбөрийн баримт бичгийг оруулбал шалгуур бүрийг автоматаар үнэлнэ</p>
              </div>
            </div>

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => !pdfFile && fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragOver ? "#38bdf8" : pdfFile ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: "14px",
                padding: "24px 20px",
                textAlign: "center",
                cursor: pdfFile ? "default" : "pointer",
                background: isDragOver ? "rgba(56,189,248,0.06)" : pdfFile ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
                marginBottom: "14px",
              }}
            >
              <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display: "none" }}
                onChange={(e) => handleFileSelect(e.target.files[0])} />

              {!pdfFile ? (
                <>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📄</div>
                  <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 600 }}>PDF файл чирж тавих эсвэл дарах</div>
                  <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>Хамгийн ихдээ 30MB</div>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                  <div style={{ fontSize: "28px" }}>📄</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#10b981" }}>{pdfName}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{(pdfFile.size / 1024).toFixed(0)} KB</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setPdfFile(null); setPdfName(""); setAnalyzeError(""); setAnalyzeProgress(""); }}
                    style={{ marginLeft: "auto", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", color: "#f87171", fontSize: "12px", padding: "4px 10px", cursor: "pointer" }}>
                    ✕ Хасах
                  </button>
                </div>
              )}
            </div>

            {/* Analyze button + status */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={analyzeWithAI}
                disabled={!pdfFile || analyzing}
                style={{
                  padding: "10px 22px", borderRadius: "10px", border: "none",
                  background: pdfFile && !analyzing ? "linear-gradient(135deg,#0ea5e9,#2563eb)" : "#1e293b",
                  color: pdfFile && !analyzing ? "#fff" : "#475569",
                  fontWeight: 700, fontSize: "14px",
                  cursor: pdfFile && !analyzing ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                {analyzing ? <Spinner size={16} /> : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                )}
                {analyzing ? "Шинжлэж байна..." : "AI-р үнэлэх"}
              </button>

              {analyzeProgress && (
                <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: analyzeProgress.startsWith("✓") ? "#10b981" : "#94a3b8" }}>
                  {analyzing && <Spinner size={14} />}
                  {analyzeProgress}
                </div>
              )}
              {analyzeError && (
                <div style={{ fontSize: "13px", color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "7px 12px" }}>
                  ⚠ {analyzeError}
                </div>
              )}
            </div>

            {answeredCount > 0 && (
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#10b981" }}>✓</span>
                {answeredCount} шалгуур үнэлэгдсэн байна — доор гараар засах боломжтой
              </div>
            )}
          </div>

          {/* Meta form */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "18px", marginBottom: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Хөтөлбөрийн нэр", val: programName, set: setProgramName, placeholder: "Програм хангамж" },
                { label: "Үнэлгээчний нэр", val: evaluatorName, set: setEvaluatorName, placeholder: "Нэр оруулна уу" },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
                  <input value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Огноо</label>
                <input type="date" value={evalDate} onChange={(e) => setEvalDate(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: "13px", boxSizing: "border-box", colorScheme: "dark" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Үнэлгээний төрөл</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[["self", "Өөрийн (35%)"], ["external", "Хөндлөнгийн (45%)"]].map(([val, lbl]) => (
                    <button key={val} onClick={() => setEvalType(val)} style={{
                      flex: 1, padding: "8px 6px", borderRadius: "8px",
                      border: evalType === val ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                      background: evalType === val ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.04)",
                      color: evalType === val ? "#38bdf8" : "#64748b",
                      fontWeight: 600, fontSize: "12px", cursor: "pointer",
                    }}>{lbl}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Criteria */}
          {CRITERIA.map((cat) => {
            const maxCat = cat.items.length * 4;
            const scoredCat = cat.items.reduce((s, item) => s + (scores[item.id] ?? 0), 0);
            const catPct = maxCat > 0 ? Math.round((scoredCat / maxCat) * 100) : 0;
            const ci = getLevel(catPct);
            return (
              <div key={cat.id} ref={(el) => (sectionRefs.current[cat.id] = el)}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "18px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", fontWeight: 800, fontSize: "13px", width: "30px", height: "30px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{cat.id}</span>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px" }}>{cat.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "#1e293b", overflow: "hidden" }}>
                        <div style={{ width: `${catPct}%`, height: "100%", borderRadius: "3px", background: ci.color, transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: ci.color, minWidth: "38px", textAlign: "right" }}>{catPct}%</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {cat.items.map((item) => {
                    const hasScore = scores[item.id] !== undefined;
                    return (
                      <div key={item.id} style={{
                        padding: "12px 14px", borderRadius: "11px",
                        background: hasScore ? "rgba(255,255,255,0.03)" : "transparent",
                        border: `1px solid ${hasScore ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ display: "flex", gap: "10px", marginBottom: "9px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", minWidth: "30px", paddingTop: "1px" }}>{item.id}</span>
                          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0, lineHeight: 1.65, flex: 1 }}>{item.text}</p>
                        </div>
                        <div style={{ display: "flex", gap: "7px", marginLeft: "40px", flexWrap: "wrap", alignItems: "center" }}>
                          {[0, 2, 4].map((v) => (
                            <ScoreButton key={v} value={v} selected={scores[item.id]} onClick={(val) => setScore(item.id, val)} />
                          ))}
                          <input value={comments[item.id] || ""} onChange={(e) => setComment(item.id, e.target.value)}
                            placeholder="Тайлбар..."
                            style={{ flex: 1, minWidth: "120px", padding: "5px 11px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#94a3b8", fontSize: "12px", outline: "none" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
