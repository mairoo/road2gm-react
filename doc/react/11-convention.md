# 1. 파일 최상단 import 구조

```ts
// 1) 외부 라이브러리 imports
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// 2) 내부 imports
import { useGetUserDataQuery, useUpdateUserMutation } from '@/store/api/userApi';
import { selectUser, updateUser } from '@/store/slices/userSlice';
import { RootState, AppDispatch } from '@/store/store';
import { ROUTES } from '@/constants/routes';
```

# 2. 타입 정의
```ts
interface Props {
  userId: string;
}

interface State {
  formData: UserFormData;
  isSubmitting: boolean;
}

interface UserFormData {
  name: string;
  email: string;
}
```

# 3. 컴포넌트 내부 구조 순서

```js
const Component: React.FC<Props> = ({prop}) => {
    // 1) react-router-dom 훅
    const navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') ?? '1';

    // 2) Redux 훅
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => selectUser(state));

    // 3) RTK Query 훅
    const {
        data: userData,
        isLoading: isUserDataLoading,
        error: userDataError
    } = useGetUserDataQuery(id);

    const [
        updateUserData,
        {isLoading: isUpdating}
    ] = useUpdateUserMutation();

    // 4) useState 훅: 로컬 상태변수
    const [formData, setFormData] = useState < UserFormData > ({
        name: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState < boolean > (false);

    // 5) useRef 훅
    const formRef = useRef < HTMLFormElement > (null);

    // 6) useMemo 훅: Memoized Values
    const isFormValid = useMemo(() => {
        return formData.name.length > 0 && formData.email.length > 0;
    }, [formData]);

    // 7) useEffect 훅
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                email: userData.email
            });
        }
    }, [userData]);

    // 8) 페이지 이동 네비게이션 핸들러
    const handleNavigateToHome = useCallback(() => {
        navigate(ROUTES.HOME);
    }, [navigate]);

    const handleNavigateToSettings = useCallback((userId: string) => {
        navigate({
            pathname: `${ROUTES.SETTINGS}/${userId}`,
            search: `?page=${currentPage}`
        });
    }, [navigate, currentPage]);

    // 9) 이벤트 핸들러
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await updateUserData({
                id,
                ...formData
            }).unwrap();

            dispatch(updateUser(result));
            handleNavigateToHome();
        } catch (error) {
            console.error('Failed to update user:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [id, formData, dispatch, updateUserData, handleNavigateToHome]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // 10) 헬퍼 함수
    const parseQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            page: parseInt(params.get('page') ?? '1'),
            sort: params.get('sort') ?? 'desc'
        };
    };

    // 11) 렌더 메소드 (복잡한 UI 부분)
    const renderError = () => {
        if (userDataError) {
            return <div className="error-message">Failed to load user data</div>;
        }
        return null;
    };

    const renderForm = () => {
        if (isUserDataLoading) {
            return <div>Loading...</div>;
        }

        return (
            <form ref={formRef} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting || isUpdating}
                >
                    Update Profile
                </button>
            </form>
        );
    };

    // 12) 메인 컴포넌트 렌더링 반환
    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            {renderError()}
            {renderForm()}
            <button onClick={handleNavigateToHome}>
                Back to Home
            </button>
        </div>
    );
};
```

# 4. 컴포넌트 export

```
export default Component;
```

# 요약
// 1. react-router-dom 훅
// 2. Redux 훅
// 3. RTK Query 훅
// 4. useState 훅
// 5. useRef 훅
// 6. useMemo 훅
// 7. useEffect 훅
// 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
// 9. 이벤트 핸들러 useCallback 훅
// 10. 헬퍼 함수
// 11. 렌더 메소드 (renderForm, renderError, renderList 등)
// 12. 메인 컴포넌트 렌더링 반환


```tsx
// 1) 외부 라이브러리 imports
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 2) 내부 imports
import { useGetUserDataQuery, useUpdateUserMutation } from '@/store/api/userApi';
import { selectUser, updateUser } from '@/store/slices/userSlice';
import { RootState, AppDispatch } from '@/store/store';
import { ROUTES } from '@/constants/routes';

// 타입 정의
interface Props {
  userId: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  website?: string;
}

// Yup 스키마 정의
const userFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('이름은 필수입니다')
    .min(2, '이름은 최소 2글자 이상이어야 합니다'),
  email: yup
    .string()
    .required('이메일은 필수입니다')
    .email('올바른 이메일 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호는 필수입니다')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다'
    ),
  confirmPassword: yup
    .string()
    .required('비밀번호 확인은 필수입니다')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  age: yup
    .number()
    .required('나이는 필수입니다')
    .min(1, '올바른 나이를 입력해주세요')
    .max(120, '올바른 나이를 입력해주세요'),
  website: yup
    .string()
    .url('올바른 URL 형식이 아닙니다')
    .nullable()
});

const UserFormComponent: React.FC<Props> = ({ userId }) => {
  // 1) react-router-dom 훅
  const navigate = useNavigate();
  const { id } = useParams();

  // 2) Redux 훅
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUser(state));

  // 3) RTK Query 훅
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError
  } = useGetUserDataQuery(id);

  const [updateUserData, { isLoading: isUpdating }] = useUpdateUserMutation();

  // 4) React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 0,
      website: ''
    }
  });

  // 5) 페이지 이동 네비게이션 핸들러
  const handleNavigateToHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  // 6) 폼 제출 핸들러
  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await updateUserData({
        id,
        ...data
      }).unwrap();

      dispatch(updateUser(result));
      handleNavigateToHome();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: '사용자 정보 업데이트에 실패했습니다.'
      });
    }
  };

  // 7) 에러 렌더링
  const renderError = () => {
    if (userDataError) {
      return <div className="text-red-500">사용자 데이터를 불러오는데 실패했습니다</div>;
    }
    return null;
  };

  // 8) 폼 필드 에러 메시지 렌더링
  const renderFieldError = (fieldName: keyof UserFormData) => {
    return errors[fieldName] && (
      <span className="text-sm text-red-500">{errors[fieldName]?.message}</span>
    );
  };

  // 9) 메인 폼 렌더링
  const renderForm = () => {
    if (isUserDataLoading) {
      return <div>Loading...</div>;
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            이름
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('name')}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('email')}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('password')}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('confirmPassword')}
        </div>

        <div className="space-y-1">
          <label htmlFor="age" className="text-sm font-medium">
            나이
          </label>
          <input
            id="age"
            type="number"
            {...register('age')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('age')}
        </div>

        <div className="space-y-1">
          <label htmlFor="website" className="text-sm font-medium">
            웹사이트 (선택)
          </label>
          <input
            id="website"
            type="url"
            {...register('website')}
            className="w-full p-2 border rounded"
          />
          {renderFieldError('website')}
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            disabled={isSubmitting || isUpdating}
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting || isUpdating ? '처리중...' : '프로필 업데이트'}
          </button>

          <button
            type="button"
            onClick={handleNavigateToHome}
            className="w-full p-2 text-gray-700 border rounded hover:bg-gray-100"
          >
            홈으로 돌아가기
          </button>
        </div>
      </form>
    );
  };

  // 10) 메인 컴포넌트 렌더링
  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold">사용자 프로필</h1>
      {renderError()}
      {renderForm()}
    </div>
  );
};

export default UserFormComponent;
```