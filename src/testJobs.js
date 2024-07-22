import minePoolAnimation from './assets/mine-pool-animation.gif';
import gpuAnimation from './assets/gpu-animation.gif';
import asicAnimation from './assets/ASIC-animation.gif';

export const jobs = [
  {
    asset: minePoolAnimation,
    name: 'Computer',
    baseIncome: 100,
    baseDuration: 5000,
    baseCostToUpgrade: 50,
  },
  {
    asset: asicAnimation,
    name: 'ASIC Miner',
    baseIncome: 200,
    baseDuration: 7000,
    baseCostToUpgrade: 100,
  },
  {
    asset: gpuAnimation,
    name: 'Graphics Card',
    baseIncome: 300,
    baseDuration: 10000,
    baseCostToUpgrade: 150,
  },
];
