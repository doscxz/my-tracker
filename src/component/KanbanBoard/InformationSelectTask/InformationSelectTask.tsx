import TaskInfo from '@/component/TaskInfo/TaskInfo';
import { Task } from '@/constant/@type';
import useWindowSize from '@/shared/hooks/useWindowSize';
import Modal from '@/shared/Modal/Modal';

interface Props {
  selectTask: Task | null;
  setSelectTask: (task: Task | null) => void;
}

const InformationSelectTask = ({ selectTask, setSelectTask }: Props) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768 ? true : false;

  return (
    <>
      {selectTask && !isMobile && (
        <div
          className="border-2 h-[100vh] border-amber-400 max-h-[100vh] translate-y-[-24px] translate-x-[24px]  overflow-y-scroll"
          data-cy="task-info-panel"
        >
          <TaskInfo selectTask={selectTask} />
        </div>
      )}
      {isMobile && (
        <Modal
          isOpen={Boolean(selectTask)}
          onClose={() => setSelectTask(null)}
          title="Task Information"
        >
          <TaskInfo selectTask={selectTask} />
        </Modal>
      )}
    </>
  );
};

export default InformationSelectTask;
