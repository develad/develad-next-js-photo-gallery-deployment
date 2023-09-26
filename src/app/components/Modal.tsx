import type { Photo } from '@/models/Images';

type Props = {
  photo: Photo;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Modal({ photo, isOpen, setIsOpen }: Props) {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full z-40 bg-black/90  flex items-center justify-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className=" flex flex-col items-center">
        <img
          src={photo.src.large2x}
          className="max-w-[calc(100vw-40px)] max-h-[70vh] rounded-3xl border-4 border-white"
          alt={photo.alt}
        />
        <h1 className="mt-4 px-8 text-center">{photo.alt}</h1>
      </div>
    </div>
  );
}
