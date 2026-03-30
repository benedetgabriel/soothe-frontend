import { Button, Input, Typography } from 'antd';

const { Title, Text } = Typography;

const TEXTURE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA2sZEUvukXs6lFuhAuAtiRty1XQ9NmfLgBn8k3Golf-aBRXQc9mHxA_xSk520Qf8Xz11bOWgMZ1oK4ovORTR-9-iJ-PEaUO4TZIOkDF73hnhcplvkP0bq4zKudHW4eTNwV32akVgPY_lXLADGT1mBN2nfwspI49UXJD4ds0v75yryMQ0wlPWKS2JPWpC8oWufiJ_eCAU6Qyk4kM7IULvdZ14jXnIYHtsrBSEtD94DBKZmN6QcUttRV1FX6kFwbroJ0dta6Qn7YnCh';

export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <div className="newsletter-blur" />

        <div className="newsletter-content">
          <Title level={2} style={{ letterSpacing: '-0.02em', fontWeight: 800, marginBottom: 24 }}>
            Fique por Dentro.
          </Title>
          <Text style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 40, maxWidth: 420, lineHeight: 1.7 }}>
            Entre para nosso círculo exclusivo e tenha acesso antecipado a coleções sazonais e dicas de decoração.
          </Text>
          <div style={{ display: 'flex', gap: 16, maxWidth: 480, flexWrap: 'wrap' }}>
            <Input
              placeholder="Endereço de email"
              style={{ flex: 1, minWidth: 200 }}
            />
            <Button type="primary" size="large" style={{ fontWeight: 700 }}>
              Participar
            </Button>
          </div>
        </div>

        <div className="newsletter-image-wrapper">
          <div className="newsletter-image-inner">
            <img src={TEXTURE_IMAGE} alt="Textura de tecido bouclé em tom creme" />
          </div>
        </div>
      </div>
    </section>
  );
}
