import Divider from '@/shared/Divider';
import React from 'react';

interface Props {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  logoContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  styles: string;
}

const SideBar = ({ children, headerContent, logoContent, footerContent, styles }: Props) => {
  return (
    <aside className={styles}>
      <div className="flex items-center justify-center gap-2">
        <header className="hidden lg:flex justify-center ">{headerContent}</header>
        <div className="invert">{logoContent}</div>
      </div>
      <Divider />
      <section className={'flex justify-center '}>{children}</section>
      {/*TODO подумать может что добавить в footer*/}
      <Divider />
      <footer>{footerContent}</footer>
    </aside>
  );
};

export default SideBar;
