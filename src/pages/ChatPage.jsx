import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {
  const { id: targetId } = useParams(); // id de l’ami

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-2">Discussion</h1>
      <ChatBox targetId={targetId} />
    </div>
  );
}
