# Components and Effects Spec

## Hero

| Component | Effect |
|---|---|
| Loading tofu icon | Animated on black loading screen, then moves to top-left and becomes the logo anchor. |
| Avatar render module | Sequence is ASCII -> Pixel -> Final Image. |
| Title and short description | During Pixel to Image, letters come from behind right side of avatar head in reverse-comet order with slight Y randomness; full text settles in about 1-2 seconds. |
| GitHub status box | Appears only after text animation fully completes. |
| Header nav | Appears at the same time as GitHub box after text settles. |
| Custom cursor | Spawns only after all hero intro elements are finished and stationary. |

## About

| Component | Effect |
|---|---|
| About header div | Created by morphing the Computer Engineering div from Hero. |
| 4 left info boxes | Created by GitHub box melt/splinter transform into four boxes. |
| Right plasma asset | Created by avatar morph; lives as 2.5D/3D plasma object that can drive plasma shooting behavior. |
| Cursor variant | Celestial cursor transforms into a different celestial body style for About. |

## Projects

| Component | Effect |
|---|---|
| VR headset shell | Plasma object turns into VR headset, then expands to full viewport. |
| Header HUD | Header transforms and fits into top area of VR view. |
| Center 3D identity anchor | Persistent center object making the section identity clearly Projects. |
| 6 cards (depth lanes) | Cards drop in fake 3D gallery as dangling units, then tether retracts and cards levitate. |
| Drop order | Back pair first (hardware and python), middle pair second (js and cnn), front pair last (hkust climbing and rag). |
| Physics layer | After settle, levitating cards are affected by wind and black-hole gravity pull. |

## Skills

| Component | Effect |
|---|---|
| Flood handoff state | Scene is flooded from VR rupture logic and then camera reorients into skills ecosystem behavior. |

## Contact

| Component | Effect |
|---|---|
| Contact layout | Resume and role stack on left, Email GitHub LinkedIn on right, discovered in dark cave style. |

## Footer

| Component | Effect |
|---|---|
| Override state | Immersive effects stop, footer snaps into rigid clean layout, cursor returns to normal. |
