// DOM elements
const predictBtn = document.getElementById('predictBtn');
const testBtn = document.getElementById('testBtn');
const toggleAnalysisBtn = document.getElementById('toggleAnalysis');
const predictionResult = document.getElementById('predictionResult');
const predictedPrice = document.getElementById('predictedPrice');
const analysisContent = document.getElementById('analysisContent');

// Sample test data (simplified version of the actual model input)
const testData = {
    lotArea: 8450,
    overallQual: 7,
    yearBuilt: 2003,
    livingArea: 1710,
    basementArea: 856,
    bedrooms: 3,
    fullBath: 2,
    fireplaces: 1,
    garageCars: 2,
    garageArea: 548,
    neighborhood: 'NAmes',
    houseStyle: '1Story',
    exterQual: 'Gd',
    kitchenQual: 'Gd'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    console.log('House Price Predictor initialized');

    // Add event listeners
    predictBtn.addEventListener('click', handlePrediction);
    testBtn.addEventListener('click', loadTestData);
    toggleAnalysisBtn.addEventListener('click', toggleAnalysis);

    // Add form validation
    addFormValidation();
});

// Handle prediction button click
async function handlePrediction() {
    try {
        // Show loading state
        predictBtn.classList.add('loading');
        predictBtn.textContent = 'Predicting...';

        // Get form data
        const formData = getFormData();

        // Validate form data
        if (!validateFormData(formData)) {
            showError('Please fill in all required fields with valid values.');
            return;
        }

        // Simulate API call (in a real app, this would call your Python backend)
        const prediction = await simulatePrediction(formData);

        // Display result
        displayPrediction(prediction);

    } catch (error) {
        console.error('Prediction error:', error);
        showError('An error occurred while making the prediction. Please try again.');
    } finally {
        // Reset loading state
        predictBtn.classList.remove('loading');
        predictBtn.textContent = 'Predict Price';
    }
}

// Load test data into form
function loadTestData() {
    try {
        // Populate form with test data
        Object.keys(testData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = testData[key];
            }
        });

        // Show success message
        showSuccess('Test data loaded successfully! Click "Predict Price" to see the result.');

    } catch (error) {
        console.error('Error loading test data:', error);
        showError('Error loading test data. Please try again.');
    }
}

// Toggle analysis section visibility
function toggleAnalysis() {
    const isHidden = analysisContent.classList.contains('hidden');

    if (isHidden) {
        analysisContent.classList.remove('hidden');
        toggleAnalysisBtn.textContent = 'Hide Analysis';
    } else {
        analysisContent.classList.add('hidden');
        toggleAnalysisBtn.textContent = 'Show Analysis';
    }
}

// Get form data
function getFormData() {
    const form = document.getElementById('predictionForm');
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    return data;
}

// Validate form data
function validateFormData(data) {
    const requiredFields = ['lotArea', 'overallQual', 'yearBuilt', 'livingArea', 'basementArea',
        'bedrooms', 'fullBath', 'fireplaces', 'garageCars', 'garageArea'];

    for (let field of requiredFields) {
        if (!data[field] || data[field] === '') {
            return false;
        }
    }

    // Additional validation
    if (parseInt(data.overallQual) < 1 || parseInt(data.overallQual) > 10) {
        return false;
    }

    if (parseInt(data.yearBuilt) < 1800 || parseInt(data.yearBuilt) > 2024) {
        return false;
    }

    return true;
}

