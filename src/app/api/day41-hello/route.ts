import { NextResponse } from 'next/server'

export async function GET() {
  // デプロイ時（Vercel等）はモックレスポンスを返す
  return NextResponse.json({ message: "Hello, Go! (Mock for Vercel)" }, { status: 200 });

  // ローカル開発時のGoサーバー連携コード（コメントアウト）
  /*
  try {
    const upstream = await fetch('http://127.0.0.1:8080/hello', { cache: 'no-store' });
    const contentType = upstream.headers.get('content-type') || '';

    if (!upstream.ok) {
      const body = await upstream.text().catch(() => '');
      return NextResponse.json({ error: 'Upstream error', status: upstream.status, body }, { status: 502 });
    }

    if (contentType.includes('application/json')) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: 200 });
    }

    // 非JSONの場合はテキストをJSONにラップ
    const text = await upstream.text();
    return NextResponse.json({ message: text }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Upstream fetch failed', message }, { status: 502 });
  }
  */
}


