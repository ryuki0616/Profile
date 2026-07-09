"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const works = [
  {
    title: "Claude Kyarameru Toolbox",
    image: "/img/claude-kyarameru-toolbox.png",
    description: [
      "Claude Code を活用した開発を支援するツールボックス。",
      "エージェントやスキル、権限設定などをまとめ、作業を効率化するための構成をリポジトリで管理しています。",
    ],
    tags: ["Claude Code", "Agents", "Automation"],
    href: "https://github.com/kyarameru1005/claude-kyarameru-toolbox",
    reverse: false,
  },
  {
    title: "Codex Kyarameru Toolbox",
    image: "/img/codex-kyarameru-toolbox.png",
    description: [
      "Codex を活用した開発を支援するツールボックス。",
      "設定やワークフローを整理し、コーディング作業をより快適に進めるための構成をリポジトリで管理しています。",
    ],
    tags: ["Codex", "Workflow", "Automation"],
    href: "https://github.com/kyarameru1005/codex-kyarameru-toolbox",
    reverse: true,
  },
  {
    title: "DayBreak",
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? works[activeIndex] : null;

  // モーダル表示中は ESC で閉じ、背面スクロールを止める
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="works" className="container">
      <h2 className="section-title" data-scroll>
        Selected Works
      </h2>
      <div className="work-list">
        {works.map((work, i) => (
          <div
            key={work.title}
            className={`work-item${work.reverse ? " reverse" : ""} fade-in-up`}
            data-scroll
          >
            <button
              type="button"
              className="work-image"
              data-hover
              data-cursor="VIEW"
              onClick={() => setActiveIndex(i)}
              aria-label={`${work.title} の詳細を見る`}
            >
              <Image
                src={work.image}
                alt={work.title}
                width={2752}
                height={1536}
                className="work-image-media"
                loading="lazy"
              />
            </button>
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
              <button
                type="button"
                className="work-detail-link"
                data-hover
                onClick={() => setActiveIndex(i)}
              >
                詳細を見る <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="work-modal-overlay"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div className="work-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="work-modal-close"
              onClick={() => setActiveIndex(null)}
              aria-label="閉じる"
              data-hover
            >
              ×
            </button>
            <div className="work-modal-image">
              <Image
                src={active.image}
                alt={active.title}
                width={2752}
                height={1536}
                className="work-modal-media"
              />
            </div>
            <div className="work-modal-body">
              <h3>{active.title}</h3>
              <p>
                {active.description[0]}
                <br />
                {active.description[1]}
              </p>
              <div className="tech-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-hover
                data-cursor="OPEN"
              >
                View GitHub{" "}
                <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
