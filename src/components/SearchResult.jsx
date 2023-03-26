import React from 'react'
import Blog from './Blog'
import style from './BlogsCard.module.css'

const SearchResult = ({ blogs }) => {
  return (
    <div className={style.blogsCard}>
      {blogs.length > 0 ? blogs.map((blog, index) => <Blog  key={index} blog={blog} />) : <div className={style.noBlog}>No search result found</div>}
    </div>
  )
}

export default SearchResult
