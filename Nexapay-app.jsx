import { useState } from "react";

const categories = [
  { id: "games", label: "Game Top Up", icon: "🎮" },
  { id: "pulsa", label: "Pulsa & Data", icon: "📱" },
  { id: "ewallet", label: "E-Wallet", icon: "💳" },
  { id: "listrik", label: "Listrik & PLN", icon: "⚡" },
  { id: "streaming", label: "Streaming", icon: "🎬" },
  { id: "voucher", label: "Voucher", icon: "🎁" },
];

const products = {
  games: [
    { id: "ml", name: "Mobile Legends", img: "🗡️", color: "#1a6fd8", bg: "#0d1b3e" },
    { id: "ff", name: "Free Fire", img: "🔥", color: "#ff6a00", bg: "#1a0a00" },
    { id: "pubg", name: "PUBG Mobile", img: "🪖", color: "#f5c518", bg: "#1a1500" },
    { id: "genshin", name: "Genshin Impact", img: "⚔️", color: "#7ecfff", bg: "#051a2e" },
    { id: "valorant", name: "Valorant", img: "🎯", color: "#ff4655", bg: "#1a0508" },
    { id: "cod", name: "Call of Duty", img: "💣", color: "#78c832", bg: "#0a1a00" },
  ],
  pulsa: [
    { id: "telkomsel", name: "Telkomsel", img: "📶", color: "#e4032e", bg: "#1a0005" },
    { id: "xl", name: "XL Axiata", img: "📡", color: "#0066cc", bg: "#000d1a" },
    { id: "indosat", name: "Indosat Ooredoo", img: "🌐", color: "#ffb300", bg: "#1a1000" },
    { id: "tri", name: "Tri (3)", img: "3️⃣", color: "#00c896", bg: "#001a12" },
  ],
  ewallet: [
    { id: "gopay", name: "GoPay", img: "💚", color: "#00aa5b", bg: "#001a0d" },
    { id: "ovo", name: "OVO", img: "💜", color: "#9b59b6", bg: "#0d0014" },
    { id: "dana", name: "DANA", img: "💙", color: "#118eea", bg: "#001220" },
    { id: "shopee", name: "ShopeePay", img: "🧡", color: "#ee4d2d", bg: "#1a0700" },
  ],
  listrik: [
    { id: "pln", name: "PLN Prabayar", img: "⚡", color: "#f5c518", bg: "#1a1500" },
    { id: "pdam", name: "PDAM Air", img: "💧", color: "#4fc3f7", bg: "#001520" },
  ],
  streaming: [
    { id: "netflix", name: "Netflix", img: "🎬", color: "#e50914", bg: "#1a0001" },
    { id: "spotify", name: "Spotify", img: "🎵", color: "#1db954", bg: "#001a0a" },
    { id: "youtube", name: "YouTube Premium", img: "▶️", color: "#ff0000", bg: "#1a0000" },
    { id: "disney", name: "Disney+", img: "✨", color: "#1139c9", bg: "#00041a" },
  ],
  voucher: [
    { id: "google", name: "Google Play", img: "🎮", color: "#4285f4", bg: "#00051a" },
    { id: "apple", name: "App Store", img: "🍎", color: "#a8b2bd", bg: "#0a0d10" },
    { id: "steam", name: "Steam Wallet", img: "🕹️", color: "#66c0f4", bg: "#001020" },
  ],
};

const denominations = {
  ml: [
    { label: "86 Diamonds", price: 19000, bonus: "" },
    { label: "172 Diamonds", price: 38000, bonus: "" },
    { label: "257 Diamonds", price: 56000, bonus: "+5 bonus" },
    { label: "344 Diamonds", price: 75000, bonus: "+5 bonus" },
    { label: "514 Diamonds", price: 112000, bonus: "+10 bonus" },
    { label: "1050 Diamonds", price: 220000, bonus: "+15 bonus", popular: true },
    { label: "2195 Diamonds", price: 440000, bonus: "+20 bonus" },
    { label: "Weekly Pass", price: 29000, bonus: "7 hari" },
  ],
  ff: [
    { label: "100 Diamonds", price: 15000 },
    { label: "310 Diamonds", price: 45000, popular: true },
    { label: "520 Diamonds", price: 75000, bonus: "+15" },
    { label: "1060 Diamonds", price: 149000, bonus: "+30" },
    { label: "2180 Diamonds", price: 299000, bonus: "+55" },
  ],
  default: [
    { label: "Rp 10.000", price: 10000 },
    { label: "Rp 20.000", price: 20000, popular: true },
    { label: "Rp 50.000", price: 50000, bonus: "Bonus 5%" },
    { label: "Rp 100.000", price: 100000, bonus: "Bonus 10%" },
    { label: "Rp 200.000", price: 200000, bonus: "Bonus 15%" },
    { label: "Rp 500.000", price: 500000, bonus: "Bonus 20%" },
  ],
};

