import { getItem, setItem } from "@/utils/secureStorage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Flags = {
  seenOnboarding?: boolean;
  [key: string]: boolean | undefined;
};

type FeatureFlagsContextValue = {
  flags: Flags;
  setFlag: (key: string, value: boolean) => Promise<void>;
  setFlags: (next: Flags) => Promise<void>;
  hydrated: boolean;
};

const STORAGE_KEY = "featureFlags";

const defaultFlags: Flags = {
  seenOnboarding: false,
};

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(
  null
);

export function FeatureFlagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flags, setFlagsState] = useState<Flags>(defaultFlags);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Flags;
          setFlagsState({ ...defaultFlags, ...parsed });
        }
      } catch {
        // ignore storage errors
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  async function persist(next: Flags) {
    try {
      await setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  async function setFlag(key: string, value: boolean) {
    const next = { ...flags, [key]: value };
    setFlagsState(next);
    await persist(next);
  }

  async function setFlags(next: Flags) {
    const merged = { ...flags, ...next };
    setFlagsState(merged);
    await persist(merged);
  }

  return (
    <FeatureFlagsContext.Provider
      value={{ flags, setFlag, setFlags, hydrated }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx)
    throw new Error("useFeatureFlags must be used within FeatureFlagsProvider");
  return ctx;
}

export default FeatureFlagsProvider;
