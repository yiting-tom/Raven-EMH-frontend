import { keyframes } from 'styled-components';

const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
};

export const color = {
  blue: '#5e72e4',
  indigo: '#5603ad',
  purple: '#8965e0',
  pink: '#f3a4b5',
  red: '#f5365c',
  orange: '#fb6340',
  yellow: '#ffd600',
  green: '#2dce89',
  teal: '#11cdef',
  cyan: '#2bffc6',
  white: '#ffffff',
  gray: '#6c757d',
  grayDark: '#32325d',
  light: '#ced4da',
  lighter: '#e9ecef',
  primary: '#e14eca',
  secondary: '#f4f5f7',
  success: '#00f2c3',
  info: '#1d8cf8',
  warning: '#ff8d72',
  danger: '#fd5d93',
  dark: '#212529',
  default: '#344675',
  neutral: '#ffffff',
  darker: 'black',
  primaryA: (opacity = 1) => `rgba(225, 78, 202, ${opacity})`,
  successA: (opacity = 1) => `rgba(0, 242, 195, ${opacity})`,
  infoA: (opacity = 1) => `rgba(29, 140, 248, ${opacity})`,
  secondaryA: (opacity = 1) => `rgba(116, 123, 255, ${opacity})`,
};

export const createJellyAnimation = (finalScale) => keyframes`
  25% {
    transform: scale(1.2, 0.9);
  }
  60% {
    transform: scale(0.9, 1.2) translate(0, -4px);
  }
  75% {
    transform: scale(${finalScale});
  }
`;
