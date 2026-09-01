import { useCallback, useEffect, useState } from "react";

import distributionApi from "../services/distributionApi";

export type AutopilotMode =
  | "assistido"
  | "automatico";

export type AutopilotSettings = {
  _id: string;
  userId: string;
  enabled: boolean;
  mode: AutopilotMode;
  channels: string[];
  dailyLimit: number;
  minIntervalMinutes: number;
  lastRunAt?: string | null;
  lastPublishedAt?: string | null;
};

export function useAutopilotSettings() {
  const [settings, setSettings] =
    useState<AutopilotSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await distributionApi.get(
        "/autopilot/settings"
      );

      setSettings(data?.settings || null);
    } catch (err: any) {
      console.log(
        "AUTOPILOT SETTINGS ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível carregar o KAEL Autopilot."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEnabled = useCallback(
    async (enabled: boolean) => {
      try {
        setUpdating(true);
        setError(null);

        const { data } = await distributionApi.put(
          "/autopilot/settings",
          {
            enabled,
          }
        );

        if (!data?.settings) {
          throw new Error(
            "O backend não retornou as configurações do KAEL."
          );
        }

        setSettings(data.settings);

        return data.settings;
      } catch (err: any) {
        console.log(
          "AUTOPILOT UPDATE ERROR:",
          err?.response?.data || err?.message
        );

        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Não foi possível alterar o KAEL Autopilot."
        );

        throw err;
      } finally {
        setUpdating(false);
      }
    },
    []
  );

const updateMode = useCallback(
  async (mode: AutopilotMode) => {
    try {
      setUpdating(true);
      setError(null);

      const { data } = await distributionApi.put(
        "/autopilot/settings",
        {
          mode,
        }
      );

      if (!data?.settings) {
        throw new Error(
          "O backend não retornou as configurações do KAEL."
        );
      }

      setSettings(data.settings);

      return data.settings;
    } catch (err: any) {
      console.log(
        "AUTOPILOT MODE ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível alterar o modo do KAEL."
      );

      throw err;
    } finally {
      setUpdating(false);
    }
  },
  []
);

const updateDailyLimit = useCallback(
  async (dailyLimit: number) => {
    try {
      setUpdating(true);
      setError(null);

      const { data } = await distributionApi.put(
        "/autopilot/settings",
        {
          dailyLimit,
        }
      );

      if (!data?.settings) {
        throw new Error(
          "O backend não retornou as configurações do KAEL."
        );
      }

      setSettings(data.settings);

      return data.settings;
    } catch (err: any) {
      console.log(
        "AUTOPILOT DAILY LIMIT ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível alterar o limite diário."
      );

      throw err;
    } finally {
      setUpdating(false);
    }
  },
  []
);

const updateMinInterval = useCallback(
  async (minIntervalMinutes: number) => {
    try {
      setUpdating(true);
      setError(null);

      const { data } = await distributionApi.put(
        "/autopilot/settings",
        {
          minIntervalMinutes,
        }
      );

      if (!data?.settings) {
        throw new Error(
          "O backend não retornou as configurações do KAEL."
        );
      }

      setSettings(data.settings);

      return data.settings;
    } catch (err: any) {
      console.log(
        "AUTOPILOT INTERVAL ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Não foi possível alterar o intervalo mínimo."
      );

      throw err;
    } finally {
      setUpdating(false);
    }
  },
  []
);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

 return {
  settings,
  loading,
  updating,
  error,
  reload: loadSettings,
  updateEnabled,
  updateMode,
  updateDailyLimit,
  updateMinInterval,
};
}