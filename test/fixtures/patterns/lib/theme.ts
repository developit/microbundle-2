export const themes = ['default', 'dark', 'light'] as const;

export type Theme = typeof themes[number];

export let theme: Theme = 'default';

export function setTheme(newTheme: Theme) {
	theme = newTheme;
}
