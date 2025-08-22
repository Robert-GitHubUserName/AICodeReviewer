# Genius Animation Reference Guide

This document provides a comprehensive list of all available animations for the Genius character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **GestureUp** - Points or gestures upward
- **GestureDown** - Points or gestures downward
- **GestureLeft** - Points or gestures to the left
- **GestureRight** - Points or gestures to the right

## Appearance/Disappearance
- **Show** - Makes Genius appear on screen
- **Hide** - Makes Genius disappear

## Attention and Greeting Animations
- **GetAttention** - Tries to get attention
- **Alert** - Alert expression
- **Greeting** - Greets the user
- **Wave** - Waving gesture
- **Goodbye** - Says goodbye 

## Looking Animations
- **LookLeft** - Looks to the left
- **LookRight** - Looks to the right
- **LookUp** - Looks upward
- **LookUpRight** - Looks up and to the right
- **LookUpLeft** - Looks up and to the left
- **LookDown** - Looks downward
- **LookDownRight** - Looks down and to the right
- **LookDownLeft** - Looks down and to the left

## Processing Animations
- **Thinking** - Shows Genius thinking
- **Processing** - Shows processing/calculation animation
- **Searching** - Shows searching animation

## Explanation and Communication
- **Explain** - Shows explaining gesture or expression
- **CheckingSomething** - Shows checking or verification

## Specialized Animations
- **GetArtsy** - Shows artistic expression and creativity 
- **GetTechy** - Shows technical expression with gadgets
- **GetWizardy** - Shows magical expression

## Office-Related Actions
- **Writing** - Shows Genius writing
- **Print** - Animation for printing
- **Save** - Animation for saving files
- **SendMail** - Animation for sending email
- **EmptyTrash** - Animation for emptying trash

## Idle Animations
- **RestPose** - Default resting pose
- **Idle0** through **Idle9** - Various idle animations and behaviors
- **DeepIdle1** - Special deeper idle animation

## Usage Example
```javascript
// To make Genius search for something
clippy.load('Genius', function(agent) {
    agent.show();
    agent.play('Searching');
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Genius is a character designed to appear intelligent and helpful, with animations showing office productivity, technical skills, and creative expression. It uses thoughtful gestures and expressive movements to convey information.