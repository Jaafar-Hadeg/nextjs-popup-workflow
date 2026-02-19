"use client";

import { useState } from "react";
import Modal from "./components/Modal";

type FormData = {
  name: string;
  plan: "basic" | "pro" | "enterprise";
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<FormData>({
    name: "",
    plan: "basic",
  });


  const startWorkflow = () => {
    setData({ name: "", plan: "basic" });
    setStep(1);
    setOpen(true);
  };


  const close = () => setOpen(false);


  const next = () => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)));
  const back = () => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)));


  const submit = () => {
    console.log("Données envoyées:", data);
    alert(`Terminé\nNom: ${data.name}\nPlan: ${data.plan}`);
    close();
  };

  const title =
    step === 1 ? "Étape 1 : Ton nom" : step === 2 ? "Étape 2 : Plan" : "Étape 3 : Confirmation";

  return (
    <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
          Workflow Popup (3 étapes)
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Clique pour lancer un workflow dans un modal.
        </p>

        <button
          onClick={startWorkflow}
          className="mt-5 rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Lancer le workflow
        </button>
      </div>

      <Modal open={open} onClose={close} title={title}>
        {/* etape1 */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Saisis ton nom puis clique sur Suivant.
            </p>

            <div>
              <label className="text-sm font-medium text-black dark:text-zinc-50">
                Nom
              </label>
              <input
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                placeholder="Ex: Ayoub"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={close}
                className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                onClick={next}
                disabled={!data.name.trim()}
                className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-black"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Choisis un plan, puis Suivant.
            </p>

            <div className="space-y-2">
              {(["basic", "pro", "enterprise"] as const).map((p) => (
                <label key={p} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.plan === p}
                    onChange={() => setData((d) => ({ ...d, plan: p }))}
                  />
                  <span className="capitalize text-black dark:text-zinc-50">{p}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={back}
                className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10"
              >
                Retour
              </button>
              <div className="flex gap-2">
                <button
                  onClick={close}
                  className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  onClick={next}
                  className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Vérifie puis confirme.
            </p>

            <div className="rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-700">
              <div className="text-black dark:text-zinc-50">
                <b>Nom :</b> {data.name || "-"}
              </div>
              <div className="text-black dark:text-zinc-50">
                <b>Plan :</b> {data.plan}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={back}
                className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10"
              >
                Retour
              </button>

              <div className="flex gap-2">
                <button
                  onClick={close}
                  className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  onClick={submit}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:opacity-90"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
