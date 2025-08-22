# Peedy Animation Reference Guide

This document provides a comprehensive list of all available animations for the Peedy character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **MoveLeft** - Moves Peedy to the left
- **MoveRight** - Moves to the right
- **MoveUp** - Moves upward
- **MoveDown** - Moves downward

## Appearance/Disappearance
- **Show** - Makes Peedy appear on screen
- **Hide** - Makes Peedy disappear

## Attention Animations
- **GetAttention** - Tries to get attention
- **GetAttentionContinued** - Extended attention-getting
- **Alert** - Alert expression
- **Announce** - Makes an announcement gesture
- **Greet** - Greeting animation
- **Wave** - Waving gesture

## Looking Animations
- **LookLeft** - Looks to the left
- **LookLeftBlink** - Looks left and blinks
- **LookLeftReturn** - Return from looking left
- **LookRight** - Looks to the right
- **LookRightBlink** - Looks right and blinks
- **LookRightReturn** - Return from looking right
- **LookUp** - Looks upward
- **LookUpBlink** - Looks up and blinks
- **LookUpLeft** - Looks up and to the left
- **LookUpLeftBlink** - Looks up left and blinks
- **LookUpLeftReturn** - Return from looking up left
- **LookUpRight** - Looks up and to the right
- **LookUpRightBlink** - Looks up right and blinks
- **LookUpRightReturn** - Return from looking up right
- **LookUpReturn** - Return from looking up
- **LookDown** - Looks downward
- **LookDownBlink** - Looks down and blinks
- **LookDownLeft** - Looks down and to the left
- **LookDownLeftBlink** - Looks down left and blinks
- **LookDownLeftReturn** - Return from looking down left
- **LookDownRight** - Looks down and to the right
- **LookDownRightBlink** - Looks down right and blinks
- **LookDownRightReturn** - Return from looking down right
- **LookDownReturn** - Return from looking down

## Gestures
- **GestureLeft** - Points to the left
- **GestureRight** - Points to the right
- **GestureUp** - Points upward
- **GestureDown** - Points downward
- **Explain** - Explanatory gesture
- **Suggest** - Makes a suggestion gesture
- **Acknowledge** - Acknowledging gesture
- **Uncertain** - Shows uncertainty
- **Pleased** - Shows pleased expression
- **Sad** - Shows sad expression
- **Surprised** - Shows surprise
- **Confused** - Shows confusion
- **Decline** - Shows decline or refusal
- **DontRecognize** - Shows lack of recognition
- **Congratulate** - Congratulatory gesture

## Thinking and Processing
- **Thinking** - Shows Peedy thinking
- **Think** - Alternative thinking animation
- **Processing** - Shows processing/thinking animation (longer)
- **Process** - Alternative processing animation
- **Search** - Searching animation
- **Searching** - More thorough searching animation

## Communication
- **StartListening** - Begins a listening pose
- **StopListening** - Stops the listening pose
- **Hearing_1** - First listening animation
- **Hearing_2** - Second listening animation
- **Hearing_3** - Third listening animation

## Reading and Writing
- **Read** - Reading animation
- **Reading** - Reading animation (longer)
- **ReadContinued** - Extended reading
- **ReadReturn** - Return from reading
- **Write** - Writing animation
- **Writing** - Shows Peedy writing
- **WriteContinued** - Extended writing
- **WriteReturn** - Return from writing

## Special Actions
- **DoMagic1** - First magic trick animation
- **DoMagic2** - Second magic trick animation

## Idle Animations
- **RestPose** - Default resting pose
- **Idle1_1** - First idle animation variation 1
- **Idle1_2** - First idle animation variation 2
- **Idle1_3** - First idle animation variation 3
- **Idle1_4** - First idle animation variation 4
- **Idle1_5** - First idle animation variation 5
- **Idle2_1** - Second idle animation variation 1
- **Idle2_2** - Second idle animation variation 2
- **Idle3_1** - Third idle animation variation 1
- **Idle3_2** - Third idle animation variation 2
- **Idle3_3** - Third idle animation variation 3
- **Blink** - Simple blinking animation

## Usage Example
```javascript
// To make Peedy search for something
clippy.load('Peedy', function(agent) {
    agent.show();
    agent.play('Search'); // or 'Searching' for a more thorough animation
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Peedy is a parrot character with unique flying and squawking animations. Use motion animations like Wave and Greet to showcase his bird-like characteristics.