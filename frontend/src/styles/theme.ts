import type { ThemeConfig } from 'antd';
import { tokens } from './tokens';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.danger,
    colorTextBase: tokens.colors.text,
    colorBgBase: tokens.colors.background,
    borderRadius: tokens.borderRadius.md,
    fontFamily: tokens.fonts.primary,
  },
};
