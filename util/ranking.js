const G = Math.pow(10, 9);

export function computeRankScore(payload) {
    if(payload.reachability !== 'reachable') {
      return 0;
    }
    const power = parseInt(payload.rawPower)
    // const size = payload.maxPieceSize;
    // const powerQuality = payload.qualityAdjPower;
    const successRate = parseFloat(payload.storageDeals.successRate)
    const recent30days = parseInt(payload.storageDeals.recent30days);
    const uptime = parseFloat(payload.uptimeAverage);
    
    let rankScore = 0;
    // return Math.random() * 100;
 
    if (!Number.isNaN(successRate)) {
      rankScore += Math.min(successRate, 1) * 30;
    }

    if (!Number.isNaN(recent30days)) {
      rankScore += (Math.min(recent30days / 100, 1)) * 30;
    }

    if (uptime > 0) {
      rankScore += Math.min(uptime*uptime, 1) * 40;
    }

    if (rankScore > 100) {
      console.log('rankScore', rankScore);
    }
  
    return rankScore.toFixed(1);
  }
  