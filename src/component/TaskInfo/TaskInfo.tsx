import ChooseTask from '@/shared/СhooseTask';
import Divider from '@/shared/Divider';
import StatisticTask from '@/shared/StatisticTask/StatisticTask';
import DescriptionTask from '@/shared/DescriptionTask';
import CommentTask from '@/shared/CommentTask';
import { Task } from '@/constant/@type';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/storeMobX/StoreContext';

interface Props {
  selectTask: Task | null;
}
const TaskInfo = observer(({ selectTask }: Props) => {
  const store = useStore();

  // Получаем актуальную задачу из store
  const actualTask = selectTask
    ? store.tasksByStatus.initialState[selectTask.status]?.find((t) => t.id === selectTask.id) ||
      selectTask
    : null;

  return actualTask ? (
    <div className="bg-stone-100 w-full h-full" data-cy="task-info-panel-content">
      <header className="px-8 py-2">
        <h1 data-cy="task-info-title">{actualTask.title}</h1>
      </header>
      <Divider />
      <div className="px-4">
        <StatisticTask status={actualTask.status} id={actualTask.id} details={actualTask.details} />
        <DescriptionTask
          status={actualTask.status}
          id={actualTask.id}
          description={actualTask.description}
        />
        <CommentTask />
      </div>
    </div>
  ) : (
    <ChooseTask />
  );
});

export default TaskInfo;
