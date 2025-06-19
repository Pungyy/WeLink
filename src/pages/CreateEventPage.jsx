import CreateEvent from '../components/CreateEvent';

import desktopBg from '../assets/img/desktop.png';

export default function CreateEventPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-no-repeat bg-bottom bg-contain relative"
      style={{
        backgroundImage: `url(${desktopBg})`,
      }}
    >
      <CreateEvent />
    </div>
  );
}
