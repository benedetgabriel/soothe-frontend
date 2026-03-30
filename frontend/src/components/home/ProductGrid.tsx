import { Row, Col, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const PRODUCTS = [
  {
    name: 'Almofada Cloud Tufted',
    variant: 'Veludo Marfim / 45cm',
    price: 'R$ 189,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6w1P6Uzv3pNWCPQX0IVyOZzzAu1CgzwU8qiMA0eIGMXANvLgMUPoAKSkOhHHn3sQHVmYOXYj6o_hsy7LjCXDrJ3VeY2jtUSaPQaxfaKKB6alvxFU40E-7SsGA88_NVmbib6WCBXnKJjWE3rSNBQNsuY5eboopqbrlfx8LM5E_LZtVIUSoAOTVnbsye76ElxUE-d1wNc7_966J4MrFs9s1pK6UXvTv40oPmE3Pbra0MlFn7S8vU7ctU8LybWoIdD1JdGdk61AS9BR3',
    alt: 'Almofada redonda marfim com tufos',
  },
  {
    name: 'Kit Luxo Seda Dream',
    variant: 'Cinza Ardósia / Par',
    price: 'R$ 295,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGcA3-DzpWK2kT8H470fiImdCAEyy0EJmAgQeVpTnx5DJ_0uKkPzdzO-nUnqTvFaCLiBnfD2h7ZkvaR-Oc58Fk0zfL8plIjzEJk21YyrCwkHi18JkCiGhVyH1EoPjukHyzrPVrnJrb_VmoD2yAn0p-aJT_I5VRFNBolFQBhg22XkvEbvYwLFs0CO_J2_b0XKmmS_o65sY_PBHjHMusmC_Hg-Ah2PAiOlbmh3ololgHYFitWMVMK6712wk5JMt9rHiQsNd0d7A4uCtL',
    alt: 'Fronhas de seda cinza ardósia',
  },
  {
    name: 'Almofada Lombar Sculpt',
    variant: 'Tricô Aveia / 60x30cm',
    price: 'R$ 229,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYdPgjDgRrgu2sS5N1j6ElbY50A_dA1Fh2C7L6haxrhwpGQNJbwQ51kkkpjkBBgzCPtjcCbimRoR--wcU4ffoaaFjdviC-MdYXsfnZW4fRGbQAE5xFFbgogVw8PreApWBR2GV9C8HCSevd9oOImW6oVtTjQqI6dcs80qJIk41b1TZ4rxHzb1U55dDO2q45uz5-jfuKi-xZwF4PFRtjvYcrbfQgTRDMxzXSFxfcmM4IiVxm-Mu80rQjIQIgqzRQhRHBuPExkcWVtZi',
    alt: 'Almofada lombar em tricô cor aveia',
  },
];

export default function ProductGrid() {
  return (
    <section className="product-section">
      <div className="product-section-inner">
        <div className="product-section-header">
          <div>
            <span className="product-section-label">A Seleção</span>
            <Title level={2} style={{ margin: 0, letterSpacing: '-0.03em', fontWeight: 800 }}>
              Mais Vendidos
            </Title>
          </div>
          <Button
            type="link"
            style={{
              color: 'var(--color-primary)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: 0,
              fontSize: '1rem',
            }}
          >
            Ver Todos os Produtos
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>east</span>
          </Button>
        </div>

        <Row gutter={[48, 48]}>
          {PRODUCTS.map((product) => (
            <Col xs={24} md={8} key={product.name}>
              <div className="product-card">
                <div className="product-card-image-wrapper">
                  <img src={product.image} alt={product.alt} />
                  <button className="product-card-cart-btn">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
                <Title level={4} style={{ marginBottom: 8 }}>{product.name}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontWeight: 500 }}>
                  {product.variant}
                </Text>
                <span className="product-card-price">{product.price}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
