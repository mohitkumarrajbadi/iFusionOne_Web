// utils/eventLogger.ts

export enum LogLevel {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARN = "WARN",
    ERROR = "ERROR",
    EVENT = "EVENT",
    FEATURE = "FEATURE",
  }
  
  export enum EventType {
    USER_ACTION = "USER_ACTION",
    PAGE_VIEW = "PAGE_VIEW",
    API_CALL = "API_CALL",
    SYSTEM = "SYSTEM",
    FEATURE_USAGE = "FEATURE_USAGE",
    CUSTOM = "CUSTOM",
  }
  
  export interface LogMeta {
    [key: string]: any;
    url?: string;
    userAgent?: string;
  }
  
  export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    eventType: EventType;
    message: string;
    meta: LogMeta;
  }
  
  let logs: LogEntry[] = [];
  
  export const logEvent = (
    level: LogLevel = LogLevel.INFO,
    eventType: EventType = EventType.CUSTOM,
    message: string = "",
    meta: LogMeta = {}
  ): void => {
    const timestamp = new Date().toISOString();
  
    const entry: LogEntry = {
      timestamp,
      level,
      eventType,
      message,
      meta: {
        ...meta,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    };
  
    logs.push(entry);
  
    try {
      // localStorage.setItem("appLogs", JSON.stringify(logs));
    } catch (error) {
      console.error("Failed to save logs to localStorage", error);
    }
  
    console.log(`[${timestamp}] [${level}] [${eventType}] ${message}`, entry.meta);
  };
  
  export const trackFeatureUsage = (
    featureName: string,
    details?: LogMeta
  ): void => {
    logEvent(
      LogLevel.FEATURE,
      EventType.FEATURE_USAGE,
      `Feature used: ${featureName}`,
      details || {}
    );
  };
  
  export const downloadLogs = (): void => {
    const formatted = logs
      .map(
        (log) =>
          `[${log.timestamp}] [${log.level}] [${log.eventType}] ${log.message}\nMETA: ${JSON.stringify(
            log.meta,
            null,
            2
          )}\n`
      )
      .join("\n");
  
    const blob = new Blob([formatted], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `app-log-${new Date().toISOString()}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  export const loadLogsFromStorage = (): void => {
    try {
      const saved = localStorage.getItem("appLogs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          logs = parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load logs from localStorage", error);
    }
  };
  