// Simulate prediction (this would be replaced with actual API call)
async function simulatePrediction(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple prediction algorithm based on key features
    const basePrice = 150000;
    let predictedPrice = basePrice;

    // Adjust based on lot area (logarithmic relationship)
    const lotAreaFactor = Math.log(parseInt(formData.lotArea) + 1) * 5000;
    predictedPrice += lotAreaFactor;

    // Adjust based on overall quality (linear relationship)
    const qualityFactor = parseInt(formData.overallQual) * 15000;
    predictedPrice += qualityFactor;

    // Adjust based on year built (newer houses cost more)
    const yearFactor = (parseInt(formData.yearBuilt) - 1900) * 500;
    predictedPrice += yearFactor;

    // Adjust based on living area (linear relationship)
    const livingAreaFactor = parseInt(formData.livingArea) * 100;
    predictedPrice += livingAreaFactor;

    // Adjust based on basement area
    const basementFactor = parseInt(formData.basementArea) * 50;
    predictedPrice += basementFactor;

    // Adjust based on bedrooms
    const bedroomFactor = parseInt(formData.bedrooms) * 8000;
    predictedPrice += bedroomFactor;

    // Adjust based on bathrooms
    const bathroomFactor = parseInt(formData.fullBath) * 12000;
    predictedPrice += bathroomFactor;

    // Adjust based on fireplaces
    const fireplaceFactor = parseInt(formData.fireplaces) * 5000;
    predictedPrice += fireplaceFactor;

    // Adjust based on garage
    const garageFactor = parseInt(formData.garageCars) * 8000 + parseInt(formData.garageArea) * 30;
    predictedPrice += garageFactor;

    // Neighborhood adjustments
    const neighborhoodAdjustments = {
        'NAmes': 1.0,
        'CollgCr': 1.1,
        'OldTown': 0.9,
        'Edwards': 0.85,
        'Somerst': 1.15,
        'Gilbert': 1.05,
        'NridgHt': 1.25,
        'Sawyer': 0.95,
        'NWAmes': 1.05,
        'SawyerW': 1.0,
        'Mitchel': 0.9,
        'NoRidge': 1.3,
        'Timber': 1.1,
        'IDOTRR': 0.8,
        'ClearCr': 1.05,
        'StoneBr': 1.2,
        'SWISU': 0.95,
        'MeadowV': 0.85,
        'Blueste': 0.9,
        'Greens': 1.1,
        'GrnHill': 1.3,
        'Landmrk': 1.4,
        'Veenker': 1.2,
        'Crawfor': 0.95,
        'BrDale': 0.85,
        'Brookside': 1.0
    };

    const neighborhoodFactor = neighborhoodAdjustments[formData.neighborhood] || 1.0;
    predictedPrice *= neighborhoodFactor;

    // House style adjustments
    const styleAdjustments = {
        '1Story': 1.0,
        '2Story': 1.1,
        '1.5Unf': 0.9,
        '1.5Fin': 1.05,
        '2.5Unf': 1.15,
        '2.5Fin': 1.2,
        'SFoyer': 0.95,
        'SLvl': 0.9
    };

    const styleFactor = styleAdjustments[formData.houseStyle] || 1.0;
    predictedPrice *= styleFactor;

    // Quality adjustments
    const qualityAdjustments = {
        'TA': 1.0,
        'Gd': 1.15,
        'Fa': 0.9
    };

    const exterQualFactor = qualityAdjustments[formData.exterQual] || 1.0;
    const kitchenQualFactor = qualityAdjustments[formData.kitchenQual] || 1.0;

    predictedPrice *= exterQualFactor * kitchenQualFactor;

    // Add some randomness to make it more realistic
    const randomFactor = 0.9 + Math.random() * 0.2; // ±10% variation
    predictedPrice *= randomFactor;

    return Math.round(predictedPrice);
}

// Display prediction result
function displayPrediction(price) {
    predictedPrice.textContent = `$${price.toLocaleString()}`;
    predictionResult.classList.remove('hidden');

    // Scroll to result
    predictionResult.scrollIntoView({ behavior: 'smooth' });

    // Show success message
    showSuccess('Prediction completed successfully!');
}

// Add form validation
function addFormValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);

            if (this.value !== '' && (value < min || value > max)) {
                this.style.borderColor = '#e74c3c';
                this.style.backgroundColor = '#fdf2f2';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = '#f8f9fa';
            }
        });
    });
}

// Show success message
function showSuccess(message) {
    showMessage(message, 'success');
}

// Show error message
function showError(message) {
    showMessage(message, 'error');
}

// Show message with type
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(messageDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Add slideOut animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideOutStyle);

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + Enter to predict
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePrediction();
    }

    // Ctrl/Cmd + T to load test data
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        loadTestData();
    }

    // Ctrl/Cmd + A to toggle analysis
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        toggleAnalysis();
    }
});

// Add helpful tooltips
function addTooltips() {
    const tooltipData = {
        'lotArea': 'Total lot size in square feet',
        'overallQual': 'Overall material and finish quality (1=Very Poor, 10=Very Excellent)',
        'yearBuilt': 'Original construction date',
        'livingArea': 'Above ground living area in square feet',
        'basementArea': 'Total basement area in square feet',
        'bedrooms': 'Number of bedrooms above ground',
        'fullBath': 'Number of full bathrooms above ground',
        'fireplaces': 'Number of fireplaces',
        'garageCars': 'Size of garage in car capacity',
        'garageArea': 'Size of garage in square feet',
        'neighborhood': 'Physical locations within Ames city limits',
        'houseStyle': 'Style of dwelling',
        'exterQual': 'Exterior material quality',
        'kitchenQual': 'Kitchen quality'
    };

    Object.keys(tooltipData).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltipData[id];
        }
    });
}

// Initialize tooltips
addTooltips(); 