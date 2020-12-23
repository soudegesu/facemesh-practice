// @ts-ignore
import Worker from 'comlink-loader!../worker/estimate.worker';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Estimator } from './estimate.worker';

let rafId = 0;
let statsRef: Stats;
// @ts-ignore
let videoCapturere: ImageCapture;
let estimator: Estimator;

export async function createEstimator({ width, height }: { width: number; height: number }) {
  const worker = new Worker();
  estimator = await new worker.Estimator({ width, height });
}

// @ts-ignore
export async function setCaputurere({ capturere }: { capturere: ImageCapture }) {
  videoCapturere = capturere;
}

export async function start(stats: Stats) {
  statsRef = stats;
  statsRef.begin();
  await estimate();
  statsRef.end();
}

export async function estimate() {
  const bitmap = await videoCapturere.grabFrame();

  if (estimator) {
    await estimator.estimate(bitmap);
  }

  if (statsRef) statsRef.update();
  rafId = requestAnimationFrame(estimate);
}

export async function stopDraw() {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
  }
}
