import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MobileNav from "@/components/layout/MobileNav";
import { getUnreadNotificationCount } from "@/actions/notifications/getNotification";

export default async function MainLayout({ children }) {
  const user = await getCurrentUser();
  const unreadNotificationCount = user ? await getUnreadNotificationCount() : 0;

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex justify-center">
      <div className="flex w-full max-w-[1300px] justify-between sm:justify-start">
        {/* Left Vertical Navigation Sidebar */}
        <LeftSidebar
          user={user}
          unreadNotificationCount={unreadNotificationCount}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 max-w-[620px] border-r border-neutral-800/80 min-h-screen pb-20 sm:pb-0">
          {children}
        </main>

        {/* Right Sidebar (Search, Who to follow, Trends) */}
        <RightSidebar user={user} />

        {/* Mobile Hamburger Menu */}
        <MobileNav
          user={user}
          unreadNotificationCount={unreadNotificationCount}
        />
      </div>
    </div>
  );
}
