
export const logout = (setAuth: React.Dispatch<React.SetStateAction<any>>) => {
    localStorage.removeItem('auth@temp');
    setAuth({ user: null, token: '' });
    if (typeof window !== 'undefined') {
        window.location.replace('/login');
    }
  };
  
