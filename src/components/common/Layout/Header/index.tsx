'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { MENU } from '@/constants/menu';

import MobileMenu from './MobileMenu';
import * as styles from './styles.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <header className={styles.root}>
        <div className={styles.inner}>
          <Link className={styles.ci} href="/">
            <Image src="/static/images/ci.svg" alt="logo" draggable={false} fill loading="eager" />
          </Link>
          <nav className={styles.navigation}>
            {MENU.map(menu => (
              <Link className={styles.menu} href={menu.href} key={menu.href}>
                {menu.title}
              </Link>
            ))}
          </nav>
          <button className={styles.menuTrigger} onClick={() => setMenuOpen(!menuOpen)}>
            <Image
              src="/static/icons/ic_menu_24dp.svg"
              alt="menu"
              width={24}
              height={24}
              draggable={false}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
    </Fragment>
  );
};

export default Header;
