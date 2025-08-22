# Links Animation Reference Guide

This document provides a comprehensive list of all available animations for the Links character in ClippyAI. Use these animation names with the `.play()` method.

## Idle Animations
- **RestPose** - Default resting pose
- **IdleBlink** - Simple blinking animation
- **IdleStretch** - Stretching animation when idle
- **IdleTailWagA** - First tail wagging variation
- **IdleTailWagB** - Second tail wagging variation
- **IdleTailWagC** - Third tail wagging variation
- **IdleTailWagD** - Fourth tail wagging variation
- **IdleScratch** - Scratching animation
- **IdleCleaning** - Self-cleaning animation
- **IdleLegLick** - Licking leg animation
- **IdleButterFly** - Animation with a butterfly
- **IdleTwitch** - Twitching idle animation
- **IdleYawn** - Yawning animation
- **Idle1_1** - Complex idle animation with multiple variations

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
- **GoodBye** - Says goodbye

## Thinking and Working Animations
- **Thinking** - Shows Links thinking
- **Processing** - Shows processing/calculation animation (longer)
- **CheckingSomething** - Shows checking or verification
- **Searching** - Shows searching animation
- **Writing** - Shows Links writing

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
- **Show** - Makes Links appear on screen
- **Hide** - Makes Links disappear

## Deep Idle Animations
- **DeepIdleA** - Extended idle sequence A
- **DeepIdleE** - Extended idle sequence E

## Usage Example
```javascript
// To make Links search for something
clippy.load('Links', function(agent) {
    agent.show();
    agent.play('Searching');
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Links is a friendly dog character with many playful animations including tail wagging, stretching, and other canine behaviors. The animations showcase Links' pet-like qualities with unique movements such as scratching, cleaning, and butterfly chasing.