import React from 'react';

export const Logo: React.FC<{ message: string }> = ({
  message,
}): React.ReactNode => (
  <React.Fragment>
    <div>
      <span className="font-sans text-sm/6">{message}</span>
    </div>

    <picture>
      <img
        alt="Next.js logo"
        className="dark:invert"
        height={38}
        src="/next.svg"
        width={180}
      />
    </picture>
  </React.Fragment>
);
