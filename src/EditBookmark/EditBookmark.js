import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import config from '../config'
import './EditBookmark.css'

// const Required = () => <span className="AddBookmark__required">*</span>

class AddBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  }

  state = {
    error: null,
    bookmark: {}
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT+'/'+this.props.match.params.id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => 
        this.setState({
        bookmark: data
        })
      )
      .catch(error => this.setState({ error }))
  }

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const newBookmark = {}


    if (title.value) {newBookmark.title=title.value};
    if (url.value) {newBookmark.url = url.value};
    if (description.value) {newBookmark.description = description.value};
    if (rating.value) {newBookmark.rating = rating.value};

    this.setState({ error: null })
    fetch(config.API_ENDPOINT+'/'+this.props.match.params.id, {
      method: 'PATCH',
      body: JSON.stringify(newBookmark),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.status
      })
      .then(() => {
        const data = Object.assign(this.state.bookmark, newBookmark)
        this.props.onEditBookmark(data)
      })
      .then(this.props.history.push('/list'))
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className="AddBookmark">
        <h2>Edit bookmark {this.state.bookmark.id}</h2>
        <form className="AddBookmark__form" onSubmit={this.handleSubmit}>
          <div className="AddBookmark__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="title">
              Title 
            </label>
            <input placeholder={this.state.bookmark.title}
              type="text"
              name="title"
              id="title"
          
          
            />
          </div>
          <div>
            <label htmlFor="url">
              URL 
            </label>
            <input placeholder={this.state.bookmark.url}
              type="url"
              name="url"
              id="url"
              
              
            />
          </div>
          <div>
            <label htmlFor="description" >Description</label>
            <textarea name="description" id="description" placeholder={this.state.bookmark.description}/>
          </div>
          <div>
            <label htmlFor="rating">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              defaultValue={this.state.bookmark.rating}
              min="1"
              max="5"
            />
          </div>
          <div className="AddBookmark__buttons">
            <Link to='/list'>
              <button type="button" onClick={onClickCancel}>
                Cancel
              </button>
            </ Link>
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(AddBookmark)
