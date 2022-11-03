export type WatcherOptions = {
  fullDocument: string
  resumeAfter?: string
}

class Watcher {
  streamRef: string | null;
  options: WatcherOptions;
  stream: any;

  constructor({ lastStream, context }) {
    this.streamRef = context.streamRef;
    const { dataSources: { SubitoApp } } = context;
    this.options = {
      fullDocument: 'updateLookup',
      resumeAfter: lastStream.streamId || undefined
    };
    this.watch(context);
  }

  static async run({ context }): Promise<Watcher> {
    const { dataSources: { Watcher } } = context;
    const lastStream = await Watcher.getLastStream();
    return new Watcher({ lastStream, context })
  }

  watch(context) {
    const { dataSources: { SubitoApps, Watcher } } = context;
    this.stream = SubitoApps.collection.watch(
      [
        {
          $match: {
            'updateDescription.updatedFields': { $exists: true },
          },
        },
      ],
      this.options
    );
    this.stream.on('change', async (data) => {
      Watcher.setCurrentStream(this.stream.resumeToken);
      this.onChange(data, context);
    });
  }

  onChange(data, context) {
    const { services: { SubitoApp } } = context;

    return SubitoApp.run(
      data,
      context,
    );
  }
}

export default Watcher;
