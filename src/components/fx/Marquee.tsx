const DEFAULT_ITEMS = [
  "IT for Smiles",
  "Universal UI",
  "NFC / RFID",
  "Flutter",
  "Python",
  "Fun Experience",
];

function Track({ items }: { items: string[] }) {
  return (
    <div className="marquee-track">
      {items.map((item, i) => (
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
export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <Track items={items} />
      <Track items={items} />
    </div>
  );
}
