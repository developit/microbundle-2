export function style(obj: Record<string, any>) {
	let out = '';
	for (const key in obj) out += `${out ? ' ' : ''}${key}: ${obj[key]};`;
	return out;
}
