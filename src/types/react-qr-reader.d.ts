export let QrReader;
// types/react-qr-reader.d.ts
declare module 'react-qr-reader' {
  import { CSSProperties, FC } from 'react';

  export interface QrReaderProps {
    delay?: number;
    onError: (error: never) => void;
    onScan: (data: string | null) => void;
    style?: CSSProperties;
  }

  const QrReader: FC<QrReaderProps>;
  export default QrReader;
}
