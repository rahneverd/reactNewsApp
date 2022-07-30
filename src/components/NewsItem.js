import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, urlImage, urlNews} = this.props;
    return (
      <div className="my-3">
        <div className="card mx-auto" style={{width: "18rem"}}>
          <img src={urlImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{ title }...</h5>
            <p className="card-text">
              { description }...
            </p>
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
