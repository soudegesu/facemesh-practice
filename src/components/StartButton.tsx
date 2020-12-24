import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useUserMedia from '../hooks/useUserMedia';
import { useWorkerService } from '../provider/WorkerProvider';
import { audioAtom, inputMediaStreamAtom, videoAtom, videoConstraintsAtom } from '../states/atom';

const StartButton: FC = () => {
  const { handleOnClick } = useStartButton();

  return (
    <Button variant="contained" color="primary" onClick={handleOnClick}>
      Start
    </Button>
  );
};

const useStartButton = () => {
  const audio = useRecoilValue(audioAtom);
  const video = useRecoilValue(videoAtom);
  const videoConstraints = useRecoilValue(videoConstraintsAtom);
  const { getUserMedia } = useUserMedia({ constraints: { video, audio } });
  const { workerService } = useWorkerService();

  const setInputMediaStream = useSetRecoilState(inputMediaStreamAtom);

  const handleOnClick = async () => {
    const stream = await getUserMedia();
    setInputMediaStream(stream);
    const [track] = stream.getVideoTracks();
    await track.applyConstraints(videoConstraints);
    await workerService?.start();
  };

  return { handleOnClick };
};

export default StartButton;
