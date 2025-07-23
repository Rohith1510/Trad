"use client";
import Navbar from "@/components/Navbar";
import { useMarketData, useMarketHistory } from "@/lib/marketData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
import GenAIChat from "@/components/GenAIChat";

function DashboardMarketData() {
  const { data, coinList, loading, error } = useMarketData();
  if (loading) return <div>Loading market data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  return (
    <table className="w-full text-left bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
      <thead>
        <tr className="bg-neutral-800">
          <th className="py-2 px-4">Coin</th>
          <th className="py-2 px-4">Price (USD)</th>
          <th className="py-2 px-4">24h Volume (USD)</th>
        </tr>
      </thead>
      <tbody>
        {coinList.map((coin) => (
          <tr key={coin.id} className="border-t border-neutral-800">
            <td className="py-2 px-4 font-semibold flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
              {coin.name} <span className="text-xs text-neutral-400 uppercase">({coin.symbol})</span>
            </td>
            <td className="py-2 px-4">${data?.[coin.id]?.usd?.toLocaleString() ?? "-"}</td>
            <td className="py-2 px-4">${data?.[coin.id]?.usd_24h_vol?.toLocaleString() ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PriceChart({ coinList, history }: { coinList: any[]; history: { [coin: string]: number[] } }) {
  const topCoins = coinList.slice(0, 3);
  const firstCoinId = topCoins[0]?.id;
  const labelLength = history[firstCoinId]?.length || 0;
  const labels = Array.from({ length: labelLength }, (_, i) => i + 1);
  const colors = ["#f7931a", "#627eea", "#00ffb9", "#fff", "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#2ecc40", "#e67e22"];
  const data = {
    labels,
    datasets: topCoins.map((coin, idx) => {
      const prices = history[coin.id] || [];
      const first = prices[0] || 1;
      // Calculate percent change from first value
      const percentChange = prices.map((p) => ((p - first) / first) * 100);
      return {
        label: coin.name,
        data: percentChange,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx % colors.length] + "33",
        tension: 0.3,
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
      };
    }),
  };
  return (
    <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 min-h-[200px]">
      <h3 className="text-lg font-semibold mb-2">Live Price Chart <span className='text-xs text-neutral-400'>(% change)</span></h3>
      <Line data={data} options={{
        responsive: true,
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: { x: { ticks: { color: "#aaa" } }, y: { ticks: { color: "#aaa" }, title: { display: true, text: '% Change', color: '#aaa' } } },
      }} />
    </div>
  );
}

export default function Features() {
  const { data, coinList, loading, error } = useMarketData();
  const history = useMarketHistory(30);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <main className="flex flex-col items-center gap-12 px-4 py-12">
        <h1 className="text-5xl font-bold m-12  text-center">Dashboard</h1>
        {/* --- Dashboard Section --- */}
        <section className="w-full max-w-4xl mb-12">
          <h2 className="text-2xl font-semibold mb-4">Live Crypto Dashboard</h2>
          <DashboardMarketData />
          {/* Chart and strategy overview placeholders */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <PriceChart coinList={coinList} history={history} />
            <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 min-h-[200px] flex flex-col">
              <h3 className="text-lg font-semibold mb-2">GenAI Trading Assistant</h3>
              <GenAIChat />
            </div>
          </div>
        </section>
        {/* --- End Dashboard Section --- */}
        <section className="max-w-3xl w-full grid gap-8">
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">AI-Powered Suggestions</h2>
            <p className="text-neutral-300">Get smart code completions and suggestions as you type, powered by advanced AI models.</p>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">Beautiful UI Components</h2>
            <p className="text-neutral-300">Access a library of modern, customizable UI components for rapid development.</p>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">Dark Mode by Default</h2>
            <p className="text-neutral-300">Enjoy a sleek, eye-friendly dark theme throughout your development experience.</p>
          </div>
        </section>
      </main>
    </div>
  );
}