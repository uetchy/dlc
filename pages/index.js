import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const res = await fetch(`/download?code=${this.state.value}`)
    if (res.ok) {
      const body = await res.text()
      console.log(new Buffer(body))
      return
    }
    console.log(res)
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
