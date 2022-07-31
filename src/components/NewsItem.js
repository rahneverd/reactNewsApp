import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, urlImage, urlNews, createdBy, createdAt, source} = this.props;
    return (
      <div className="my-3">
        <div className="card mx-auto" style={{width: "18rem"}}>
          <img src={urlImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{ title }...</h5>
            <span className="badge text-bg-primary">{source && source}</span>
            <p className="card-text">
              { description }...
            </p>
            <p className="card-text"><small className="text-muted">By {createdBy?createdBy : "Unknown"} on {createdAt}</small></p>
            <a rel="norefrence" href={urlNews} target="_blank" className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
