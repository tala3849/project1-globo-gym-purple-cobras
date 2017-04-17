# Zayo Market Visualizations
Jennings Anderson, Melissa Bica, Kyle Frye, Chase Kregor, Taylor Lawrence

## Visualizations
//REMOVE Information about your visualizations and what they show. Include information about interactions as appropriate.

The first visualization on the page is a map displaying all of Zayo's buildings (from `ZayoHackathonData_Buildings.csv`), implemented with the Mapbox API. Filtering options are included on the right sidebar to filter by whether the building is on/off the Zayo network, whether the building is an "opportunity" (from `ZayoHackathonData_Opportunities.csv`), the types of products that building has purchased (from `ZayoHackathonData_Services.csv`), the maximum build cost, and the number of accounts per building. The total cost and revenue for the buildings currently in view are also available in this sidebar.

The next two visualizations were implemented using D3. The bar chart shows the prevalence of each product type across buildings (from `ZayoHackathonData_Buildings.csv` and `ZayoHackathonData_Services.csv`). The bar chart is interactive with the main map in that clicking on a bar for a specific product filters the buildings represented on the map to buildings which have purchased those products.

Finally, the scatterplot shows the total profit (calculated as MRR - MRC from `ZayoHackathonData_Services.csv`) for each building in increasing order. This plot is also interactive with the map in that clicking on the plot area displays a range tool to choose to filter buildings on the map within a certain profit range. 

The dashboard is styled in Zayo's orange and teal colors.

## Design Process 
//REMOVE (e.g., how did you go about designing, building, and refining your system? Why did you choose these representations?)

We drew out wireframes at several meetings to help develop our ideas and have a visual representation of a final system to work toward throughout development. We refined our system through team discussions in which we weighed the pros and cons of each in relation to the outcome of providing useful visual analytic tools for Zayo. We chose these visualizations as we believe they are intuitive for both the types of data we are working with and for our customers to interact with and gain insight from. 

## Team Roles
* **Jennings**: map vis, data preprocessing, interactions between vises
* **Melissa**: bar chart, scatterplot, data preprocessing
* **Kyle**: data preprocessing, visual design
* **Taylor**: 
* **Chase**: data interpretation, project management

## How to Run: 
[https://info-4602-5602.github.io/project1-globo-gym-purple-cobras/](https://info-4602-5602.github.io/project1-globo-gym-purple-cobras/)

*(Wait a few moments for the data to appear on the map, and refresh the page if no data appears within 5 or so seconds.)*
