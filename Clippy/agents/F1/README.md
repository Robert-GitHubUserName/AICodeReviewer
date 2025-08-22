# F1 Animation Reference Guide

This document provides a comprehensive list of all available animations for the F1 character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **GestureUp** - Points or gestures upward
- **GestureDown** - Points or gestures downward
- **GestureLeft** - Points or gestures to the left
- **GestureRight** - Points or gestures to the right

## Appearance/Disappearance
- **Show** - Makes F1 appear on screen
- **Hide** - Makes F1 disappear

## Attention Animations
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
- **Thinking** - Shows F1 thinking
- **Processing** - Shows processing/calculation animation
- **Searching** - Shows searching animation

## Specialized Animations
- **Explain** - Explanatory gesture
- **Congratulate** - Congratulatory animation
- **GetArtsy** - Shows artistic expression
- **GetTechy** - Shows technical expression
- **GetWizardy** - Shows magical expression
- **Writing** - Shows F1 writing
- **Print** - Animation for printing
- **Save** - Animation for saving
- **SendMail** - Animation for sending email
- **CheckingSomething** - Shows checking or verification
- **EmptyTrash** - Animation for emptying trash

## Idle Animations
- **RestPose** - Default resting pose
- **IdleBlink** - Simple blinking animation
- **IdleBlinkWithBrows** - Blinking with eyebrow movement
- **IdleLowersBrows** - Lowers eyebrows while idle
- **IdleLooksAtUser** - Looks at user while idle
- **IdleLookRight** - Looks right while idle
- **IdleLookLeft** - Looks left while idle
- **IdleLookDown** - Looks down while idle
- **IdleCuteToeTwist** - Cute toe twisting idle animation
- **IdleHeadPatting** - Head patting idle animation
- **IdleFallsAsleep** - Falls asleep while idle
- **IdleLeansAgainstWall** - Leans against wall while idle
- **IdleLowersToGround** - Lowers to ground while idle

## Usage Example
```javascript
// To make F1 search for something
clippy.load('F1', function(agent) {
    agent.show();
    agent.play('Searching');
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** F1 is an office assistant character with a paperclip-like appearance, often showing expressive movements and reactions. It can perform various computer-related animations like printing, saving, and sending mail.