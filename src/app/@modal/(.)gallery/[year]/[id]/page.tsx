'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/system/Dialog';
import { GALLERY } from '@/constants/gallery';

import * as styles from './page.css';

export default function GalleryModal() {
  const { id, year } = useParams<{ id: string; year: string }>();
  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    if (!open) router.back();
  };

  const image = GALLERY[Number(year)]?.[id];

  if (!image) return null;

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={styles.hidden}></DialogTitle>
          <DialogDescription className={styles.hidden}></DialogDescription>
        </DialogHeader>

        <div className={styles.imageContainer}>
          <button className={styles.imageOverlay} onClick={() => router.back()} />
          <Image className={styles.image} src={image.src} alt={image.alt} fill sizes="100%" />
          <DialogClose asChild>
            <button className={styles.close}>
              <Image src="/static/icons/ic_close_24dp.svg" alt="close" width={24} height={24} />
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
