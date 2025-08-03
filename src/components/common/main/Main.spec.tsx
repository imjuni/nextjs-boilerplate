import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Main } from '#/components/common/main/Main';

describe('Main', () => {
  test('render ', () => {
    const { container } = render(<Main />);
    expect(container.firstChild).toBeTruthy();
  });
});
