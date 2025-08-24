
const path = require('path');                                  
const HtmlWebpackPlugin = require('html-webpack-plugin');       

module.exports = {                                             
  entry: './src/pages/index.js',                                      

  plugins: [                                                    
    new HtmlWebpackPlugin({                                    
      template: './src/index.html',                             
      favicon: './src/favicon.ico',                             
    }),                                                         
  ],                                                           

  module: {                                                    
    rules: [                                                    
      {                                                         
        test: /\.css$/i,                                        
        use: ['style-loader', 'css-loader', 'postcss-loader'],  
      },                                                        
      {                                                         
        test: /\.js$/,                                          
        exclude: /node_modules/,                                
        use: {                                                  
          loader: 'babel-loader',                               
          options: { presets: ['@babel/preset-env'] },          
        },                                                      
      },                                                        
      {                                                         
        test: /\.(png|svg|jpg|jpeg|gif)$/i,                     
        type: 'asset/resource',                                 
      },                                                        
      {                                                         
        test: /\.(woff2?|ttf|otf|eot)$/i,                       
        type: 'asset/resource',                                 
      },                                                        
    ],                                                          
  },                                                            

  output: {                                                     
    filename: 'bundle.[contenthash].js',                        
    path: path.resolve(__dirname, 'dist'),                      
    clean: true,                                                
  },                                                            
};                                                              