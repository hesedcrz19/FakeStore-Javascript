import { THEMES } from '@/consts/themesConst';

export type Theme = (typeof THEMES)[keyof typeof THEMES];
