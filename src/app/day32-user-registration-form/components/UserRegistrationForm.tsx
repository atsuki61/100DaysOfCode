'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { userRegistrationSchema, UserRegistrationFormData } from '../validationSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<UserRegistrationFormData>({
    resolver: yupResolver(userRegistrationSchema),
    mode: 'onChange', // リアルタイムバリデーション
  });

  const password = watch('password'); // パスワード確認用

  const onSubmit = async (data: UserRegistrationFormData) => {
    setIsSubmitting(true);
    
    // 実際のAPI呼び出しをシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('送信されたデータ:', data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    // 3秒後にフォームをリセット
    setTimeout(() => {
      setSubmitSuccess(false);
      reset();
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">登録完了！</h3>
            <p className="text-gray-600">ユーザー登録が正常に完了しました。</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">ユーザー登録</CardTitle>
        <CardDescription className="text-center">
          アカウントを作成してサービスを利用開始しましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ユーザー名 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              ユーザー名 *
            </label>
            <Input
              id="username"
              type="text"
              {...register('username')}
              className={`${errors.username ? 'border-red-500' : ''}`} // エラー時は赤枠
              placeholder="ユーザー名を入力"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス *
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={`${errors.email ? 'border-red-500' : ''}`} // エラー時は赤枠
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* パスワード */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード *
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className={`${errors.password ? 'border-red-500' : ''}`} // エラー時は赤枠
              placeholder="8文字以上で入力"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            {password && (
              <div className="mt-2 text-xs text-gray-600">
                <p>パスワード要件:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className={password.length >= 8 ? 'text-green-600' : 'text-red-500'}>
                    8文字以上
                  </li>
                  <li className={/[a-z]/.test(password) ? 'text-green-600' : 'text-red-500'}>
                    小文字を含む
                  </li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-500'}>
                    大文字を含む
                  </li>
                  <li className={/\d/.test(password) ? 'text-green-600' : 'text-red-500'}>
                    数字を含む
                  </li>
                  <li className={/[@$!%*?&]/.test(password) ? 'text-green-600' : 'text-red-500'}>
                    特殊文字を含む
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* パスワード確認 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード確認 *
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`${errors.confirmPassword ? 'border-red-500' : ''}`} // エラー時は赤枠
              placeholder="パスワードを再入力"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 姓名 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                姓 *
              </label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                className={`${errors.lastName ? 'border-red-500' : ''}`} // エラー時は赤枠
                placeholder="姓"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                名 *
              </label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                className={`${errors.firstName ? 'border-red-500' : ''}`} // エラー時は赤枠
                placeholder="名"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
          </div>

          {/* 年齢 */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              年齢 *
            </label>
            <Input
              id="age"
              type="number"
              {...register('age', { valueAsNumber: true })}
              className={`${errors.age ? 'border-red-500' : ''}`} // エラー時は赤枠
              placeholder="年齢を入力"
              min="13"
              max="120"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* 利用規約同意 */}
          <div className="flex items-start space-x-2">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register('agreeToTerms')}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                利用規約
              </a>
              と
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                プライバシーポリシー
              </a>
              に同意します *
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
          )}

          {/* 送信ボタン */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? '登録中...' : 'アカウント作成'}
          </Button>

          {/* フォーム状態表示 */}
          <div className="text-center text-sm text-gray-600">
            {isValid && !isSubmitting && (
              <p className="text-green-600">✓ フォームが有効です</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 