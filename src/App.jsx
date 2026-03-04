import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Mono', monospace;
    background: #0f0e0d;
    color: #e8e0d4;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: #0f0e0d;
    background-image:
      radial-gradient(ellipse at 20% 20%, rgba(180,130,70,0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(120,80,40,0.07) 0%, transparent 50%);
  }

  .header {
    border-bottom: 1px solid rgba(180,130,70,0.3);
    padding: 2rem 2.5rem;
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    color: #d4a853;
    letter-spacing: -0.02em;
  }

  .header span {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #6b5f50;
    text-transform: uppercase;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group.full { grid-column: 1 / -1; }

  label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a08060;
  }

  input[type="text"], input[type="number"], select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,130,70,0.2);
    color: #e8e0d4;
    padding: 0.6rem 0.8rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    border-radius: 3px;
    transition: border-color 0.2s;
    width: 100%;
  }

  input:focus, select:focus {
    outline: none;
    border-color: rgba(180,130,70,0.6);
  }

  select option { background: #1a1612; }

  /* ── Style slider ── */
  .style-slider-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.1rem;
  }

  .style-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: #6b5f50;
  }

  .style-value {
    text-align: center;
    font-size: 0.72rem;
    color: #d4a853;
    min-height: 1rem;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      #d4a853 var(--fill),
      rgba(180,130,70,0.15) var(--fill)
    );
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: #d4a853;
    border: 2px solid #0f0e0d;
    box-shadow: 0 0 0 1px rgba(180,130,70,0.5);
    cursor: pointer;
    transition: transform 0.15s;
  }

  input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }

  /* ── Toggles ── */
  .checkbox-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .check-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,130,70,0.2);
    border-radius: 20px;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    font-size: 0.75rem;
    transition: all 0.15s;
    user-select: none;
  }

  .check-pill:hover { border-color: rgba(180,130,70,0.5); }
  .check-pill.active {
    background: rgba(180,130,70,0.15);
    border-color: #d4a853;
    color: #d4a853;
  }

  .check-pill input { display: none; }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.2rem;
    cursor: pointer;
    user-select: none;
  }

  .toggle-track {
    width: 40px; height: 22px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(180,130,70,0.25);
    border-radius: 11px;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .toggle-track.on { background: rgba(180,130,70,0.25); border-color: #d4a853; }

  .toggle-thumb {
    position: absolute;
    top: 3px; left: 3px;
    width: 14px; height: 14px;
    background: #6b5f50;
    border-radius: 50%;
    transition: transform 0.2s, background 0.2s;
  }

  .toggle-track.on .toggle-thumb { transform: translateX(18px); background: #d4a853; }
  .toggle-label { font-size: 0.75rem; color: #a08060; }

  /* ── Buttons ── */
  .generate-btn {
    width: 100%;
    padding: 1rem;
    background: #d4a853;
    color: #0f0e0d;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 3px;
    transition: background 0.2s;
    margin-top: 0.5rem;
  }

  .generate-btn:hover { background: #e0b96a; }

  /* ── Results ── */
  .results { margin-top: 2.5rem; }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(180,130,70,0.3);
  }

  .results-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: #d4a853;
  }

  .results-actions { display: flex; gap: 0.75rem; }

  .action-btn {
    background: transparent;
    border: 1px solid rgba(180,130,70,0.3);
    color: #a08060;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.15s;
  }

  .action-btn:hover { border-color: #d4a853; color: #d4a853; }

  .warning-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(200,120,40,0.1);
    border: 1px solid rgba(200,120,40,0.3);
    border-radius: 4px;
    padding: 0.5rem 0.9rem;
    font-size: 0.72rem;
    color: #c87828;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  .progress-bar {
    height: 2px;
    background: rgba(180,130,70,0.15);
    border-radius: 2px;
    margin-bottom: 2rem;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #d4a853;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: #6b5f50;
    text-align: right;
    margin-bottom: 0.3rem;
  }

  .trip-badge {
    display: inline-block;
    background: rgba(180,130,70,0.1);
    border: 1px solid rgba(180,130,70,0.3);
    border-radius: 20px;
    padding: 0.2rem 0.7rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: #a08060;
    margin-bottom: 1.5rem;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    .categories-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
  }

  .category {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(180,130,70,0.15);
    border-radius: 4px;
    overflow: hidden;
  }

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem 1rem;
    background: rgba(180,130,70,0.06);
    border-bottom: 1px solid rgba(180,130,70,0.15);
    cursor: pointer;
  }

  .category-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4a853;
  }

  .category-icon { font-size: 0.9rem; }
  .cat-count { font-size: 0.65rem; color: #6b5f50; }
  .cat-count.done { color: #d4a853; }

  .items-list { padding: 0.5rem 0; }

  .item-row {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.35rem 1rem;
    cursor: pointer;
    transition: background 0.1s;
  }

  .item-row:hover { background: rgba(255,255,255,0.03); }
  .item-row.checked { opacity: 0.45; }

  .item-checkbox {
    width: 14px; height: 14px;
    border: 1px solid rgba(180,130,70,0.4);
    border-radius: 2px;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }

  .item-row.checked .item-checkbox { background: #d4a853; border-color: #d4a853; }
  .check-mark { color: #0f0e0d; font-size: 10px; line-height: 1; }
  .item-name { font-size: 0.8rem; color: #c8bfb0; }
  .item-row.checked .item-name { text-decoration: line-through; color: #5a5040; }

  .note {
    font-size: 0.7rem;
    color: #6b5f50;
    margin-top: 1rem;
    padding: 0.7rem;
    border-left: 2px solid rgba(180,130,70,0.2);
    line-height: 1.7;
  }

  .toast {
    position: fixed;
    bottom: 2rem; right: 2rem;
    background: #d4a853;
    color: #0f0e0d;
    padding: 0.7rem 1.2rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    border-radius: 3px;
    animation: slideIn 0.2s ease;
    z-index: 100;
  }

  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

// ────────────────────────────────────────────────────────────────────────────
// CLOTHING STYLE HELPERS
// ────────────────────────────────────────────────────────────────────────────

// smartness: 0–100
// Shirts scale off min(clothingCount, 8) so they don't balloon on long trips.
// T-shirts fill the remaining slots — so a 14-night trip at 50% smart gives
// 4 shirts + 8 t-shirts rather than a 50/50 split of a capped 8.
function calcClothingMix(clothingCount, smartness) {
  const shirtBase  = Math.min(clothingCount, 8);
  const shirts     = Math.round(smartness / 100 * shirtBase);
  const tshirts    = clothingCount - shirts;
  const smartTrousers = smartness >= 70;
  return { tshirts, shirts, smartTrousers };
}

function styleLabel(smartness) {
  if (smartness === 0)        return "Full casual 👕";
  if (smartness <= 25)        return "Mostly casual";
  if (smartness <= 45)        return "Casual with a nicer shirt or two";
  if (smartness <= 55)        return "Smart-casual mix";
  if (smartness <= 74)        return "Mostly smart-casual";
  if (smartness <= 89)        return "Smart — shirts throughout";
  return                             "Full smart 👔";
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN LIST LOGIC
// ────────────────────────────────────────────────────────────────────────────

function generateList(form) {
  const {
    nights, destination, season, accommodation, tripType,
    activities, lightToiletries, hasBeard, wearsSuit,
    bringMacBook, smartness, dayTrip
  } = form;

  const isDayTrip   = !!dayTrip;
  const n           = isDayTrip ? 0 : (parseInt(nights) || 0);
  const isWorkDay   = tripType === "workday";
  const isOvernight = n >= 1;

  const travelDays = n + 1;
  const medDays    = n + 2;
  const ileoDays   = n + 3;
  const imodium    = (n + 1) * 6;
  const loperamide = medDays * 12;
  const isoGels    = travelDays;

  const abroad       = destination === "eu" || destination === "intl";
  const isUKDomestic = destination === "uk";
  const isSummer     = season === "summer";
  const isWinter     = season === "winter";
  const isMixed      = season === "mixed";
  const isFamilyHome = accommodation === "family";
  const isShared     = accommodation === "shared";

  const swimming = activities.includes("swimming");
  const music    = activities.includes("guitar");

  const clothingCount  = Math.min(travelDays + 1, 12);
  const needsDetergent = travelDays > 11;

  const { tshirts, shirts, smartTrousers } = calcClothingMix(clothingCount, smartness);

  // ── TOILETRIES ─────────────────────────────────────────────────────────
  const toiletries = [];
  if (!isDayTrip) {
    if (lightToiletries) {
      toiletries.push(
        "Toothbrush", "Interdentals", "Toothpaste", "Mouthwash",
        "Deodorant", "Hairbrush", "Hair bobbles", "Face wipes",
        "Dry shampoo", "Aftershave"
      );
    } else {
      toiletries.push(
        "Toothbrush", "Toothbrush charger", "Interdentals", "Floss",
        "Toothpaste", "Mouthwash", "Face wash", "Shampoo",
        "Hair conditioner", "Shower gel", "Hair loss shampoo",
        "Silicone scrubber", "Deodorant", "Anti-sweat", "Hairbrush",
        "Hair bobbles", "Dry shampoo", "Air freshener", "Face wipes",
        "Tissues", "Aftershave", "Moisturiser"
      );
      if (hasBeard) toiletries.push("Beard oil", "Beard brush");
    }
  }

  // ── ILEOSTOMY ──────────────────────────────────────────────────────────
  const ileo = isDayTrip ? ["Daytime ileostomy supplies bag"] : [
    `${ileoDays} ileostomy bags`,
    `${ileoDays} rings`,
    `${ileoDays} disposable bags`,
    "Belt", "Conti wipes", "Bag of dry wipes",
    "Anti-adhesion spray", "Barrier spray",
    "Scissors", "Stickers", "Ointment",
    "Daytime ileostomy supplies bag"
  ];

  // ── CPAP ───────────────────────────────────────────────────────────────
  const cpap = isOvernight
    ? ["CPAP machine", "CPAP power cable", ...(abroad ? ["CPAP travel adapter"] : [])]
    : [];

  // ── MEDICATIONS ────────────────────────────────────────────────────────
  const meds = [];
  if (isDayTrip) {
    // Fixed single-day quantities for any day trip
    meds.push(
      "10 loperamide", "9 Imodium instants",
      "1 sertraline", "1 multivitamin",
      "2 isotonic gels", "2 paracetamol",
      "ORS dispersible tablets", "Nutritional supplements",
      "Pill box"
    );
  } else {
    meds.push(`${loperamide} loperamide`);
    meds.push(`${imodium} Imodium instants`);
    meds.push(`${medDays} sertraline`);
    meds.push(`${medDays} multivitamins`);
    if (n >= 3) meds.push(`${medDays} hair vitamins`);
    if (n >= 5) meds.push(`${medDays} Vitamin D`);
    meds.push(`${isoGels} isotonic gels`);
    meds.push(
      "ORS dispersible tablets", "Nutritional supplements",
      "Antacid tablets", "16 paracetamol"
    );
    if (n >= 2) meds.push("Sudafed");
    meds.push("Plasters", "Masks", "Pearls", "Pill boxes");
  }

  // ── CLOTHING ───────────────────────────────────────────────────────────
  const clothing = [];
  if (!isDayTrip) {
    clothing.push(`${clothingCount} pants`);
    clothing.push(`${clothingCount} socks`);
    if (tshirts > 0) clothing.push(`${tshirts} t-shirt${tshirts > 1 ? "s" : ""}`);
    if (shirts > 0)  clothing.push(`${shirts} shirt${shirts > 1 ? "s" : ""}`);
    clothing.push("Hoody");

    // Shorts only if casual enough and warm enough
    if ((isSummer || isMixed) && !smartTrousers) {
      clothing.push(`${Math.min(Math.ceil(travelDays / 2), 4)} shorts`);
    }

    // Trousers — smarter trips get more
    const trouserCount = smartTrousers ? Math.min(Math.ceil(travelDays / 3) + 1, 3) : (n <= 2 ? 1 : 2);
    clothing.push(`${trouserCount} trouser${trouserCount > 1 ? "s" : ""}`);

    // Shoes — smarter trips get proper shoes flagged
    if (smartTrousers) {
      clothing.push("Smart shoes");
      if (tshirts > 0 || !smartTrousers) clothing.push("Casual shoes / trainers");
    } else {
      clothing.push("Shoes / trainers");
      if (isSummer || isMixed) clothing.push("Sandals");
    }

    if (n >= 2) clothing.push("Belt");
    if (swimming) { clothing.push("Swimming trunks"); clothing.push("Goggles & nose clip"); }

    if (isFamilyHome || isShared) {
      clothing.push("Pyjamas", "Slippers");
      if (isWinter || isMixed) clothing.push("Dressing gown");
    }

    if (needsDetergent) clothing.push("Travel detergent");

    // Suit — always separate, driven by toggle
    if (wearsSuit) {
      clothing.push(
        "Suit jacket", "Suit trousers", "Oxford shoes",
        "Dress shirt", "Tie", "Pocket square", "Cufflinks"
      );
    }
  }

  // ── OUTERWEAR ──────────────────────────────────────────────────────────
  const outerwear = [];
  if (isWinter || isMixed) outerwear.push("Coat", "Scarf", "Gloves");
  outerwear.push("Hoody", "Waterproof", "Umbrella");
  if (isSummer || isMixed) outerwear.push("Tilley hat", "Sun hat");
  if (isWinter || isMixed) outerwear.push("Hat / cap");

  // ── TECH ───────────────────────────────────────────────────────────────
  const tech = [];
  tech.push("Phone", "Charging cables", "Headphones", "Handheld fan");
  if (isWorkDay) tech.push("Work laptop", "Work laptop charger", "Work phone");
  if (isDayTrip) {
    tech.push("Charger plug");
    if (destination === "eu")   tech.push("EU adapter");
    if (destination === "intl") tech.push("International adapter");
  } else {
    tech.push("USB power adapter", "Power bank");
    if (n >= 7) tech.push("Wireless travel charger");
    tech.push("Watch cable", "Phone cable");
    if (bringMacBook) tech.push("MacBook", "MacBook charger", "MacBook USB-C cable");
    if (destination === "eu")   tech.push("EU adapter", "Bag weighing scale");
    if (destination === "intl") tech.push("International adapter", "Bag weighing scale");
    if (isUKDomestic && n >= 2) tech.push("Extension lead");
    if (n >= 3)             tech.push("Kindle");
    if (n >= 5)             tech.push("iPad");
    if (isSummer && n >= 3) tech.push("Bigger handheld fan");
    if (isSummer)           tech.push("Neck fan");
  }

  // ── BAGS & ESSENTIALS ──────────────────────────────────────────────────
  const bags = [];
  if (isDayTrip) {
    bags.push("Bag", "Tiny towel", "Water bottle", "Wallet");
    if (isWorkDay) bags.push("ID card");
    bags.push(
      "Towel", "Carrier bag", "Glasses", "Glasses cloth",
      "Lens cleaner", "Hand sanitiser"
    );
  } else {
    bags.push("Backpack");
    if (n >= 3) bags.push("Compact backpack");
    bags.push(
      "Water bottle", "Tiny towel", "Earplugs", "Glasses", "Glasses case",
      "Glasses cloth", "Lens cleaner", "Hand sanitiser",
      "Carrier bags", "Wallet", "Eye shade", "Sweat bands"
    );
    if (isWorkDay) bags.push("ID card");
    if (abroad) bags.push("Travel towel", "Travel pillow", "Neck pillow", "Prophylactics");
  }

  // ── DOCUMENTS ─────────────────────────────────────────────────────────
  const docs = [];
  if (abroad) {
    docs.push("Passport", "Travel insurance documents", "EHIC / GHIC card");
  }

  // ── FOOD & DRINK ───────────────────────────────────────────────────────
  const food = ["Diabetes-friendly sweets"];
  if (isWorkDay) {
    food.push("Lunch", "Low-carb snacks");
  } else {
    if (n >= 1) food.push("Low-carb snacks");
    if (n >= 2) food.push("Isotonic drinks");
  }

  // ── MUSIC ──────────────────────────────────────────────────────────────
  const musicItems = music
    ? ["Guitar", "Chord sheets", "Bluetooth speaker", "Picks", "Spare strings", "Dymo label"]
    : [];

  // ── ASSEMBLE ───────────────────────────────────────────────────────────
  const categories = [
    { id: "toiletries", icon: "🧴", label: "Toiletries",         items: toiletries },
    { id: "ileo",       icon: "🏥", label: "Ileostomy Supplies", items: ileo       },
    ...(cpap.length   ? [{ id: "cpap",     icon: "😴", label: "CPAP",      items: cpap       }] : []),
    { id: "meds",       icon: "💊", label: "Medications",        items: meds       },
    ...(clothing.length ? [{ id: "clothing", icon: "👕", label: "Clothing", items: clothing   }] : []),
    { id: "outerwear",  icon: "🧥", label: "Outerwear",          items: outerwear  },
    { id: "tech",       icon: "🔌", label: "Tech & Charging",    items: tech       },
    { id: "bags",       icon: "🎒", label: "Bags & Essentials",  items: bags       },
    ...(docs.length   ? [{ id: "docs",     icon: "📄", label: "Documents",  items: docs       }] : []),
    { id: "food",       icon: "🍬", label: "Food & Drink",       items: food       },
    ...(musicItems.length ? [{ id: "music", icon: "🎸", label: "Music",     items: musicItems }] : []),
  ].filter(c => c.items.length > 0);

  return { categories, needsDetergent, clothingCount, travelDays, imodium, loperamide, isoGels, tshirts, shirts };
}

// ────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ────────────────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle, label }) {
  return (
    <div className="toggle-row" onClick={onToggle}>
      <div className={`toggle-track ${on ? "on" : ""}`}>
        <div className="toggle-thumb" />
      </div>
      <span className="toggle-label">{label}</span>
    </div>
  );
}

function CheckPill({ label, value, checked, onChange }) {
  return (
    <label className={`check-pill ${checked ? "active" : ""}`}>
      <input type="checkbox" checked={checked} onChange={() => onChange(value)} />
      {label}
    </label>
  );
}

function StyleSlider({ value, onChange }) {
  const pct = `${value}%`;
  return (
    <div className="style-slider-wrap">
      <div className="style-value">{styleLabel(value)}</div>
      <input
        type="range" min="0" max="100" step="5"
        value={value}
        style={{ "--fill": pct }}
        onChange={e => onChange(parseInt(e.target.value))}
      />
      <div className="style-labels">
        <span>👕 Casual</span>
        <span>Smart-casual</span>
        <span>Smart 👔</span>
      </div>
    </div>
  );
}

function Category({ cat, checkedItems, onToggle }) {
  const [collapsed, setCollapsed] = useState(false);
  const doneCount = cat.items.filter(i => checkedItems.has(`${cat.id}::${i}`)).length;

  return (
    <div className="category">
      <div className="category-header" onClick={() => setCollapsed(!collapsed)}>
        <div className="category-title">
          <span className="category-icon">{cat.icon}</span>
          {cat.label}
        </div>
        <span className={`cat-count ${doneCount === cat.items.length ? "done" : ""}`}>
          {doneCount}/{cat.items.length}
        </span>
      </div>
      {!collapsed && (
        <div className="items-list">
          {cat.items.map((item, i) => {
            const key       = `${cat.id}::${item}`;
            const isChecked = checkedItems.has(key);
            return (
              <div key={i} className={`item-row ${isChecked ? "checked" : ""}`} onClick={() => onToggle(key)}>
                <div className="item-checkbox">
                  {isChecked && <span className="check-mark">✓</span>}
                </div>
                <span className="item-name">{item}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ────────────────────────────────────────────────────────────────────────────

const DEFAULT_FORM = {
  tripName:        "",
  nights:          1,
  dayTrip:         false,
  destination:     "uk",
  season:          "mild",
  accommodation:   "hotel",
  tripType:        "holiday",
  activities:      [],
  lightToiletries: false,
  hasBeard:        false,
  wearsSuit:       false,
  bringMacBook:    false,
  smartness:       20,
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const [result, setResult]             = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [toast, setToast]               = useState(null);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const toggleActivity = (val) => setForm(f => ({
    ...f,
    activities: f.activities.includes(val)
      ? f.activities.filter(a => a !== val)
      : [...f.activities, val]
  }));

  // Load saved preferences on mount
  useState(() => {
    try {
      const saved = localStorage.getItem("packright-prefs");
      if (saved) {
        const prefs = JSON.parse(saved);
        setForm(f => ({ ...f, ...prefs, tripName: "" }));
      }
    } catch (_) {}
  }, []);

  const handleGenerate = async () => {
    setResult(generateList(form));
    setCheckedItems(new Set());
    setTimeout(() => document.querySelector(".results")?.scrollIntoView({ behavior: "smooth" }), 100);
    try {
      const { tripName, ...prefs } = form;
      localStorage.setItem("packright-prefs", JSON.stringify(prefs));
    } catch (_) {}
  };

  const toggleItem = (key) => setCheckedItems(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  const categories   = result?.categories || [];
  const totalItems   = categories.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress     = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;
  const n            = form.dayTrip ? 0 : (parseInt(form.nights) || 0);

  const copyList = () => {
    if (!categories.length) return;
    const header = form.tripName ? `${form.tripName} Packing List\n${"─".repeat(40)}\n\n` : "";
    const body   = categories.map(c =>
      `${c.label.toUpperCase()}\n${c.items.map(i => `• ${i}`).join("\n")}`
    ).join("\n\n");
    navigator.clipboard.writeText(header + body).then(() => {
      setToast("Copied to clipboard!");
      setTimeout(() => setToast(null), 2500);
    });
  };

  // One item per line, no bullets or headers — paste into Notes checklist mode
  const copyForNotes = () => {
    if (!categories.length) return;
    const lines = categories.flatMap(c => c.items);
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setToast("Copied for Notes — paste in checklist mode ✓");
      setTimeout(() => setToast(null), 3000);
    });
  };

  const destLabel = { uk: "UK", eu: "EU", intl: "International" }[form.destination] ?? "";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <h1>PackRight</h1>
          <span>Personal Packing Generator · Shane</span>
        </div>

        <div className="container">
          <div className="form-grid">

            <div className="form-group full">
              <label>Trip name (optional)</label>
              <input type="text" placeholder="e.g. London — Phantom of the Opera"
                value={form.tripName} onChange={e => update("tripName", e.target.value)} />
            </div>

            <div className="form-group">
              <label>Trip type</label>
              <select value={form.tripType} onChange={e => update("tripType", e.target.value)}>
                <option value="workday">Work</option>
                <option value="holiday">Holiday</option>
                <option value="visit">Family / friend visit</option>
              </select>
            </div>

            <div className="form-group">
              <label>Day trip</label>
              <Toggle on={form.dayTrip}
                onToggle={() => update("dayTrip", !form.dayTrip)}
                label={form.dayTrip ? "No overnight stay" : "Includes nights away"} />
            </div>

            {!form.dayTrip && (
              <div className="form-group">
                <label>Nights away</label>
                <input type="number" min="1" max="30"
                  value={form.nights} onChange={e => update("nights", e.target.value)} />
              </div>
            )}

            <div className="form-group">
              <label>Destination</label>
              <select value={form.destination} onChange={e => update("destination", e.target.value)}>
                <option value="uk">UK domestic</option>
                <option value="eu">Europe (EU)</option>
                <option value="intl">International (long haul)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Season / weather</label>
              <select value={form.season} onChange={e => update("season", e.target.value)}>
                <option value="summer">Summer / hot</option>
                <option value="mild">Spring / Autumn / mild</option>
                <option value="winter">Winter / cold</option>
                <option value="mixed">Mixed / unpredictable</option>
              </select>
            </div>

            {!form.dayTrip && (
              <div className="form-group">
                <label>Accommodation</label>
                <select value={form.accommodation} onChange={e => update("accommodation", e.target.value)}>
                  <option value="hotel">Hotel</option>
                  <option value="selfcatering">Self-catering / Airbnb</option>
                  <option value="family">Family / friends' home</option>
                  <option value="shared">Shared / hostel / group house</option>
                </select>
              </div>
            )}

            {/* Style slider — hidden for workday and day trips */}
            {form.tripType !== "workday" && !form.dayTrip && (
              <div className="form-group full">
                <label>Clothing style</label>
                <StyleSlider value={form.smartness} onChange={v => update("smartness", v)} />
              </div>
            )}

            {!form.dayTrip && (
              <div className="form-group">
                <label>Toiletry kit</label>
                <Toggle on={form.lightToiletries}
                  onToggle={() => update("lightToiletries", !form.lightToiletries)}
                  label={form.lightToiletries ? "Light kit (basics only)" : "Full kit"} />
              </div>
            )}

            <div className="form-group">
              <label>MacBook</label>
              <Toggle on={form.bringMacBook}
                onToggle={() => update("bringMacBook", !form.bringMacBook)}
                label={form.bringMacBook ? "Bringing MacBook" : "No MacBook"} />
            </div>

            <div className="form-group full">
              <label>Activities & special items</label>
              <div className="checkbox-grid">
                {[
                  ["swimming", "🏊 Swimming / beach"],
                  ["guitar",   "🎸 Guitar"],
                ].map(([val, lbl]) => (
                  <CheckPill key={val} label={lbl} value={val}
                    checked={form.activities.includes(val)} onChange={toggleActivity} />
                ))}
                {/* Suit pill */}
                <label className={`check-pill ${form.wearsSuit ? "active" : ""}`}>
                  <input type="checkbox" checked={form.wearsSuit}
                    onChange={() => update("wearsSuit", !form.wearsSuit)} />
                  🎩 Suit / formal event
                </label>
              </div>
            </div>

            <div className="form-group full">
              <label>Personal extras</label>
              <div className="checkbox-grid">
                <label className={`check-pill ${form.hasBeard ? "active" : ""}`}>
                  <input type="checkbox" checked={form.hasBeard}
                    onChange={() => update("hasBeard", !form.hasBeard)} />
                  🧔 Beard items
                </label>
              </div>
            </div>

          </div>

          <button className="generate-btn" onClick={handleGenerate}>
            ✈ Generate Packing List
          </button>

          {result && (
            <div className="results">
              <div className="results-header">
                <div>
                  <h2>{form.tripName || "Packing List"}</h2>
                  <div className="trip-badge">
                    {destLabel} · {form.dayTrip ? "Day trip" : `${n} night${n !== 1 ? "s" : ""}`} ·{" "}
                    {form.season.charAt(0).toUpperCase() + form.season.slice(1)}
                    {!form.dayTrip && form.tripType !== "workday" ? ` · ${styleLabel(form.smartness)}` : ""}
                    {" "}· {totalItems} items
                  </div>
                </div>
                <div className="results-actions">
                  <button className="action-btn" onClick={() => setCheckedItems(new Set())}>Reset</button>
                  <button className="action-btn" onClick={copyList}>Copy</button>
                  <button className="action-btn" onClick={copyForNotes}>Copy for Notes</button>
                </div>
              </div>

              {result.needsDetergent && (
                <div className="warning-badge">
                  ⚠ Trip is {result.travelDays} days but clothing caps at {result.clothingCount} — travel detergent added to Clothing.
                </div>
              )}

              <div className="progress-text">{checkedCount} / {totalItems} packed ({progress}%)</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="categories-grid">
                {categories.map(cat => (
                  <Category key={cat.id} cat={cat} checkedItems={checkedItems} onToggle={toggleItem} />
                ))}
              </div>

              <p className="note">
                📊 Quantities: Loperamide {result.loperamide} ({n+2} days × 12) ·
                Imodium {result.imodium} ({n+1} nights × 6) ·
                Isotonic gels {result.isoGels} (1/day) ·
                Tops: {result.tshirts > 0 ? `${result.tshirts} t-shirt${result.tshirts > 1 ? "s" : ""}` : ""}
                {result.tshirts > 0 && result.shirts > 0 ? " + " : ""}
                {result.shirts > 0 ? `${result.shirts} shirt${result.shirts > 1 ? "s" : ""}` : ""}
                {result.needsDetergent ? " · Travel detergent included" : ""}
              </p>
            </div>
          )}

        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
