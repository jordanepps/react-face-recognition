import React, { Component } from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component {
  render() {
    return (
      <div className="image">
        <img id="inputed-image" alt="" src={this.props.img} />
        {this.props.showFaceBox(this.props.faces)}
      </div>
    );
  }
}

export default FaceRecognition;
