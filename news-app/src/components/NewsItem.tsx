import { NewsSearchResponse } from "../common/common";
import { Fieldset } from 'primereact/fieldset';
import React from "react";

interface NewsItemProps {
    item: NewsSearchResponse;
}

const NewsItem = (props:NewsItemProps) => {
    const {item} = props;
    const liveClass = item.title.toLowerCase().indexOf("live updates") != -1 ? "live" : "";
    return (
        <Fieldset className="collapsible" collapsed toggleable legend={item.title}>
            <div className="news-items">
                <a target="_blank" rel="noreferrer" href={item.url} title={item.title}>
                    <div className="image">
                        <img alt="News" src={item.urlToImage} />
                    </div>
                    <div className="info">
                        <p>{item.description}</p>
                        <p>{item.author}</p>
                    </div>
                </a>
            </div>
        </Fieldset>
        
    );
}

export default NewsItem;