import { FILTERS_KEYS } from '@/consts/filtersConsts';

export type Filter = (typeof FILTERS_KEYS)[keyof typeof FILTERS_KEYS];

export type Filters = Record<Filter, string>;
