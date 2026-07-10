import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Ryuki Sato",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <header>
        <div className="container header-inner">
          <div className="logo">
            <Link href="/">RS.</Link>
          </div>
        </div>
      </header>

      <main className="policy-container">
        <h1>プライバシーポリシー</h1>
        <p>
          Ryuki Sato（以下、「当方」）は、当方の提供するWebサイト（以下、「本サイト」）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」）を定めます。
        </p>

        <h2>1. アクセス解析ツールについて</h2>
        <p>本サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
        <p>
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>

        <h2>2. お問い合わせ窓口</h2>
        <p>本ポリシーに関するお問い合わせは、以下のメールアドレスまでお願いいたします。</p>
        <p>Email: ryu727tmm19@gmail.com</p>

        <div className="policy-back">
          <Link href="/">トップページに戻る</Link>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ryuki Sato. Made with Smile</p>
        </div>
      </footer>
    </>
  );
}
