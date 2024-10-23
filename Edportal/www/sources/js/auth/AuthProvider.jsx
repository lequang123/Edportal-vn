import { useNavigate, useLocation } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
// import { useAccountLogin } from '../queries/loginQueries';
// import parseJwt from '../utils/parseJwt';

export const defaultState = {
  isAuthenticated: false,
  token: undefined,
  initDone: false,
  login: undefined,
  logout: undefined,
};

export const AuthContext = createContext(defaultState);

export const withAuth = (Component) => {
  return (props) => {
    const authData = useContext(AuthContext);

    const componentProps = {
      ...props,
      authData: authData,
    };
    return <Component {...componentProps} />;
  };
};

export function AuthProvider({ children, ...props }) {
  const [authModel, setAuthModel] = useState(defaultState);
  const [paramUrl, setParamUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const resAccountLogin = () => {};

  const initializeAuth = () => {
    const initialAccessToken = Tokens.GetAccessToken();
    const decodedToken = parseJwt(initialAccessToken);

    setAuthModel({
      decodedToken: decodedToken,
      isAuthenticated: !!decodedToken,
      token: initialAccessToken,
      initDone: true,
      me: undefined,
      languageByUser: [],
      languageByDefault: [],
    });
  };

  useEffect(() => {
    const currentPath = location.pathname;
  }, [location]);

  const login = async (model) => {
    const res = await resAccountLogin.mutateAsync(model);

    const token = res.access_token;
    const refreshToken = res.refresh_token;

    Tokens.SetAccessToken(token);
    Tokens.SetRefreshToken(refreshToken);

    if (paramUrl !== '/login/') {
      navigate(-1); // Replaces `router.back()`
    } else {
      navigate('/'); // Replaces `router.push("/")`
    }
  };

  const logout = async () => {
    // Tokens.RemoveAccessToken();
    // Tokens.RemoveRefreshToken();
    navigate('/login'); // Replaces `router.push('/login')`

    // setAuthModel((prev) =>
    //   Object.assign(prev, {
    //     me: undefined,
    //     isAdmin: false,
    //     decodedToken: undefined,
    //     isAuthenticated: false,
    //     token: false,
    //     initDone: true,
    //   })
    // );
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/login/') {
      if (authModel?.isAuthenticated && !!authModel.me) {
        navigate('/'); // Replaces `router.push('/')`
      }
    }
  }, [authModel?.isAuthenticated, authModel.me, location]);

  useEffect(() => {
    let history = location.pathname;
    if (history !== undefined) {
      setParamUrl(history);
    }

    if (!authModel?.isAuthenticated && authModel?.initDone) {
      navigate({
        pathname: '/login',
        search: `?returnUrl=${location.pathname}`,
      }); // Replaces `router.push`
    }
  }, [authModel?.isAuthenticated, authModel?.initDone, location]);

  return (
    <AuthContext.Provider
      value={{
        ...authModel,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
