import NextImage from 'next/image';

interface Props {
  children: React.ReactNode;
  isExpanded?: boolean;
}

const TitleTaskPage = ({ children, isExpanded = true }: Props) => {
  return (
    <h2 className="flex gap-2">
      <button>
        <NextImage
          width={14}
          height={14}
          src={'/svg/arrowPopover.svg'}
          alt=""
          className={`transition-transform duration-200 ${isExpanded && 'rotate-90'}`}
        />
      </button>
      <span className="font-semibold text-[18px]">{children}</span>
    </h2>
  );
};

export default TitleTaskPage;
