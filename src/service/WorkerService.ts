// @ts-ignore
import Worker from 'comlink-loader!../worker/canvasmanager.worker';
import { proxy } from 'comlink';
import Stats from 'three/examples/jsm/libs/stats.module';

export class WorkerService {
  private _worker: Worker;
  private _stats: Stats;

  constructor() {
    const worker = new Worker();
    this._worker = worker;
    this._stats = Stats();
  }

  async addVideoTrack(track: MediaStreamTrack) {
    // @ts-ignore
    const capturere = new ImageCapture(track);

    const constraints = track.getConstraints();
    const width = constraints.width;
    const height = constraints.height;
    console.time('Call createEstimator from main thread');
    await this._worker.createEstimator({ width, height });
    console.timeEnd('Call createEstimator from main thread');
    console.time('Call setCaputurere from main thread');
    await this._worker.setCaputurere(proxy({ capturere }));
    console.timeEnd('Call setCaputurere from main thread');
  }

  async start() {
    console.time('Call start from main thread');
    await this._worker.start(proxy(this._stats));
    console.timeEnd('Call start from main thread');
  }

  getStats() {
    return this._stats;
  }
}
