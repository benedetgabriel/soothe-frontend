import { Outlet } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import '../components/home/home.css';

export default function StoreLayout() {
  return (
    <>
      {/* Navbar */}
      <nav className="store-navbar">
        <div className="store-navbar-inner">
          <div className="store-navbar-logo">Soothe</div>

          <div className="store-navbar-links">
            <a className="store-navbar-link active" href="#">Loja</a>
            <a className="store-navbar-link" href="#">Coleções</a>
            <a className="store-navbar-link" href="#">Mais Vendidos</a>
            <a className="store-navbar-link" href="#">Sobre</a>
          </div>

          <div className="store-navbar-icons">
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <span className="material-symbols-outlined">person</span>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ paddingTop: 96 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="store-footer">
        <div className="store-footer-grid">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={8}>
              <div className="store-footer-brand">Soothe Sanctuary</div>
              <p className="store-footer-description">
                Criando espaços intencionais através da arte do conforto e texturas selecionadas.
              </p>
              <div className="store-footer-social">
                <div className="store-footer-social-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>public</span>
                </div>
                <div className="store-footer-social-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>share</span>
                </div>
              </div>
            </Col>

            <Col xs={12} md={5}>
              <div className="store-footer-heading">Loja</div>
              <a className="store-footer-link" href="#">Novidades</a>
              <a className="store-footer-link" href="#">Mais Vendidos</a>
              <a className="store-footer-link" href="#">Cartões Presente</a>
            </Col>

            <Col xs={12} md={5}>
              <div className="store-footer-heading">Atendimento</div>
              <a className="store-footer-link" href="#">Política de Envio</a>
              <a className="store-footer-link" href="#">Trocas e Devoluções</a>
              <a className="store-footer-link" href="#">Fale Conosco</a>
            </Col>

            <Col xs={24} md={6}>
              <div className="store-footer-heading">Newsletter</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', lineHeight: 1.7, marginBottom: 24 }}>
                Cadastre-se e ganhe 10% de desconto na sua primeira compra.
              </p>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder="Email"
                  style={{ paddingRight: 48 }}
                />
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="store-footer-bottom">
          © 2026 Soothe Sanctuary. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
