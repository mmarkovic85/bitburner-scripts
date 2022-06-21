import { create_scan_api } from '/lib/scan_api.js';

/** @param {NS} ns */
export async function main(ns) {
  // args
  const [ sc_hack_script = '/scripts/sc_hack.js' ] = ns.args;

  // config
  const scan_api = await create_scan_api(ns);

  const hs_ram = ns.getScriptRam(sc_hack_script);

  // helpers
  const deploy_fn_factory = (s) => async () => {
    if (ns.fileExists(sc_hack_script, s.hostname) === false) {
      await ns.scp(sc_hack_script, s.hostname);
    }

    const max_threads = Math.floor(s.maxRam / hs_ram);
    ns.exec(sc_hack_script, s.hostname, max_threads, s.hostname);
  };

  // main
  const deploy_fns = scan_api
    .list_hostnames()
    .map((h) => ns.getServer(h))
    .filter((s) => s.hasAdminRights === true && s.cpuCores > 0 && s.maxRam > 0 && s.moneyMax > 0)
    .map((s) => deploy_fn_factory(s));

  for (const fn of deploy_fns) await fn();
}
