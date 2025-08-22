# Rocky Animation Reference Guide

This document provides a comprehensive list of all available animations for the Rocky character in ClippyAI. Use these animation names with the `.play()` method.

## Idle Animations
- **DeepIdle1** - Extended idle sequence
- **Idle(1)** - First idle animation
- **Idle(2)** - Second idle animation
- **Idle(3)** - Third idle animation
- **Idle(4)** - Fourth idle animation
- **Idle(5)** - Fifth idle animation
- **Idle(6)** - Sixth idle animation
- **Idle(7)** - Seventh idle animation
- **Idle(8)** - Eighth idle animation
- **Idle(9)** - Ninth idle animation
- **RestPose** - Default resting pose

## Looking Animations
- **LookLeft** - Looks to the left
- **LookRight** - Looks to the right
- **LookUp** - Looks upward
- **LookDown** - Looks downward
- **LookUpLeft** - Looks up and to the left
- **LookUpRight** - Looks up and to the right
- **LookDownLeft** - Looks down and to the left
- **LookDownRight** - Looks down and to the right

## Gesture Animations
- **GestureLeft** - Points or gestures to the left
- **GestureRight** - Points or gestures to the right
- **GestureUp** - Points or gestures upward
- **GestureDown** - Points or gestures downward

## Greeting and Attention Animations
- **GetAttention** - Tries to get attention
- **Alert** - Alert expression
- **Wave** - Waving gesture
- **Greeting** - Greets the user
- **Goodbye** - Says goodbye

## Thinking and Working Animations
- **Thinking** - Shows Rocky thinking
- **Processing** - Shows processing/calculation animation (longer)
- **CheckingSomething** - Shows checking or verification
- **Searching** - Shows searching animation
- **Writing** - Shows Rocky writing

## Specialized Animations
- **GetTechy** - Shows technical expression with gadgets
- **GetArtsy** - Shows artistic expression and creativity
- **GetWizardy** - Shows magical/wizardly expression
- **Explain** - Shows explaining gesture or expression
- **Hearing_1** - Listening animation
- **Congratulate** - Congratulatory animation

## Computer-Related Actions
- **Print** - Animation for printing
- **Save** - Animation for saving files
- **SendMail** - Animation for sending email
- **EmptyTrash** - Animation for emptying trash

## Appearance/Disappearance
- **Show** - Makes Rocky appear on screen
- **Hide** - Makes Rocky disappear

## Usage Example
```javascript
// To make Rocky search for something
clippy.load('Rocky', function(agent) {
    agent.show();
    agent.play('Searching');
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Rocky is a character with a variety of animations showcasing different expressions and actions. The animations include technical, artistic, and magical expressions, as well as common office-related actions.