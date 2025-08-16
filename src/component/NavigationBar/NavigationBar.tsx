import SideBar from '@/shared/SideBar';
import NextLink from 'next/link';
import NextImage from 'next/image';
import React from 'react';

const labelsBar = [
  {
    id: 1,
    label: 'Панель Kanban',
    iconPath: '/svg/kanban.svg',
    link: '/kanban-table',
  },
  {
    id: 2,
    label: 'Задачи',
    iconPath: '/svg/task.svg',
    link: '/task',
  },
];

const NavigationBar = () => {
  //TODO реализовать логику когда можно растягивать и сжимать aside
  return (
    <SideBar
      styles="sticky top-0 flex flex-col gap-6 bg-linear-to-t to-cyan-800 from-cyan-900 h-[100vh] w-[312px] px-4 py-6 border-r-1 border-indigo-100"
      headerContent={<h1 className={'text-4xl text-slate-300'}>MyTracker</h1>}
    >
      <nav>
        <ul className="flex flex-col gap-4">
          {labelsBar.map(({ label, iconPath, id, link }) => (
            <li key={id} className={'flex gap-2'}>
              <NextImage
                className="filter invert brightness-0 contrast-100"
                alt={''}
                src={iconPath}
                width={24}
                height={24}
              />
              <NextLink href={link} className="text-slate-300">
                {label}
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </SideBar>
  );
};

export default NavigationBar;
