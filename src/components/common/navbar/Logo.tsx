import React from 'react';

interface IProps {
  message?: string;
}

export const Logo: React.FC<IProps> = ({ message = '' }): React.ReactNode => (
  <React.Fragment>
    <picture>
      <img
        alt="Next.js logo"
        className="dark:invert"
        height={38}
        src="/next.svg"
        width={180}
        data-testid="$id-logo-image"
      />
    </picture>

    {message && (
      <div>
        <span className="font-sans text-sm/6">{message}</span>
      </div>
    )}
  </React.Fragment>
);
