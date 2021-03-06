# Government of Canada Food Guide

## Stakeholders

- Customer: The Government of Canada
- Domain: Canada Food Guide
- Platform: Online Service
- Goal: To improve the health of Canadians

## Primary Goals

Develop a prototype: Minimum Viable Product (MVP) outlined by the product owner

## Secondary Goals

- Adopt modern cloud-based methodologies
- Deploy a healthy eating API
- Scalable

## Long Term Roadmap

These goals are out of scope, but the architecture should support them

- Preference features
- Automatic weekly shopping lists
- Optional grocery delivery via Amazon Prime

## User Stories

### User daily menu

As a single user
I want to see an optimal daily menu
so that I can improve my health

### Family daily menu

As a family member
I want to see an optimal daily menu for my family
And I want a breakdown per family member
So that I can improve the health of my family

## Personas

- Single User
- Family Member

## Definitions and Models

- Daily Menu
  - Meal components
  - Ingredients
  - Calorie and nutritional breakdown
  - Preparation time
  - Cost
- Optimal
  - Sufficient calories
  - Balanced
  - Affordable
  - Satisfying
  - Varying
  - Efficient
  - Tasty
- People
  - How many people
  - Eat together or not
  - How many cooks
  - Daily menu breakdown per family member
    - Portions
    - Calorie and nutritional breakdown
- Constraints
  - Preparation time limits
  - Economic limits
  - Dietary constraints
  - Cooking infrastructure

## Personal Data Requirements

- Physical Stats to establish baseline and needs
  - Age
  - Weight
  - Height
  - Gender
- Health metrics
  - Body Fat %
  - Blood Pressure

## Record of Decisions

- Should family members have individual logins, or will a family owner be the only login?
  - Decision: Design the user family structure to allow all users a separate login

