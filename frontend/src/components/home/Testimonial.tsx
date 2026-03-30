import { Avatar, Typography } from 'antd';

const { Text } = Typography;

const AVATAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcn2ceO7TFg7ptz0HIdGMl9L7vESwtq42qbOdUqEgIPLJwNmTCMb0y5chg_arziKlepLqGC_sCBTer_6h32r4UPlEbImaZJp9hmsDQD5rRadaM_5aJKdKGDFRom_CJSv9iwhQYTUNSc0EsGKy05xu9MTm6WpFtl-bGUjZVDzOfkfThtoeOnpUedkGlRIgoTpMTgAvOr3LR7uKFYeiqU656u9-xAWRVI013w_t_W-hWqPG2XzGcf2S6pzQO4ccEIWvj1lVUHK1zVY5_';

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <span className="material-symbols-outlined testimonial-quote-icon">format_quote</span>
        <p className="testimonial-text">
          "A Soothe redefiniu completamente minhas noites. As texturas são incomparáveis
          e a estética combina perfeitamente com minha casa minimalista."
        </p>
        <div className="testimonial-author">
          <Avatar size={48} src={AVATAR_IMAGE} alt="Maria Fernanda" />
          <div style={{ textAlign: 'left' }}>
            <Text strong style={{ display: 'block' }}>Maria Fernanda</Text>
            <Text type="secondary" style={{ fontSize: '0.875rem' }}>Designer de Interiores</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
