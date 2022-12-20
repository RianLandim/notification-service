import { randomUUID } from 'crypto';
import { InMemoryNotificationRespository } from '../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRespository = new InMemoryNotificationRespository();
    const sendNotification = new SendNotification(notificationsRespository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: ' social',
      recipientId: randomUUID(),
    });

    expect(notificationsRespository.notifications).toHaveLength(1);
    expect(notificationsRespository.notifications[0]).toEqual(notification);
  });
});
