from flask import Flask, request, render_template, jsonify
from transformers import BertForSequenceClassification, BertTokenizer
import torch

app = Flask(__name__)

# Load model and tokenizer
model_path = './phishing_model'
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)
model.eval()

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Print model label mapping
print("Model Configuration:", model.config)
if hasattr(model.config, "id2label"):
    print("Label Mapping:", model.config.id2label)
else:
    print("Label Mapping is not available.")

def predict(text):
    model.eval()
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

        # Use Softmax if needed
        probabilities = torch.nn.functional.softmax(logits, dim=1)

        spam_prob = probabilities[0][1].item()
        ham_prob = probabilities[0][0].item()

        # Debugging logs
        print(f"Logits: {logits}")
        print(f"Spam Probability: {spam_prob:.4f}, Ham Probability: {ham_prob:.4f}")

        # Adjust threshold if needed
        threshold = 0.6  # Change between 0.5 - 0.7 to test
        prediction = "Spam" if spam_prob < threshold else "Ham"

        print(f"Final Prediction: {prediction}")
        return prediction

# Flask routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('Main.html')

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.json
    text = data['text']
    prediction = predict(text)
    return jsonify({'prediction': prediction})

if __name__ == "__main__":
    app.run(debug=True)