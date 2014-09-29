# whatsmyip-core v0.1.2

> The core (js) implementation of whatsmyip apps.

# Pages

- index
  - index page
- records
  - history page

# Application
- common.js
- index.js
  - application implementation for index page
- records.js
  - application implementation for history page

# Domain

The domain layer.

## IpRecord

This domain is about the handling of the ip records.

### IpRecord model

This domain model represents each record of the ip address.

### IpRecordFactory

This class creates IpRecords.

### IpRecordRepository

This class stores and loads IpRecords.

## UserActivity

This domain is about how to handle and record user activities.

### UserActivity model

This domain model represents the various information of user activity.

### UserActivityRepository

This class stores and loads the UserActivity.

## ReviewReminding

This domain is about how the application shows Review Reminder to the user.

### ReviewRemindingSpecification

This class defines when the application should show the remider.

# Application

The application layer.

## Common

This module contains common procedures used among the pages.

## Index

This module contains procedures for index page.

## Records

This module contains procedures for history record page.

# Infrastructure

You need to implement the following infrastructure modules to build this app for mobile environment.

## Storage

- get
- set

## Http

- get

## Locale

- getLanguage

## External service

- openMarketLink

## PlatformUI

- toast
