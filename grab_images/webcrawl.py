from google_images_download import google_images_download

def downloadimages(query):
	response = google_images_download.googleimagesdownload() 
	arguments = {"keywords": query, "limit":100, "print_urls": True}

	try: 
		response.download(arguments) 

	# Handling File NotFound Error	 
	except FileNotFoundError: 
		arguments = {"keywords": query, 
					"format": "jpg", 
					"limit":4, 
					"print_urls":True, 
					"size": "medium"} 
					
		# Providing arguments for the searched query 
		try: 
			# Downloading the photos based 
			# on the given arguments 
			paths = response.download(arguments) 
			print(paths)
		except: 
			pass

downloadimages("some shoes")