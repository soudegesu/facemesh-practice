interface Props {
  constraints: MediaStreamConstraints;
}

export default function useUserMedia({ constraints }: Props) {
  const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  };

  return { getUserMedia };
}
