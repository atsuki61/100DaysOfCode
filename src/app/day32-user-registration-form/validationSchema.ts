import * as yup from 'yup';

// ユーザー登録フォームのバリデーションスキーマ
export const userRegistrationSchema = yup.object({
  username: yup
    .string()
    .required('ユーザー名は必須です')
    .min(3, 'ユーザー名は3文字以上で入力してください')
    .max(20, 'ユーザー名は20文字以下で入力してください')
    .matches(/^[a-zA-Z0-9_]+$/, 'ユーザー名は英数字とアンダースコアのみ使用できます'),

  email: yup
    .string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),

  password: yup
    .string()
    .required('パスワードは必須です')
    .min(8, 'パスワードは8文字以上で入力してください')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'パスワードは大文字、小文字、数字、特殊文字を含む必要があります'
    ),

  confirmPassword: yup
    .string()
    .required('パスワード確認は必須です')
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),

  firstName: yup
    .string()
    .required('姓は必須です')
    .min(1, '姓を入力してください')
    .max(50, '姓は50文字以下で入力してください'),

  lastName: yup
    .string()
    .required('名は必須です')
    .min(1, '名を入力してください')
    .max(50, '名は50文字以下で入力してください'),

  age: yup
    .number()
    .required('年齢は必須です')
    .min(13, '13歳以上で登録してください')
    .max(120, '有効な年齢を入力してください')
    .typeError('年齢は数値で入力してください'),

  agreeToTerms: yup
    .boolean()
    .oneOf([true], '利用規約に同意する必要があります')
    .required('利用規約への同意は必須です'),
});

// バリデーションスキーマの型定義
export type UserRegistrationFormData = yup.InferType<typeof userRegistrationSchema>; 