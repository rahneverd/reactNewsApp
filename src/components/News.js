import React, { Component } from 'react'
import Spinner from './Spinner'
import NewsItem from './NewsItem'

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
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), pageSize: Math.floor(parsedData.totalResults / 18), loading: false})
    } else {
      this.setState({articles : parsedData.articles, pageSize: Math.floor(parsedData.totalResults / 18), loading: false})
    }
    
  }
  handlePrevClick = async() => {
    this.setState({loading: true})
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8&pageSize=18&page=${this.state.page-1}`
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), page: this.state.page - 1, loading: false})
    } else {
      this.setState({articles : parsedData.articles, page: this.state.page - 1, loading: false})
    }
  }
  handleNextClick = async() => {
    this.setState({loading: true})
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bb01b55267ad42e58d165fb938d9d2a8&pageSize=18&page=${this.state.page+1}`
    let data = await fetch(url)
    let parsedData = await data.json()
    if(parsedData.articles.length % 3) {
      let remainder = parsedData.articles.length % 3
      this.setState({articles : parsedData.articles.slice(0, -remainder), page: this.state.page + 1, loading: false})
    } else {
      this.setState({articles : parsedData.articles, page: this.state.page + 1, loading: false})
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'> NewsMonkey Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            if(!element.urlToImage) {element.urlToImage="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} urlImage={element.urlToImage} urlNews={element.url} />
              </div>
            )
          }
            )}
        </div>
        <div className='d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page == this.state.pageSize} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
