import { create_scan_api } from '/lib/scan_api.js';

/** @param {NS} ns */
export async function main(ns) {
  // config
  const scan_api = await create_scan_api(ns);
  const hostname_filter_fn = (hostname) => hostname !== 'home';

  // helpers
  const lazy_shutdown = (hostname) => {
    ns.killall(hostname);

    ns.ls(hostname, '.js').forEach((f) => ns.rm(f, hostname));
  };

  // main
  scan_api.list_hostnames().filter(hostname_filter_fn).forEach(lazy_shutdown);
}
