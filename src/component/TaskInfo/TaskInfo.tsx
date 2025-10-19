import ChooseTask from '@/shared/СhooseTask';
import Divider from '@/shared/Divider';
import StatisticTask from '@/shared/StatisticTask/StatisticTask';
import DescriptionTask from '@/shared/DescriptionTask';
import CommentTask from '@/shared/CommentTask';
import { Task } from '@/constant/@type';

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
      <div className="px-4">
        <StatisticTask details={selectTask.details} />
        <DescriptionTask />
        <CommentTask />
      </div>
    </div>
  ) : (
    <ChooseTask />
  );
};

export default TaskInfo;
