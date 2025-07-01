import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const customColors = fullConfig.theme.colors as any;

export const colors = {
  kikuDarkGreen: customColors['kiku-dark-green'].DEFAULT,
  kikuDarkGreenTextOnDark: customColors['kiku-dark-green'].dark,
  kikuLightGreen: customColors['kiku-light-green'].DEFAULT,
  kikuMutedGreen: customColors['kiku-muted-green'].DEFAULT,
};
