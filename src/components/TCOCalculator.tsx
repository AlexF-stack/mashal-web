"use client";

import { useState, useMemo } from "react";
import { Calculator, Info, TrendingDown, PenTool, Fuel } from "lucide-react";

export default function TCOCalculator() {
  const [acquisition, setAcquisition] = useState(120000);
  const [years, setYears] = useState(5);
  const [hoursPerYear, setHoursPerYear] = useState(1500);
  const [fuelRate, setFuelRate] = useState(15); // L/h
  const fuelPrice = 1.2;
  const [maintenanceRate, setMaintenanceRate] = useState(8); // $/h
  const [resalePercent, setResalePercent] = useState(30);

  const stats = useMemo(() => {
    const totalHours = years * hoursPerYear;
    const totalFuel = totalHours * fuelRate * fuelPrice;
    const totalMaint = totalHours * maintenanceRate;
    const resaleValue = acquisition * (resalePercent / 100);
    const totalCost = acquisition + totalFuel + totalMaint - resaleValue;
    const costPerHour = totalCost / totalHours;

    return {
      totalFuel,
      totalMaint,
      resaleValue,
      totalCost,
      costPerHour,
    };
  }, [acquisition, years, hoursPerYear, fuelRate, fuelPrice, maintenanceRate, resalePercent]);

  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-background shadow-lg shadow-primary/20">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-wider">Simulateur TCO</h3>
          <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">Calcul du coût total de possession</p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Controls */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Prix d&apos;acquisition ($)
              <span className="text-primary">{acquisition.toLocaleString()}</span>
            </label>
            <input 
              type="range" min="20000" max="500000" step="5000" 
              value={acquisition} onChange={(e) => setAcquisition(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Durée de détention (ans)
              <span className="text-primary">{years}</span>
            </label>
            <input 
              type="range" min="1" max="15" step="1" 
              value={years} onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Heures / an
              <span className="text-primary">{hoursPerYear}</span>
            </label>
            <input 
              type="range" min="500" max="4000" step="100" 
              value={hoursPerYear} onChange={(e) => setHoursPerYear(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Consommation (L/h)
              <span className="text-primary">{fuelRate}</span>
            </label>
            <input 
              type="range" min="5" max="60" step="1" 
              value={fuelRate} onChange={(e) => setFuelRate(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Maintenance ($/h)
              <span className="text-primary">{maintenanceRate}</span>
            </label>
            <input 
              type="range" min="2" max="30" step="1" 
              value={maintenanceRate} onChange={(e) => setMaintenanceRate(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm font-bold text-foreground/80">
              Valeur de revente (%)
              <span className="text-primary">{resalePercent} %</span>
            </label>
            <input 
              type="range" min="10" max="60" step="5" 
              value={resalePercent} onChange={(e) => setResalePercent(parseInt(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-primary p-8 text-background shadow-xl shadow-primary/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Coût Total Net</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black">{Math.round(stats.totalCost).toLocaleString()}</span>
              <span className="text-xl font-bold">$</span>
            </div>
            <div className="mt-6 pt-6 border-t border-background/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Coût / Heure</span>
              <span className="text-xl font-black">{stats.costPerHour.toFixed(2)} $</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/5 p-5">
              <Fuel className="h-5 w-5 text-primary mb-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Carburant</p>
              <p className="text-lg font-bold">{Math.round(stats.totalFuel).toLocaleString()} $</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/5 p-5">
              <PenTool className="h-5 w-5 text-primary mb-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Entretien</p>
              <p className="text-lg font-bold">{Math.round(stats.totalMaint).toLocaleString()} $</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/5 p-5 col-span-2">
              <TrendingDown className="h-5 w-5 text-green-500 mb-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Valeur de revente estimée</p>
              <p className="text-lg font-bold text-green-500">+{Math.round(stats.resaleValue).toLocaleString()} $</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-start gap-4 rounded-2xl bg-primary/10 p-6 border border-primary/20">
        <Info className="h-5 w-5 text-primary shrink-0 mt-1" />
        <p className="text-sm leading-relaxed text-foreground/70">
          Ce simulateur fournit une estimation basée sur les moyennes du secteur. Pour une étude de rentabilité précise adaptée à votre projet minier ou BTP, nos experts sont à votre disposition.
        </p>
      </div>
    </div>
  );
}
