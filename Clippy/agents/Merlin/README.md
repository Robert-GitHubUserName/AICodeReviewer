# Merlin Animation Reference Guide

This document provides a comprehensive list of all available animations for the Merlin character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **MoveLeft** - Moves Merlin to the left
- **MoveRight** - Moves to the right
- **MoveUp** - Moves upward
- **MoveDown** - Moves downward

## Appearance/Disappearance
- **Show** - Makes Merlin appear on screen
- **Hide** - Makes Merlin disappear

## Attention Animations
- **GetAttention** - Tries to get attention
- **GetAttentionContinued** - Extended attention-getting
- **Announce** - Makes an announcement gesture
- **Alert** - Alert expression
- **Greet** - Greeting animation
- **Wave** - Waving gesture

## Looking Animations
- **LookLeft** - Looks to the left
- **LookLeftBlink** - Looking left with blinking
- **LookLeftReturn** - Return from looking left
- **LookRight** - Looks to the right
- **LookRightBlink** - Looking right with blinking
- **LookRightReturn** - Return from looking right
- **LookUp** - Looks upward
- **LookUpReturn** - Return from looking up
- **LookDown** - Looks downward
- **LookDownReturn** - Return from looking down

## Gestures
- **GestureLeft** - Points to the left
- **GestureRight** - Points to the right
- **GestureUp** - Points upward
- **GestureDown** - Points downward
- **Explain** - Explanatory gesture
- **Suggest** - Makes a suggestion gesture
- **DoMagic1** - Magic trick animation 1
- **DoMagic2** - Magic trick animation 2

## Thinking and Processing
- **Thinking** - Shows Merlin thinking
- **Process** - Processing information
- **Processing** - Shows processing/thinking animation (longer)
- **Search** - Searching animation
- **Searching** - Searching animation (more thorough)

## Communication
- **StartListening** - Begins a listening pose
- **StopListening** - Stops the listening pose
- **Hearing_1** through **Hearing_4** - Different listening animations
- **Acknowledge** - A nodding acknowledgment gesture
- **Decline** - Shows Merlin declining something
- **DontRecognize** - A confused expression

## Reading and Writing
- **Read** - Reading animation
- **Reading** - Reading animation (longer)
- **ReadContinued** - Extended reading
- **ReadReturn** - Return from reading
- **Write** - Writing animation
- **Writing** - Shows Merlin writing
- **WriteContinued** - Extended writing
- **WriteReturn** - Return from writing

## Emotional States
- **Pleased** - Shows Merlin looking pleased
- **Congratulate** - Makes a congratulatory gesture
- **Congratulate_2** - Another congratulatory animation
- **Surprised** - Shows Merlin looking surprised
- **Confused** - Shows confusion
- **Uncertain** - Shows uncertainty
- **Sad** - Shows sadness
- **Blink** - Simple blinking animation
- **RestPose** - Default resting pose

## Idle Animations
- **Idle1_1** through **Idle1_4** - Variety of idle animations, set 1
- **Idle2_1**, **Idle2_2** - Idle animations, set 2
- **Idle3_1**, **Idle3_2** - Idle animations, set 3

## Usage Example
```javascript
// To make Merlin search for something
clippy.load('Merlin', function(agent) {
    agent.show();
    agent.play('Search'); // or 'Searching' for a more thorough animation
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Pleased');
    });
});
```

**Note:** There is no animation specifically called "SearchWeb". Use "Search" or "Searching" instead for similar functionality.