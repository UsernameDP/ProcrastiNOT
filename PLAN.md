# Extension

> Extension is used to block websites

- The extension has all the inputs for blocking websites.

## Features

- Log in via. Google
- Turn off/on
- GUI :
  - Manual Inputs
    - GUI takes in specific website URLs and blocks if the specified website is currently focused by the user.
  - General Inputs
    - GUI takes in general inputs and determines whether the focused websites falls under one of the general categories to block.
    - [ ] Once I have learned ML, make my own AI to determine whether I should block.
- Sends websites and duration of visit to backend.

# WebApp

> Contains the fullstack code in NextJS

- The ultimate criteria is to write the code such that extracting data is flexible for both front and backend.

## FrontEnd

- FrontEnd will toggle extension based on _Timer_. This way, the backend doesn't have to be the medium in communication.

### Features

- Log in via. Google
- Routes :
  - / - Home page
    - Stats about most viewed websites
    - Stats about time spent working today
    - Graph about time spent working for week.
  - /todolist - contains todolist (Roughly same as [old todo list](https://usernamedp.github.io/TodoListForSchool/))
    - Timer - Start & Stop timer based on expected time of the work input. In addition, make a dedicated **fixed** Timer GUI.
    - Subject - The level underneath todolist
      - Plus Button - For adding a new subject to todolist
      - Right click to : add new Category, delete Subject
    - Category - The level underneath Subject
    - Task - Just a task you need to do
      - Name, Due Date, Expected Time (by default 0, aka. it is a note), Time Spent
      - Anytime you do anything related to one _task_, it will open up a **fixed** GUI.
    - /todolist/[name] - specific todo list
  - /agenda - your daily agenda.
    - It doesn't neccesarily have time, it just lists the things you need to do today
    - Based on estimated time.
    - You can start & stop timers for tasks here
    - Drag stuff from todo list into the agenda or manually type
    - Break - Breaks are a different color, and there is also a button to add them.
- Sidebar :
  - Home
  - TodoList
    - [todolist1]
    - [todolist2]
    - ...
  - Agenda

## Backend

> Handles all the neccesary requests for both Frontend and Extension

- Data is only cached for as long as 1 week

### Features

- TodoList
- Agenda

- Extension
  - Input
    - POST manualInput
    - DELETE manualInput
    - POST generalInput
    - DELETE generalInput
  - Data
    - UPDATE website - increments the time you have visited the website, if website has yet to be added for the day, it is added

## Todo

- [ ] Find a method to sync data between TodoList and Agenda.
- [ ] I might consider using NodeJS instead of NextJS because of the immense amount of api paths. Look into whether using NextJS is viable.
