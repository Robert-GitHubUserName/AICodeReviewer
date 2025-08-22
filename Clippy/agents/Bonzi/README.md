# Bonzi Animation Reference Guide

This document provides a comprehensive list of all available animations for the Bonzi character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **MoveLeft** - Moves Bonzi to the left
- **MoveRight** - Moves to the right
- **MoveUp** - Moves upward
- **MoveDown** - Moves downward
- **MoveLeftReturn** - Returns from moving left
- **MoveRightReturn** - Returns from moving right
- **MoveUpReturn** - Returns from moving up
- **MoveDownReturn** - Returns from moving down

## Appearance/Disappearance
- **Show** - Makes Bonzi appear on screen
- **Hide** - Makes Bonzi disappear

## Attention Animations
- **GetAttention** - Tries to get attention
- **GetAttention2** - Alternative attention-getting animation
- **GetAttentionContinued** - Extended attention-getting
- **GetAttentionReturn** - Returns from getting attention
- **Alert** - Alert expression
- **Announce** - Makes an announcement gesture
- **Greet** - Greeting animation
- **Wave** - Waving gesture

## Looking Animations
- **LookLeft** - Looks to the left
- **LookLeftReturn** - Returns from looking left
- **LookRight** - Looks to the right
- **LookRightReturn** - Returns from looking right
- **LookUp** - Looks upward
- **LookUpReturn** - Returns from looking up
- **LookDown** - Looks downward
- **LookDownReturn** - Returns from looking down

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
- **Thinking** - Shows Bonzi thinking
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

## Reading and Writing
- **Read** - Reading animation
- **Reading** - Reading animation (longer)
- **ReadContinued** - Extended reading
- **ReadReturn** - Return from reading
- **Write** - Writing animation
- **Writing** - Shows Bonzi writing
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
- **Idle1_6** - First idle animation variation 6
- **Idle2_1** - Second idle animation variation 1
- **Idle2_2** - Second idle animation variation 2
- **Idle3_1** - Third idle animation variation 1
- **Idle3_2** - Third idle animation variation 2
- **Idle3_3** - Third idle animation variation 3
- **Blink** - Simple blinking animation

## Usage Example
```javascript
// To make Bonzi search for something
clippy.load('Bonzi', function(agent) {
    agent.show();
    agent.play('Search'); // or 'Searching' for a more thorough animation
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Bonzi is a classic purple gorilla character known for his expressive face and hand gestures. His animations typically include quirky movements and comical reactions.