import React, { Component } from 'react'
import NewsItem from './NewsItem'
const xmlJs = require('xml-js');

export class News extends Component {
  articles = []
  constructor() {
    super()
    this.state = {
      articles: this.articles,
      loading: false
    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8"
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles : parsedData.articles})
  }
  render() {

    return (
      <div className='container my-3'>
        <h2> NewsMonkey Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            if(element.urlToImage) {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} urlImage={element.urlToImage} urlNews={element.url} />
              </div>
            )
          }
            })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" class="btn btn-primary">&larr; Previous</button>
          <button type="button" class="btn btn-primary">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
