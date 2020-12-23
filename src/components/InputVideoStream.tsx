import React, { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import VideoStream from './VideoStream';
import { inputMediaStreamAtom } from '../states/atom';

const InputVideoStream: FC = () => {
  const inputStream = useRecoilValue(inputMediaStreamAtom);

  return <VideoStream stream={inputStream} />;
};

export default InputVideoStream;
