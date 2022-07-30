import React, { Component } from 'react'
import NewsItem from './NewsItem'
const xmlJs = require('xml-js');

export class News extends Component {
  articles = []
  constructor() {
    super()
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      pageSize: 0
    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8&pageSize=18"
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), pageSize: Math.floor(parsedData.totalResults / 18)})
    } else {
      this.setState({articles : parsedData.articles, pageSize: Math.floor(parsedData.totalResults / 18)})
    }
    
  }
  handlePrevClick = async() => {
    console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8&pageSize=18&page=${this.state.page-1}`
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), page: this.state.page - 1})
    } else {
      this.setState({articles : parsedData.articles, page: this.state.page - 1})
    }
  }
  handleNextClick = async() => {
    console.log("next")
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8&pageSize=18&page=${this.state.page+1}`
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), page: this.state.page + 1})
    } else {
      this.setState({articles : parsedData.articles, page: this.state.page + 1})
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h2> NewsMonkey Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            if(!element.urlToImage) {element.urlToImage="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} urlImage={element.urlToImage} urlNews={element.url} />
              </div>
            )
          }
            )}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page == this.state.pageSize} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
