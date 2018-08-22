import React, { Component } from 'react';
import './ImageForm.css';

class ImageForm extends Component {
  render() {
    const { saveInput, imageUrl, submitImage } = this.props;
    return (
      <div>
        <h1>Paste an image to detect how many faces are in it</h1>
        <div className="input-box">
          <input type="text" onChange={saveInput} />
          <button
            onClick={() => {
              submitImage(imageUrl);
            }}
          >
            Detect
          </button>
        </div>
      </div>
    );
  }
}

export default ImageForm;
