import Magnetic from "../fx/Magnetic";

export default function Contact() {
  return (
    <section id="contact" className="contact fade-in-up" data-scroll>
      <h2>Get in Touch</h2>
      <p>ITで笑顔を作るプロジェクト、一緒に始めませんか？</p>
      <div className="contact-actions">
        <Magnetic>
          <a href="mailto:ryu727tmm19@gmail.com" className="btn-contact" data-hover>
            <i className="far fa-envelope" aria-hidden="true"></i> Email
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="https://x.com/kyarameru_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact btn-contact-light"
            data-hover
          >
            <i className="fab fa-x-twitter" aria-hidden="true"></i> X (Twitter)
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="https://github.com/ryuki0616"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contact btn-contact-dark"
            data-hover
          >
            <i className="fab fa-github" aria-hidden="true"></i> GitHub
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
