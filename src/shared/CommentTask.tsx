import TitleTaskPage from '@/shared/TitleTaskPage';
import Chat from '@/shared/Chat/Chat';

const CommentTask = () => {
  return (
    <div className="flex flex-col h-full">
      <TitleTaskPage>Комментарии</TitleTaskPage>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
};

export default CommentTask;
