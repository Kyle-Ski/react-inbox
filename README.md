This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

# g99 React Inbox Requirements

* Checkpoint: https://learn-2.galvanize.com/cohorts/757/blocks/6/content_files/crush_codes/inbox.md
* Style Guide: https://galvanize-inbox-styleguide.herokuapp.com/

## Required User Stories

### Message Display
Users should see a list of messages with the correct styles

- [x] When a user views the app
  - [x] Then they should see a list of messages with their subjects
- [x] If the message is read, it should have the read style
- [x] If the message is unread, it should have the unread
- [x] If the message is selected, it should have the selected style and the box should be checked
- [x] If there are labels on a message, they should appear
- [x] If the message is starred, then the star should be filled in, otherwise it should be empty

### Starring
Users should be able to star and unstar a message.

- [x] When a user clicks the star next to a message
  - [x] Then it should toggle whether the message is starred or not
- [x] For example if it was starred, and you clicked on it, it should be unstarred

### Selecting Individual Messages
Users should be able to select and deselect individual messages.

- [x] When a user checks the checkbox on a message
  - [x] Then the message should be highlighted
- [x] When a user unchecks the checkbox on a message
  - [x] Then the message should _not_ be highlighted

### Marking Messages as Read
Users should be able to mark messages as read.

- [x] When a user selects messages
  - [x] And presses "Mark As Read"
  - [x] Then each selected message should be marked as read
  - [x] And should no longer be bold

### Marking Messages as Unread
Users should be able to mark messages as unread.

- [x] When a user selects messages
  - [x] And presses "Mark As Unread"
  - [x] Then each selected message should be marked as unread
  - [x] And should should appear bold

### Unread Message Count
Users should always see the number of unread messages

- [x] When a user changes which messages are read / unread
  - [x] Then the unread count in the upper right-hand corner should update
  - [x] And when there are 0 unread messages it should display "0 unread messages"
  - [x] And when there is 1 unread message it should display "1 unread message"
  - [x] And when there's more than 1 unread message it should display "_n_ unread messages"

### Load the messages from the server
- [x] When a user goes to your inbox app
  - [x] The messages they see should be the ones loaded from the server

### Actions should update the server-side
- [x] When a user stars or unstars a message
  - [x] And then reloads the page
  - [x] They should see that the data has been persisted
- [x] When a user marks messages read or unread

NOTE: the server-side API you are running locally runs in memory, so if you restart it, the data will reset.

### Add the ability to compose messages

- [x] When a user goes to the app
  - [x] They should see a red plus button
  - [x] And when they click that button
  - [x] Then a compose form should appear
- [x] And when they fill out the subject and body and press Send
  - [x] Then the compose form should go away
  - [x] And the message should appear on the page
- [x] And when they refresh, the message should still appear (it's persisted on the server)
- [x] When a user opens the compose form
  - [x] And then presses the red compose button
  - [x] Then the compose form should close

## Stretch User Stories

### Bulk Select / Deselect
Users should be able to select and deselect messages.

- [x] Given that no messages are selected
  - [x] When a user checks the "Select All" checkbox
  - [x] Then it should check all messages (and highlight them)
- [x] Given that some messages are selected
  - [x] When a user checks the "Select All" checkbox
  - [x] Then it should check all messages (and highlight them)
- [x] Given that all messages are selected
  - [x] When a user unchecks the "Select All" checkbox
  - [x] Then it should uncheck all messages (and unhighlight them)

### Deleting Messages
Users should be able to delete selected messages

- [x] When a user selects messages
  - [x] And presses "Delete" (the Trash icon)
  - [x] Then each selected message should be removed from the list
- [x] And the unread count should update
- [x] And "Select All" button should update

### Adding Labels
- [x] When a user selects messages from the sidebar
  - [x] And chooses a label from the "Add Label" dropdown
  - [x] Then that label should be added to all selected messages
  - [x] But if the message already contains the label then it should not be added twice

NOTE: It's OK to hard-code the list of labels

### Removing Labels
- [x] When a user selects messages from the sidebar
  - [x] And chooses a label from the "Remove Label" dropdown
  - [x] Then that label should be removed from all of the selected messages that contain the label

NOTE: It's OK to hard-code the list of labels
NOTE: If you try to remove a label from a message that doesn't have that label, there should be no errors

### Select All Button State
Users should see the state of the select all button change as messages are selected

- [x] When no messages are checked
  - [x] Then the "Select All" button should be in the "unchecked" state
- [ ] When some messages are checked
  - [ ] Then the "Select All" button should be in the "half-checked" state
- [x] When all messages are checked
  - [x] Then the "Select All" button should be in the "checked" state

NOTE: the "Select All" button must stay in sync at all times.
NOTE: Users should not be able to click on toolbar items when no messages are selected

### Actions should update the server-side

- [x] When a user deletes messages
- [x] Or adds or removes labels
- [x] And then refreshes the page
- [x] Then they should see that the data has been persisted
