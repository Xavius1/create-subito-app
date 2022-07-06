import type { AMQPQueue } from '@type/amqp';
import amqp from 'amqplib';
import argv from 'argv';
import e from '../security/env.js';
import args from '../security/args';

/**
 * Consumer handle the interface layer
 * NEVER modify this file
 */
class Consumer {
  protected args: string[];
  protected context;
  protected broker;
  protected channel;
  protected queue: AMQPQueue;

  constructor(context) {
    this.args = process.argv.slice(2); // eslint-disable-lin
    this.context = { ...context };
    this.context.Consumer = this;
  }

  async connect(queue) {
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

    channel.consume(queue, async (msg) => {
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

  async run(msg) {
    const { args, context } = this;
    const { services: { SubitoApp } } = context;
    console.log('🚀 SubitoApp receives a message');
    return SubitoApp.run(
      msg,
      this.readArgs(args),
      context,
    );
  }

  async publish(queue, msg) {
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  }

  readArgs(args) {
    args();
    const { options } = argv.run(args);
    return options;
  }
}

export default Consumer;
