import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props;
    return (
      <div>
        <div className="card ">
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
            {source}

          </span>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text my-0">{description}...</p>
            <p className="card-text my-0"> <small class="text-muted ">By {author ? author : "Unknown"}</small></p>
            <p className="card-text"> <small class="text-muted">On {new Date(publishedAt).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
