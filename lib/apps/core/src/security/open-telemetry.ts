import { OpenTelemetry } from 'subito-lib';
import e from './env.js';

if (e.APP_ENV !== 'local') {
  new OpenTelemetry({
    type: 'subitotype',
    name: 'subitoapp',
  }).record();
}
