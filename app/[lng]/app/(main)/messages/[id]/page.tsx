export default function ChatPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        Chat with {id}
      </div>
      {/* <MessageFooter /> */}
    </div>
  );
}
