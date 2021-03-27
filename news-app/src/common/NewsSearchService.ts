import { NewsSearchResponse } from "./common";

export class NewsSearchService {
    private newsApiKey: string = "077a127d61454dadb8571ef07cc9231b";
    public newsApiUrl: string = "https://newsapi.org/v2";

    private searchQuery: string = "everything?q=";

    constructor() {
        //this.searchNews("Tesla");
    }

    searchNews(userSearch: string | number): Promise<NewsSearchResponse[]> {
        return fetch(`${this.newsApiUrl}/everything?q=${userSearch}&apiKey=${this.newsApiKey}`)
            .then(res => res.json())
    }

    getTopUsNews(): Promise<NewsSearchResponse[]> {
        return fetch(`${this.newsApiUrl}//top-headlines?country=us&apiKey=${this.newsApiKey}`)
            .then(res => res.json())
    }
}