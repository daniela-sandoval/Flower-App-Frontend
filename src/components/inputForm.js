import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeInputBouquet, turnOffLoading, turnOnLoading } from '../actions/bouquetActions'
import "../Stylesheets/inputForm.scss"

class inputForm extends Component {
  state = {
    title: "",
    sentence: "",
    errorStat: false,
  }

  componentDidMount() {
    this.props.turnOffLoading()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.persist()
    await this.props.makeInputBouquet(this.props.userId, this.state)
    if(this.props.errorStatus) {
      this.setState({errorStat: this.props.errorStatus, sentence: ""})
    } else {
      this.props.submitClick(event)
      this.props.turnOnLoading()
    }
  }

  handleClose = (event) => {
    this.props.submitClick(event)
  }

  render() {
    return (
    <div className="modal-input">
        <div className="modal-content-input">
          <span id="close-input" className="input" onClick={this.handleClose}>&times;</span>
          <h4>pls type a sentence</h4>
          <p>{this.state.errorStat ?  this.props.error : null}</p>
          <form className="input" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title Your Bouquet</label><br/>
            <input name="title" id="title" type="text" onChange={this.handleChange} value={this.state.title} placeholder="enter a title!"/><br/>

            <label htmlFor="sentence">Your Sentence</label><br/>
            <input name="sentence" id="sentence" type="text" onChange={this.handleChange} value={this.state.sentence} placeholder="enter a phrase!"/><br/>

            <input id="submit-btn" type="submit"/>
          </form>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.currentUser.id,
    errorStatus: state.userReducer.errorStatus,
    error: state.userReducer.error
  }
}

const mapDispatchToProps = {
  makeInputBouquet: makeInputBouquet,
  turnOnLoading: turnOnLoading,
  turnOffLoading: turnOffLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(inputForm)
