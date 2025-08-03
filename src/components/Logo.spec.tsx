import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Logo } from './Logo';

describe('Logo', () => {
  test('render message', async () => {
    const { getByText } = render(<Logo message="Vitest" />);

    await expect.element(getByText('Vitest')).toBeInTheDocument();
    // // await getByRole('button', { name: 'Increment ' }).click();
    // await expect
    //   .element(getByText('Hello Vitest x2!'), { timeout: 1000 })
    //   .toBeInTheDocument();
  });
});
