const express = require("express");
const app = express();
app.use(express.json());
const http = require('http');
const axios = require('axios');
const prompt = require('prompt-sync');




const tokenUrl = 'http://20.244.56.144/test/auth';
const authData = {
  companyName: 'doMart',
  clientID: '5e4ca713-0910-47f3-84d2-7a0dcdcb14c9',
  clientSecret: 'zZmFdBBwZcEyzUbI',
  ownerName: 'Dharshan Raaj RM',
  ownerEmail: 'dharshanraaj.rm2020@vitstudent.ac.in',
  rollNo: '20MIC0020'
};

async function getAccessToken() {
  try {
    const response = await axios.post(tokenUrl, authData, {
      headers: { 'Content-Type': 'application/json' } // Specify JSON content type
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error; // Re-throw the error for proper handling
  }
}


getAccessToken()
  .then(accessToken => {
        return accessToken;
  })
  .catch(error => {
    console.error('Failed to get access token:', error);
  });


async function fetchDataWithToken(company,n,product) {
    const accessToken = await getAccessToken();
  
    const headers = { Authorization: `Bearer ${accessToken}` };
    const apiUrl = `http://20.244.56.144/test/companies/${company}/categories/${product}/products?top=${n}&minPrice=1&maxPrice=10000`;
    
    try {
      const response = await axios.get(apiUrl, { headers });
      console.log(`Top ${n} products of category - ${product}:`, response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

const companies = ['AMZ','FLP','SNP','MYN','AZO'];
const n = 5
const product = "Laptop";


async function compareProduct() {
    for(var i=0;i<5;i++)
    {
        await fetchDataWithToken(companies[i],n,product);
        console.log("---------");
    }
}

compareProduct();


const port = 3500;
app.listen(port,function(){
    console.log(`Listening on port: ${port}`);
})
