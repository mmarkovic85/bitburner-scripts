/** @param {NS} ns */
export async function main(ns) {
  // args
  const [ target_hostname ] = ns.args;

  // config
  const moneyThresh = ns.getServerMaxMoney(target_hostname) * 0.95;
  const securityThresh = ns.getServerMinSecurityLevel(target_hostname) + 5;

  //main
  while (true) {
    if (ns.getServerSecurityLevel(target_hostname) > securityThresh) {
      await ns.weaken(target_hostname);
    }
    else if (ns.getServerMoneyAvailable(target_hostname) < moneyThresh) {
      await ns.grow(target_hostname);
    }
    else {
      await ns.hack(target_hostname);
    }
  }
}
