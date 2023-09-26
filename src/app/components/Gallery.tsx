import fetchImages from '@/lib/fetchImages';
import type { ImagesResults } from '@/models/Images';
import ImgContainer from './ImgContainer';
import addBlurredDataUrls from '@/lib/getBase64';

import getPrevNextPages from '@/lib/getPrevNextPages';
import Footer from './Footer';

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ topic = 'curated', page }: Props) {
  let url;
  if (topic === 'curated' && page) {
    url = `https://api.pexels.com/v1/curated?page=${page}&per_page=16`;
  } else if (topic === 'curated') {
    url = 'https://api.pexels.com/v1/curated?per_page=16';
  } else if (!page) {
    url = `https://api.pexels.com/v1/search?query=${topic}&per_page=16`;
  } else {
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}&per_page=16`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0)
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center ">
        <h2 className="m-4 text-2xl font-bold text-center">No Images Found</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5rem"
          height="5rem"
          viewBox="0 0 36 36"
          className="mt-4 mx-auto"
        >
          <circle
            cx="18"
            cy="18"
            r="18"
            fill="#FFCC4D"
          ></circle>
          <path
            fill="#65471B"
            d="M6.001 11a1 1 0 0 1-.004-2c.156-.002 3.569-.086 6.205-3.6a1 1 0 0 1 1.6 1.2C10.539 10.95 6.185 11 6.001 11zm24.986 2.393a1 1 0 0 1-1.945.468c-.038-.151-.911-3.452-4.941-5.201a1 1 0 0 1 .796-1.834c4.989 2.165 6.047 6.388 6.09 6.567z"
          ></path>
          <path
            fill="#664500"
            d="M23.186 29.526c-.993 0-1.952-.455-2.788-1.339c-2.816-2.985-3.569-2.333-4.817-1.251c-.781.679-1.754 1.523-3.205 1.523c-2.351 0-3.969-2.302-4.036-2.4a1 1 0 0 1 1.644-1.14c.301.429 1.317 1.54 2.393 1.54c.704 0 1.256-.479 1.895-1.033c1.816-1.578 3.764-2.655 7.583 1.388c.823.873 1.452.774 1.908.592c1.659-.665 3.205-3.698 3.197-5.15a1 1 0 0 1 .994-1.005h.006a1 1 0 0 1 1 .995c.012 2.103-1.854 5.976-4.454 7.017a3.601 3.601 0 0 1-1.32.263z"
          ></path>
          <path
            fill="#65471B"
            d="M14.815 15.375c-.584 2.114-1.642 3.083-3.152 2.666c-1.509-.417-2.343-1.909-1.76-4.023c.583-2.112 2.175-3.363 3.684-2.946c1.511.417 1.812 2.19 1.228 4.303zm11.416-.755c.473 2.141-.675 4.838-2.204 5.176s-3.28-1.719-3.753-3.86c-.473-2.14.419-3.971 1.948-4.309s3.536.853 4.009 2.993z"
          ></path>
        </svg>
      </div>
    );

  const photosWithBlur = await addBlurredDataUrls(images);

  const { prevPage, nextPage } = getPrevNextPages(images);

  const footerProps = {
    topic,
    page,
    nextPage,
    prevPage,
  };

  return (
    <>
      <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
        {photosWithBlur.map((photo) => (
          <ImgContainer
            key={photo.id}
            photo={photo}
          />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
