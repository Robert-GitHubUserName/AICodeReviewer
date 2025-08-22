# Genie Animation Reference Guide

This document provides a comprehensive list of all available animations for the Genie character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **MoveLeft** - Moves Genie to the left
- **MoveRight** - Moves to the right
- **MoveUp** - Moves upward
- **MoveDown** - Moves downward

## Appearance/Disappearance
- **Show** - Makes Genie appear on screen
- **Hide** - Makes Genie disappear

## Attention Animations
- **GetAttention** - Tries to get attention
- **GetAttentionContinued** - Extended attention-getting
- **GetAttentionReturn** - Returns from getting attention
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
- **LookUpBlink** - Looking up with blinking
- **LookUpReturn** - Return from looking up
- **LookDown** - Looks downward
- **LookDownBlink** - Looking down with blinking
- **LookDownReturn** - Return from looking down

## Gestures
- **GestureLeft** - Points to the left
- **GestureRight** - Points to the right
- **GestureUp** - Points upward
- **GestureDown** - Points downward
- **Explain** - Explanatory gesture
- **Suggest** - Makes a suggestion gesture
- **DoMagic1** - Simple magic trick animation
- **DoMagic2** - Extended magic trick animation

## Thinking and Processing
- **Thinking** - Shows Genie thinking
- **Think** - Brief thinking pose
- **Process** - Processing information
- **Processing** - Shows extended processing/thinking animation
- **Search** - Searching animation
- **Searching** - More thorough searching animation

## Communication
- **StartListening** - Begins a listening pose
- **StopListening** - Stops the listening pose
- **Hearing_1** through **Hearing_4** - Different listening animations
- **Acknowledge** - A nodding acknowledgment gesture
- **Decline** - Shows Genie declining something
- **DontRecognize** - A confused expression

## Reading and Writing
- **Read** - Reading animation
- **Reading** - Reading animation (longer)
- **ReadContinued** - Extended reading
- **ReadReturn** - Return from reading
- **Write** - Writing animation
- **Writing** - Shows Genie writing
- **WriteContinued** - Extended writing
- **WriteReturn** - Return from writing

## Emotional States
- **Pleased** - Shows Genie looking pleased
- **Congratulate** - Makes a congratulatory gesture
- **Congratulate_2** - Another congratulatory animation
- **Surprised** - Shows Genie looking surprised
- **Confused** - Shows confusion
- **Uncertain** - Shows uncertainty
- **Sad** - Shows sadness
- **Blink** - Simple blinking animation
- **RestPose** - Default resting pose

## Idle Animations
- **Idle1_1** through **Idle1_6** - Variety of idle animations, set 1
- **Idle2_1** through **Idle2_3** - Idle animations, set 2
- **Idle3_1**, **Idle3_2** - Idle animations, set 3

## Usage Example
```javascript
// To make Genie search for something
clippy.load('Genie', function(agent) {
    agent.show();
    agent.play('Search'); // or 'Searching' for a more thorough animation
    
    // Chain animations
    agent.play('DoMagic1', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Pleased');
    });
});
```

**Note:** Genie has some unique animations that showcase his magical character, particularly DoMagic1 and DoMagic2, which you might want to utilize for special effects.