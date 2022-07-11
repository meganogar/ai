# Digital Public Libraries of America Collections by City
Digital Public Library of America (DPLA) is a free and open national digital library collection with a goal to educate and empower everyone.  They have an API that allows you to search every item in their catalog.

## The Goal
The goal of this project was to display the digital library collections in a unique and interactive way.  By dropping each item in their city of origin, users can better understand the nearness of history, the map provides contemporary context that allows users a layered understanding of each historical item.

## Feature Set
Users of DPLA Collections by City can enter any city into the website, and see a map with a pin for each item of the DPLA collection that corresponds with that city.

### Collections Item Pin
Each collection item can be clicked to view the photo of the item, the title of the item, and a link that will take users to the source library's information page for the item.

## Environment Set-up
Digital Public Libraries of America Collections by City was built using Flask.

All potential developers must have:
 - Python 3 
 - Google Maps API key
 - DPLA API key

### Python
This web app framework was built using Flask, an application for Python.  In order to run the application locally, you will need to have the latest version of Python installed on your computer.  Please note that below in the installation instructions, I also use virtual environments and pip (a package manager), to follow my instructions below, you will need to install these as well. It is worth nothing that you could use whichever package manager you prefer and install requirements not in a venv.  It is up to you.

- Install Python: https://www.python.org/downloads/ 
- Install Pip and Virtual Environment: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

### DPLA
Access to the Digital Public Libraries of America Collections by City catalog requires a DPLA API key.  In order to run the application locally, you will need to register your own API key and include this script in your static/specific_map.js file:
​​ 
`var DPLA_API = YOUR_API_HERE`
 
- Get a DPLA API key: https://pro.dp.la/developers/policies#get-a-key 

### Google Maps
Digital Public Libraries of America Collections by City utilizes a Google Maps API key.  In order to run the application locally, you will need to register your own API key and include this script in your template/map.html file:
​​ 
`<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE"></script>`
 
- Get a Google Maps API key: https://developers.google.com/maps/documentation/javascript/get-api-key 


## Installation
To install this codebase on your local computer for development after the above has been completed:
1. Clone this repository.
2. Create a new virtual environment (note, I do have my venv in this GitHub repository, but you will want to create your own locally). Steps:
   1. Navigate to the project's root folder.
   2. Type in this command `python3 -m venv virtual_env`
   3. Please activate your virtual environment with `source virtual_env/bin/activate`.
   4. Please deactivate your virtual environment with `deactivate`, and then reactviate it with the above command.
3. In the activated virtual environment, install dependencies by running `pip install -r requirements.txt` in your command line.

## Future Enhancements
Currently all the collection item pins were in a straight line.  When I initially read the API documentation for DPLA, I assumed that the location coordinates for each item would be a little truer to their source of origin and a little more distinct.  By truer to their source of origin, I mean that if a postcard showed a hotel, the source of origin would either reflect 1) the location of the hotel or 2) the location of publication. Throughout the course of the project, I discovered that each items source coordinates were mostly geolocated to the City and mostly all shared the same coordinates.  In order to show multiple items then, I needed to assign them each unique pins.  Given the timebox of this project, I simply nudged each collection item pin over .0005 degrees in longitude.  As the coordinates in the metadata weren't didn't reflect the true source of origin as described above, it is necessary to call this out. A future enhancement would be to have each item reflected more the location of origin.

An additional note, the DPLA API limits each api query to 500 items.  So it would be a cool enhancement to accurately reflect the entirety of items in the digital collection on the map. 

![login screen](images/main_page.png)
![registration page](images/specific_city.png)
![main navigation page](images/specific_city_with_info_window.png)