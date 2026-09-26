import { getNotifications } from "@/actions/notifications/getNotification";
import NotificationItem from "@/components/notifications/NotificationItem";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/75 border-b border-neutral-800 px-4 py-3">
        <h1 className="text-xl font-bold text-neutral-100 tracking-tight">
          Notifications
        </h1>
      </header>

      {/* Notifications List */}
      <section aria-label="Notifications List">
        {!notifications || notifications.length === 0 ? (
          <div className="p-12 text-center">
            <h2 className="text-lg font-bold text-neutral-200 mb-1">
              No notifications yet
            </h2>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto">
              When someone likes, reposts, comments, or follows you, you’ll see it here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id.toString()}
              notification={notification}
            />
          ))
        )}
      </section>
    </div>
  );
}
