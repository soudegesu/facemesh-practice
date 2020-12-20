import { atom } from 'recoil';

export const videoAtom = atom<boolean>({
  key: 'video',
  default: true,
});

export const videoConstraintsAtom = atom<{ width: number; height: number }>({
  key: 'videoConstraints',
  default: {
    width: 480,
    height: 360,
  },
});

export const audioAtom = atom<boolean>({
  key: 'audio',
  default: false,
});

export const inputMediaStreamAtom = atom<MediaStream | undefined>({
  key: 'inputMediaStream',
  default: undefined,
});
