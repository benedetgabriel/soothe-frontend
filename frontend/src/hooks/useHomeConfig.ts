import { useState } from 'react';
import { loadHomeConfig } from '../mocks/home-config';
import type { HomePageConfig } from '../types/home-config';

export function useHomeConfig(): HomePageConfig {
  const [config] = useState<HomePageConfig>(loadHomeConfig);
  return config;
}
