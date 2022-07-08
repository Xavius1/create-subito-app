import type { Channel, Connection, Message } from 'amqplib';
import amqp from 'amqplib';
import argv from 'argv';
import e from '../security/env.js';
import defineArgs from '../security/args';

/**
 * Consumer handle the interface layer
 * /!\ NEVER modify this file, put your business logic into SubitoAppService
 * 
 * @internal
 */
class Consumer {
  protected args: unknown;

  protected context;

  protected broker: Connection | null = null;

  protected channel: Channel | null = null;

  protected queue: string = '';

  constructor(context) {
    this.args = this.readArgs(process.argv.slice(2)); // eslint-disable-lin
    this.context = { ...context };
    this.context.Consumer = this;
  }

  async connect(queue: string) {
    this.broker = await amqp.connect({
      hostname: e.RABBITMQ_HOST,
      username: e.RABBITMQ_LOGIN,
      password: e.RABBITMQ_PASSWORD,
    });

    this.channel = await this.broker.createChannel();
    this.queue = queue;
    await this.channel.assertQueue(queue, { durable: true, autoDelete: false });

    return this;
  }

  async consume() {
    const { channel, queue } = this;

    channel?.consume(queue, async (msg) => {
      if (msg !== null) {
        try {
          await this.run(JSON.parse(msg.content.toString()));
          channel.ack(msg);
        } catch (err) {
          console.log(err); // eslint-disable-line no-console
        }
      }
    });

    return true;
  }

  async run(msg: Message) {
    const { args, context } = this;
    const { services: { SubitoApp } } = context;
    console.log('🚀 SubitoApp receives a message'); // eslint-disable-line no-console
    return SubitoApp.run(
      msg,
      args,
      context,
    );
  }

  async publish(queue: string, msg: unknown) {
    return this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  }

  readArgs(args: string[]) { 
    defineArgs();
    const { options } = argv.run(args);
    this.args = options;

    return this;
  }
}

export default Consumer;
