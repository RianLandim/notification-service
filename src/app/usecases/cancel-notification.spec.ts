import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { randomUUID } from 'crypto';
import { InMemoryNotificationRespository } from '../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationsRespository);

    const notification = new Notification({
      category: 'social',
      content: new Content('test-content'),
      recipientId: randomUUID(),
    });

    await notificationsRespository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRespository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationsRespository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
