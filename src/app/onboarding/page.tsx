'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import CIShape from '@/components/common/CIShape';
import { rem } from '@/utils/pxto';

import * as styles from './page.css';

const Content = () => {
  const searchParams = useSearchParams();
  const ci = (searchParams.get('ci') ?? '480') + 'px';
  const logo = searchParams.get('logo') ?? '156';

  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <Image src="/static/images/bg.webp" alt="background" quality={100} fill preload />
      </div>

      <div className={styles.content}>
        <div style={{ width: rem(ci), height: rem(ci) }}>
          <CIShape />
        </div>
        <Image
          src="/static/images/ci.svg"
          alt="logo"
          width={Number(logo)}
          height={(Number(logo) / 156) * 52}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
