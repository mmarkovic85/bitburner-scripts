//
// ACCESS API
//

export const create_access_api = async (ns) => {
  // api methods
  const gain_root = (target_hostname, target_req_open_port, attacker_hostname = ns.getHostname()) => {
    switch (target_req_open_port) {
      case 5:
        if (ns.fileExists('SQLInject.exe', attacker_hostname)) {
          ns.sqlinject(target_hostname);
        }
      case 4:
        if (ns.fileExists('HTTPWorm.exe', attacker_hostname)) {
          ns.httpworm(target_hostname);
        }
      case 3:
        if (ns.fileExists('relaySMTP.exe', attacker_hostname)) {
          ns.relaysmtp(target_hostname);
        }
      case 2:
        if (ns.fileExists('FTPCrack.exe', attacker_hostname)) {
          ns.ftpcrack(target_hostname);
        }
      case 1:
        if (ns.fileExists('BruteSSH.exe', attacker_hostname)) {
          ns.brutessh(target_hostname);
        }
      case 0:
      default:
        if (ns.fileExists('NUKE.exe', attacker_hostname)) {
          ns.nuke(target_hostname);

          return true;
        }
        else {
          return false;
        }
    }
  };

  // api iface
  return { gain_root };
};
