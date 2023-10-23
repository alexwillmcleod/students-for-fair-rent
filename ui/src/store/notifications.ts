import { atom } from 'nanostores';
import type { JSXElement } from 'solid-js';

export interface Notification {
  value?: JSXElement;
  color?: string;
  time?: number; // in ms
}

export const $notifications = atom<Notification[]>([]);

export function addNotification(notification: Notification) {
  console.log("Adding notification to store")
  const twoSeconds = 2000;
  if (!notification.time) {
    notification.time = twoSeconds;
  }
  setTimeout(() => {
      console.log(`Deleting Notification ${JSON.stringify(notification)}`)
      removeNotification(notification)
      console.log(`Notifications: ${$notifications.get()}`)
    },
    notification.time!
  )
  
  $notifications.set([
    ...$notifications.get(),
    notification
  ]);
  console.log(`Notifications: ${$notifications.get().map((element) => JSON.stringify(element))}`)
}

function removeNotification(notification: Notification) {
  $notifications.set(
    $notifications.get().filter(
      (element) => (
        element != notification
      )
    )
  )
}