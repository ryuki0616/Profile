import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; 2025 Ryuki Sato. Made with Smile <i className="fas fa-smile"></i>
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
