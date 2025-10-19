'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

const Chat = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Вы',
        message: newMessage.trim(),
        timestamp: new Date(),
        avatar: '👤',
      };
      setComments([...comments, comment]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = newMessage.substring(start, end);
    const beforeText = newMessage.substring(0, start);
    const afterText = newMessage.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    setNewMessage(newText);

    // Restore cursor position
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(start + prefix.length, end + prefix.length);
      }
    }, 0);
  };

  const insertCodeBlock = () => {
    insertFormatting('```\n', '\n```');
  };

  const insertHighlight = (color: 'red' | 'yellow' | 'green') => {
    insertFormatting(`[${color}]`, `[/${color}]`);
  };

  const renderFormattedText = (text: string) => {
    // Handle code blocks
    let formattedText = text.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-gray-800 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2"><code>$1</code></pre>'
    );

    // Handle inline code
    formattedText = formattedText.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Handle colored highlights
    formattedText = formattedText.replace(
      /\[red\](.*?)\[\/red\]/g,
      '<span class="bg-red-200 text-red-800 px-1 py-0.5 rounded">$1</span>'
    );

    formattedText = formattedText.replace(
      /\[yellow\](.*?)\[\/yellow\]/g,
      '<span class="bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded">$1</span>'
    );

    formattedText = formattedText.replace(
      /\[green\](.*?)\[\/green\]/g,
      '<span class="bg-green-200 text-green-800 px-1 py-0.5 rounded">$1</span>'
    );

    return formattedText;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg">
      {/* Input Area at Top */}
      <div className="border-b bg-white p-4 rounded-t-lg">
        {/* Formatting Buttons */}
        <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-200">
          <button
            onClick={insertCodeBlock}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
            title="Вставить код"
          >
            <span className="font-mono">&lt;/&gt;</span>
            Код
          </button>

          <button
            onClick={() => insertHighlight('red')}
            className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
            title="Красная подсветка"
          >
            🔴 Красный
          </button>

          <button
            onClick={() => insertHighlight('yellow')}
            className="px-3 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md transition-colors"
            title="Желтая подсветка"
          >
            🟡 Желтый
          </button>

          <button
            onClick={() => insertHighlight('green')}
            className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors"
            title="Зеленая подсветка"
          >
            🟢 Зеленый
          </button>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              ref={setTextareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Написать комментарий... Используйте кнопки выше для форматирования или ``` для кода"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm font-mono"
              rows={4}
              style={{ minHeight: '100px', maxHeight: '200px' }}
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Area Below */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Пока нет комментариев</p>
            <p className="text-sm">Напишите первый комментарий выше</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => {
              const showDate =
                index === 0 ||
                formatDate(comment.timestamp) !== formatDate(comments[index - 1].timestamp);

              return (
                <div key={comment.id}>
                  {/* Date Separator */}
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                  )}

                  {/* Comment */}
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {comment.avatar || comment.author.charAt(0)}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="bg-white rounded-lg px-4 py-3 shadow-sm border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800 text-sm">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <div
                          className="text-gray-700 text-sm whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: renderFormattedText(comment.message) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
