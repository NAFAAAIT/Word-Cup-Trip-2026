import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/api';

function ProtectedRoute({ children, requireAdmin = false }) {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await getMe();
                if (!mounted) return;
                const role = res?.user?.role;
                if (requireAdmin && role !== 'admin') {
                    navigate('/login');
                    return;
                }
                setChecking(false);
            } catch (e) {
                if (!mounted) return;
                navigate('/login');
            }
        })();
        return () => { mounted = false; };
    }, [navigate, requireAdmin]);

    if (checking) return <div className="p-8 text-center">Checking authentication...</div>;
    return children;
}

export default ProtectedRoute;
