import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ThemeConfig, ContactMessage } from './types';
import { INITIAL_PROJECTS, DEFAULT_THEME } from './constants';
import { collection, doc, onSnapshot, setDoc, deleteDoc, getDocFromServer } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

interface AppContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (proj: Project) => Promise<void>;
  updateProject: (proj: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  messages: ContactMessage[];
  addMessage: (msg: ContactMessage) => void;
  adminPassword: string;
  setAdminPassword: (pw: string) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(DEFAULT_THEME);
  const [projects, setProjectsState] = useState<Project[]>(INITIAL_PROJECTS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [adminPassword, setAdminPasswordState] = useState<string>('nyws0825');
  const [loading, setLoading] = useState<boolean>(true);

  // Validate Connection to Firestore on boot (as per SKILL.md critical instruction)
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'settings', 'theme'));
        console.log("Firebase Connection verified successfully.");
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  // Real-time synchronization
  useEffect(() => {
    let hasLoadedProjects = false;
    let hasLoadedTheme = false;
    let hasLoadedAdmin = false;
    let hasLoadedMessages = false;

    const checkLoadingComplete = () => {
      if (hasLoadedProjects && hasLoadedTheme && hasLoadedAdmin && hasLoadedMessages) {
        setLoading(false);
      }
    };

    // 1. Projects listener
    const unsubscribeProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const list: Project[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Project);
      });

      if (snapshot.empty) {
        // Seed if db is empty
        Promise.all(
          INITIAL_PROJECTS.map((proj) => setDoc(doc(db, 'projects', proj.id), proj))
        ).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, 'projects');
        });
      } else {
        // Sort projects: we can sort by date or id descending
        list.sort((a, b) => b.id.localeCompare(a.id));
        setProjectsState(list);
      }
      hasLoadedProjects = true;
      checkLoadingComplete();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'projects');
    });

    // 2. Theme listener
    const unsubscribeTheme = onSnapshot(doc(db, 'settings', 'theme'), (docSnap) => {
      if (docSnap.exists()) {
        setThemeState(docSnap.data() as ThemeConfig);
      } else {
        setDoc(doc(db, 'settings', 'theme'), DEFAULT_THEME).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, 'settings/theme');
        });
      }
      hasLoadedTheme = true;
      checkLoadingComplete();
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'settings/theme');
    });

    // 3. Admin password listener
    const unsubscribeAdmin = onSnapshot(doc(db, 'settings', 'admin'), (docSnap) => {
      if (docSnap.exists()) {
        setAdminPasswordState((docSnap.data() as { password?: string }).password || 'nyws0825');
      } else {
        setDoc(doc(db, 'settings', 'admin'), { password: 'nyws0825' }).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, 'settings/admin');
        });
      }
      hasLoadedAdmin = true;
      checkLoadingComplete();
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'settings/admin');
    });

    // 4. Messages listener
    const unsubscribeMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const list: ContactMessage[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as ContactMessage);
      });
      list.sort((a, b) => b.date.localeCompare(a.date));
      setMessages(list);
      hasLoadedMessages = true;
      checkLoadingComplete();
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'messages');
    });

    return () => {
      unsubscribeProjects();
      unsubscribeTheme();
      unsubscribeAdmin();
      unsubscribeMessages();
    };
  }, []);

  const setTheme = async (newTheme: ThemeConfig) => {
    try {
      await setDoc(doc(db, 'settings', 'theme'), newTheme);
      setThemeState(newTheme);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/theme');
    }
  };

  const setProjects = async (newProjects: Project[]) => {
    try {
      const currentMap = new Map(projects.map(p => [p.id, p]));
      const newMap = new Map(newProjects.map(p => [p.id, p]));

      // 1. Delete removed projects
      for (const [id] of currentMap.entries()) {
        if (!newMap.has(id)) {
          await deleteDoc(doc(db, 'projects', id));
        }
      }

      // 2. Add or update projects
      for (const [id, newProj] of newMap.entries()) {
        const currentProj = currentMap.get(id);
        if (!currentProj || JSON.stringify(currentProj) !== JSON.stringify(newProj)) {
          await setDoc(doc(db, 'projects', id), newProj);
        }
      }
      
      setProjectsState(newProjects);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'projects');
    }
  };

  const addProject = async (proj: Project) => {
    try {
      await setDoc(doc(db, 'projects', proj.id), proj);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `projects/${proj.id}`);
    }
  };

  const updateProject = async (proj: Project) => {
    try {
      await setDoc(doc(db, 'projects', proj.id), proj);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `projects/${proj.id}`);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
    }
  };

  const addMessage = async (msg: ContactMessage) => {
    try {
      await setDoc(doc(db, 'messages', msg.id), msg);
      setMessages(prev => [msg, ...prev]);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `messages/${msg.id}`);
    }
  };

  const setAdminPassword = async (pw: string) => {
    try {
      await setDoc(doc(db, 'settings', 'admin'), { password: pw });
      setAdminPasswordState(pw);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/admin');
    }
  };

  return (
    <AppContext.Provider value={{ 
      theme, 
      setTheme, 
      projects, 
      setProjects, 
      addProject,
      updateProject,
      deleteProject,
      messages, 
      addMessage,
      adminPassword,
      setAdminPassword,
      loading
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
