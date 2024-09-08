

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  };
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  };
  constructor(props){
    super(props);
    this.state={
      data : null,
loading : false,
page:1
    }
    document.title=`NewsJam-${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }
  async updateNews(){
    const url =`https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=d518e655f3834573a14838e218c18612&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    // const url=` https://newsapi.org/v2/top-headlines?country=&apiKey=d518e655f3834573a14838e218c18612`;
    fetch(url).then((res)=>{
        res.json().then((result)=>{
            console.log(result);
            this.setState({data:result.articles,totalResults:result.totalResults,loading:false})
        })
    })
  }

 handleNextClick = async () => {
  this.setState({page:this.state.page+1});
  this.updateNews();
};

handlePrevClick = async () => {
 this.setState({page:this.state.page-1});
 this.updateNews();
};


   


  componentDidMount(){
    this.updateNews();
}

  render() {
    return (
      <>
      
    <div className="container my-3">
      
      <h2 className='text-center' style={{margin:'40px 0px'}}>NewsJam -Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
     {/* {this.state.loading&& <Spinner/>}  */}
      <div className='row'>
        {this.state.data ? this.state.data.map((element)=>
          <div className="col-md-4" key={element.url} >
        <NewsItem title={element.title?.slice(0, 45)} description={element.description?.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
     
        </div>
        )
        : null
        }
        
      </div>
              <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Prev</button>
              <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>
      </div>
      </>
    )
  }
}

export default News;
