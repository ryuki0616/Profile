const ITEMS = [
  "IT for Smiles",
  "Universal UI",
  "NFC / RFID",
  "Flutter",
  "Python",
  "Fun Experience",
];

function Track() {
  return (
    <div className="marquee-track">
      {ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item">
          {item}
          <span className="marquee-star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

// 横に流れる帯（装飾）。動きを出すためのマーキー。
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Track />
      <Track />
    </div>
  );
}
