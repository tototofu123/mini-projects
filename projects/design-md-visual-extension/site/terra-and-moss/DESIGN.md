---
name: Terra & Moss
version: 2.3.0
description: An exhaustive, ultra-high-fidelity design system for organic bento interfaces.
colors:
  primary: "#2E7D32"
  primary-container: "#E8F5E9"
  secondary: "#5D4037"
  secondary-container: "#EFEBE9"
  tertiary: "#FFF9C4"
  tertiary-container: "#FFFDE7"
  neutral: "#F5F5F0"
  surface: "#121212"
  on-surface: "#EDEDEA"
  surface-variant: "#1C1C18"
  error: "#C62828"
  warning: "#F9A825"
  success: "#00695C"
  info: "#1565C0"
  border: "#3E2723"
typography:
  headline-display:
    fontFamily: "Noto Serif"
    fontSize: "6rem"
    fontWeight: 700
    lineHeight: 1.1
  headline-lg:
    fontFamily: "Noto Serif"
    fontSize: "2.5rem"
    fontWeight: 600
  body-lg:
    fontFamily: "Manrope"
    fontSize: "1.25rem"
    fontWeight: 400
  body-md:
    fontFamily: "Manrope"
    fontSize: "1rem"
    fontWeight: 400
  label-lg:
    fontFamily: "Manrope"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.05em"
  label-sm:
    fontFamily: "Manrope"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  xxl: "64px"
rounded:
  none: "0px"
  sm: "8px"
  md: "12px"
  lg: "24px"
  xl: "32px"
  full: "9999px"
components:
  btn-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.xl}"
  btn-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.xl}"
    border: "1px solid {colors.secondary}"
  btn-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  card-featured:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-standard:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.surface-variant}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
  input-search:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.lg}"
    width: "320px"
  chip-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.md}"
  badge-alert:
    backgroundColor: "{colors.error}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    size: "24px"
  nav-island:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  icon-frame:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    size: "48px"
  fab-action:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    size: "64px"
    border: "2px solid {colors.secondary}"
  tooltip-info:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  sidebar-panel:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    width: "260px"
    padding: "{spacing.lg}"
  topbar-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: "60px"
    padding: "0 {spacing.lg}"
  modal-dialog:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.surface-variant}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    width: "500px"
---

## Overview
(Standard segments follow...)
