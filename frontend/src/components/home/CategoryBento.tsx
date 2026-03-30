import { Row, Col } from 'antd';

const IMAGES = {
  silk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyKNZEu043rsV6RG18ZwZG1rOfvwMSN69OZLS-YQAO_QFaY7vNYmLhzojiW2n9B8_8l1QXMlIgY4CiMwigGjNEgghznqqxJikTF79e2dD5KPRA1_35uZ44a8pxTIIK-UYN3ppRjmnbTtGZs8IxgcBzNUNj0HmKnt0c1yqRutU-sgpUB66V2OZOidaSJYthwzXMscdatl8vGfULFXTFzz2_7aYu12b98KFJS-v6Fc36_LeS3wyF3vlxtyul47cLd_A2xtAcG3GqWOXF',
  velvet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsi3TG6q9N4iv_2SNS39LERO1FB0d0sb1pwecc9uBDxnjg01EyXtAesFhTuIhsDwowkqTOACxN9zTnmnzlTqzGX8fRFDZBT1xlWVdhmmIQqSfQlA1kIAitvXqotCkCOqiMFNEbgCpSWbqIchYa5kKq3v9lOeLb88OHOYPSQf2MfpAWlx-aFGWLbnNqVKrLJhyHWitl9Ffzz4buCooVPBtZZ_u-hE3JPoPFeGPHTXi938YZtQq6fFfMY2adlEOo2CVe3ecqcF1Hv4Gd',
  sleeping: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgBj4yCk69InpduMOFBt9QgROq7vwjD6GEAVkSpM0Gk2yyIcmVoVr_TlD7sOOVtyy9kahfnapbWZlsusaD5GBL-6HUUsmz7FbLJi5EuZ3kMdekQCxPh9ozIZLqQk9C0YNOM_HBAgeYdsUanE3tUHmS3rm62h-CGQo19EqJ9l_l3WojtNRRa3CeQgPiE8LUByokxDSLo_cN3Z5bdvpaMprQ199NQ-om_mtXOJIOUA5njoYRd8cDJYOEkO60_vRSZ0tgnwLytDqmH6x',
};

export default function CategoryBento() {
  return (
    <section style={{ padding: '48px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        {/* Silk — 8 columns */}
        <Col xs={24} md={16}>
          <div className="bento-card bento-card-tall">
            <img src={IMAGES.silk} alt="Fronha de seda em tom creme" />
            <div className="bento-card-overlay" />
            <div className="bento-card-text">
              <h3 style={{ fontSize: '2.25rem' }}>Almofadas de Seda</h3>
              <p style={{ fontSize: '1.1rem' }}>Elegância refrescante e hipoalergênica.</p>
            </div>
          </div>
        </Col>

        {/* Velvet — 4 columns */}
        <Col xs={24} md={8}>
          <div className="bento-card bento-card-tall">
            <img src={IMAGES.velvet} alt="Almofadas de veludo em tons terrosos" />
            <div className="bento-card-overlay" />
            <div className="bento-card-text">
              <h3 style={{ fontSize: '1.75rem' }}>Almofadas de Veludo</h3>
              <p style={{ fontSize: '0.875rem' }}>Texturas profundas para espaços acolhedores.</p>
            </div>
          </div>
        </Col>

        {/* Sleeping Essentials — full width */}
        <Col span={24}>
          <div className="bento-card bento-card-wide">
            <img src={IMAGES.sleeping} alt="Quarto moderno com travesseiros brancos" />
            <div className="bento-card-overlay" style={{ background: 'rgba(0,0,0,0.05)' }} />
            <div className="bento-card-text-center">
              <h3 style={{ fontSize: '2.75rem', marginBottom: 16 }}>Essenciais para Dormir</h3>
              <div className="bento-divider" />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
