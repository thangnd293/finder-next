import Header from "./components/Header";
import InvitationList from "./components/InvitationList";

export default function DatingInvitationPage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <Header />

      <InvitationList />
    </div>
  );
}
