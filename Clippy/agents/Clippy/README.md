# Clippy Animation Reference Guide

This document provides a comprehensive list of all available animations for the Clippy character in ClippyAI. Use these animation names with the `.play()` method.

## Movement Animations
- **MoveLeft** - Moves Clippy to the left
- **MoveRight** - Moves to the right
- **MoveUp** - Moves upward
- **MoveDown** - Moves downward

## Appearance/Disappearance
- **Show** - Makes Clippy appear on screen
- **Hide** - Makes Clippy disappear

## Attention Animations
- **GetAttention** - Tries to get attention
- **GetAttentionContinued** - Extended attention-getting
- **GetAttentionReturn** - Returns from getting attention
- **Alert** - Alert expression
- **Announce** - Makes an announcement gesture
- **Greeting** - Greeting animation
- **Wave** - Waving gesture
- **GoodBye** - Farewell animation

## Looking Animations
- **LookLeft** - Looks to the left
- **LookLeftBlink** - Looking left with blinking
- **LookLeftReturn** - Return from looking left
- **LookRight** - Looks to the right
- **LookRightBlink** - Looking right with blinking
- **LookRightReturn** - Return from looking right
- **LookUp** - Looks upward
- **LookUpLeft** - Looks up and to the left
- **LookUpRight** - Looks up and to the right
- **LookUpReturn** - Return from looking up
- **LookDown** - Looks downward
- **LookDownLeft** - Looks down and to the left
- **LookDownRight** - Looks down and to the right
- **LookDownReturn** - Return from looking down

## Gestures
- **GestureLeft** - Points to the left
- **GestureRight** - Points to the right
- **GestureUp** - Points upward
- **GestureDown** - Points downward
- **Explain** - Explanatory gesture
- **Suggest** - Makes a suggestion gesture

## Thinking and Processing
- **Thinking** - Shows Clippy thinking
- **Processing** - Shows processing/thinking animation (longer)
- **Search** - Searching animation
- **Searching** - More thorough searching animation

## Communication
- **StartListening** - Begins a listening pose
- **StopListening** - Stops the listening pose
- **Hearing_1** - Listening animation variant 1

## Reading and Writing
- **Read** - Reading animation
- **Reading** - Reading animation (longer)
- **ReadContinued** - Extended reading
- **ReadReturn** - Return from reading
- **Write** - Writing animation
- **Writing** - Shows Clippy writing
- **WriteContinued** - Extended writing
- **WriteReturn** - Return from writing

## Special Actions
- **Print** - Printing animation
- **SendMail** - Email sending animation
- **Save** - Saving animation 
- **EmptyTrash** - Empty trash animation
- **GetTechy** - Technical mode animation
- **GetWizardy** - Wizard mode animation
- **GetArtsy** - Artistic mode animation
- **Congratulate** - Congratulatory gesture

## Idle Animations
- **RestPose** - Default resting pose
- **Idle1_1** - Basic idle animation
- **IdleAtom** - Atom-themed idle animation
- **IdleEyeBrowRaise** - Eyebrow raising idle animation
- **IdleFingerTap** - Finger tapping idle animation
- **IdleHeadScratch** - Head scratching animation
- **IdleRopePile** - Rope pile idle animation
- **IdleSideToSide** - Side-to-side idle animation
- **IdleSnooze** - Snoozing idle animation

## Usage Example
```javascript
// To make Clippy search for something
clippy.load('Clippy', function(agent) {
    agent.show();
    agent.play('Search'); // or 'Searching' for a more thorough animation
    
    // Chain animations
    agent.play('GetAttention', function() {
        agent.speak("I found what you were looking for!");
        agent.play('Congratulate');
    });
});
```

**Note:** Clippy has several unique animations like "SendMail", "EmptyTrash", and "Print" that reflect its original role as an Office assistant. These can be useful for adding nostalgic charm to your application.