require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("./load-csv");

function knn(features, labels, predictPoint, k) {

    const {mean, variance} = tf.moments(features,0)

    const scaledPrediction = predictPoint.sub(mean).div(variance.pow(0.5))
  return features
      .sub(mean)
      .div(variance.pow(0.5))
      .sub(scaledPrediction)
      .pow(2)
      .sum(1)
      .pow(0.5)
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a,b)=> a.arraySync()[0]> b.arraySync()[0]? 1:-1)
      .slice(0, k)
      .reduce((acc,pair)=>acc+pair.arraySync()[1],0)/k
}

let { features, labels, testFeatures, testLabels } = loadCSV(
  "pune_places.csv",
  {
    shuffle: true,
    splitTest: 500,
    dataColumns: ["lat", "lon"],
    labelColumns: ["duration"]
  }
);

features = tf.tensor(features)
labels = tf.tensor(labels)

// testFeatures.forEach((testPoint, i) => {
//     const result = knn(features, labels, tf.tensor(testPoint), 10)
//     const error = ((testLabels[i][0] - result) / testLabels[i][0])
//     // console.log('Result', testPoint, result, testLabels[i][0])
//     console.log('Error', error*100)
// })

const result = knn(features, labels, tf.tensor([18.4355242,73.8929614]), 10)
console.log(result)

module.exports = {
  knn
}