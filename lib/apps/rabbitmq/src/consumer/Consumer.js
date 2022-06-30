import amqp from 'amqplib';
import argv from 'argv';
import e from '../security/env.js';

class Consumer {
  constructor(context) {
    this.args = process.argv.slice(2);
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
    const { services: { Subito } } = context;
    console.log('🚀 Subito receives a message');
    return Subito.run(
      msg,
      this.readArgs(args),
      context,
    );
  }

  async publish(queue, msg) {
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  }

  readArgs(args) {
    this.defineArgs();
    const { options } = argv.run(args);
    return options;
  }

  defineArgs() { // eslint-disable-line class-methods-use-this
    // argv.option({
    //   name: 'first',
    //   short: 'f',
    //   type: 'int',
    //   description: 'Number of iteration by batch',
    // });
  }
}

export default Consumer;
