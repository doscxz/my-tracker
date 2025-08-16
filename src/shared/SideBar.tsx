import Divider from '@/shared/Divider';
import React from 'react';

interface Props {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  styles: string;
}

const SideBar = ({ children, headerContent, footerContent, styles }: Props) => {
  return (
    <aside className={styles}>
      <header className="flex justify-center">{headerContent}</header>
      <Divider />
      <section className={'flex justify-center '}>{children}</section>
      {/*TODO подумать может что добавить в footer*/}
      <Divider />
      <footer>{footerContent}</footer>
    </aside>
  );
};

export default SideBar;
