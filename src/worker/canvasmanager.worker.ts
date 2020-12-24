// @ts-ignore
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
require('@tensorflow/tfjs-backend-webgl');

const rafId = 0;
let estimator: Estimator;

export async function createEstimator({ width, height }: { width: number; height: number }) {
  console.time('createEstimator');
  estimator = new Estimator({ width, height });
  console.timeEnd('createEstimator');
}

export async function estimate({ bitmap }: { bitmap: ImageBitmap }) {
  console.time('start estimate');
  if (estimator) {
    await estimator.estimate({ bitmap });
  }
  console.timeEnd('start estimate');
  console.log('-------------------');
}

export async function stopDraw() {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
  }
}

class Estimator {
  private _landmarkMode?: faceLandmarksDetection.FaceLandmarksDetector;
  private _canvas: OffscreenCanvas;
  private _context: OffscreenCanvasRenderingContext2D;

  constructor({ width, height }: { width: number; height: number }) {
    this._canvas = new OffscreenCanvas(width, height);
    this._context = this._canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

    (async () => {
      this._landmarkMode = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 },
      );
    })();
  }

  async estimate({ bitmap }: { bitmap: ImageBitmap }) {
    console.time('estimator');
    if (!this._landmarkMode) {
      console.log('Landmark model is not loaded yet.');
      return;
    }
    console.time('drawImage');
    this._context.drawImage(bitmap, 0, 0);
    console.timeEnd('drawImage');
    console.time('estimateFaces');
    const res = await this._landmarkMode.estimateFaces({
      input: this._canvas as any,
      predictIrises: true,
    });
    console.timeEnd('estimateFaces');
    console.timeEnd('estimator');
    return res;
  }
}
