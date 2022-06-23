import { OpenTelemetry } from 'subito-lib';
import e from './env.js';

if (e.NODE_ENV !== 'local') {
  new OpenTelemetry({
    type: 'das',
    name: 'das',
  }).record();
}
