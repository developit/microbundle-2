export const a = 'a';
export const c = async () => (await import('./c')).c;
// export const c = async () => (await import('./c').catch(() => ({c:0}))).c;
// export const c = async () => {
// 	const {c} = await import('./c');
// 	return c;
// };
