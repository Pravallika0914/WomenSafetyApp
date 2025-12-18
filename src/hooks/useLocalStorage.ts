import { useEffect, useState } from "react";

const STORAGE_KEY = "women-safety-app-preferences";

interface Preferences {
  selectedState: string;
  lastAccessedMode: string;
  hasVisitedBefore: boolean;
}

const defaultPreferences: Preferences = {
  selectedState: "Delhi",
  lastAccessedMode: "home",
  hasVisitedBefore: false,
};

export const useLocalStorage = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsed, hasVisitedBefore: true });
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = (updates: Partial<Preferences>) => {
    const newPrefs = { ...preferences, ...updates };
    setPreferences(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
  };

  return { preferences, savePreferences };
};
