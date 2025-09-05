import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('http://localhost:8080/hello', {
      // Next.js Edge/Node fetch での再検討: 必要に応じてタイムアウトやヘッダ追加
      // mode や credentials はNode fetchでは不要
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
  }
}


