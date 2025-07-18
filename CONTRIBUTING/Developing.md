# Developing Guide

## Getting Started

1. Run `nvm use` to change to our specific node version 
2. Install: `npm install`
3. Start developing: `npm run dev` 
4. Writing a new component? Run `npm run write:component` and follow the instructions in the terminal to create the boilerplate of a new component

## How to write a good component 

A good component is one that is flexible, reusable and scalable. It is not tight to a single product logic and can be used in all projects. 

As a library, all components should follow the same naming pattern for its API (properties, events, methods, slots, css variables). Study other components to find a similar pattern or convention to follow 

## Workflow 

Its often counterproductive to jump right into development and sometimes the system designer relies on our input to make tweaks to the design. Here are a few steps the system engineer usually take to develop a component 

1. Look at the figma specifications of the component and properly understand what you need to build 

2. Discuss and have clarifications with the system designer. Example of some questions we frequently clarify 
    - How does this component behave when user does ... 
    - Can this ... be customised by the user? 

3. Plan out how you want to write your component. Common questions to ask ourselves 
    - Are there sub components? 
    - Should i use a slot or prop ?
    - Do parent and child need to share information? 
    - What context is this component being used in? A form ? 
    - Will future implementation affect the code largely? How should I write the component to make it flexible and minimise extensive changes?

4. At some point, start writing tests. 
    - It can be hard to write test at the start when there are several html structural changes. Start as early as you can.
    - Start writing when you have your baseline html structure down

5. If you are building new features of a component or making changes to the existing API 
    - Is there breaking changes? If so, think twice, is this really necessary? If it is then go ahead. 
    - 
