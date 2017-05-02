import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  state = {
    value: ''
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    Router.push({
      pathname: '/download',
      query: { code: this.state.value }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit">Download</button>
        </form>
      </div>
    )
  }
}
