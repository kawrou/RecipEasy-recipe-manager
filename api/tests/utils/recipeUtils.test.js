const fs = require('fs');
const path = require('path');
const { extractRecipeInfo } = require("../../utils/recipeUtils");

const mockDataFolderPath = path.join(__dirname, 'data', 'mock');
const expectedDataFolderPath = path.join(__dirname, 'data', 'expected');

fs.readdirSync(mockDataFolderPath).forEach(file => {
  if (file.endsWith('.js')) {
    const mockRecipeData = require(path.join(mockDataFolderPath, file));
    const expectedExtractedInfo = require(path.join(expectedDataFolderPath, file));
    
    describe(`extract recipe info function - ${file}`, () => {
      test("extractedRecipeInfo correctly extracts key-value pairs", () => {
        const extractedInfo = extractRecipeInfo(mockRecipeData);
        expect(extractedInfo).toEqual(expectedExtractedInfo);
      });
    });
  }
});

