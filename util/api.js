import axios from "axios";

export const getStorageProviders = () => {
    return fetch("https://e6yquilulj-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.12.2)%3B%20Browser", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,es;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-algolia-api-key": "30d22cbc023f961c0d7ba47de5b0a2b0",
            "x-algolia-application-id": "E6YQUILULJ"
        },
        "referrer": "https://filmine.io/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"requests\":[{\"indexName\":\"storage_providers\",\"query\":\"\",\"params\":\"filters=type%3Aactive&page=0&clickAnalytics=false&analytics=false&facets=%5B%22type%22%2C%22country%22%2C%22region%22%5D&facetFilters=%5B%5D&hitsPerPage=12\"}]}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
}


const MINER_ENDPOINT = 'https://api.filrep.io/api/v1/miners';
let cache = new Map();

export async function getMiners(options) {
  const { offset, limit, sortBy, order, search, region } = options || {}
  const url = MINER_ENDPOINT

  if (cache.has(url)) {
    return cache.get(url);
  }
  const data = axios.get(url, {
    params: {
      offset,
      limit,
      sortBy,
      order,
      search,
      region
    }
  }).then(res => res.data)
  cache.set(url, data);
  return data;
}
