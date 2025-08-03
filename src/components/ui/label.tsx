'use client';

import React from 'react';

import { Root } from '@radix-ui/react-label';

import { cn } from '#/lib/utils';

export const Label: React.FC<React.ComponentProps<typeof Root>> = ({
  className,
  ...props
}) => (
  <Root
    data-slot="label"
    className={cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className,
    )}
    {...props}
  />
);
