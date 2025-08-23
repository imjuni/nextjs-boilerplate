'use client';

import useSWR from 'swr';

import { PokemonsFrame } from '#/frames/PokemonsFrame';

export function usePokemons({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pokemons: any;
  isLoading: boolean;
  isError: Error;
} {
  const frame = PokemonsFrame.of((b) => b.from({ limit, offset }));

  const { data, error, isLoading } = useSWR(
    PokemonsFrame.getEndpoint().pathname,
    frame.execute,
  );

  return {
    pokemons: data,
    isLoading,
    isError: error,
  };
}
