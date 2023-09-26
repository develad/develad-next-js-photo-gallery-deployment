'use client';
import { useState } from 'react';
import type { Photo } from '@/models/Images';
import Image from 'next/image';
import Modal from './Modal';

type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  const [isOpen, setIsOPen] = useState(false);
  return (
    <>
      {isOpen && (
        <Modal
          photo={photo}
          isOpen={isOpen}
          setIsOpen={setIsOPen}
        />
      )}

      <div className="z-[4] relative overflow-hidden h-64 bg-gray-200 rounded-xl border-4 border-slate-700 group">
        <Image
          src={photo.src.large}
          alt={photo.alt}
          sizes="(min-width: 1260px) 278px, (min-width: 1000px) calc(15.83vw + 82px), (min-width: 760px) 33.18vw, (min-width: 520px) 50vw, calc(100vw - 16px)"
          title={photo.alt}
          fill={true}
          placeholder="blur"
          blurDataURL={photo.blurredDataUrl}
          className="object-cover group-hover:opacity-75 cursor-pointer group-hover:scale-110 transition-all"
          onClick={() => setIsOPen(!isOpen)}
        />
      </div>
    </>
  );
}
