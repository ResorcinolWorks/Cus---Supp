import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/5J4XleSfS/";

let model = null;

export async function loadPizzaModel() {
  if (model) return model;

  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  return model;
}

export async function classifyPizza(imageElement) {
  const model = await loadPizzaModel();
  const predictions = await model.predict(imageElement);

  // find highest probability
  const best = predictions.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );

  return {
    label: best.className, // "Overcooked" / "Normal"
    confidence: best.probability,
  };
}
