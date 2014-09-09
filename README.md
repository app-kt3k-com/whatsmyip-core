# whatsmyip-core v0.0.4

> The core (js) implementation of whatsmyip apps.

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
