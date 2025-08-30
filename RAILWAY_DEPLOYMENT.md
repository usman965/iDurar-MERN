# 🚀 Railway Deployment Guide for IDURAR ERP CRM Backend

## Your Backend is Ready! 🎉

Your backend folder is properly configured and ready for Railway deployment.

---

## 📋 Pre-Deployment Checklist

✅ **Backend Structure**: Your backend is in the `backend/` folder  
✅ **Package.json**: Properly configured with start script  
✅ **Procfile**: Created for Railway  
✅ **Git Repository**: Already initialized  
✅ **Environment Variables**: Configured in `.env`  

---

## 🚀 Step-by-Step Railway Deployment

### Step 1: Commit Your Changes

```bash
# Add the new files
git add Procfile
git commit -m "Add Railway deployment configuration"

# Push to GitHub
git push origin main
```

### Step 2: Sign Up for Railway

1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with your GitHub account
4. Authorize Railway to access your repositories

### Step 3: Create New Project

1. Click "Deploy from GitHub repo"
2. Select your repository: `idurar-erp-crm`
3. Choose "Deploy Now"

### Step 4: Configure the Service

1. **Service Name**: `idurar-backend` (or any name you prefer)
2. **Root Directory**: `backend` (this is important!)
3. **Build Command**: Leave empty (Railway will auto-detect)
4. **Start Command**: Leave empty (uses Procfile)

### Step 5: Set Environment Variables

In Railway dashboard, go to your service → Variables tab and add:

```bash
# Database Configuration
DATABASE=mongodb+srv://usmanasghar00000_db_user:N2CWYBji4W6VzPhw@cluster0.y2wt6ct.mongodb.net/

# JWT Configuration
JWT_SECRET=your_private_jwt_secret_key

# Environment
NODE_ENV=production

# OpenSSL Configuration
OPENSSL_CONF=/dev/null

# Public Server URL (will be updated after deployment)
PUBLIC_SERVER_FILE=https://your-app-name.railway.app/

# Optional: Add these for better security
PORT=8888
CORS_ORIGIN=*
```

### Step 6: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at: `https://your-app-name.railway.app`

---

## 🔧 Post-Deployment Configuration

### Update PUBLIC_SERVER_FILE

After deployment, update the `PUBLIC_SERVER_FILE` environment variable in Railway with your actual URL:

```bash
PUBLIC_SERVER_FILE=https://your-actual-app-name.railway.app/
```

### Test Your API

Your API endpoints will be available at:
- **Health Check**: `https://your-app-name.railway.app/health`
- **API Base**: `https://your-app-name.railway.app/api`
- **Auth**: `https://your-app-name.railway.app/api/auth/login`

---

## 🧪 Testing Your Live API

### Quick Test Commands

```bash
# Test health check
curl https://your-app-name.railway.app/health

# Test login
curl -X POST https://your-app-name.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

### Using the Test Script

```bash
# Install axios if needed
npm install axios

# Set your API URL
export API_URL=https://your-app-name.railway.app/api

# Run the test script
node test-api.js
```

---

## 🔗 Frontend Integration

### React.js Frontend

Update your API configuration:

```javascript
// src/config/api.js or similar
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-app-name.railway.app/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};
```

### React Native Frontend

```javascript
// src/config/api.js
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8888/api'  // Development
  : 'https://your-app-name.railway.app/api'; // Production

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};
```

### Environment Variables for Frontend

**React.js (.env)**
```bash
REACT_APP_API_URL=https://your-app-name.railway.app/api
```

**React Native (.env)**
```bash
API_URL=https://your-app-name.railway.app/api
```

---

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   - Check if all dependencies are in `package.json`
   - Ensure Node.js version is compatible (you're using 20.9.0 ✅)

2. **Environment Variables Not Working**
   - Double-check variable names in Railway dashboard
   - Restart the service after adding variables

3. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check if IP whitelist includes Railway's IPs

4. **CORS Errors**
   - Update CORS_ORIGIN in environment variables
   - Restart the service

### Railway Dashboard Features

- **Logs**: View real-time application logs
- **Metrics**: Monitor CPU, memory usage
- **Variables**: Manage environment variables
- **Settings**: Configure domain, scaling, etc.

---

## 📊 Monitoring Your App

### Railway Dashboard
- **Logs**: Real-time application logs
- **Metrics**: Performance monitoring
- **Deployments**: Track deployment history

### Health Check
Your app includes a health check endpoint:
```
GET https://your-app-name.railway.app/health
```

---

## 🔄 Continuous Deployment

Railway automatically deploys when you push to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Update API endpoints"
git push origin main

# Railway will automatically deploy the changes
```

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit monthly (good for development)
- **Pro Plan**: Pay-as-you-go (starts at ~$5/month)
- **Team Plan**: For collaboration

---

## 🎯 Next Steps

1. **Deploy to Railway** using the steps above
2. **Test all API endpoints** with the test script
3. **Update your frontend** with the live API URL
4. **Monitor the application** using Railway dashboard
5. **Set up custom domain** (optional)

---

## 📞 Need Help?

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: Check your repository issues

---

**Your backend is ready for deployment! 🚀**

Follow the steps above and you'll have a live API accessible from any frontend application.
