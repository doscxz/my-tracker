import { Task } from '@/component/KanbanBoard/KanbanBoard';
import ChooseTask from '@/shared/СhooseTask';
import Divider from '@/shared/Divider';
import StatisticTask from '@/shared/StatisticTask';
import DescriptionTask from '@/shared/DescriptionTask';
import CommentTask from '@/shared/CommentTask';

interface Props {
  selectTask: Task | null;
}

const TaskInfo = ({ selectTask }: Props) => {
  return selectTask ? (
    <div className="bg-stone-100 w-full h-full">
      <header className="px-8 py-2">
        <h1>{selectTask.title}</h1>
      </header>
      <Divider />
      <section className="px-4">
        <StatisticTask />
        <DescriptionTask />
        <CommentTask />
      </section>
      <footer></footer>
    </div>
  ) : (
    <ChooseTask />
  );
};

export default TaskInfo;
