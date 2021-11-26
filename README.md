# Pragmateam code challenge client (Angular)

##To run this project
1. make sure to checkout and download the backend at https://github.com/fr3ndyl33/code-challenge-server-nodejs. Run the test first using npm test (to make sure everything is working)then, run the node server using npm start
2. make sure to checkout and download the frontend at https://github.com/fr3ndyl33/code-challenge-client-angular. Run the test first using npm test (to make sure everything is green)then, run the local web using npm start
3. make sure to run and serve the backend first.

##Frontend Improvement (Angular)
* Separating logic and functionality into a service file that called the temperature API and process temperature data.
* Remove product data from the project.
* Create models for the data (product, temperature, product-temperature) for consistency and reusable.
* Create several test for Temperature Service and App Component
* Not much improvement in the view template area other than creating test for it.
* I change the subscription in app.component.ts to a promise, since the function only getting called for every 5 seconds manually and no Stream coming from the backend.I think calling subscription multiple times can be a burden for the memory.


##Backend Improvement (NodeJS)
* Creating several test for different routes (product and temperature)
* Create products.json (assuming there is a database that we can connect to fetch updated data)
* Move sensor endpoints to a config file.
* Create routes for product (all products and individual product)
* Create routes for temperature (all products temperature and invidual products temperature).


##Question I would ask
* I wonder why there is only product and sensor temperature data. The pdf clearly tell that “Each craft beer has its own specific refrigeration needs while being transported” and the beer are being transported using truck. This assuming that the local brewery only having one truck.If only one truck, then that means in the future when the brewery have more trucks, the software need to be upgrade again by a case that already can be seen. Using this setup make me assume that the system is installed in the truck only.If preparing for more truck, the approach should be upgrading the backend to be able to communicate to the cloud database and can be seen through online.
* Usually for sensors, the data can be stream (if I remember correctly). That means we can develop a backend that can be streamed by other apps also.


##What I would improve if I had more time
* First thing I would improve for the project is the test and beautify the frontend for easier usage.
* Second thing is preparing the backend of the possibilities of more trucks, do more unit test.
* Third thing is preparing for streaming possibilities of the sensors data and make the frontend to subscribe to change instead of calling for the backend every 5 seconds.
* Defined some models for the data in the backend

##Explanations of decisions or approach I took
* Personally for me, quality come from the kitchen before it being serve for the customers. To cover the quality of the backend and the functionality of the business should come first before the fancy look (since looks, color, and shape can be subjective and time consuming). Making sure that the whole functionality connects and integrate well should come first and offer range of possibilities for the frontend to choose later.
* The moment I saw products data being hard typed in the frontend, I move it to the backend as JSON(for now) and prepare some endpoints for future possibilities of increase in product variety.
* I combine the product data and temperature in temperature endpoints(backend) to make sure that the frontend got a complete data update as necessary as possible. The code originally just calling the sensor to get data and passing it to the frontend without any much change. Might as well calling the sensors endpoints right away without the backend.
* I manually test the sensors endpoints for ids that not exist and it still works which actually in the real world this not make sense. So, the migration of the product data to the backend is very necessary to make sure that the temperature endpoints is validated.


##Any notes that is relevant to evaluate
I wish to learn more and develop my skill in quality software and TDD. Most of my lag in this project is in describing and getting deep in the test case. I only learn it from youtube and several online documentation this past month.
Thank you for reviewing this test exercise.
