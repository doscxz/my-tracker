import { TaskFormData } from '@/shared/Modal/TaskModal';

export const сheckingMemory = async (
  count: number,
  task: TaskFormData,
  fn: (task: TaskFormData) => void
) => {
  // @ts-ignore
  const initialMemory = performance.memory.usedJSHeapSize;
  const tasks = [];
  for (let i = 0; i < count; i++) {
    const newTask = { ...task, title: task.title + i };
    tasks.push(newTask);
    fn(newTask);
  }
  // Принудительно ждем и предотвращаем оптимизацию
  await new Promise((resolve) => {
    setTimeout(() => {
      // Используем tasks чтобы предотвратить очистку
      console.log(tasks.length);
      resolve(null);
    }, 200);
  });
  // @ts-ignore
  const finalMemory = performance.memory.usedJSHeapSize;
  const memoryUsed = (finalMemory - initialMemory) / 1024 / 1024;
  console.log('Было занято памяти:', memoryUsed.toFixed(2), 'MB'); //Было занято памяти: 21.82 MB
  console.log('Начальная память:', (initialMemory / 1024 / 1024).toFixed(2), 'MB'); // Начальная память: 89.83 MB
  console.log('Конечная память:', (finalMemory / 1024 / 1024).toFixed(2), 'MB'); // Конечная память: 111.65 MB
};
