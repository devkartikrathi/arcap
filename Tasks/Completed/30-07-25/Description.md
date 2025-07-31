# Basics of Machine Learning

Machine Learning (ML) is a subset of Artificial Intelligence (AI) that enables systems to learn from data and improve their performance without being explicitly programmed.

## Types of Machine Learning

1. **Supervised Learning**
   - Input data is labeled.
   - Examples: Linear Regression, Decision Trees, SVM.
   - Use cases: Spam detection, house price prediction.

2. **Unsupervised Learning**
   - Input data is not labeled.
   - Examples: K-Means Clustering, PCA.
   - Use cases: Customer segmentation, anomaly detection.

3. **Reinforcement Learning**
   - An agent learns by interacting with the environment to maximize reward.
   - Use cases: Game AI, robotics, recommendation systems.

---

#  ML Workflow

The following are the major steps in a typical ML project:

## 1. Problem Definition
- Clearly understand and define the objective.
- Identify whether it's a classification, regression, clustering, etc.

## 2. Data Collection & Preprocessing
- Gather relevant datasets.
- Handle missing values, outliers, noise.
- Normalize or scale features if required.
- Encode categorical data.

## 3. Exploratory Data Analysis (EDA)
- Visualize the data (histograms, scatter plots, box plots).
- Analyze feature distributions, correlations.
- Understand trends and patterns.

## 4. Feature Engineering
- Select relevant features.
- Create new features from existing data.
- Remove irrelevant or redundant features.

## 5. Model Selection
- Choose appropriate ML algorithms based on the problem (e.g., Linear Regression, Random Forest, KNN, etc.).
- Split the data into **train**, **validation**, and **test** sets.

## 6. Model Training
- Train the model using the training dataset.
- Tune hyperparameters using validation data (GridSearch, RandomSearch).

## 7. Model Evaluation
- Evaluate the model using metrics:
  - Classification: Accuracy, Precision, Recall, F1 Score, ROC-AUC.
  - Regression: MSE, RMSE, MAE, R² Score.

## 8. 🚀 Model Deployment
- Save the model (Pickle/Joblib/ONNX).
- Serve via API (Flask/FastAPI).
- Deploy to cloud or integrate into applications.

---

# Summary Diagram (Workflow)

```plaintext
Problem Definition → Data Collection → Data Preprocessing → EDA → Feature Engineering →
Model Selection → Training → Evaluation → Improvement → Deployment → Monitoring
