import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
require('@tensorflow/tfjs-backend-webgl');

export class Estimator {
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

  async estimate(bitmap: ImageBitmap) {
    if (!this._landmarkMode) {
      console.log('Landmark model is not loaded yet.');
      return;
    }
    this._context.drawImage(bitmap, 0, 0);
    const res = await this._landmarkMode.estimateFaces({
      input: this._canvas as any,
      predictIrises: true,
    });

    return res;
  }
}
