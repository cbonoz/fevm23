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
  
    rankScore += (successRate / 1) * 50;
    if(recent30days) {
      rankScore += (Math.min(recent30days, 100) / 100) * 50;
    }
  
    return rankScore;
  }
  