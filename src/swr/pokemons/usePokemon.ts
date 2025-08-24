'use client';

import useSWR from 'swr';
import { PokeAPI } from 'pokeapi-types';
import { PokemonFrame } from '#/frames/PokemonFrame';

interface IProps {
  name: string;
}

export async function usePokemon({ name }: IProps): Promise<
  | {
      pokemon: PokeAPI.Pokemon;
      isLoading: boolean;
      isError: undefined;
    }
  | {
      pokemon: undefined;
      isLoading: boolean;
      isError: any;
    }
> {
  const frame = PokemonFrame.of((b) => b.from({ name }));

  const { data, error, isLoading } = useSWR(
    PokemonFrame.getEndpoint().pathname,
    frame.execute,
  );

  if (data?.data == null) {
    return {
      pokemon: undefined,
      isLoading,
      isError: error,
    };
  }

  return {
    pokemon: data.data,
    isLoading,
    isError: undefined,
  };
}
