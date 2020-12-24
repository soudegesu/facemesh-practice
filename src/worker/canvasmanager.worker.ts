// @ts-ignore
import Worker from 'comlink-loader!../worker/estimate.worker';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Estimator } from './estimate.worker';
import { transfer } from 'comlink';

let rafId = 0;
let statsRef: Stats;
// @ts-ignore
let videoCapturere: ImageCapture;
let estimator: Estimator;

export async function createEstimator({ width, height }: { width: number; height: number }) {
  console.time('createEstimator');
  const worker = new Worker();
  estimator = await new worker.Estimator({ width, height });
  console.timeEnd('createEstimator');
}

// @ts-ignore
export async function setCaputurere({ capturere }: { capturere: ImageCapture }) {
  console.time('setCaputurere');
  videoCapturere = capturere;
  console.timeEnd('setCaputurere');
}

export async function start(stats: Stats) {
  statsRef = stats;
  statsRef.begin();
  await estimate();
  statsRef.end();
}

export async function estimate() {
  console.time('start estimate');
  console.time('grab bitmap');
  const bitmap = await videoCapturere.grabFrame();
  console.timeEnd('grab bitmap');
  if (estimator) {
    console.time('estimator');
    await estimator.estimate(transfer({ bitmap }, [bitmap]));
    console.timeEnd('estimator');
    console.time('close bitmap');
    bitmap.close();
    console.timeEnd('close bitmap');
  }
  console.time('update stats');
  if (statsRef) statsRef.update();
  console.timeEnd('update stats');
  console.timeEnd('start estimate');
  console.log('-------------------');
  rafId = requestAnimationFrame(estimate);
}

export async function stopDraw() {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
  }
}
