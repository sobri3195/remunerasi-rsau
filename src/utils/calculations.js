export const validateAllocation = ({ p2Direksi = 0, p2Pengelola = 0, p2Nakes = 0 }) => ({
  total: Number(p2Direksi) + Number(p2Pengelola) + Number(p2Nakes),
  isValid: Math.abs(Number(p2Direksi) + Number(p2Pengelola) + Number(p2Nakes) - 100) < 0.001
});

export const calculateInputRS = (input) => {
  const totalRevenue = Number(input.revenueJKN || 0) + Number(input.revenueNonJKN || 0);
  const poolJKN = Number(input.revenueJKN || 0) * (Number(input.poolPercentJKN || 0) / 100);
  const poolNonJKN = Number(input.revenueNonJKN || 0) * (Number(input.poolPercentNonJKN || 0) / 100);
  const totalPoolP2 = poolJKN + poolNonJKN;
  return {
    totalRevenue,
    poolJKN,
    poolNonJKN,
    totalPoolP2,
    poolDireksi: totalPoolP2 * (Number(input.p2Direksi || 0) / 100),
    poolPengelola: totalPoolP2 * (Number(input.p2Pengelola || 0) / 100),
    poolNakes: totalPoolP2 * (Number(input.p2Nakes || 0) / 100)
  };
};

const groupPoolKey = { Direksi: 'poolDireksi', Pengelola: 'poolPengelola', Nakes: 'poolNakes' };

export const calculateGroupTotals = (employees, inputRsCalc) => {
  const active = employees.filter((e) => e.status === 'Aktif');
  return ['Direksi', 'Pengelola', 'Nakes'].reduce((acc, group) => {
    const members = active.filter((e) => e.group === group);
    const totalScore = members.reduce((sum, e) => sum + Number(e.ffsScore || 0) * Number(e.iki || 0), 0);
    acc[group] = { totalScore, pool: inputRsCalc[groupPoolKey[group]] || 0, activeCount: members.length };
    return acc;
  }, {});
};

export const calculateEmployeeRemuneration = (employees, inputRsCalc) => {
  const groupTotals = calculateGroupTotals(employees, inputRsCalc);
  return employees.map((e) => {
    const p1Total = Number(e.baseSalary || 0) + Number(e.fixedRemun || 0);
    const individualScore = Number(e.ffsScore || 0) * Number(e.iki || 0);
    const gt = groupTotals[e.group] || { totalScore: 0, pool: 0 };
    const eligible = e.status === 'Aktif' && gt.totalScore > 0;
    const p2Individual = eligible ? (gt.pool * individualScore) / gt.totalScore : 0;
    return {
      ...e,
      p1Total,
      individualScore,
      poolGroup: gt.pool || 0,
      groupTotalScore: gt.totalScore || 0,
      p2Individual,
      totalRemuneration: p1Total + p2Individual,
      warning: e.status === 'Aktif' && gt.totalScore === 0 ? 'Total skor kelompok 0' : ''
    };
  });
};

export const calculateRekap = (employeesCalculated, inputRsCalc) => {
  const totalP1 = employeesCalculated.reduce((sum, e) => sum + e.p1Total, 0);
  const totalP2Distributed = employeesCalculated.reduce((sum, e) => sum + e.p2Individual, 0);
  const totalPoolP2 = inputRsCalc.totalPoolP2 || 0;
  const byGroup = ['Direksi', 'Pengelola', 'Nakes'].reduce((acc, group) => {
    const items = employeesCalculated.filter((e) => e.group === group);
    const active = items.filter((e) => e.status === 'Aktif');
    const totalP1Group = items.reduce((s, e) => s + e.p1Total, 0);
    const totalP2Group = items.reduce((s, e) => s + e.p2Individual, 0);
    const totalRemun = items.reduce((s, e) => s + e.totalRemuneration, 0);
    acc[group] = {
      activeCount: active.length,
      totalP1: totalP1Group,
      totalP2: totalP2Group,
      totalRemuneration: totalRemun,
      avgRemun: active.length ? totalRemun / active.length : 0
    };
    return acc;
  }, {});

  return {
    totalP1,
    totalPoolP2,
    totalP2Distributed,
    difference: totalPoolP2 - totalP2Distributed,
    grandTotal: totalP1 + totalP2Distributed,
    byGroup
  };
};
