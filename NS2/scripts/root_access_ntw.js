import { create_scan_api } from '/lib/scan_api.js';
import { create_access_api } from '/lib/access_api.js';

/** @param {NS} ns */
export async function main(ns) {
  // config
  const scan_api = await create_scan_api(ns);
  const access_api = await create_access_api(ns);

  const player_hack_skill = ns.getHackingLevel();

  // helpers
  const hostname_filter_fn = (hostname) => hostname !== 'home';

  const port_crakers_available = [ 'BruteSSH', 'FTPCrack', 'relaySMTP', 'HTTPWorm', 'SQLInject' ].reduce(
    (acc, p) => (ns.fileExists(`${p}.exe`) ? acc + 1 : acc),
    0
  );

  // main
  const servers = scan_api
    .list_hostnames()
    .filter(hostname_filter_fn)
    .map((h) => ns.getServer(h))
    .sort((a, b) => a.requiredHackingSkill - b.requiredHackingSkill);

  servers.forEach((s) => {
    if (s.requiredHackingSkill > player_hack_skill) {
      ns.tprintf(`WARNING ${s.hostname} req_hack_skill too high - ${s.requiredHackingSkill}`);
    }
    else if (port_crakers_available < s.numOpenPortsRequired) {
      ns.tprintf(`WARNING ${s.hostname} req_open_port too high - ${s.numOpenPortsRequired}`);
    }
    else if (s.hasAdminRights) {
      ns.tprintf(`INFO had root access for: ${s.hostname}`);
    }
    else {
      const has_root = access_api.gain_root(s.hostname, s.numOpenPortsRequired);

      has_root
        ? ns.tprintf(`INFO gained root access for: ${s.hostname}`)
        : ns.tprintf(`ERROR file NUKE.exe missing on host ${s.hostname}`);
    }
  });
}
