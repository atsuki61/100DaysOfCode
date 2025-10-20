import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserForm } from '../UserForm'

describe('UserForm コンポーネント', () => {
  // レンダリングテスト
  test('フォーム要素がすべて表示される', () => {
    render(<UserForm />)
    
    expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument()
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument()
  })

  test('プレースホルダーが正しく表示される', () => {
    render(<UserForm />)
    
    const usernameInput = screen.getByPlaceholderText('yamada_taro')
    const emailInput = screen.getByPlaceholderText('example@example.com')
    
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
  })

  // 入力テスト
  test('ユーザー名とメールアドレスを入力できる', async () => {
    const user = userEvent.setup()
    render(<UserForm />)
    
    const usernameInput = screen.getByLabelText('ユーザー名')
    const emailInput = screen.getByLabelText('メールアドレス')

    await user.type(usernameInput, 'testuser')
    await user.type(emailInput, 'test@example.com')

    expect(usernameInput).toHaveValue('testuser')
    expect(emailInput).toHaveValue('test@example.com')
  })

  // バリデーションテスト
  describe('バリデーション', () => {
    test('空のフォームを送信するとエラーメッセージが表示される', async () => {
      render(<UserForm />)
      
      const submitButton = screen.getByRole('button', { name: '送信' })
      fireEvent.click(submitButton)

      expect(await screen.findByText('ユーザー名は必須です')).toBeInTheDocument()
      expect(await screen.findByText('メールアドレスは必須です')).toBeInTheDocument()
    })

    test('ユーザー名が3文字未満の場合エラーが表示される', async () => {
      const user = userEvent.setup()
      render(<UserForm />)
      
      const usernameInput = screen.getByLabelText('ユーザー名')
      const emailInput = screen.getByLabelText('メールアドレス')
      const submitButton = screen.getByRole('button', { name: '送信' })

      await user.type(usernameInput, 'ab')
      await user.type(emailInput, 'test@example.com')
      fireEvent.click(submitButton)

      expect(
        await screen.findByText('ユーザー名は3文字以上である必要があります')
      ).toBeInTheDocument()
    })

    test('無効なメールアドレスの場合エラーが表示される', async () => {
      render(<UserForm />)
      
      const usernameInput = screen.getByLabelText('ユーザー名')
      const emailInput = screen.getByLabelText('メールアドレス')
      const submitButton = screen.getByRole('button', { name: '送信' })

      // 直接値を設定
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.click(submitButton)

      expect(
        await screen.findByText('有効なメールアドレスを入力してください')
      ).toBeInTheDocument()
    })
  })

  // 成功時の送信テスト
  test('有効なデータで送信すると成功メッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<UserForm />)
    
    const usernameInput = screen.getByLabelText('ユーザー名')
    const emailInput = screen.getByLabelText('メールアドレス')
    const submitButton = screen.getByRole('button', { name: '送信' })

    await user.type(usernameInput, 'testuser')
    await user.type(emailInput, 'test@example.com')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('送信成功！')).toBeInTheDocument()
      expect(screen.getByText('ユーザー名: testuser')).toBeInTheDocument()
      expect(screen.getByText('メール: test@example.com')).toBeInTheDocument()
    })
  })

  // エラーメッセージのアクセシビリティテスト
  test('エラーメッセージにrole="alert"が設定されている', async () => {
    render(<UserForm />)
    
    const submitButton = screen.getByRole('button', { name: '送信' })
    fireEvent.click(submitButton)

    const errorMessages = await screen.findAllByRole('alert')
    expect(errorMessages.length).toBeGreaterThan(0)
  })

  // フォームのクリア動作テスト
  test('エラー表示後に正しい入力をするとエラーが消える', async () => {
    const user = userEvent.setup()
    render(<UserForm />)
    
    const usernameInput = screen.getByLabelText('ユーザー名')
    const emailInput = screen.getByLabelText('メールアドレス')
    const submitButton = screen.getByRole('button', { name: '送信' })

    // 最初に空で送信
    fireEvent.click(submitButton)
    expect(await screen.findByText('ユーザー名は必須です')).toBeInTheDocument()

    // 正しい入力をして再送信
    await user.type(usernameInput, 'testuser')
    await user.type(emailInput, 'test@example.com')
    fireEvent.click(submitButton)

    // エラーが消えて成功メッセージが表示される
    await waitFor(() => {
      expect(screen.queryByText('ユーザー名は必須です')).not.toBeInTheDocument()
      expect(screen.getByText('送信成功！')).toBeInTheDocument()
    })
  })
})

