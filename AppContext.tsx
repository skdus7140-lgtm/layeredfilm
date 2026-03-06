
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ThemeConfig, ContactMessage } from './types';
import { INITIAL_PROJECTS, DEFAULT_THEME } from './constants';

interface AppContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  messages: ContactMessage[];
  addMessage: (msg: ContactMessage) => void;
  adminPassword: string;
  setAdminPassword: (pw: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('layered_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  const [projects, setProjectsState] = useState<Project[]>(() => {
    const saved = localStorage.getItem('layered_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('layered_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    return localStorage.getItem('layered_admin_pw') || 'nyws0825';
  });

  useEffect(() => {
    localStorage.setItem('layered_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('layered_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('layered_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('layered_admin_pw', adminPassword);
  }, [adminPassword]);

  const setTheme = (newTheme: ThemeConfig) => setThemeState(newTheme);
  const setProjects = (newProjects: Project[]) => setProjectsState(newProjects);
  const addMessage = (msg: ContactMessage) => setMessages(prev => [msg, ...prev]);
  const setAdminPassword = (pw: string) => setAdminPasswordState(pw);

  return (
    <AppContext.Provider value={{ 
      theme, 
      setTheme, 
      projects, 
      setProjects, 
      messages, 
      addMessage,
      adminPassword,
      setAdminPassword
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
