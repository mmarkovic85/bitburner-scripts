import { main as create_scan_api } from '/lib/scan_api.js';

/** @param {NS} ns */
export async function main(ns) {
  // config
  const scan_api = await create_scan_api(ns);

  // main
  const files_repo = scan_api.list_hostnames().filter((h) => h !== 'home').reduce((acc, h) => {
    const host_files = ns.ls(h);

    if (host_files.length > 0) acc[h] = host_files;

    return acc;
  }, {});

  ns.tprintf(JSON.stringify(files_repo, null, 2));
}
