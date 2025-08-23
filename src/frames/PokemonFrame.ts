import { Get, Param } from 'jin-frame';
import { PokeAPI } from 'pokeapi-types';

import { BaseFrame } from '#/frames/common/BaseFrame';

@Get({ path: '/api/v2/pokemon/:name' })
export class PokemonFrame extends BaseFrame<PokeAPI.Pokemon> {
  @Param()
  declare readonly name: string;
}
