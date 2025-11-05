import SideBar from '@/shared/SideBar';
import NextLink from 'next/link';
import NextImage from 'next/image';
import React from 'react';
import Logo from './assets/Logo.svg';
import KanbanIcon from '../../../public/svg/kanban.svg';
import TaskIcon from '../../../public/svg/task.svg';

const labelsBar = [
  {
    id: 1,
    label: 'Панель Kanban',
    icon: <KanbanIcon className="w-[24px] h-[24px]" />,
    link: '/kanban-table',
  },
  {
    id: 2,
    label: 'Задачи',
    icon: <TaskIcon className="w-[24px] h-[24px]" />,
    link: '/',
  },
];

const NavigationBar = () => {
  //TODO реализовать логику когда можно растягивать и сжимать aside
  return (
    <SideBar
      styles=" min-h-screen sticky top-0 flex flex-col gap-6 bg-linear-to-t to-cyan-800 from-cyan-900 w-[36px] border-r-1 border-indigo-100 py-6 px-2 lg:min-w-[312px] lg:px-4"
      headerContent={
        <h1 data-cy="heading-side-bar" className={'text-4xl text-slate-300'}>
          MyTracker
        </h1>
      }
      logoContent={<Logo className={'w-6 h-6'} />}
    >
      <nav>
        <ul className="flex flex-col gap-4">
          {labelsBar.map(({ label, icon, id, link }) => (
            <li key={id}>
              <NextLink
                data-cy={`navigation-link-${label}`}
                href={link}
                className="flex items-center gap-2 text-slate-300"
              >
                <div className="filter invert brightness-0 contrast-100">{icon}</div>
                <span className="hidden lg:block">{label}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </SideBar>
  );
};

export default NavigationBar;
