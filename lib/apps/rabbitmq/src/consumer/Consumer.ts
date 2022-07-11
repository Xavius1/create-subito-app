import type { Channel, Connection, Message } from 'amqplib';
import amqp from 'amqplib';
import argv from 'argv';
import e from '../security/env.js';
import defineArgs from '../security/args';

export type ConsumerProps = {
  endpoint: string
  dataSources: { [key: string]: any }
  services: { [key: string]: any }
  debug: boolean
}

export interface IConsumer {
  connect(queue: string): Promise<unknown>
  consume(): Promise<true>
  publish(queue: string, msg: unknown): Promise<boolean | undefined>
}

export type Context = ConsumerProps & {
  Consumer: unknown
}

/**
 * Consumer handle the interface layer
 * !! NEVER modify this file, put your business logic into SubitoAppService
 *
 * @public
 */
class Consumer implements IConsumer {
  protected args: unknown;

  protected context: Context;

  protected broker: Connection | null = null;

  protected channel: Channel | null = null;

  protected queue: string = '';

  constructor(context: ConsumerProps) {
    this.args = this.readArgs(process.argv.slice(2));
    this.context = {
      ...context,
      Consumer: this,
    };
  }

  /**
   * Connect the consumer to a queue
   *
   * @param queue - Name of the queue
   * @returns
   *
   * @public
   */
  async connect(queue: string): Promise<unknown> {
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

  /**
   * Start to consume a queue
   *
   * @returns
   *
   * @public
   */
  async consume(): Promise<true> {
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

  /**
   * Process new message
   *
   * @param msg - Recieved message
   * @returns
   *
   * @public
   */
  protected async run(msg: Message) {
    const { args, context } = this;
    const { services: { SubitoApp } } = context;
    console.log('🚀 SubitoApp receives a message'); // eslint-disable-line no-console
    return SubitoApp.run(
      msg,
      args,
      context,
    );
  }

  /**
   * Publish a new message
   *
   * @param queue - Name of the queue
   * @param msg - Message to publish
   * @returns
   *
   * @public
   */
  async publish(queue: string, msg: unknown): Promise<boolean | undefined> {
    return this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  }

  /**
   * @internal
   */
  protected readArgs(args: string[]) {
    defineArgs();
    const { options } = argv.run(args);
    this.args = options;

    return this;
  }
}

export default Consumer;
