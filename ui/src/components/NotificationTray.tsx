import { useStore } from '@nanostores/solid';
import { $notifications } from '../store/notifications';

export default function NotificationTray() {
  const notifications = useStore($notifications);
  return (
    <div class="toast toast-end">
      {/* <p>Notifications: </p> */}
      {
        notifications().map((element) => (
          <div class="alert alert-info">
            <span>{element.value}</span>
          </div>
        ))
      }
    </div>
  )
}