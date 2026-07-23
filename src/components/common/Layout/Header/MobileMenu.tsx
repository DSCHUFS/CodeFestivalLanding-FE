import Image from 'next/image';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/system/Dialog';
import { MenuItem } from '@/constants/menu';

import * as styles from './styles.css';

type MobileMenuProps = {
  menu: MenuItem[];
  loading: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileMenu = ({ menu, loading, open, setOpen }: MobileMenuProps) => {
  return (
    <Dialog open={open}>
      <DialogOverlay />
      <DialogContent className={styles.mobileMenu}>
        <DialogHeader className={styles.mobileMenuHeaderDisabled}>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <button className={styles.mobileMenuOverlay} onClick={() => setOpen(false)}>
          <nav className={styles.mobileMenuNavigation}>
            {loading && <span className={styles.mobileMenuItemSkeleton} aria-hidden />}
            {menu.map(menuItem => (
              <Link className={styles.mobileMenuItem} href={menuItem.href} key={menuItem.href}>
                {menuItem.title}
              </Link>
            ))}
          </nav>
        </button>

        <button className={styles.mobileMenuClose} onClick={() => setOpen(false)}>
          <Image src="/static/icons/ic_close_24dp.svg" alt="close" width={24} height={24} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
