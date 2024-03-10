import React, { useState } from 'react';
import axios from 'axios';
import http from 'utils/Http';

const ClxUpload = () => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			try {
				const response = await axios.post('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log('File uploaded successfully:', response.data);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleDownload = async () => {
		try {
			const response = await http.get('/clx/employee', {
				responseType: 'blob' // This ensures the response is treated as a binary object
			});

			// Create a URL for the blob
			const url = window.URL.createObjectURL(new Blob([response.data]));

			// Create a temporary <a> element to initiate the download
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'employees_data.csv'); // Set the filename for download
			document.body.appendChild(link);
			link.click();

			// Clean up
			link.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			<button onClick={handleDownload}>Download</button>
		</div>
	);
};

export default ClxUpload;
