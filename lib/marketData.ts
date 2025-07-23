import { useEffect, useRef, useState } from "react";

const COIN_LIST_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
const INITIAL_POLL_INTERVAL = 10000; // 10 seconds
const MAX_POLL_INTERVAL = 60000; // 1 minute

export type MarketData = {
  [coin: string]: {
    usd: number;
    usd_24h_vol: number;
    name: string;
    symbol: string;
    image: string;
  };
};

export function useMarketData() {
  const [data, setData] = useState<MarketData | null>(null);
  const [coinList, setCoinList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollInterval, setPollInterval] = useState(INITIAL_POLL_INTERVAL);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await fetch(COIN_LIST_URL);
      if (!res.ok) throw new Error("Failed to fetch market data. You may be rate-limited. Please wait and try again.");
      const json = await res.json();
      setCoinList(json.map((c: any) => ({ id: c.id, name: c.name, symbol: c.symbol, image: c.image })));
      const mapped: MarketData = {};
      for (const c of json) {
        mapped[c.id] = {
          usd: c.current_price,
          usd_24h_vol: c.total_volume,
          name: c.name,
          symbol: c.symbol,
          image: c.image,
        };
      }
      setData(mapped);
      setLoading(false);
      setPollInterval(INITIAL_POLL_INTERVAL); // Reset poll interval on success
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setLoading(false);
      // Exponential backoff: double the interval up to max
      setPollInterval((prev) => Math.min(prev * 2, MAX_POLL_INTERVAL));
    }
  };

  useEffect(() => {
    fetchData();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchData, pollInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollInterval]);

  return { data, coinList, loading, error };
}

export type MarketHistory = {
  [coin: string]: number[]; // array of recent prices
};

export function useMarketHistory(maxPoints = 30) {
  const [history, setHistory] = useState<MarketHistory>({});
  const { data } = useMarketData();

  useEffect(() => {
    if (!data) return;
    setHistory((prev) => {
      const next: MarketHistory = { ...prev };
      for (const coin of Object.keys(data)) {
        const price = data[coin]?.usd;
        if (typeof price === "number") {
          next[coin] = [...(prev[coin] || []), price].slice(-maxPoints);
        }
      }
      return next;
    });
  }, [data, maxPoints]);

  return history;
} 