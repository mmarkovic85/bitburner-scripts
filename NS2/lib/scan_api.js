/** @param {NS} ns */
export async function main(ns) {
  // api methods
  const list_hostnames = (hostname = ns.getHostname(), hostnames = []) => {
    if (hostnames.includes(hostname)) {
      return hostnames;
    }
    else {
      hostnames.push(hostname);

      return ns.scan(hostname).reduce((acc, h) => list_hostnames(h, acc), hostnames);
    }
  };

  // api iface
  return { list_hostnames };
}