import Image from "next/image";

const works = [
  {
    title: "Digital Live Adventure",
    image: "/img/digilive.png",
    description: [
      "デジタルと現実を融合させ、体を動かしながら遊べる体験型ゲーム。",
      "全身を使ったアクションで、バーチャルな世界を冒険する新しいエンターテインメントです。",
    ],
    tags: ["JavaScript", "Node.js", "HTML5/CSS3"],
    href: "https://github.com/ryuki0616/digilive",
    reverse: false,
  },
  {
    title: "Log Check AI",
    image: "/img/log_chek_AI.png",
    description: [
      "システムログの自動チェックと異常検知を行うAIツール。",
      "セキュリティと運用効率の向上を目指し、安心・安全なデジタル環境をサポートします。",
    ],
    tags: ["Python", "AI", "Security"],
    href: "https://github.com/ryuki0616/log_checAI",
    reverse: true,
  },
  {
    title: "AI & Machine Learning",
    image: "/img/DayBreak.png",
    description: [
      "1日の始まりに必要な情報を一目で確認できるスマートダッシュボード。",
      "ニュース、天気、気温、日付などを瞬時に集約し、快適な一日のスタートをサポートします。",
    ],
    tags: ["Python", "Machine Learning", "Research"],
    href: "https://github.com/ryuki0616/ai_machine_learning",
    reverse: false,
  },
];

export default function Works() {
  return (
    <section id="works" className="container">
      <h2 className="section-title" data-scroll>
        Selected Works
      </h2>
      <div className="work-list">
        {works.map((work) => (
          <div
            key={work.title}
            className={`work-item${work.reverse ? " reverse" : ""} fade-in-up`}
            data-scroll
          >
            <div className="work-image" data-hover>
              <Image
                src={work.image}
                alt={work.title}
                width={2752}
                height={1536}
                className="work-image-media"
                loading="lazy"
              />
            </div>
            <div className="work-info">
              <h3>{work.title}</h3>
              <p>
                {work.description[0]}
                <br />
                {work.description[1]}
              </p>
              <div className="tech-tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
              >
                View GitHub <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
