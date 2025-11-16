import { createContext, useContext, useState, useEffect } from "react";

const ClientContext = createContext();

export function ClientProvider({ children }) {
    const [clients, setClients] = useState(() => {
        const saved = localStorage.getItem('clients');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    }, [clients]);

    const addClient = (client) => {
        setClients(prev => [...prev, {id: Date.now(), ...client }]);
    };

    const updateClient = (id, updates) => {
        setClients(prev =>
            prev.map(c => c.id === id ? {...c, ...updates } : c)
        );
    };

    const deleteClient = (id) => {
        setClients(prev => prev.filter(c => c.id !== id))
    };

    return (
        <ClientContext.Provider value={{
            clients,
            addClient,
            updateClient,
            deleteClient
        }}>
            {children}
        </ClientContext.Provider>
    );
}

export const useClients = () => useContext(ClientContext);