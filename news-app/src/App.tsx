import React, { Component } from "react";
import './App.scss';
import TopNews from './components/TopNews';
import SearchNews from './components/SearchNews';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Menubar } from 'primereact/menubar';
import { NewsSearchResponse } from "./common/common";
import {NewsSearchService} from './common/NewsSearchService';

interface AppProps {}
interface AppState {
  pageTitle: string;
  menuItems: Array<any>;
  searchResults: NewsSearchResponse[];
}

class App extends Component<AppProps, AppState> {
  newsSearchService:any = new NewsSearchService();
  constructor(props: AppProps) {
    super(props);

    this.state = {
      pageTitle: "Welcome",
      menuItems: [
        {
          label: "Top News",
          icon:"pi pi-eye",
          command:()=>{ 
            this.setState({
              pageTitle: "Top News",
              searchResults: []
            });
          }
        }
      ],
      searchResults: []
    }
  }

  handleSearch = (e:any) => {
    if (e.key != "Enter") return;

    const val = e.target.value;

    this.newsSearchService.searchNews(val).then((res:any) => {
      const newsArr: NewsSearchResponse[] = res.articles;
      this.setState({
        pageTitle: `Articles for ${val}`,
        searchResults: newsArr
      });
    })

  }

  componentDidMount() {
    this.showFirstItem();
  }

  componentDidUpdate() {
      this.showFirstItem();
  }

  showFirstItem = () => {
      const firstNewsItem = document.querySelectorAll(".collapsible legend a")[0] as HTMLElement;
      firstNewsItem.click();
  }

  render() {
    const {pageTitle, menuItems, searchResults} = this.state;
    console.log(this.state)
    const searchInput = (
      <div className="search-input">
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText id="lefticon" onKeyDown={this.handleSearch} placeholder="Search"/>
        </span>
      </div>
    );
    const topNewsButton = (
      <div className="top-news">
        <Button label="Top News" />
      </div>
    )
    return (
      <div className="app">
        <Menubar
            model={menuItems}
            end={searchInput}
        />
        <h1>{pageTitle}</h1>
          
        {searchResults.length == 0 ? <TopNews /> : <SearchNews newsSearchResponse={searchResults} />}
      </div>
    );
  }
}

export default App;
