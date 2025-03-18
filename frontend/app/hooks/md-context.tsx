'use client'

import React, { createContext, useContext, useState } from 'react'

interface UserContextType {
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType>({
  markdown: "", 
  setMarkdown: () => {},
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {

  const [markdown, setMarkdown] = useState<string>("# Hello Markdown");

  return (
    <UserContext.Provider value={{markdown, setMarkdown}}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);
