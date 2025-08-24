'use server';

import { cookies } from 'next/headers';

export async function setLocale(lang: 'ko' | 'en') {
  const cooker = await cookies();

  cooker.set('locale', lang, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
  });
}
