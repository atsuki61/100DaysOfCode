'use client';

type Props = {
  dataUrl: string;
  fileName?: string;
  disabled?: boolean;
};

export default function DownloadButton({ dataUrl, fileName = 'qrcode.png', disabled }: Props) {
  function onDownload() {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white transition-colors ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    > {/* 横パディング, 縦パディング, 角丸, 白文字, 色トランジション */}
      ダウンロード
    </button>
  );
}


