import TiltCard from "../fx/TiltCard";

const philosophies = [
  {
    icon: "fas fa-universal-access",
    title: "Universal UI",
    text: "年齢・性別関係なく使える直感的なデザイン",
  },
  {
    icon: "far fa-smile-beam",
    title: "Fun Experience",
    text: "使うこと自体が楽しくなる体験の追求",
  },
  {
    icon: "fas fa-link",
    title: "Connect Real",
    text: "NFC/RFIDでリアルとデジタルを繋ぐ",
  },
];

export default function About() {
  return (
    <section id="about" className="container">
      <h2 className="section-title" data-scroll>
        About Me
      </h2>
      <div className="about-content fade-in-up">
        <div className="about-text" data-scroll>
          <h3>佐藤 琉輝 / Ryuki Sato</h3>
          <p>
            ITの力でもっと多くの人を笑顔にしたい。そんな思いで開発を続けています。
            特にNFC（近距離無線通信）やRFIDといった、実世界とデジタルをつなぐ技術に魅力を感じています。
          </p>
          <p>
            目指しているのは、説明書がいらないほど分かりやすく、触っていて楽しくなるようなUI。
            子供からお年寄りまで、すべての人がデジタルの恩恵を受けられる世界を作ることが私のミッションです。
          </p>
        </div>
        <div className="about-philosophy">
          <div className="philosophy-grid">
            {philosophies.map((p) => (
              <TiltCard key={p.title} className="philosophy-card">
                <div className="philosophy-icon">
                  <i className={p.icon} aria-hidden="true"></i>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
