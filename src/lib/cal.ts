/**
 * Lazy loader for the Cal.com embed.
 *
 * The script is only fetched when someone actually clicks a booking button, so
 * visitors who never book pay nothing for it.
 *
 * Two things about Cal's embed are easy to get wrong:
 *
 * 1. embed.js requires a queueing stub on window.Cal to already exist when it
 *    runs — it upgrades that stub rather than creating it. Load the script bare
 *    and it throws "Cal is not defined. This shouldn't happen". installStub()
 *    below mirrors the stub from Cal's own install snippet, with loaded=true
 *    pre-set so it doesn't inject a second copy of the script behind our back.
 *
 * 2. Callers must handle rejection. Privacy blockers stop this request for a
 *    real share of visitors, and a booking button that silently does nothing is
 *    worse than no button. See BookingCard, which falls back to the hosted page.
 */

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/** Blockers tend to hang rather than error, so don't wait on them forever. */
const LOAD_TIMEOUT_MS = 6000;

type CalApi = ((...args: unknown[]) => void) & {
  q?: unknown[];
  ns?: Record<string, unknown>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * The queue embed.js expects to find. Calls made before the script finishes
 * land in `q` and are replayed once it takes over.
 */
function installStub(): CalApi {
  if (typeof window.Cal === "function") return window.Cal;

  const enqueue = (target: { q?: unknown[] }, args: IArguments) => {
    (target.q ??= []).push(args);
  };

  const cal = function (this: unknown) {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0] === "init") {
      const api = function () {
        // eslint-disable-next-line prefer-rest-params
        enqueue(api, arguments);
      } as CalApi;
      api.q = api.q || [];
      const namespace = args[1];
      if (typeof namespace === "string") {
        cal.ns![namespace] = (cal.ns![namespace] || api) as CalApi;
        enqueue(cal.ns![namespace] as CalApi, args);
        enqueue(cal, ["initNamespace", namespace] as unknown as IArguments);
      } else {
        enqueue(cal, args);
      }
      return;
    }
    enqueue(cal, args);
  } as CalApi;

  cal.q = [];
  cal.ns = {};
  // Tells the stub not to self-inject — this module owns loading so it can
  // detect failure, which the self-injecting version gives no way to observe.
  cal.loaded = true;

  window.Cal = cal;
  return cal;
}

/** Held across calls so two clicks share one script tag. Cleared on failure so a retry can work. */
let calPromise: Promise<CalApi> | null = null;

export function loadCal(): Promise<CalApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cal embed needs a browser"));
  }
  if (calPromise) return calPromise;

  const cal = installStub();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
  if (existing?.dataset.calReady === "true") return Promise.resolve(cal);

  calPromise = new Promise<CalApi>((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.src = EMBED_SRC;
    script.async = true;

    const timer = window.setTimeout(() => {
      teardown();
      reject(new Error("Cal embed timed out"));
    }, LOAD_TIMEOUT_MS);

    function teardown() {
      window.clearTimeout(timer);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    }

    function onLoad() {
      teardown();
      script.dataset.calReady = "true";
      cal("init", { origin: "https://cal.com" });
      resolve(cal);
    }

    function onError() {
      teardown();
      script.remove();
      reject(new Error("Cal embed failed to load"));
    }

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existing) document.head.appendChild(script);
  }).catch((err) => {
    calPromise = null;
    throw err;
  });

  return calPromise;
}

/** The theme the site is currently rendering, so the modal doesn't arrive in the wrong one. */
export function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
