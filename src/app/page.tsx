'use client';

import { useState, useEffect } from 'react';

interface FormData {
  // Numerical features
  'Lot Area': number;
  'Overall Qual': number;
  'Overall Cond': number;
  'Year Built': number;
  'Year Remod/Add': number;
  'Mas Vnr Area': number;
  'BsmtFin SF 1': number;
  'BsmtFin SF 2': number;
  'Bsmt Unf SF': number;
  'Total Bsmt SF': number;
  '1st Flr SF': number;
  '2nd Flr SF': number;
  'Low Qual Fin SF': number;
  'Gr Liv Area': number;
  'Bsmt Full Bath': number;
  'Bsmt Half Bath': number;
  'Full Bath': number;
  'Half Bath': number;
  'Bedroom AbvGr': number;
  'Kitchen AbvGr': number;
  'TotRms AbvGrd': number;
  'Fireplaces': number;
  'Garage Yr Blt': number;
  'Garage Cars': number;
  'Garage Area': number;
  'Wood Deck SF': number;
  'Open Porch SF': number;
  'Enclosed Porch': number;
  '3Ssn Porch': number;
  'Screen Porch': number;
  'Pool Area': number;
  'Misc Val': number;
  'Mo Sold': number;
  'Yr Sold': number;
  
  // Categorical features (simplified for UI)
  'MS Zoning': string;
  'Street': string;
  'Alley': string;
  'Lot Shape': string;
  'Land Contour': string;
  'Lot Config': string;
  'Neighborhood': string;
  'Condition 1': string;
  'Condition 2': string;
  'Bldg Type': string;
  'House Style': string;
  'Roof Style': string;
  'Roof Matl': string;
  'Exterior 1st': string;
  'Exterior 2nd': string;
  'Mas Vnr Type': string;
  'Exter Qual': string;
  'Exter Cond': string;
  'Foundation': string;
  'Bsmt Qual': string;
  'Bsmt Cond': string;
  'Bsmt Exposure': string;
  'BsmtFin Type 1': string;
  'BsmtFin Type 2': string;
  'Heating': string;
  'Heating QC': string;
  'Central Air': string;
  'Electrical': string;
  'Kitchen Qual': string;
  'Functional': string;
  'Fireplace Qu': string;
  'Garage Type': string;
  'Garage Finish': string;
  'Garage Qual': string;
  'Garage Cond': string;
  'Paved Drive': string;
  'Fence': string;
  'Misc Feature': string;
  'Sale Type': string;
  'Sale Condition': string;
}

