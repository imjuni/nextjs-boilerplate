import { Get, Query } from 'jin-frame';
import { PokeAPI } from 'pokeapi-types';

import { BaseFrame } from '#/frames/common/BaseFrame';

@Get({ path: '/api/v2/pokemon' })
export class PokemonsFrame extends BaseFrame<PokeAPI.NamedAPIResourceList> {
  @Query()
  declare readonly limit: number;

  @Query()
  declare readonly offset: number;
}
