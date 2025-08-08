import Link from 'next/link';
import NextImage from 'next/image';
import Divider from '@/shared/Divider';
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

const SideBar = () => {
  //TODO реализовать логику когда можно растягивать и сжимать aside
  return (
    <aside className="flex flex-col gap-6 bg-linear-to-t to-cyan-800 from-cyan-900 h-[100vh] w-[312px] px-4 py-6">
      <header className="flex justify-center">
        <h1 className={'text-4xl text-slate-300'}>MyTracker</h1>
      </header>
      <Divider />
      <section className={'flex justify-center '}>
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
                <Link href={link} className="text-slate-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      {/*TODO подумать может что добавить в footer*/}
      <footer></footer>
    </aside>
  );
};

export default SideBar;
