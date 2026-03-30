import type { ThemeConfig } from 'antd';
import { tokens } from './tokens';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorBgBase: tokens.colors.background,
    colorBgContainer: tokens.colors.surfaceWhite,
    colorText: tokens.colors.text,
    colorTextSecondary: tokens.colors.textSecondary,
    colorBorder: tokens.colors.border,
    borderRadius: tokens.borderRadius.md,
    fontFamily: tokens.fonts.primary,
  },
  components: {
    Button: {
      borderRadius: tokens.borderRadius.full,
      controlHeight: 48,
      paddingInline: 40,
      fontWeight: 600,
    },
    Input: {
      borderRadius: tokens.borderRadius.full,
      controlHeight: 48,
      colorBgContainer: tokens.colors.surfaceContainerLow,
      activeBorderColor: tokens.colors.primary,
    },
  },
};
