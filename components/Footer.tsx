import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <p>
          &copy; {year} Ryuki Sato. Made with Smile{" "}
          <i className="fas fa-smile" aria-hidden="true"></i>
        </p>
        <p className="footer-meta">
          <Link href="/privacy/" className="footer-link">
            プライバシーポリシー
          </Link>
        </p>
      </div>
    </footer>
  );
}
