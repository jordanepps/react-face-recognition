import React, { Component } from 'react';
import Particles from 'react-particles-js';
import ImageForm from './Components/ImageForm/ImageForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import './App.css';
import ClarifaiSearch from './services/clarifai';

const cS = new ClarifaiSearch();
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      imageSaved: false,
      faceBoxes: [],
      error: null
    };
    this.submitImage = this.submitImage.bind(this);
    this.faceBox = this.faceBox.bind(this);
  }

  saveInput = e => {
    this.setState({ imageUrl: e.target.value, faceBoxes: [], error: null });
  };

  calcFaceBox = boundingBox => {
    let calcFaceBox = {};
    const image = document.getElementById('inputed-image');
    const width = Number(image.width);
    const height = Number(image.height);
    calcFaceBox.top = boundingBox.top_row * height;
    calcFaceBox.right = width - boundingBox.right_col * width;
    calcFaceBox.bottom = height - boundingBox.bottom_row * height;
    calcFaceBox.left = boundingBox.left_col * width;
    return calcFaceBox;
  };

  getFaceBoxes = data => {
    const faceBoxes = [];
    data.forEach(person => {
      let faceData = {
        boundingBox: this.calcFaceBox(person.region_info.bounding_box)
      };
      faceBoxes.push(faceData);
    });
    return faceBoxes;
  };

  faceBox = personData => {
    const faceBox = [];
    let key = 0;
    if (personData !== null) {
      personData.forEach(person => {
        console.log(person);
        let div = (
          <div className="bounding-box" style={person.boundingBox} key={key} />
        );
        key++;
        faceBox.push(div);
      });
      return faceBox;
    } else {
      return <div />;
    }
  };

  submitImage = url => {
    cS.getFaceData(url).then(
      data => {
        this.setState({
          faceBoxes: this.getFaceBoxes(data),
          imageSaved: true,
          error: null
        });
      },
      err => {
        this.setState({
          error: err,
          faceBoxes: []
        });
      }
    );
  };

  render() {
    let error;
    if (this.state.error) error = <ErrorMessage />;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <ImageForm
          imageUrl={this.state.imageUrl}
          saveInput={this.saveInput}
          submitImage={this.submitImage}
        />
        <FaceRecognition
          img={this.state.imageUrl}
          showFaceBox={this.faceBox}
          faces={this.state.faceBoxes}
        />
        {error}
      </div>
    );
  }
}

export default App;
