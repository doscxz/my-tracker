import { TaskFormData } from '@/shared/Modal/TaskModal';

export const checkMemory = async (
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
    fn(task);
  }
  // Принудительно ждем и предотвращаем оптимизацию
  await new Promise((resolve) => {
    setTimeout(() => {
      // Используем tasks чтобы предотвратить GC
      console.log(tasks.length);
      resolve(null);
    }, 200);
  });
  // @ts-ignore
  const finalMemory = performance.memory.usedJSHeapSize;
  const memoryUsed = (finalMemory - initialMemory) / 1024 / 1024;
  console.log('Было занято памяти:', memoryUsed.toFixed(2), 'MB'); //Было занято памяти: 64.71 MB
  console.log('Начальная память:', (initialMemory / 1024 / 1024).toFixed(2), 'MB'); // Начальная память: 84.42 MB
  console.log('Конечная память:', (finalMemory / 1024 / 1024).toFixed(2), 'MB'); // Конечная память: 149.13 MB
};
