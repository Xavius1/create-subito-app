import { Document } from 'subito-connector-mongodb';
import { Context } from 'subito-lib';

export type WatcherOptions = {
  fullDocument: string
  resumeAfter?: string
}

export type RunInput = {
  context: Context
}

export type WatcherInput = {
  lastStream?: Document
  context: Context
}

class Watcher {
  options: WatcherOptions;

  context: Context;

  stream: any;

  constructor({ lastStream, context }: WatcherInput) {
    this.context = context;
    this.options = {
      fullDocument: 'updateLookup',
      resumeAfter: lastStream.streamId || undefined,
    };
    this.watch();
  }

  static async run({ context }: RunInput): Promise<Watcher> {
    const { dataSources: { Watchers } } = context;
    const lastStream = await Watchers.getLastStream();
    return new Watcher({ lastStream, context });
  }

  watch() {
    const { dataSources: { SubitoApps, Watchers } } = this.context;
    this.stream = SubitoApps.collection.watch(
      [
        {
          $match: {
            'updateDescription.updatedFields': { $exists: true },
          },
        },
      ],
      this.options,
    );
    this.stream.on('change', async (data: any) => {
      Watchers.setCurrentStream(this.stream.resumeToken);
      this.onChange(data);
    });
  }

  onChange(data: any) {
    const { context } = this;
    const { services: { SubitoApp } } = context;

    return SubitoApp.run(data);
  }
}

export default Watcher;
