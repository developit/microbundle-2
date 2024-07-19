export * from 'patterns/lib/theme';
export * as style from 'patterns/lib/style';

import {Box} from 'patterns/components/Box';
import {Image} from 'patterns/components/Image';
import {Text} from 'patterns/components/Text';

import {setTheme} from 'patterns/lib/theme';
export {setTheme} from 'patterns/lib/theme';

export function init() {
	setTheme('default');
}

export {Box, Image, Text};
