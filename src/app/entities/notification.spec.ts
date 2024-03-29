import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification Content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitacao de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeInstanceOf(Notification);
  });
});
