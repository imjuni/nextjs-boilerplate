import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { NavbarBox } from '#/components/common/navbar/NavbarBox';

describe('Navbar', () => {
  test('render ', () => {
    const { container } = render(<NavbarBox />);
    expect(container.firstChild).toBeTruthy();
  });
});
