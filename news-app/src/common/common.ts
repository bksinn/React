export interface NewsSearchResponse {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    }
    title: string;
    url: string;
    urlToImage: string;
  }

const newsApiKey = "077a127d61454dadb8571ef07cc9231b";
export const newsApiUrl = `https://newsapi.org/v2/`;
