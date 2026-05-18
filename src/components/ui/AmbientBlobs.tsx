import AmbientBlob from './AmbientBlob';

type BlobColor = 'white' | 'sky' | 'deep';

interface BlobConfig {
  color: BlobColor;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacityClass?: string;
}

interface AmbientBlobsProps {
  blobs: BlobConfig[];
}

export default function AmbientBlobs({ blobs }: AmbientBlobsProps) {
  return (
    <>
      {blobs.map((blob, i) => (
        <AmbientBlob
          key={i}
          color={blob.color}
          size={blob.size}
          top={blob.top}
          left={blob.left}
          right={blob.right}
          bottom={blob.bottom}
          className={blob.opacityClass}
        />
      ))}
    </>
  );
}
