"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CookieConsentValue = "pending" | "accepted";

type CookieConsentContextValue = {
  consent: CookieConsentValue;
  mediaAllowed: boolean;
  accept: () => void;
  acceptAll: () => void;
  registerVideo: (video: HTMLVideoElement) => () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function playVideo(video: HTMLVideoElement) {
  video.controls = false;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  const attempt = video.play();
  if (attempt) void attempt.catch(() => undefined);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentValue>("pending");
  const videosRef = useRef(new Set<HTMLVideoElement>());
  const consentRef = useRef(consent);
  consentRef.current = consent;

  const grant = useCallback(() => {
    setConsent("accepted");
    videosRef.current.forEach(playVideo);
  }, []);

  const registerVideo = useCallback((video: HTMLVideoElement) => {
    videosRef.current.add(video);
    if (consentRef.current === "accepted") {
      playVideo(video);
    } else {
      video.pause();
      video.currentTime = 0;
    }
    return () => {
      videosRef.current.delete(video);
    };
  }, []);

  const value = useMemo(
    () => ({
      consent,
      mediaAllowed: consent === "accepted",
      accept: grant,
      acceptAll: grant,
      registerVideo,
    }),
    [consent, grant, registerVideo],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
