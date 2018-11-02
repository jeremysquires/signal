Government of Canada Food Guide
===============================

Customer: The Government of Canada
Domain: Canada Food Guide
Platform: Online Service
Goal: To improve the health of Canadians

Prototype: Minimum Viable Product (MVP) outlined by the product owner

Secondary Goals:
* Adopt modern cloud-based methodologies
* Deploy a healthy eating API
* Scalable

Long Term Roadmap (out of scope, but architecture should support): 
* Preference features
* Automatic weekly shopping lists
* Optional grocery delivery via Amazon Prime

User Stories
------------

**User daily menu**

As a user
I want to see an optimal daily menu
so that I can improve my health

**Family daily menu**

As a family
I want to see an optimal daily menu for my family
And I want a breakdown per family member
So that I can improve the health of my family

Unpack
------

* Daily Menu
    * Meal components
    * Ingredients
    * Calorie and nutritional breakdown
    * Preparation time
    * Cost
* Optimal
    * Sufficient calories
    * Balanced
    * Affordable
    * Satisfying
    * Varying
    * Efficient
    * Tasty
* For one person eating alone
* For a family eating together
    * How many people
    * Eat together or not
    * How many cooks
    * Daily menu breakdown per family member
        * Portions
        * Calorie and nutritional breakdown
* Constraints
    * Preparation time limits
    * Economic limits
    * Dietary constraints
    * Cooking infrastructure

Data Requirements
-----------------

* Physical Stats to establish baseline and needs
    * Age, weight, height, gender
* Health metrics
    * Fat % from caliper readings
    * Blood Pressure

Technology
----------

* Node JS
* KOA
* Swagger/API Blueprint


