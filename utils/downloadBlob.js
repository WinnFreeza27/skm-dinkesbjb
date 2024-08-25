export const downloadBlob = (blob, filename) => {
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a new link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up: remove the link and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
