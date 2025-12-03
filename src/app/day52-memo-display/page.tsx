"use client";

import { useState, useEffect, useCallback } from "react";

// メモの型定義
interface Memo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Day52MemoDisplay() {
  // 状態管理
  const [memos, setMemos] = useState<Memo[]>([]); // メモ一覧
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null); // 選択中のメモ
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState(""); // エラーメッセージ
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking"); // サーバー状態

  // Go APIのベースURL（Day51で作成したサーバー）
  const API_BASE_URL = "http://localhost:8080";

  // メモ一覧を取得する関数
  const fetchMemos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Go APIにGETリクエストを送信
      const response = await fetch(`${API_BASE_URL}/api/memos`);

      // レスポンスが成功でない場合はエラーを投げる
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      // JSONデータを取得
      const data: Memo[] = await response.json();

      // 状態を更新
      setMemos(data || []);
      setServerStatus("online");
    } catch (err) {
      // エラー処理
      setServerStatus("offline");
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Goサーバーに接続できません。サーバーが起動しているか確認してください。");
      } else if (err instanceof Error) {
        setError(`エラー: ${err.message}`);
      } else {
        setError("メモの取得に失敗しました。");
      }
      console.error("エラー:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // サーバーの状態をチェックする関数
  const checkServerStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hello`);
      if (response.ok) {
        setServerStatus("online");
        fetchMemos();
      } else {
        setServerStatus("offline");
      }
    } catch {
      setServerStatus("offline");
    }
  }, [fetchMemos]);

  // サーバーの状態をチェック
  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  // メモ詳細を取得する関数
  const fetchMemoDetail = async (id: number) => {
    try {
      setLoading(true);
      setError("");

      // Go APIにGETリクエストを送信（ID指定）
      const response = await fetch(`${API_BASE_URL}/api/memos/${id}`);

      // レスポンスが成功でない場合はエラーを投げる
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      // JSONデータを取得
      const data: Memo = await response.json();

      // 選択中のメモを更新
      setSelectedMemo(data);
    } catch (err) {
      // エラー処理
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Goサーバーに接続できません。サーバーが起動しているか確認してください。");
        setServerStatus("offline");
      } else if (err instanceof Error) {
        setError(`エラー: ${err.message}`);
      } else {
        setError("メモの取得に失敗しました");
      }
      console.error("エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  // 日時をフォーマットする関数
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP");
  };

  // サーバー接続確認中の表示
  if (serverStatus === "checking") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">サーバー接続を確認中...</p>
        </div>
      </div>
    );
  }

  // サーバーがオフラインの場合の表示
  if (serverStatus === "offline") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Goサーバーが起動していません
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <p className="text-gray-600">以下のコマンドでサーバーを起動してください：</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <p>cd server</p>
                <p>go run main.go</p>
              </div>
              <p className="text-sm text-gray-500">
                サーバーが起動したら、このページをリロードしてください。
              </p>
              <button
                onClick={checkServerStatus}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                再接続を試みる
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* エラーメッセージ表示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* サーバー接続確認とリロードボタン */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">メモ一覧</h2>
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">サーバー稼働中</span>
          </div>
        </div>
        <button
          onClick={fetchMemos}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "読み込み中..." : "再読み込み"}
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側: メモ一覧 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">メモ一覧</h3>

          {loading && memos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">読み込み中...</div>
          ) : memos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              メモがまだありません
              <br />
              <span className="text-sm">
                Day51のアプリでメモを作成してください
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {memos.map((memo) => (
                <div
                  key={memo.id}
                  onClick={() => fetchMemoDetail(memo.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedMemo?.id === memo.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <h4 className="font-bold text-gray-800 mb-1">{memo.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {memo.content}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(memo.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 右側: メモ詳細 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">メモ詳細</h3>

          {selectedMemo ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">タイトル</h4>
                <p className="text-xl font-bold text-gray-800">{selectedMemo.title}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">内容</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMemo.content}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-500">作成日時:</span>
                    <p className="text-gray-700">{formatDate(selectedMemo.createdAt)}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-500">更新日時:</span>
                    <p className="text-gray-700">{formatDate(selectedMemo.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              左側のメモをクリックして詳細を表示
            </div>
          )}
        </div>
      </div>

      {/* API情報 */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📡 使用しているAPI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                GET
              </span>
              <code className="text-sm">/api/memos</code>
            </div>
            <p className="text-sm text-gray-600">全メモを取得</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                GET
              </span>
              <code className="text-sm">/api/memos/:id</code>
            </div>
            <p className="text-sm text-gray-600">指定IDのメモを取得</p>
          </div>
        </div>
      </div>
    </div>
  );
}

