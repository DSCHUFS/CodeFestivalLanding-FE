import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { type ComponentProps } from 'react';

import * as styles from './styles.css';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

const DialogOverlay = ({ className, ref, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitive.Overlay className={clsx(styles.overlay, className)} {...props} ref={ref} />
  );
};

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;

const DialogContent = ({ className, children, ref, ...props }: DialogContentProps) => (
  <DialogPortal>
    <DialogPrimitive.Content ref={ref} className={clsx(styles.content, className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.header, className)} {...props} />
);

const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={clsx(styles.footer, className)} {...props} />
);

type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title ref={ref} className={clsx(styles.title, className)} {...props} />
);

type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>;

const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsx(styles.description, className)}
    {...props}
  />
);

type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

const DialogClose = ({ className, children, ref, ...props }: DialogCloseProps) => (
  <DialogPrimitive.DialogClose
    className={clsx(children || styles.close, className)}
    {...props}
    ref={ref}
  >
    {children}
  </DialogPrimitive.DialogClose>
);

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
