import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Navbar } from '#/components/common/navbar/Navbar';

describe('Navbar', () => {
  test('render ', () => {
    const { container } = render(<Navbar />);
    expect(container.firstChild).toBeTruthy();
  });
});
