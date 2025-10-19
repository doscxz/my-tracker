import { Color } from './Chat';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  textareaRef: HTMLTextAreaElement | null;
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
}

const ButtonFormatted = ({ textareaRef, newMessage, setNewMessage }: Props) => {
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

  const insertHighlight = (color: Color) => {
    insertFormatting(`[${color}]`, `[/${color}]`);
  };
  return (
    <>
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
    </>
  );
};

export default ButtonFormatted;
