import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inputData = body.data;

    // Run Python script for prediction
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: './',
      args: [JSON.stringify(inputData)]
    };

    return new Promise((resolve, reject) => {
      PythonShell.run('predict.py', options, (err, results) => {
        if (err) {
          console.error('Python script error:', err);
          resolve(NextResponse.json({ error: 'Prediction failed' }, { status: 500 }));
          return;
        }

        if (results && results.length > 0) {
          try {
            const result = JSON.parse(results[0]);
            resolve(NextResponse.json(result));
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            resolve(NextResponse.json({ error: 'Invalid response format' }, { status: 500 }));
          }
        } else {
          resolve(NextResponse.json({ error: 'No prediction result' }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  try {
    // Run Python script to get sample data
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: './',
      args: []
    };

    return new Promise((resolve, reject) => {
      PythonShell.run('predict.py', options, (err, results) => {
        if (err) {
          console.error('Python script error:', err);
          resolve(NextResponse.json({ error: 'Failed to get sample data' }, { status: 500 }));
          return;
        }

        if (results && results.length > 0) {
          try {
            const result = JSON.parse(results[0]);
            resolve(NextResponse.json(result));
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            resolve(NextResponse.json({ error: 'Invalid response format' }, { status: 500 }));
          }
        } else {
          resolve(NextResponse.json({ error: 'No sample data' }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 