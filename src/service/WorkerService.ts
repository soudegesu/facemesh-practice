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
    await this._worker.createEstimator({ width, height });
    await this._worker.setCaputurere(proxy({ capturere }));
  }

  async start() {
    await this._worker.start(proxy(this._stats));
  }

  getStats() {
    return this._stats;
  }
}
