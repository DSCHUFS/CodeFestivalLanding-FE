'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { GALLERY } from '@/constants/gallery';

import * as styles from './page.css';

export default function Page() {
  const { year, id } = useParams<{ year: string; id: string }>();
  const router = useRouter();

  const image = GALLERY[Number(year)]?.[id];

  if (!image) return null;

  return (
    <div className={styles.imageContainer}>
      <Image className={styles.image} src={image.src} alt={image.alt} fill sizes="100%" />
      <button className={clsx(styles.close)} onClick={() => router.back()}>
        <Image src="/static/icons/ic_close_24dp.svg" alt="close" width={24} height={24} />
      </button>
    </div>
  );
}