const formatRupiah = (n) =>
  "Rp " + n.toLocaleString("id-ID");

export default function TopUpApp() {
  const [activeCategory, setActiveCategory] = useState("games");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDenom, setSelectedDenom] = useState(null);
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("home"); // home | product | denom | confirm | success
  const [payMethod, setPayMethod] = useState("gopay");
  const [loading, setLoading] = useState(false);

  const items = products[activeCategory] || [];
  const denoms = selectedProduct
    ? denominations[selectedProduct.id] || denominations.default
    : [];

  const handleSelectProduct = (p) => {
    setSelectedProduct(p);
    setSelectedDenom(null);
    setUserId("");
    setStep("product");
  };

  const handleBack = () => {
    if (step === "success") { setStep("home"); setSelectedProduct(null); return; }
    if (step === "confirm") { setStep("denom"); return; }
    if (step === "denom") { setStep("product"); return; }
    if (step === "product") { setStep("home"); setSelectedProduct(null); return; }
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  const payMethods = [
    { id: "gopay", label: "GoPay", icon: "💚" },
    { id: "ovo", label: "OVO", icon: "💜" },
    { id: "dana", label: "DANA", icon: "💙" },
    { id: "qris", label: "QRIS", icon: "📲" },
    { id: "bca", label: "BCA Transfer", icon: "🏦" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c14",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      color: "#e8eaf0",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        .cat-btn { transition: all 0.2s ease; }
        .cat-btn:hover { transform: translateY(-2px); }
        .card { transition: all 0.2s ease; cursor: pointer; }
        .card:hover { transform: translateY(-3px) scale(1.02); }
        .denom-card { transition: all 0.15s ease; cursor: pointer; }
        .denom-card:hover { transform: scale(1.02); }
        .pay-btn { transition: all 0.15s; cursor: pointer; border: none; }
        .pay-btn:hover { filter: brightness(1.1); transform: scale(1.01); }
        .pay-btn:active { transform: scale(0.98); }
        .pulse { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .slide-in { animation: slideIn 0.3s ease; }
        @keyframes slideIn { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input { outline: none; }
        input:focus { border-color: #5c8dff !important; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1629 0%, #111827 100%)",
        padding: "20px 20px 16px",
        borderBottom: "1px solid #1e2840",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {step !== "home" && (
            <button onClick={handleBack} style={{
              background: "#1e2840", border: "none", color: "#a0b0cc",
              width: 36, height: 36, borderRadius: 10, cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>←</button>
          )}
          <div style={{ flex: 1 }}>
            {step === "home" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>⚡</span>
                  <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px",
                    background: "linear-gradient(90deg, #5c8dff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    NexaPay
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#6b7a99", marginTop: 2 }}>
                  Top Up Cepat & Terpercaya
                </div>
              </>
            )}
            {step !== "home" && (
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {step === "product" && selectedProduct?.name}
                {step === "denom" && "Pilih Nominal"}
                {step === "confirm" && "Konfirmasi Pembayaran"}
                {step === "success" && "Transaksi Berhasil"}
              </div>
            )}
          </div>
          {step === "home" && (
            <div style={{ background: "#1e2840", borderRadius: 10, padding: "6px 12px",
              fontSize: 12, color: "#6b7a99", display: "flex", gap: 6, alignItems: "center" }}>
              <span>🔔</span>
            </div>
          )}
        </div>
      </div>

      {/* HOME */}
      {step === "home" && (
        <div className="fade-in">
          {/* Banner */}
          <div style={{ margin: 16, borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(135deg, #1a2a5e 0%, #0d1629 60%, #1a1040 100%)",
            padding: 20, position: "relative", border: "1px solid #2a3860" }}>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
              🎉 Promo Hari Ini
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>
              Cashback 10%<br/>untuk semua top up game
            </div>
            <div style={{ fontSize: 12, color: "#6b7a99", marginBottom: 14 }}>
              Berlaku s/d 30 Juni 2026 • Min. transaksi Rp 50.000
            </div>
            <div style={{ display: "inline-block", background: "linear-gradient(90deg, #5c8dff, #a78bfa)",
              borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Klaim Sekarang →
            </div>
            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              fontSize: 60, opacity: 0.15 }}>🎮</div>
          </div>

          {/* Promo pills */}
          <div style={{ display: "flex", gap: 8, padding: "0 16px 16px", overflowX: "auto" }}>
            {["Flash Sale 50%", "Gratis Admin", "Bonus +15%", "24/7 Proses"].map((t) => (
              <div key={t} style={{ whiteSpace: "nowrap", background: "#1e2840", border: "1px solid #2a3860",
                borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#a0b0cc", flexShrink: 0 }}>
                ✦ {t}
              </div>
            ))}
          </div>

          {/* Categories */}
          <div style={{ padding: "0 16px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6b7a99", letterSpacing: "0.5px",
              textTransform: "uppercase", marginBottom: 12 }}>Kategori</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {categories.map((c) => (
                <button key={c.id} className="cat-btn" onClick={() => setActiveCategory(c.id)}
                  style={{
                    background: activeCategory === c.id
                      ? "linear-gradient(135deg, #1a3a8f, #2a1a6e)"
                      : "#111827",
                    border: activeCategory === c.id ? "1.5px solid #5c8dff" : "1.5px solid #1e2840",
                    borderRadius: 14, padding: "12px 8px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    color: activeCategory === c.id ? "#fff" : "#6b7a99",
                  }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div style={{ padding: "0 16px 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6b7a99", letterSpacing: "0.5px",
              textTransform: "uppercase", marginBottom: 12 }}>
              {categories.find(c => c.id === activeCategory)?.label}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {items.map((p) => (
                <div key={p.id} className="card" onClick={() => handleSelectProduct(p)}
                  style={{
                    background: `linear-gradient(135deg, ${p.bg} 0%, #0d1629 100%)`,
                    border: `1.5px solid ${p.color}22`,
                    borderRadius: 14, padding: 16,
                    display: "flex", flexDirection: "column", gap: 10,
                  }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 28 }}>{p.img}</span>
                    <div style={{ background: `${p.color}22`, borderRadius: 20, padding: "2px 8px",
                      fontSize: 10, color: p.color, fontWeight: 600 }}>TOP UP</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7a99", marginTop: 2 }}>Proses instan ⚡</div>
                  </div>
                  <div style={{ background: `${p.color}15`, borderRadius: 8, padding: "5px 10px",
                    fontSize: 11, color: p.color, fontWeight: 600, textAlign: "center" }}>
                    Pilih Nominal →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ margin: "0 16px 24px", background: "#111827", borderRadius: 16,
            border: "1px solid #1e2840", padding: 16, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {[
              { val: "2.4 Juta+", label: "Transaksi" },
              { val: "< 1 Menit", label: "Proses" },
              { val: "4.9 ⭐", label: "Rating" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#5c8dff" }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#6b7a99", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL - Input User ID */}
      {step === "product" && selectedProduct && (
        <div className="slide-in" style={{ padding: 16 }}>
          {/* Product hero */}
          <div style={{
            background: `linear-gradient(135deg, ${selectedProduct.bg} 0%, #0d1629 100%)`,
            border: `1.5px solid ${selectedProduct.color}33`,
            borderRadius: 18, padding: 20, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ fontSize: 52 }}>{selectedProduct.img}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedProduct.name}</div>
              <div style={{ fontSize: 12, color: "#6b7a99", marginTop: 4 }}>Server Asia • Proses Instan</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {["⚡ Instan", "✅ Terpercaya", "🔒 Aman"].map(t => (
                  <div key={t} style={{ background: `${selectedProduct.color}15`, color: selectedProduct.color,
                    borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Input form */}
          <div style={{ background: "#111827", border: "1px solid #1e2840", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>📋 Masukkan Data Akun</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "#6b7a99", fontWeight: 600, display: "block", marginBottom: 6 }}>
                USER ID *
              </label>
              <input value={userId} onChange={e => setUserId(e.target.value)}
                placeholder="Contoh: 123456789"
                style={{
                  width: "100%", background: "#0d1629", border: "1.5px solid #1e2840",
                  borderRadius: 10, padding: "10px 14px", color: "#e8eaf0", fontSize: 14,
                  transition: "border-color 0.2s",
                }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#6b7a99", fontWeight: 600, display: "block", marginBottom: 6 }}>
                SERVER (Opsional)
              </label>
              <input placeholder="Contoh: ID / SEA"
                style={{
                  width: "100%", background: "#0d1629", border: "1.5px solid #1e2840",
                  borderRadius: 10, padding: "10px 14px", color: "#e8eaf0", fontSize: 14,
                }} />
            </div>
          </div>

          <button
            disabled={!userId}
            onClick={() => setStep("denom")}
            style={{
              width: "100%", padding: "14px",
              background: userId
                ? `linear-gradient(90deg, ${selectedProduct.color}, #a78bfa)`
                : "#1e2840",
              border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15,
              color: userId ? "#fff" : "#6b7a99",
              cursor: userId ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}>
            Lanjut Pilih Nominal →
          </button>
        </div>
      )}

      {/* DENOMINATION */}
      {step === "denom" && (
        <div className="slide-in" style={{ padding: 16 }}>
          <div style={{ background: "#111827", border: "1px solid #1e2840", borderRadius: 12,
            padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{selectedProduct?.img}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedProduct?.name}</div>
              <div style={{ fontSize: 11, color: "#6b7a99" }}>ID: {userId}</div>
            </div>
          </div>

          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Pilih Nominal
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 }}>
            {denoms.map((d, i) => (
              <div key={i} className="denom-card" onClick={() => setSelectedDenom(d)}
                style={{
                  background: selectedDenom === d
                    ? "linear-gradient(135deg, #1a3a8f, #2a1a6e)"
                    : "#111827",
                  border: selectedDenom === d ? "2px solid #5c8dff" : "1.5px solid #1e2840",
                  borderRadius: 14, padding: 14, position: "relative",
                }}>
                {d.popular && (
                  <div style={{ position: "absolute", top: -8, right: 10,
                    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                    borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: "#fff" }}>
                    🔥 TERLARIS
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{d.label}</div>
                {d.bonus && <div style={{ fontSize: 10, color: "#a78bfa", marginBottom: 6 }}>+{d.bonus}</div>}
                <div style={{ fontWeight: 800, fontSize: 15, color: selectedDenom === d ? "#5c8dff" : "#e8eaf0" }}>
                  {formatRupiah(d.price)}
                </div>
              </div>
            ))}
          </div>

          <button disabled={!selectedDenom} onClick={() => setStep("confirm")}
            style={{
              width: "100%", padding: 14,
              background: selectedDenom ? "linear-gradient(90deg, #5c8dff, #a78bfa)" : "#1e2840",
              border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15,
              color: selectedDenom ? "#fff" : "#6b7a99",
              cursor: selectedDenom ? "pointer" : "not-allowed",
            }}>
            {selectedDenom ? `Bayar ${formatRupiah(selectedDenom.price)} →` : "Pilih Nominal Dulu"}
          </button>
        </div>
      )}

      {/* CONFIRM */}
      {step === "confirm" && (
        <div className="slide-in" style={{ padding: 16 }}>
          {/* Order summary */}
          <div style={{ background: "#111827", border: "1px solid #1e2840", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14, color: "#a0b0cc", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Ringkasan Pesanan
            </div>
            {[
              { label: "Produk", val: selectedProduct?.name },
              { label: "Item", val: selectedDenom?.label },
              { label: "User ID", val: userId },
              { label: "Harga", val: formatRupiah(selectedDenom?.price) },
              { label: "Admin", val: "Gratis 🎉" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10,
                fontSize: 13, paddingBottom: 10, borderBottom: "1px solid #1e2840" }}>
                <span style={{ color: "#6b7a99" }}>{r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800,
              color: "#5c8dff", marginTop: 4 }}>
              <span>Total</span>
              <span>{formatRupiah(selectedDenom?.price)}</span>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ background: "#111827", border: "1px solid #1e2840", borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14, color: "#a0b0cc", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Metode Pembayaran
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {payMethods.map(pm => (
                <div key={pm.id} onClick={() => setPayMethod(pm.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                    background: payMethod === pm.id ? "#1a2a5e" : "#0d1629",
                    border: payMethod === pm.id ? "1.5px solid #5c8dff" : "1.5px solid #1e2840",
                    borderRadius: 12, cursor: "pointer", transition: "all 0.15s",
                  }}>
                  <span style={{ fontSize: 20 }}>{pm.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{pm.label}</span>
                  {payMethod === pm.id && (
                    <div style={{ width: 18, height: 18, borderRadius: "50%",
                      background: "linear-gradient(135deg, #5c8dff, #a78bfa)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#fff" }}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button onClick={handlePay} disabled={loading}
            style={{
              width: "100%", padding: 16,
              background: loading ? "#1e2840" : "linear-gradient(90deg, #5c8dff, #a78bfa)",
              border: "none", borderRadius: 14, fontWeight: 700, fontSize: 16, color: "#fff", cursor: "pointer",
            }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span className="spin" style={{ display: "inline-block", width: 18, height: 18,
                  border: "2px solid #fff4", borderTopColor: "#fff", borderRadius: "50%" }} />
                Memproses...
              </span>
            ) : `Bayar ${formatRupiah(selectedDenom?.price)}`}
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {step === "success" && (
        <div className="fade-in" style={{ padding: 24, textAlign: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>✅</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8,
              background: "linear-gradient(90deg, #5c8dff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Transaksi Berhasil!
            </div>
            <div style={{ color: "#6b7a99", fontSize: 14 }}>
              Top up kamu sedang diproses dan akan diterima dalam hitungan detik.
            </div>
          </div>

          <div style={{ background: "#111827", border: "1px solid #1e2840", borderRadius: 18, padding: 20, marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#a0b0cc", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
              Detail Transaksi
            </div>
            {[
              { label: "No. Transaksi", val: "#NXP" + Math.random().toString(36).substr(2,8).toUpperCase() },
              { label: "Produk", val: selectedProduct?.name },
              { label: "Nominal", val: selectedDenom?.label },
              { label: "User ID", val: userId },
              { label: "Total Bayar", val: formatRupiah(selectedDenom?.price) },
              { label: "Status", val: "✅ Sukses" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #1e2840", fontSize: 13 }}>
                <span style={{ color: "#6b7a99" }}>{r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </div>

          <button onClick={() => { setStep("home"); setSelectedProduct(null); setSelectedDenom(null); setUserId(""); }}
            style={{
              width: "100%", padding: 14,
              background: "linear-gradient(90deg, #5c8dff, #a78bfa)",
              border: "none", borderRadius: 14, fontWeight: 700, fontSize: 15, color: "#fff", cursor: "pointer",
            }}>
            Kembali ke Beranda
          </button>
          <div style={{ marginTop: 12, fontSize: 12, color: "#6b7a99" }}>
            Simpan bukti transaksi ini untuk klaim promo berikutnya 🎁
          </div>
        </div>
      )}

      {/* Bottom nav (home only) */}
      {step === "home" && (
        <div style={{
          position: "sticky", bottom: 0,
          background: "#0d1629", borderTop: "1px solid #1e2840",
          display: "flex", justifyContent: "space-around", padding: "10px 0 14px",
        }}>
          {[["🏠","Beranda"], ["📦","Riwayat"], ["💬","Bantuan"], ["👤","Akun"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              cursor: "pointer", color: label === "Beranda" ? "#5c8dff" : "#6b7a99", fontSize: 10, fontWeight: 600 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
