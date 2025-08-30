interface Props {
  children: React.ReactNode;
}

export default function ModalContent({ children }: Props) {
  return (
    <div
      id="modalBackground"
      className="fixed z-500 -mt-14 flex h-full w-screen items-start bg-black/50 md:justify-center"
      data-testid="modal-background"
    >
      <div className="mt-12   rounded-lg  p-3.5 shadow-lg md:mt-28 md:h-auto md:w-[450px] dark:border dark:border-zinc-700 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
}
