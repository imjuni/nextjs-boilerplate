import crypto from 'crypto';

import { Get, JinFrame, Query, TFieldsOf } from 'jin-frame';

@Get({ host: 'https://pokeapi.co' })
export class BaseFrame<S = unknown, F = unknown> extends JinFrame<S, F> {
  @Query()
  declare public readonly tid: string;

  protected static override getDefaultValues(): Partial<
    TFieldsOf<InstanceType<typeof BaseFrame>>
  > {
    return { tid: crypto.randomUUID() };
  }
}
