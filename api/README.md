# API design TODO

1. Get crafting to actually do something
2. Get something to be held in your hand
3. Get some sample modifiers on the tools

  - Modifier ideas:
    - More quantity
    - More rarity
    - Faster
    - -quantity, +rarity
    - -rarity, +quantity
    - slower speed, increased quantity
    - more multipliers on each of these stats
  
  - Thresholds (for progression)
    - Is it possible to programatically generate different kinds of currency
    - Is it possible to curve the power level in the correct way.

4. Make the modifiers actually do things




# API TODO:

1. Basic play flow

  - Mine rock -> adds rocks to user, returns rocks mined
  - Delete tool -> removes the tool, returns the ID

2. Basic Crafting flow

  - Purchase tool -> adds tool to user, returns tool added.
    - Can only have 4 (arbitrary - might change)
  - Craft on tool -> takes currency and applies to tool, returns new tool

3. Nice utilities

  - Delete tool (clears up space)
