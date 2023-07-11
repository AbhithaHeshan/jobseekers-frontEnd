
export const getBlob = async (blobURL) => {
        const response = await fetch(blobURL);
        const blob = await response.blob();
        return blob;
      
}