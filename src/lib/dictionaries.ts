import 'server-only';

const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  he: () => import('@/dictionaries/he.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    if (dictionaries[locale]) {
        return dictionaries[locale]();
    }
    // Fallback to English if the locale is not found
    return dictionaries.en();
};
