'use client';

import { useMemo, useState } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import type { QRCodeOptions } from '../types';
import OptionsForm from './OptionsForm';
import QRCodePreview from './QRCodePreview';
import DownloadButton from './DownloadButton';

const DEFAULTS: QRCodeOptions = {
  text: 'https://example.com',
  size: 256,
  margin: 2,
  level: 'M',
  foregroundColor: '#111827',
  backgroundColor: '#ffffff',
};

export default function QRCodeApp() {
  const [options, setOptions] = useState<QRCodeOptions>(DEFAULTS);
  const { dataUrl, error } = useQRCode(options);

  const canDownload = useMemo(() => Boolean(dataUrl && options.text.trim().length > 0), [dataUrl, options.text]);

  function handleChange<K extends keyof QRCodeOptions>(key: K, value: QRCodeOptions[K]) {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }

  function handlePreset(text: string) {
    setOptions((prev) => ({ ...prev, text }));
  }

  return (
    <div className="flex flex-col md:flex-row gap-6"> {/* 縦→md横並び, 間隔 */}
      <div className="flex-1">
        <QRCodePreview dataUrl={dataUrl} size={options.size} error={error} />
      </div>
      <div className="w-full md:w-[28rem]"> {/* mdで固定幅 */}
        <OptionsForm
          value={options}
          onChange={handleChange}
          onPreset={handlePreset}
        />
        <div className="mt-4 flex justify-end"> {/* 上余白, 右寄せ */}
          <DownloadButton dataUrl={dataUrl} disabled={!canDownload} fileName="qrcode.png" />
        </div>
      </div>
    </div>
  );
}


