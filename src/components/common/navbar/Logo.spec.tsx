import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Logo } from '#/components/common/navbar/Logo';

describe('Logo', () => {
  test('should render message when string message passed', async () => {
    const { getByText } = render(<Logo message="Vitest" />);

    await expect.element(getByText('Vitest')).toBeInTheDocument();
  });

  test('should skip message when undefined message passed', async () => {
    const { getByTestId } = render(<Logo />);

    await expect.element(getByTestId('$id-logo-image')).toBeInTheDocument();
    // // await getByRole('button', { name: 'Increment ' }).click();
    // await expect
    //   .element(getByText('Hello Vitest x2!'), { timeout: 1000 })
    //   .toBeInTheDocument();
  });
});
