"use client";

import { useState } from "react";
import Modal from "./components/Modal";

type Plan = "basic" | "pro" | "enterprise";
type FormData = { name: string; plan: Plan };
type Step = 1 | 2 | 3;

const TOTAL_STEPS = 3;
const PLANS: { value: Plan; label: string }[] = [
  { value: "basic",      label: "Pour commencer" },
  { value: "pro",        label: "Pour avancer plus vite" },
  { value: "enterprise", label: "Pour équipes & entreprise" },
];

// Progress bar 
function SegmentedProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>Étape {step}/{total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="mt-2 flex overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={[
              "h-1.5 flex-1",
              i !== 0 ? "border-l border-white/50 dark:border-black/30" : "",
              i < step ? "bg-emerald-500 transition-all duration-300" : "bg-transparent",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

//  Step bodies 
function Step1({ name, onChange }: { name: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Saisissez  votre nom .
      </p>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Nom
        </label>
        <input
          id="name"
          autoFocus
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-black/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="Ex: Ayoub"
        />
      </div>
    </div>
  );
}

function Step2({ plan, onChange }: { plan: Plan; onChange: (v: Plan) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Chois du plan
      </p>
      <div className="space-y-3">
        {PLANS.map(({ value, label }) => {
          const selected = plan === value;
          return (
            <label
              key={value}
              className={[
                "flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition",
                "hover:bg-zinc-50 dark:hover:bg-white/5",
                selected
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : "border-zinc-200 dark:border-white/10",
              ].join(" ")}
            >
              <input
                type="radio"
                name="plan"
                value={value}
                checked={selected}
                onChange={() => onChange(value)}
                className="sr-only"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium capitalize text-zinc-900 dark:text-zinc-50">
                  {value}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
              </div>
              <span
                className={[
                  "grid h-5 w-5 place-items-center rounded-full border transition",
                  selected
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-zinc-300 bg-transparent dark:border-white/20",
                ].join(" ")}
              >
                <span className={["h-2 w-2 rounded-full bg-white transition", selected ? "scale-100" : "scale-0"].join(" ")} />
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Step3({ data }: { data: FormData }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">Vérifie.</p>
      <div className="rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-700">
        <div className="text-zinc-900 dark:text-zinc-50"><b>Nom :</b> {data.name || "-"}</div>
        <div className="text-zinc-900 dark:text-zinc-50"><b>Plan :</b> {data.plan}</div>
      </div>
    </div>
  );
}

// Btn styles
const btnOutline = "rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10";
const btnPrimary = "rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-black";

// Page
export default function Page() {
  const [open, setOpen]   = useState(false);
  const [step, setStep]   = useState<Step>(1);
  const [data, setData]   = useState<FormData>({ name: "", plan: "basic" });

  const close  = () => setOpen(false);
  const next   = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS) as Step);
  const back   = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const submit = () => {
    console.log("Données envoyées:", data);
    alert(`Terminé\nNom: ${data.name}\nPlan: ${data.plan}`);
    close();
  };

  const startWorkflow = () => {
    setData({ name: "", plan: "basic" });
    setStep(1);
    setOpen(true);
  };

  const titles: Record<Step, string> = {
    1: "Étape 1 : Ton nom",
    2: "Étape 2 : Plan",
    3: "Étape 3 : Confirmation",
  };

  const canGoNext = step === 1 ? data.name.trim().length > 0 : true;

  return (
    <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-black dark:text-zinc-50">Workflow Popup (3 étapes)</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Clique pour lancer un workflow.</p>
        <button onClick={startWorkflow} className={`mt-5 ${btnPrimary} px-5 py-3`}>
          Lancer le workflow
        </button>
      </div>

      <Modal open={open} onClose={close} title={titles[step]}>
        <SegmentedProgress step={step} total={TOTAL_STEPS} />

      
        {step === 1 && (
          <Step1 name={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} />
        )}
        {step === 2 && (
          <Step2 plan={data.plan} onChange={(v) => setData((d) => ({ ...d, plan: v }))} />
        )}
        {step === 3 && <Step3 data={data} />}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-2">
          <button onClick={step === 1 ? close : back} className={btnOutline}>
            {step === 1 ? "Annuler" : "Retour"}
          </button>

          <div className="flex gap-2">
            <button onClick={close} className={btnOutline}>Annuler</button>
            {step < TOTAL_STEPS ? (
              <button onClick={next} disabled={!canGoNext} className={btnPrimary}>
                Suivant
              </button>
            ) : (
              <button onClick={submit} className={btnPrimary}>
                Confirmer
              </button>
            )}
          </div>
        </div>
      </Modal>
    </main>
  );
}
