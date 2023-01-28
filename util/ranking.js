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
  
    rankScore += (power / 1000000000000) * 20;
    rankScore += (size / 100000000000) * 20;
    rankScore += (successRate / 1) * 20;
    if(recent30days) {
      rankScore += (Math.min(recent30days, 100) / 100) * 20;
    }
    rankScore += (powerQuality / 1000000000000) * 20;
  
    return rankScore;
  }
  