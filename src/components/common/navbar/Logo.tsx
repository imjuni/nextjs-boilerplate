import React from 'react';

interface IProps {
  message?: string;
}

export const Logo: React.FC<IProps> = ({ message = '' }): React.ReactNode => (
  <React.Fragment>
    <div className="h-full py-[0.5em] px-[1em]">
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
    </div>

    {message && (
      <div className="h-full py-[0.5em] px-[1em]">
        <span className="font-sans text-sm/6 py-[0.5em] px-[1em]">
          {message}
        </span>
      </div>
    )}
  </React.Fragment>
);
