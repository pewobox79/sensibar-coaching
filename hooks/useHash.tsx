import { useEffect, useState } from 'react';

export function useHash() {
    const getHash = () => window.location.hash;

    const [hash, setHash] = useState<string>(() => getHash());

    useEffect(() => {
        const updateHash = () => setHash(getHash());

        window.addEventListener('hashchange', updateHash);
        window.addEventListener('popstate', updateHash);

        // Optional: bei Custom Navigation kannst du selbst den Hash setzen + updateHash aufrufen

        return () => {
            window.removeEventListener('hashchange', updateHash);
            window.removeEventListener('popstate', updateHash);
        };
    }, []);

    return hash;
}