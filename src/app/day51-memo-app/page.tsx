"use client";

import { useState, useEffect } from "react";
import BackToHomeButton from "@/components/BackToHomeButton";

interface Memo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Day51MemoApp() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");

  const API_BASE_URL = "http://localhost:8080";

  // サーバーの状態をチェック
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
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
  };

  // メモ一覧を取得
  const fetchMemos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/memos`);
      if (!response.ok) throw new Error("Failed to fetch memos");
      const data = await response.json();
      setMemos(data || []);
      setError("");
    } catch (err) {
      setError("メモの取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // メモを作成
  const createMemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("タイトルと内容を入力してください");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/memos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Failed to create memo");

      setTitle("");
      setContent("");
      setError("");
      await fetchMemos();
    } catch (err) {
      setError("メモの作成に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // メモ詳細を取得
  const viewMemo = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/memos/${id}`);
      if (!response.ok) throw new Error("Failed to fetch memo");
      const data = await response.json();
      setSelectedMemo(data);
      setError("");
    } catch (err) {
      setError("メモの取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (serverStatus === "checking") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <BackToHomeButton />
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">サーバー接続を確認中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (serverStatus === "offline") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <BackToHomeButton />
          <div className="bg-white rounded-xl shadow-xl p-8 mt-8">
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
                  className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  再接続を試みる
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <BackToHomeButton />

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                📝 メモ保存アプリ
              </h1>
              <p className="text-gray-600">
                Day51: Go + SQLite + GORM (Create, Read)
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">サーバー稼働中</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* メモ作成フォーム */}
          <form onSubmit={createMemo} className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">新規メモ作成</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="メモのタイトルを入力"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="メモの内容を入力"
                  rows={5}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "保存中..." : "メモを保存"}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* メモ一覧 */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">メモ一覧</h2>
            {loading && memos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">読み込み中...</div>
            ) : memos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                メモがまだありません
              </div>
            ) : (
              <div className="space-y-3">
                {memos.map((memo) => (
                  <div
                    key={memo.id}
                    onClick={() => viewMemo(memo.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedMemo?.id === memo.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 mb-1">{memo.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {memo.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(memo.createdAt).toLocaleString("ja-JP")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* メモ詳細 */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">メモ詳細</h2>
            {selectedMemo ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">タイトル</h3>
                  <p className="text-xl font-bold text-gray-800">{selectedMemo.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">内容</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMemo.content}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-500">作成日時:</span>
                      <p className="text-gray-700">
                        {new Date(selectedMemo.createdAt).toLocaleString("ja-JP")}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">更新日時:</span>
                      <p className="text-gray-700">
                        {new Date(selectedMemo.updatedAt).toLocaleString("ja-JP")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                メモを選択してください
              </div>
            )}
          </div>
        </div>

        {/* API情報 */}
        <div className="mt-8 bg-white rounded-xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📡 実装されたAPI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                <code className="text-sm">/api/memos</code>
              </div>
              <p className="text-sm text-gray-600">全メモ取得</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">POST</span>
                <code className="text-sm">/api/memos</code>
              </div>
              <p className="text-sm text-gray-600">メモ作成</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                <code className="text-sm">/api/memos/:id</code>
              </div>
              <p className="text-sm text-gray-600">メモ詳細取得</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

