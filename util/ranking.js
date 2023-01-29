const GB = Math.pow(10, 9);

export function computeRankScore(payload) {
    if(payload.reachability !== 'reachable') {
      return 0;
    }
    const power = payload.rawPower;
    const size = payload.maxPieceSize;
    const deals = payload.storageDeals;
    const successRate = deals.successRate;
    const recent30days = payload.storageDeals.recent30days;
    const powerQuality = payload.qualityAdjPower;
    
    let rankScore = 0;
  
    rankScore += Math.min(successRate, 1) * 30;

    if(recent30days) {
      rankScore += (Math.min(recent30days, 100)) * .3;
    }

    if (power) {
      rankScore += Math.min(power / 10 / GB, 100) * .2;
    }

    if (deals) {
      rankScore += Math.min(deals / 100000, 1) * 20;
    }
  
    return rankScore;
  }
  