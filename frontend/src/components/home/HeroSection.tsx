import { Button } from 'antd';

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD04IpRjZnl-tlAdd2gNMpVEmntzZ_PteOA5rsawn7psKjKYrX0HvQ2hnYMUq0CnCTkSPgyHuLf9rrUlkf6Bs5Mb1o1JvJR9W2ZucOhgGzk0JExORPkGYp0ETkmFTESUbnx_MH2NJDW_FQVDXcBvLwFblI-iNHYgQvG9np-oQdfATu7kUUBN4HjZyjAXAUQxCI9iqmGCs3TG5yOpbH84r3_is_793sXpTYq9_mSoL1zMRc_D8jvTHrf_agr9KGUGPIEze9hRljVJ1UV';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <img
          className="hero-image"
          src={HERO_IMAGE}
          alt="Quarto minimalista com almofadas em tons neutros"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">Coleção Premium</span>
            <h1 className="hero-title">
              Seu Conforto,<br />Curado.
            </h1>
            <p className="hero-subtitle">
              Descubra a interseção entre precisão arquitetônica e suavidade tátil
              com nossa coleção exclusiva de almofadas.
            </p>
            <Button
              type="primary"
              size="large"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                height: 56,
                paddingInline: 40,
                fontSize: '1rem',
                boxShadow: '0 10px 30px rgba(108, 91, 77, 0.2)',
              }}
            >
              Explorar Coleções
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
