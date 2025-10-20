'use client'

import React, { useState } from 'react'

interface FormData {
  username: string
  email: string
}

interface FormErrors {
  username?: string
  email?: string
}

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'ユーザー名は必須です'
    } else if (formData.username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上である必要があります'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmittedData(formData)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="yamada_taro"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          送信
        </button>
      </form>

      {submittedData && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded" role="alert">
          <h4 className="font-semibold text-green-800 mb-2">送信成功！</h4>
          <p className="text-sm text-green-700">
            ユーザー名: {submittedData.username}
          </p>
          <p className="text-sm text-green-700">
            メール: {submittedData.email}
          </p>
        </div>
      )}
    </div>
  )
}

