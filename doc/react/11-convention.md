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