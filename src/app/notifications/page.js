import { getNotifications } from "@/app/actions/notifications/getNotifications";

import NotificationItem from "@/components/notifications/NotificationItem";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <main>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ))
      )}
    </main>
  );
}
