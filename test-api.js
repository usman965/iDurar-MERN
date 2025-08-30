const axios = require('axios');

// Configuration
const API_BASE_URL = process.env.API_URL || 'https://your-app-name.railway.app/api';

console.log('🧪 Testing Live API Endpoints');
console.log('=============================');
console.log(`API Base URL: ${API_BASE_URL}`);
console.log('');

// Test functions
async function testHealthCheck() {
  try {
    console.log('🔍 Testing Health Check...');
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
    console.log('✅ Health Check:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
    return false;
  }
}

async function testLogin() {
  try {
    console.log('🔍 Testing Login...');
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'admin@admin.com',
      password: 'admin123'
    });
    console.log('✅ Login Successful');
    return response.data.result.token;
  } catch (error) {
    console.log('❌ Login Failed:', error.response?.data?.message || error.message);
    return null;
  }
}

async function testProtectedEndpoint(token) {
  if (!token) {
    console.log('⚠️  Skipping protected endpoint test (no token)');
    return;
  }
  
  try {
    console.log('🔍 Testing Protected Endpoint...');
    const response = await axios.get(`${API_BASE_URL}/admin/read/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Protected Endpoint:', response.data.result?.email);
  } catch (error) {
    console.log('❌ Protected Endpoint Failed:', error.response?.data?.message || error.message);
  }
}

async function testFileUpload(token) {
  if (!token) {
    console.log('⚠️  Skipping file upload test (no token)');
    return;
  }
  
  try {
    console.log('🔍 Testing File Upload...');
    // This would require a file to upload
    console.log('⚠️  File upload test requires manual testing with Postman or similar tool');
  } catch (error) {
    console.log('❌ File Upload Test Failed:', error.message);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test health check
  await testHealthCheck();
  console.log('');
  
  // Test login
  const token = await testLogin();
  console.log('');
  
  // Test protected endpoint
  await testProtectedEndpoint(token);
  console.log('');
  
  // Test file upload
  await testFileUpload(token);
  console.log('');
  
  console.log('🎉 API Testing Complete!');
  console.log('');
  console.log('📝 Manual Testing Tips:');
  console.log('1. Use Postman or curl for more detailed testing');
  console.log('2. Test file uploads with actual files');
  console.log('3. Test all CRUD operations');
  console.log('4. Test error scenarios');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testLogin,
  testProtectedEndpoint,
  testFileUpload,
  runTests
};
