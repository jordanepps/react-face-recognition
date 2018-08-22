import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'f4fb1eda85f4408d973898405fdbb9a7'
});

class ClarifaiSearch {
  getFaceData = image => {
    var promise = new Promise((resolve, reject) => {
      app.models.predict('a403429f2ddf4b49b307e318f00e528b', image).then(
        res => {
          resolve(res.outputs[0].data.regions);
        },
        err => {
          reject(err);
        }
      );
    });
    return promise;
  };
}

export default ClarifaiSearch;
