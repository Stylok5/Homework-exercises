# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) GA London React Template

# Building a Static Site with React

## Introduction

Your mission is to build a new React app, set up multiple components and render them all in a single parent `<App />` component. This will be a quick little site for a museum with information about a future exhibit, general museum information and hours, and donor information.

## Exercise

- Correctly render all the data in the App component to the DOM, matching the provided example
- When complete, attempt to refactor your page to use 3 children components for each section.
- Those components should be:
  - `<Header />` containing the image a overview of the exhibit
  - `<GeneralInfo />` containing info about the admission prices and opening hours
  - `<DonorInfo />` containing info about donating to and contacting the museum
- Attempt to pass the data from the App component to its respetive Child component, via props.

#### Deliverable

<img width="752" src="https://cloud.githubusercontent.com/assets/25366/9002041/f942dad0-3713-11e5-838f-8670fd50c5cd.png">

## Getting started

- Install dependencies `npm install` or `npm install --legacy-peer-deps` (If you are not sure which version to use ask an Instructor)
- Start the app using `npm run dev`

## Tips

- Check the terminal if something goes wrong. The error messages are pretty good!

- Use `map` to loop over arrays of data and render markup:

```
<ul>
  {props.hours.map(item => <li key={item.day}>{item.day}: {item.times}</li>}
</li>
```

> **Note**: when generating JSX in a loop, React needs a `key` prop with a unique value so that it can track any changes to the DOM efficiently
