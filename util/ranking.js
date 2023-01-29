const G = Math.pow(10, 9);

export function computeRankScore(payload) {
    if(payload.reachability !== 'reachable') {
      return 0;
    }
    const power = parseInt(payload.rawPower)
    const deals = parseInt(payload.storageDeals)
    // const size = payload.maxPieceSize;
    // const powerQuality = payload.qualityAdjPower;
    const successRate = parseFloat(deals.successRate)
    const recent30days = parseInt(payload.storageDeals.recent30days);
    
    let rankScore = 0;
 
    if (!Number.isNaN(successRate)) {
      rankScore += Math.min(successRate, 1) * 30;
    }

    if (!Number.isNaN(recent30days)) {
      rankScore += (Math.min(recent30days / 100, 1)) * 30;
    }

    if (!Number.isNaN(power)) {
      rankScore += Math.min(power / (10*G), 1) * 20;
    }

    if (!Number.isNaN(deals)) {
      rankScore += Math.min(deals / 100000, 1) * 20;
    }

    if (rankScore > 100) {
    console.log('rankScore', rankScore);
    }
  
    return rankScore;
  }
  