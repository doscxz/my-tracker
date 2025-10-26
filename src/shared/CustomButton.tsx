import { HTMLAttributes } from 'react';

type Kind = 'Primary' | 'Borderless';

interface Props {
  label: string;
  onClick: VoidFunction;
  kind?: Kind;
  className?: HTMLAttributes<HTMLButtonElement>['className'];
  'data-cy'?: string;
}

const buttonStyles: Record<Kind, string> = {
  Primary: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors',
  Borderless: 'text-sm transition-colors',
} as const;

const CustomButton = ({
  label,
  onClick,
  kind = 'Primary',
  className,
  'data-cy': dataCy,
}: Props) => (
  <button onClick={onClick} className={`${buttonStyles[kind]} ${className || ''}`} data-cy={dataCy}>
    {label}
  </button>
);

export default CustomButton;
