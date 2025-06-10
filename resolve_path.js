try {
    const packagePath = require.resolve('@google/genai');
    console.log('Node.js resolves @google/genai to:', packagePath);
} catch (error) {
    console.error('Error resolving @google/genai:', error.message);
}