import Link from 'next/link';
import { SVGProps } from 'react';

type Props = {
  topic: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
};

export default function Footer({ topic, page, prevPage, nextPage }: Props) {
  if (!prevPage && !nextPage)
    return (
      <a
        href="https://github.com/develad"
        target="_blank"
        className="w-full grid place-items-center my-4 text-3xl"
      >
        <h3 className="flex items-center gap-2">
          Elad Bar {new Date().getFullYear()}{' '}
          <BiGithub className="w-7 h-7 fill-white" />
        </h3>
      </a>
    );

  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }

  const nextPageArea = nextPage ? (
    <Link
      href={`/results/${topic}/${nextPage}`}
      className={!prevPage ? 'mx-auto' : ''}
    >
      {!prevPage ? 'more' : null} &gt;&gt;&gt;
    </Link>
  ) : null;

  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`/results/${topic}/${prevPage}`}
        className={!nextPage ? 'mx-auto' : ''}
      >
        &lt;&lt;&lt; {!nextPage ? 'back' : null}
      </Link>

      {pageNums.map((num, i) =>
        page && num === parseInt(page) ? (
          <span key={i}>{num}</span>
        ) : (
          <Link
            key={i}
            href={`/results/${topic}/${num}`}
            className="underline"
          >
            {num}
          </Link>
        )
      )}
    </>
  ) : null;

  return (
    <footer className="flex flex-col justify-between items-center px-2 py-4 font-bold w-60 mx-auto gap-4 text-2xl">
      <div className="w-full flex items-center justify-between">
        {prevPageArea}
        {nextPageArea}
      </div>
      <a
        href="https://github.com/develad"
        target="_blank"
      >
        <h3 className="flex gap-2 text-3xl">
          Elad Bar {new Date().getFullYear()}{' '}
          <BiGithub className="w-7 h-7 fill-white" />
        </h3>
      </a>
    </footer>
  );
}

export function BiGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
  );
}
