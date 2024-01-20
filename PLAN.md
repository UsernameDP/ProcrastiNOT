# Extension

> Extension is used to block websites

- The extension has all the inputs for blocking websites.

## Features

- Log in via. Google
- Turn features off/on
- GUI
  - Manual Inputs
    - GUI takes in specific website URLs and blocks if the specified website is currently focused by the user.
  - General Inputs
    - GUI takes in general inputs and determines whether the focused websites falls under one of the general categories to block.
    - [ ] Once I have learned ML, make my own AI to determine whether I should block.
- Sends website's duration of visit to backend.
- Redirects to

# WebApp

> Contains the fullstack code in NextJS

- The ultimate criteria is to write the code such that extracting data is flexible for both front and backend.

## FrontEnd

- FrontEnd will toggle extension based on _Timer_. This way, the backend doesn't have to be the medium in communication.

### Features

- Log in via. Google
- Routes
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
      - ID, Name, Due Date, Expected Time (by default 0, aka. it is a note), Time Spent
      - Anytime you do anything related to one _task_, it will open up a **fixed** GUI.
    - /todolist/[name] - specific todo list
  - /agenda - your daily agenda.
    - It doesn't neccesarily have time, it just lists the things you need to do today
    - Based on estimated time.
    - You can start & stop timers for tasks here
    - Drag stuff from todo list into the agenda or manually type
    - Break - Breaks are a different color, and there is also a button to add them.
- Sidebar
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

- Tasks - Because multiple pages need to access tasks, it would be difficult to try to synchronize tasks with different Schemas for each page (e.g TodoList, Agenda). So, the solution would be to create an _unordered map_ in which we can access tasks via. their ID.

  - GET tasks - Array of taskID as an input
  - DELETE tasks - Array of taskID as an input. This means having to delete in agenda and todolist.

- TodoList

  - GET todolist - returns not with the taskIDs but with the actual tasks
  - POST todolist
  - DELETE todolist
  - GET subject
  - POST subject
  - DELETE subject
  - GET category
  - POST category
  - DELETE category

- Agenda

  - GET agenda - returns not taskIDs but the actual tasks
  - DELETE agenda - same as clearing
  - POST task - adding on task using _taskID_
  - DELETE task

- Extension
  - Input
    - POST manualInput
    - DELETE manualInput
    - POST generalInput
    - DELETE generalInput
  - Data
    - UPDATE website - increments the time you have visited the website, if website has yet to be added for the day, it is added

## Todo

- [x] Find a method to sync data between TodoList and Agenda. - "Solution was to let agenda and todolist to contain _taskID_ instead of the actual task instances themselves.
- [x] I might consider using NodeJS instead of NextJS because of the immense amount of api paths. Look into whether using NextJS is viable. - "Since I want the loading feature from NextJS, it would be better for me to stick with it. This solution might be slower, but the user experience should be better."

## Database

> The plan is to use MongoDB as a database, but if the storage needs to be higher, migrate or scale on MongoDB.
