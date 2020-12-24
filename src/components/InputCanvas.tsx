import React, { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useWorkerService } from '../provider/WorkerProvider';
import { videoConstraintsAtom } from '../states/atom';

const InputCanvas: FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const constraints = useRecoilValue(videoConstraintsAtom);
  const { workerService } = useWorkerService();

  useEffect(() => {
    if (ref.current) {
      workerService?.setCanvas(ref.current);
    }
  }, [ref.current]);

  return <canvas ref={ref} width={constraints.width} height={constraints.height}></canvas>;
};

export default InputCanvas;
