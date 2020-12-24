import React, { FC, useEffect, useRef } from 'react';
import { useWorkerService } from '../provider/WorkerProvider';

interface Props {
  stream?: MediaStream;
}

const VideoStream: FC<Props> = ({ stream }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const { workerService } = useWorkerService();

  useEffect(() => {
    if (videoPlayerRef && videoPlayerRef.current && stream) {
      videoPlayerRef.current.srcObject = stream;
      videoPlayerRef.current.play();
      workerService?.setVideo(videoPlayerRef.current);
    }
  }, [videoPlayerRef.current, stream]);

  return <video ref={videoPlayerRef} muted autoPlay width={480} height={360} />;
};

export default VideoStream;
