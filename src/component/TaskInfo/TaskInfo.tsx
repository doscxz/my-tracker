import ChooseTask from '@/shared/СhooseTask';
import Divider from '@/shared/Divider';
import StatisticTask from '@/shared/StatisticTask/StatisticTask';
import DescriptionTask from '@/shared/DescriptionTask';
import CommentTask from '@/shared/CommentTask';
import { Task } from '@/constant/@type';

interface Props {
  selectTask: Task | null;
}
// TODO: поудмать над дизайном, может получится сделать что то получше
const TaskInfo = ({ selectTask }: Props) => {
  return selectTask ? (
    <div className="bg-stone-100 w-full h-full" data-cy="task-info-panel-content">
      <header className="px-8 py-2">
        <h1 data-cy="task-info-title">{selectTask.title}</h1>
      </header>
      <Divider />
      <div className="px-4">
        <StatisticTask status={selectTask.status} id={selectTask.id} details={selectTask.details} />
        <DescriptionTask
          status={selectTask.status}
          id={selectTask.id}
          description={selectTask.description}
        />
        <CommentTask />
      </div>
    </div>
  ) : (
    <ChooseTask />
  );
};

export default TaskInfo;