const initialFormData: FormData = {
  'Lot Area': 0,
  'Overall Qual': 5,
  'Overall Cond': 5,
  'Year Built': 2000,
  'Year Remod/Add': 2000,
  'Mas Vnr Area': 0,
  'BsmtFin SF 1': 0,
  'BsmtFin SF 2': 0,
  'Bsmt Unf SF': 0,
  'Total Bsmt SF': 0,
  '1st Flr SF': 0,
  '2nd Flr SF': 0,
  'Low Qual Fin SF': 0,
  'Gr Liv Area': 0,
  'Bsmt Full Bath': 0,
  'Bsmt Half Bath': 0,
  'Full Bath': 1,
  'Half Bath': 0,
  'Bedroom AbvGr': 3,
  'Kitchen AbvGr': 1,
  'TotRms AbvGrd': 6,
  'Fireplaces': 0,
  'Garage Yr Blt': 2000,
  'Garage Cars': 1,
  'Garage Area': 0,
  'Wood Deck SF': 0,
  'Open Porch SF': 0,
  'Enclosed Porch': 0,
  '3Ssn Porch': 0,
  'Screen Porch': 0,
  'Pool Area': 0,
  'Misc Val': 0,
  'Mo Sold': 6,
  'Yr Sold': 2010,
  'MS Zoning': 'RL',
  'Street': 'Pave',
  'Alley': 'missing',
  'Lot Shape': 'Reg',
  'Land Contour': 'Lvl',
  'Lot Config': 'Inside',
  'Neighborhood': 'NAmes',
  'Condition 1': 'Norm',
  'Condition 2': 'Norm',
  'Bldg Type': '1Fam',
  'House Style': '1Story',
  'Roof Style': 'Gable',
  'Roof Matl': 'CompShg',
  'Exterior 1st': 'VinylSd',
  'Exterior 2nd': 'VinylSd',
  'Mas Vnr Type': 'missing',
  'Exter Qual': 'TA',
  'Exter Cond': 'TA',
  'Foundation': 'PConc',
  'Bsmt Qual': 'TA',
  'Bsmt Cond': 'TA',
  'Bsmt Exposure': 'No',
  'BsmtFin Type 1': 'Unf',
  'BsmtFin Type 2': 'Unf',
  'Heating': 'GasA',
  'Heating QC': 'TA',
  'Central Air': 'Y',
  'Electrical': 'SBrkr',
  'Kitchen Qual': 'TA',
  'Functional': 'Typ',
  'Fireplace Qu': 'missing',
  'Garage Type': 'Attchd',
  'Garage Finish': 'Unf',
  'Garage Qual': 'TA',
  'Garage Cond': 'TA',
  'Paved Drive': 'Y',
  'Fence': 'missing',
  'Misc Feature': 'missing',
  'Sale Type': 'WD',
  'Sale Condition': 'Normal'
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisContent, setAnalysisContent] = useState('');

  useEffect(() => {
    // Load analysis content
    fetch('/analysis/analysis.md')
      .then(response => response.text())
      .then(content => setAnalysisContent(content))
      .catch(error => console.error('Error loading analysis:', error));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const convertToModelFormat = (data: FormData) => {
    // Convert form data to model input format
    const modelData: any = {};
    
    // Add numerical features with log transformation
    const numericalFeatures = [
      'Lot Area', 'Overall Qual', 'Overall Cond', 'Year Built', 'Year Remod/Add',
      'Mas Vnr Area', 'BsmtFin SF 1', 'BsmtFin SF 2', 'Bsmt Unf SF', 'Total Bsmt SF',
      '1st Flr SF', '2nd Flr SF', 'Low Qual Fin SF', 'Gr Liv Area', 'Bsmt Full Bath',
      'Bsmt Half Bath', 'Full Bath', 'Half Bath', 'Bedroom AbvGr', 'Kitchen AbvGr',
      'TotRms AbvGrd', 'Fireplaces', 'Garage Yr Blt', 'Garage Cars', 'Garage Area',
      'Wood Deck SF', 'Open Porch SF', 'Enclosed Porch', '3Ssn Porch', 'Screen Porch',
      'Pool Area', 'Misc Val', 'Mo Sold', 'Yr Sold'
    ];

    numericalFeatures.forEach(feature => {
      modelData[feature] = data[feature as keyof FormData] || 0;
    });

    // Add categorical features as one-hot encoded
    const categoricalMappings = {
      'MS Zoning': { 'RL': 'MS Zoning_RL', 'RM': 'MS Zoning_RM', 'FV': 'MS Zoning_FV', 'RH': 'MS Zoning_RH', 'I (all)': 'MS Zoning_I (all)' },
      'Street': { 'Pave': 'Street_Pave' },
      'Alley': { 'Pave': 'Alley_Pave', 'missing': 'Alley_missing' },
      'Lot Shape': { 'Reg': 'Lot Shape_Reg', 'IR1': 'Lot Shape_IR2', 'IR2': 'Lot Shape_IR2', 'IR3': 'Lot Shape_IR3' },
      'Land Contour': { 'Lvl': 'Land Contour_Lvl', 'Low': 'Land Contour_Low', 'HLS': 'Land Contour_HLS' },
      'Lot Config': { 'Inside': 'Lot Config_Inside', 'Corner': 'Lot Config_FR2', 'CulDSac': 'Lot Config_CulDSac', 'FR2': 'Lot Config_FR2', 'FR3': 'Lot Config_FR3' },
      'Neighborhood': { 'NAmes': 'Neighborhood_NAmes', 'CollgCr': 'Neighborhood_CollgCr', 'OldTown': 'Neighborhood_OldTown', 'Edwards': 'Neighborhood_Edwards', 'Somerst': 'Neighborhood_Somerst', 'Gilbert': 'Neighborhood_Gilbert', 'NridgHt': 'Neighborhood_NridgHt', 'Sawyer': 'Neighborhood_Sawyer', 'NWAmes': 'Neighborhood_NWAmes', 'SawyerW': 'Neighborhood_SawyerW', 'Mitchel': 'Neighborhood_Mitchel', 'NoRidge': 'Neighborhood_NoRidge', 'Timber': 'Neighborhood_Timber', 'IDOTRR': 'Neighborhood_IDOTRR', 'ClearCr': 'Neighborhood_ClearCr', 'StoneBr': 'Neighborhood_StoneBr', 'SWISU': 'Neighborhood_SWISU', 'MeadowV': 'Neighborhood_MeadowV', 'Blueste': 'Neighborhood_Blueste', 'Greens': 'Neighborhood_Greens', 'GrnHill': 'Neighborhood_GrnHill', 'Landmrk': 'Neighborhood_Landmrk', 'Veenker': 'Neighborhood_Veenker', 'Crawfor': 'Neighborhood_Crawfor', 'BrDale': 'Neighborhood_BrDale', 'Brookside': 'Neighborhood_BrkSide' },
      'Condition 1': { 'Norm': 'Condition 1_Norm', 'Feedr': 'Condition 1_Feedr', 'PosA': 'Condition 1_PosA', 'PosN': 'Condition 1_PosN', 'RRAe': 'Condition 1_RRAe', 'RRAn': 'Condition 1_RRAn', 'RRNe': 'Condition 1_RRNe', 'RRNn': 'Condition 1_RRNn' },
      'Condition 2': { 'Norm': 'Condition 2_Norm', 'Feedr': 'Condition 2_Feedr', 'PosA': 'Condition 2_PosA', 'PosN': 'Condition 2_PosN', 'RRNn': 'Condition 2_RRNn' },
      'Bldg Type': { '1Fam': 'Bldg Type_2fmCon', '2fmCon': 'Bldg Type_2fmCon', 'Duplex': 'Bldg Type_Duplex', 'Twnhs': 'Bldg Type_Twnhs', 'TwnhsE': 'Bldg Type_TwnhsE' },
      'House Style': { '1Story': 'House Style_1Story', '1.5Unf': 'House Style_1.5Unf', '1.5Fin': 'House Style_1.5Unf', '2Story': 'House Style_2Story', '2.5Unf': 'House Style_2.5Unf', '2.5Fin': 'House Style_2.5Unf', 'SFoyer': 'House Style_SFoyer', 'SLvl': 'House Style_SLvl' },
      'Roof Style': { 'Gable': 'Roof Style_Gable', 'Hip': 'Roof Style_Hip', 'Gambrel': 'Roof Style_Gambrel', 'Mansard': 'Roof Style_Mansard', 'Flat': 'Roof Style_Shed', 'Shed': 'Roof Style_Shed' },
      'Roof Matl': { 'CompShg': 'Roof Matl_Tar&Grv', 'Tar&Grv': 'Roof Matl_Tar&Grv', 'WdShngl': 'Roof Matl_WdShngl', 'WdShake': 'Roof Matl_WdShake', 'Metal': 'Roof Matl_Tar&Grv', 'Roll': 'Roof Matl_Tar&Grv', 'ClyTile': 'Roof Matl_Tar&Grv', 'Membran': 'Roof Matl_Tar&Grv' },
      'Exterior 1st': { 'VinylSd': 'Exterior 1st_VinylSd', 'MetalSd': 'Exterior 1st_MetalSd', 'Wd Sdng': 'Exterior 1st_Wd Sdng', 'HdBoard': 'Exterior 1st_HdBoard', 'BrkFace': 'Exterior 1st_BrkFace', 'WdShing': 'Exterior 1st_WdShing', 'CemntBd': 'Exterior 1st_CemntBd', 'Plywood': 'Exterior 1st_Plywood', 'AsbShng': 'Exterior 1st_VinylSd', 'Stucco': 'Exterior 1st_Stucco', 'BrkComm': 'Exterior 1st_BrkComm', 'AsphShn': 'Exterior 1st_VinylSd', 'Stone': 'Exterior 1st_VinylSd', 'ImStucc': 'Exterior 1st_ImStucc', 'CBlock': 'Exterior 1st_CBlock', 'Other': 'Exterior 1st_VinylSd', 'PreCast': 'Exterior 1st_PreCast' },
      'Exterior 2nd': { 'VinylSd': 'Exterior 2nd_VinylSd', 'MetalSd': 'Exterior 2nd_MetalSd', 'Wd Sdng': 'Exterior 2nd_Wd Sdng', 'HdBoard': 'Exterior 2nd_HdBoard', 'BrkFace': 'Exterior 2nd_BrkFace', 'Wd Shng': 'Exterior 2nd_Wd Shng', 'CmentBd': 'Exterior 2nd_CmentBd', 'Plywood': 'Exterior 2nd_Plywood', 'AsbShng': 'Exterior 2nd_VinylSd', 'Stucco': 'Exterior 2nd_Stucco', 'Brk Cmn': 'Exterior 2nd_Brk Cmn', 'AsphShn': 'Exterior 2nd_VinylSd', 'Stone': 'Exterior 2nd_Stone', 'ImStucc': 'Exterior 2nd_ImStucc', 'CBlock': 'Exterior 2nd_CBlock', 'Other': 'Exterior 2nd_Other', 'PreCast': 'Exterior 2nd_PreCast' },
      'Mas Vnr Type': { 'BrkFace': 'Mas Vnr Type_BrkFace', 'Stone': 'Mas Vnr Type_Stone', 'CBlock': 'Mas Vnr Type_CBlock', 'missing': 'Mas Vnr Type_missing' },
      'Exter Qual': { 'TA': 'Exter Qual_TA', 'Gd': 'Exter Qual_Gd', 'Fa': 'Exter Qual_Fa' },
      'Exter Cond': { 'TA': 'Exter Cond_TA', 'Gd': 'Exter Cond_Gd', 'Fa': 'Exter Cond_Fa' },
      'Foundation': { 'PConc': 'Foundation_PConc', 'CBlock': 'Foundation_CBlock', 'BrkTil': 'Foundation_CBlock', 'Slab': 'Foundation_Slab', 'Stone': 'Foundation_Stone', 'Wood': 'Foundation_Wood' },
      'Bsmt Qual': { 'TA': 'Bsmt Qual_TA', 'Gd': 'Bsmt Qual_Gd', 'Fa': 'Bsmt Qual_Fa', 'Po': 'Bsmt Qual_Po', 'missing': 'Bsmt Qual_missing' },
      'Bsmt Cond': { 'TA': 'Bsmt Cond_TA', 'Gd': 'Bsmt Cond_Gd', 'Fa': 'Bsmt Cond_Fa', 'Po': 'Bsmt Cond_Po', 'missing': 'Bsmt Cond_missing' },
      'Bsmt Exposure': { 'No': 'Bsmt Exposure_No', 'Gd': 'Bsmt Exposure_Gd', 'Mn': 'Bsmt Exposure_Mn', 'Av': 'Bsmt Exposure_Gd', 'missing': 'Bsmt Exposure_missing' },
      'BsmtFin Type 1': { 'Unf': 'BsmtFin Type 1_Unf', 'GLQ': 'BsmtFin Type 1_GLQ', 'ALQ': 'BsmtFin Type 1_GLQ', 'Rec': 'BsmtFin Type 1_Rec', 'BLQ': 'BsmtFin Type 1_BLQ', 'LwQ': 'BsmtFin Type 1_LwQ', 'missing': 'BsmtFin Type 1_missing' },
      'BsmtFin Type 2': { 'Unf': 'BsmtFin Type 2_Unf', 'GLQ': 'BsmtFin Type 2_GLQ', 'ALQ': 'BsmtFin Type 2_GLQ', 'Rec': 'BsmtFin Type 2_Rec', 'BLQ': 'BsmtFin Type 2_BLQ', 'LwQ': 'BsmtFin Type 2_LwQ', 'missing': 'BsmtFin Type 2_missing' },
      'Heating': { 'GasA': 'Heating_GasA', 'GasW': 'Heating_GasW', 'Grav': 'Heating_Grav', 'Wall': 'Heating_Wall', 'OthW': 'Heating_GasA', 'Floor': 'Heating_GasA' },
      'Heating QC': { 'TA': 'Heating QC_TA', 'Gd': 'Heating QC_Gd', 'Fa': 'Heating QC_Fa' },
      'Central Air': { 'Y': 'Central Air_Y', 'N': 'Central Air_Y' },
      'Electrical': { 'SBrkr': 'Electrical_SBrkr', 'FuseA': 'Electrical_FuseF', 'FuseF': 'Electrical_FuseF', 'FuseP': 'Electrical_FuseP', 'Mix': 'Electrical_SBrkr', 'missing': 'Electrical_missing' },
      'Kitchen Qual': { 'TA': 'Kitchen Qual_TA', 'Gd': 'Kitchen Qual_Gd', 'Fa': 'Kitchen Qual_Fa' },
      'Functional': { 'Typ': 'Functional_Typ', 'Min1': 'Functional_Min1', 'Min2': 'Functional_Min2', 'Mod': 'Functional_Mod', 'Maj1': 'Functional_Min1', 'Maj2': 'Functional_Maj2', 'Sev': 'Functional_Min2', 'Sal': 'Functional_Min2' },
      'Fireplace Qu': { 'TA': 'Fireplace Qu_TA', 'Gd': 'Fireplace Qu_Gd', 'Fa': 'Fireplace Qu_Fa', 'Po': 'Fireplace Qu_Po', 'missing': 'Fireplace Qu_missing' },
      'Garage Type': { 'Attchd': 'Garage Type_Attchd', 'Detchd': 'Garage Type_Detchd', 'BuiltIn': 'Garage Type_BuiltIn', 'CarPort': 'Garage Type_CarPort', 'Basment': 'Garage Type_Basment', '2Types': 'Garage Type_Attchd', 'missing': 'Garage Type_missing' },
      'Garage Finish': { 'Unf': 'Garage Finish_Unf', 'RFn': 'Garage Finish_RFn', 'Fin': 'Garage Finish_RFn', 'missing': 'Garage Finish_missing' },
      'Garage Qual': { 'TA': 'Garage Qual_TA', 'Gd': 'Garage Qual_Gd', 'Fa': 'Garage Qual_Fa', 'Po': 'Garage Qual_Po', 'missing': 'Garage Qual_missing' },
      'Garage Cond': { 'TA': 'Garage Cond_TA', 'Gd': 'Garage Cond_Gd', 'Fa': 'Garage Cond_Fa', 'Po': 'Garage Cond_Po', 'missing': 'Garage Cond_missing' },
      'Paved Drive': { 'Y': 'Paved Drive_Y', 'P': 'Paved Drive_P', 'N': 'Paved Drive_P' },
      'Fence': { 'MnPrv': 'Fence_MnPrv', 'GdWo': 'Fence_GdWo', 'MnWw': 'Fence_MnWw', 'missing': 'Fence_missing' },
      'Misc Feature': { 'missing': 'Misc Feature_missing', 'Elev': 'Misc Feature_missing', 'Gar2': 'Misc Feature_missing', 'Othr': 'Misc Feature_missing', 'Shed': 'Misc Feature_missing', 'TenC': 'Misc Feature_missing' },
      'Sale Type': { 'WD': 'Sale Type_WD ', 'New': 'Sale Type_New', 'COD': 'Sale Type_Con', 'Con': 'Sale Type_Con', 'ConLw': 'Sale Type_ConLw', 'ConLI': 'Sale Type_ConLI', 'ConLD': 'Sale Type_ConLD', 'Oth': 'Sale Type_Oth', 'CWD': 'Sale Type_CWD' },
      'Sale Condition': { 'Normal': 'Sale Condition_Normal', 'Abnorml': 'Sale Condition_Normal', 'AdjLand': 'Sale Condition_AdjLand', 'Alloca': 'Sale Condition_Alloca', 'Family': 'Sale Condition_Family', 'Partial': 'Sale Condition_Partial' }
    };

    // Initialize all categorical features to 0
    Object.values(categoricalMappings).forEach(mapping => {
      Object.values(mapping).forEach(feature => {
        modelData[feature] = 0;
      });
    });

    // Set the selected categorical features to 1
    Object.entries(categoricalMappings).forEach(([category, mapping]) => {
      const value = data[category as keyof FormData] as string;
      if (value && mapping[value]) {
        modelData[mapping[value]] = 1;
      }
    });

    return modelData;
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const modelData = convertToModelFormat(formData);
      
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: modelData }),
      });

      const result = await response.json();
      
      if (result.predicted_price) {
        setPrediction(result.predicted_price);
      } else {
        console.error('Prediction failed:', result.error);
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict');
      const result = await response.json();
      
      if (result.sample_data) {
        // Convert sample data back to form format
        const sampleFormData: any = { ...initialFormData };
        
        // Extract numerical values (reverse log transformation)
        const numericalFeatures = [
          'Lot Area', 'Overall Qual', 'Overall Cond', 'Year Built', 'Year Remod/Add',
          'Mas Vnr Area', 'BsmtFin SF 1', 'BsmtFin SF 2', 'Bsmt Unf SF', 'Total Bsmt SF',
          '1st Flr SF', '2nd Flr SF', 'Low Qual Fin SF', 'Gr Liv Area', 'Bsmt Full Bath',
          'Bsmt Half Bath', 'Full Bath', 'Half Bath', 'Bedroom AbvGr', 'Kitchen AbvGr',
          'TotRms AbvGrd', 'Fireplaces', 'Garage Yr Blt', 'Garage Cars', 'Garage Area',
          'Wood Deck SF', 'Open Porch SF', 'Enclosed Porch', '3Ssn Porch', 'Screen Porch',
          'Pool Area', 'Misc Val', 'Mo Sold', 'Yr Sold'
        ];

        numericalFeatures.forEach(feature => {
          const logValue = result.sample_data[feature];
          if (logValue !== undefined) {
            sampleFormData[feature] = Math.round(Math.exp(logValue) - 1);
          }
        });

        setFormData(sampleFormData);
      }
    } catch (error) {
      console.error('Error loading test data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">House Price Predictor</h1>
          <p className="text-lg text-gray-600">Predict house prices using our trained machine learning model</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">House Details</h2>
            
            <div className="space-y-4">
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lot Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData['Lot Area']}
                    onChange={(e) => handleInputChange('Lot Area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Quality (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData['Overall Qual']}
                    onChange={(e) => handleInputChange('Overall Qual', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    min="1800"
                    max="2024"
                    value={formData['Year Built']}
                    onChange={(e) => handleInputChange('Year Built', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Above Ground Living Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData['Gr Liv Area']}
                    onChange={(e) => handleInputChange('Gr Liv Area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Basement Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData['Total Bsmt SF']}
                    onChange={(e) => handleInputChange('Total Bsmt SF', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData['Bedroom AbvGr']}
                    onChange={(e) => handleInputChange('Bedroom AbvGr', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Full Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData['Full Bath']}
                    onChange={(e) => handleInputChange('Full Bath', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Fireplaces
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData['Fireplaces']}
                    onChange={(e) => handleInputChange('Fireplaces', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Garage Cars
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData['Garage Cars']}
                    onChange={(e) => handleInputChange('Garage Cars', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Garage Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData['Garage Area']}
                    onChange={(e) => handleInputChange('Garage Area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categorical Features */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neighborhood
                  </label>
                  <select
                    value={formData['Neighborhood']}
                    onChange={(e) => handleInputChange('Neighborhood', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NAmes">North Ames</option>
                    <option value="CollgCr">College Creek</option>
                    <option value="OldTown">Old Town</option>
                    <option value="Edwards">Edwards</option>
                    <option value="Somerst">Somerset</option>
                    <option value="Gilbert">Gilbert</option>
                    <option value="NridgHt">Northridge Heights</option>
                    <option value="Sawyer">Sawyer</option>
                    <option value="NWAmes">Northwest Ames</option>
                    <option value="SawyerW">Sawyer West</option>
                    <option value="Mitchel">Mitchell</option>
                    <option value="NoRidge">Northridge</option>
                    <option value="Timber">Timberland</option>
                    <option value="IDOTRR">Iowa DOT and Rail Road</option>
                    <option value="ClearCr">Clear Creek</option>
                    <option value="StoneBr">Stone Brook</option>
                    <option value="SWISU">South & West of Iowa State University</option>
                    <option value="MeadowV">Meadow Village</option>
                    <option value="Blueste">Bluestem</option>
                    <option value="Greens">Greens</option>
                    <option value="GrnHill">Green Hills</option>
                    <option value="Landmrk">Landmark</option>
                    <option value="Veenker">Veenker</option>
                    <option value="Crawfor">Crawford</option>
                    <option value="BrDale">Briardale</option>
                    <option value="Brookside">Brookside</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House Style
                  </label>
                  <select
                    value={formData['House Style']}
                    onChange={(e) => handleInputChange('House Style', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1Story">1 Story</option>
                    <option value="2Story">2 Story</option>
                    <option value="1.5Unf">1.5 Story Unfinished</option>
                    <option value="1.5Fin">1.5 Story Finished</option>
                    <option value="2.5Unf">2.5 Story Unfinished</option>
                    <option value="2.5Fin">2.5 Story Finished</option>
                    <option value="SFoyer">Split Foyer</option>
                    <option value="SLvl">Split Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exterior Quality
                  </label>
                  <select
                    value={formData['Exter Qual']}
                    onChange={(e) => handleInputChange('Exter Qual', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TA">Typical/Average</option>
                    <option value="Gd">Good</option>
                    <option value="Fa">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kitchen Quality
                  </label>
                  <select
                    value={formData['Kitchen Qual']}
                    onChange={(e) => handleInputChange('Kitchen Qual', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TA">Typical/Average</option>
                    <option value="Gd">Good</option>
                    <option value="Fa">Fair</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Predicting...' : 'Predict Price'}
              </button>
              
              <button
                onClick={handleTestData}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load Test Data'}
              </button>
            </div>

            {prediction && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Predicted Price</h3>
                <p className="text-3xl font-bold text-green-600">${prediction.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Analysis Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Data Analysis</h2>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
              </button>
            </div>

            {showAnalysis && (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {analysisContent}
                  </pre>
                </div>
              </div>
            )}

            {!showAnalysis && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Click "Show Analysis" to view our comprehensive data analysis including:
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• Missing values analysis</li>
                  <li>• Univariate and bivariate analysis</li>
                  <li>• Correlation insights</li>
                  <li>• Key predictor identification</li>
                  <li>• Data distribution patterns</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 