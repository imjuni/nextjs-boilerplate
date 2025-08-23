import { populate } from 'my-easy-fp';
import { urlna } from 'url-naong';
import { nanoid } from 'nanoid';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination';

interface IProps {
  page: number;
  size: number;
  url: string;
}

function getPaginationPages(page: number, size: number): number[] {
  const half = Math.floor(size / 2);

  let start = page - half;
  let end = page + half;

  // size가 짝수일 경우, 오른쪽으로 한 칸 더 밀어줌
  if (size % 2 === 0) {
    start += 1;
  }

  if (start < 1) {
    end += 1 - start;
    start = 1;
  }

  return Array.from({ length: size }, (_, i) => start + i);
}
export const Paging: React.FC<IProps> = ({ page, size, url }) => {
  const pages = getPaginationPages(page, size);
  const first = page - 1;
  const last = page + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={first <= 0}
            href={urlna(undefined, url, {
              page: first,
              size: undefined,
            })}
          />
        </PaginationItem>

        {pages.map((index) => (
          <PaginationItem key={nanoid()}>
            <PaginationLink
              isActive={index === page}
              href={urlna(undefined, url, {
                page: index,
                size: undefined,
              })}
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={urlna(undefined, url, {
              page: last,
              size: undefined,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
