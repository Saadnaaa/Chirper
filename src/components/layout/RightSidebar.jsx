import SuggestedUsers from "@/components/profile/SuggestedUsers";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 xl:w-96 pl-6 py-4 sticky top-0 h-screen overflow-y-auto shrink-0">
      <SuggestedUsers />
    </aside>
  );
}
