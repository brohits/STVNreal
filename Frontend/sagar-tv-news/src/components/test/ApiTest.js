import React, { useEffect, useState } from 'react';
import testNewsApi from '../../utils/testNewsApi';

const ApiTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTest = async () => {
      const result = await testNewsApi();
      setTestResult(result);
      setLoading(false);
    };

    runTest();
  }, []);

  if (loading) {
    return <div>Testing API connection...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>API Test Results</h2>
      <div style={{ 
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: testResult?.success ? '#e6ffe6' : '#ffe6e6'
      }}>
        <h3>Status: {testResult?.success ? 'Success' : 'Failed'}</h3>
        <p>Message: {testResult?.message}</p>
        {testResult?.error && (
          <div style={{ color: 'red' }}>
            <p>Error: {testResult.error}</p>
          </div>
        )}
        {testResult?.data && (
          <div>
            <h4>Data Preview:</h4>
            <pre style={{ 
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
