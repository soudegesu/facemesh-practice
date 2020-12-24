// @ts-ignore
import Worker from 'comlink-loader!../worker/canvasmanager.worker';
import { transfer } from 'comlink';
import Stats from 'three/examples/jsm/libs/stats.module';

export class WorkerService {
  private _worker: Worker;
  private _stats: Stats;
  private _video?: HTMLVideoElement;
  private _offscreen?: OffscreenCanvas;
  private _offContext?: any;
  private _rafId = 0;

  constructor() {
    const worker = new Worker();
    this._worker = worker;
    this._stats = Stats();
  }

  setVideo(video: HTMLVideoElement) {
    this._video = video;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    if (!this._offscreen) {
      this._offscreen = canvas.transferControlToOffscreen();
      this._offContext = this._offscreen.getContext('2d');
    }
  }

  // async addVideoTrack(track: MediaStreamTrack) {

  //   const constraints = track.getConstraints();
  //   const width = constraints.width;
  //   const height = constraints.height;
  //   console.time('Call createEstimator from main thread');
  //   await this._worker.createEstimator({ width, height });
  //   console.timeEnd('Call createEstimator from main thread');
  //   console.time('Call setCaputurere from main thread');
  //   await this._worker.setCaputurere(proxy({ capturere }));
  //   console.timeEnd('Call setCaputurere from main thread');
  // }

  async start() {
    if (!this._offscreen) {
      return;
    }
    console.log('start');
    console.time('Call start from main thread');
    await this._worker.createEstimator({ width: 480, height: 360 });
    console.timeEnd('Call start from main thread');
    this._stats.begin();
    await this.estimate();
    this._stats.end();
  }

  estimate = async () => {
    if (this._video && this._offscreen) {
      this._offContext.drawImage(this._video, 0, 0);
      const bitmap = this._offscreen.transferToImageBitmap();
      await this._worker.estimate(transfer({ bitmap }, [bitmap]));
      bitmap.close();
    }
    if (this._stats) this._stats.update();
    this._rafId = requestAnimationFrame(this.estimate);
  };

  stop() {
    cancelAnimationFrame(this._rafId);
  }

  getStats() {
    return this._stats;
  }
}
