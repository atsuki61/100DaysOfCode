'use client';

type Props = {
  dataUrl: string;
  size: number;
  error: string | null;
};

export default function QRCodePreview({ dataUrl, size, error }: Props) {
  return (
    <div className="flex flex-col items-center"> {/* 縦, 中央寄せ */}
      <div className="relative rounded-xl border bg-gray-50 p-4 w-fit"> {/* 角丸, 枠線, 薄灰背景, 余白, 幅は中身にフィット */}
        {error ? (
          <div className="w-64 h-64 flex items-center justify-center text-red-600"> {/* 固定サイズ, 中央寄せ, 赤文字 */}
            {error}
          </div>
        ) : dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt="QRコード" width={size} height={size} className="rounded-md" />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center text-gray-500"> {/* プレースホルダー */}
            テキストを入力してください
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-gray-500"> {/* 上余白, 小さめ, 灰色 */}
        PNG画像としてプレビュー表示されます
      </p>
    </div>
  );
}


