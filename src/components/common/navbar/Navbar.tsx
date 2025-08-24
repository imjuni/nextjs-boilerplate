'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { NavbarBox } from '#/components/common/navbar/NavbarBox';
import { LanguagesIcon } from 'lucide-react';
import { Logo } from '#/components/common/navbar/Logo';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import React, { useCallback, useTransition } from 'react';
import { setLocale } from '#/app/actions/set-locales';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC<React.PropsWithChildren> = () => {
  const t = useTranslations();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const onHandleChangeLocale = useCallback((locale: 'ko' | 'en') => {
    startTransition(async () => {
      setLocale(locale);
      router.refresh();
    });
  }, []);

  return (
    <NavbarBox>
      <Logo />

      <div className="flex flex-row w-full h-full pl-[1rem]">
        <div id="1" className="flex items-start flex-1 min-w-0">
          <Button className="rounded-none h-full" variant="ghost">
            <Link href="/">{t('common.nav.home')}</Link>
          </Button>

          <Button className="rounded-none h-full" variant="ghost">
            <Link href="/pokemons">{t('common.nav.pokemon')}</Link>
          </Button>
        </div>

        <div id="2" className="flex items-end min-w-[100px] shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-none h-full" variant="ghost">
                <LanguagesIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Languages</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onHandleChangeLocale('ko')}>
                  Korean
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onHandleChangeLocale('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </NavbarBox>
  );
};
