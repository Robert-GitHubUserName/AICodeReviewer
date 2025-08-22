# Rover Animation Reference Guide

This document provides a comprehensive list of all available animations for the Rover character in ClippyAI. Use these animation names with the `.play()` method.

## Idle Animations
- **Idle** - Default idle animation
- **RestPose** - Default resting pose

## Looking Animations
- **LookUpLeft** - Looks up and to the left
- **LookUp** - Looks upward

## Gesture Animations
- **GestureLeft** - Points or gestures to the left

## Greeting and Attention Animations
- **GetAttention** - Tries to get attention
- **Greet** - Greeting animation

## Thinking and Working Animations
- **Thinking** - Shows Rover thinking
- **Writing** - Shows Rover writing
- **Searching** - Shows searching animation

## Specialized Animations
- **Cooking** - Shows cooking animation
- **Sports** - Shows sports animation
- **Money** - Shows money-related animation
- **Books** - Shows reading books animation
- **ImageSearching** - Shows image searching animation
- **Celebrity** - Shows celebrity animation
- **CharacterSucceeds** - Shows success animation
- **Embarrassed** - Shows embarrassed animation
- **Pleased** - Shows pleased animation
- **Surprised** - Shows surprised animation
- **Shopping** - Shows shopping animation

## Computer-Related Actions
- **Print** - Animation for printing
- **Save** - Animation for saving files
- **SendMail** - Animation for sending email
- **EmptyTrash** - Animation for emptying trash

## Appearance/Disappearance
- **Show** - Makes Rover appear on screen
- **Hide** - Makes Rover disappear
- **HideQuick** - Quickly hides Rover

## Usage Example
```javascript
// To make Rover search for something
clippy.load('Rover', function(agent) {
    agent.show();
    agent.play('Searching');
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Pleased');
    });
});
```

**Note:** Rover is a character with a variety of animations showcasing different expressions and actions. The animations include technical, artistic, and magical expressions, as well as common office-related actions.