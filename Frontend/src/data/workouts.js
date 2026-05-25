import arnoldPress from '../exercises/Arnold Press.jpg'
import benchPress from '../exercises/Bench Press.png'
import cableCrossover from '../exercises/Cable Crossover.png'
import chestDip from '../exercises/Chest Dip.png'
import chestPressMachine from '../exercises/Chest Press Machine.png'
import diamondPushup from '../exercises/Diamond Push-UP.webp'
import dumbbellFlies from '../exercises/Dumbbell flies.png'
import lateralRaise from '../exercises/Lateral Raise.png'
import overheadPress from '../exercises/Overhead Press.png'
import overheadTricepExtension from '../exercises/Overhead Tricep Extension.png'
import pushups from '../exercises/Pushups.png'
import shoulderPressMachine from '../exercises/Shoulder Press Machine.png'
import tricepDip from '../exercises/Tricep dip.png'
import tricepPushdown from '../exercises/Tricep Pushdown.png'
import inclineBenchPress from '../exercises/Incline Bench Press.png'
import skullCrusher from '../exercises/Skull Crusher.png'
import frontRaise from '../exercises/Front Raise.webp'
import closeGripBenchPress from '../exercises/Close Grip BenchPress.webp'
import reverseCurl from '../exercises/Reverse Curls.webp'

// Pull / Back / Bicep images
import pullUp from '../exercises/Pull-up.png'
import chinUp from '../exercises/Chin-up.png'
import barbellRow from '../exercises/Barbell-Row.png'
import latsPulldown from '../exercises/Lats-Pulldown.png'
import seatedCableRow from '../exercises/Seated-Cable-Row.png'
import singleArmDumbbellRow from '../exercises/Single-Arm-Dumbbell Row.png'
import tBarRow from '../exercises/T-Bar Row.png'
import straightArmPulldown from '../exercises/Straight-Arm Pulldown.png'
import facePull from '../exercises/Face Pull.png'
import barbellShrug from '../exercises/Barbell Shrug.png'
import rearDeltFly from '../exercises/Rear Delt Fly.png'
import barbellCurl from '../exercises/Barbell Curl.png'
import dumbbellCurl from '../exercises/Dumbbell curl.png'
import hammerCurl from '../exercises/Hammer Curl.webp'
import inclineDumbbellCurl from '../exercises/Incline Dumbbell Curl.png'
import preacherCurl from '../exercises/Preacher Curl.png'
import concentrationCurl from '../exercises/Concentration Curl.png'
import cableCurl from '../exercises/Cable Curl.png'
import bicepCurlMachine from '../exercises/Bicep Curl Machine.png'
import latPulldownMachine from '../exercises/Lat Pulldown Machine.png'
import seatedRowMachine from '../exercises/Seated Row Machine.png'
import declineChestPress from '../exercises/decine-chest-press.webp'


// ── LEGS IMAGES ──────────────────────────────────────
import backSquat from '../exercises/Back Squat.png'
import frontSquat from '../exercises/Front Squat.png'
import gobletSquat from '../exercises/Goblet Squat.png'
import bulgarianSplitSquat from '../exercises/Bulgairan Split Squat.png'
import deadliftImg from '../exercises/Deadlift.png'
import sumoDeadlift from '../exercises/Sumo Deadlift.png'
import walkingLunge from '../exercises/Walking Lunge.png'
import reverseLunge from '../exercises/Reverse Lunge.png'
import legPress from '../exercises/Leg Press.png'
import romanianDeadlift from '../exercises/Romanian Deadlift.png'
import legExtension from '../exercises/Leg Extension.png'
import lyingLegCurl from '../exercises/Lying Leg Curl.png'
import hipThrust from '../exercises/Hip Thrust.png'
import gluteBridge from '../exercises/Glute Bridge.png'
import calfRaiseImg from '../exercises/Calf Raise.png'
import stepUp from '../exercises/Step-Up.png'
import legPressMachine from '../exercises/Leg Press Machine.png'
import legExtensionMachine from '../exercises/Leg Extension Machine.png'
import legCurlMachine from '../exercises/Leg Curl Machine.png'

/* core exercises */

import deadBug from '../exercises/Dead Bug.png'
import mountainClimber from '../exercises/Mountain Climber.png'
import russianTwist from '../exercises/Russian Twist.png'
import hangingLegRaise from '../exercises/Hanging Leg Raise.png'
import bicycleCrunch from '../exercises/Bicycle Crunch.png'
import crunchImg from '../exercises/Crunch.png'
import sidePlank from '../exercises/Side Plank.png'
import plankImg from '../exercises/Plank.png'

/* cardio exercises */

import burpeeImg from '../exercises/Burpee.png'
import treadmillWalk from '../exercises/Treadmill Walk.png'
import highKnees from '../exercises/High Knees.png'
import jumpingJack from '../exercises/Jumping Jack.png'
import boxJump from '../exercises/Box Jump.png'
import jumpRope from '../exercises/Jump Rope.png'

import shoulderPressMachineImg from '../exercises/Shoulder press machine.webp'
import chestPressMachineImg from '../exercises/Chest Press Machine.webp'
import legExtensionMachineImg from '../exercises/leg extension machine.jpg'
import bicepsCurlImg from '../exercises/Biceps curl.png'
export const EXERCISES = [
  /* ── PUSH ─────────────────────────────────────────── */
  {
    id: 'push_up', name: 'Push-Up', muscle: 'Chest · Triceps · Shoulders', category: 'push',
    image: pushups,
    cues: ['Hands just outside shoulder-width','Keep core braced throughout','Lower chest to 1" from floor','Press to full lockout at top'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'bench_press', name: 'Bench Press', muscle: 'Chest · Triceps · Front Delts', category: 'push',
    image: benchPress,
    cues: ['Retract & depress scapula','Bar touches lower chest','Drive feet hard into floor','Controlled 2s descent'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'incline_bench_press', name: 'Incline Bench Press', muscle: 'Upper Chest · Front Delts · Triceps', category: 'push',
    image: inclineBenchPress,
    cues: ['Set bench to 30-45°','Bar touches upper chest','Elbows at 75° angle','Squeeze upper chest at top'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'decline_bench_press', name: 'Decline Bench Press', muscle: 'Lower Chest · Triceps', category: 'push',
    image: declineChestPress,
    cues: ['Feet secured on pad','Bar to lower chest','Keep back flat on bench','Drive bar in slight arc'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'dumbbell_fly', name: 'Dumbbell Fly', muscle: 'Chest (isolation)', category: 'push',
    image: dumbbellFlies,
    cues: ['Slight fixed elbow bend','Feel deep stretch at bottom','Squeeze pecs hard at top','Arc motion, not press'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'cable_crossover', name: 'Cable Crossover', muscle: 'Chest · Front Delts', category: 'push',
    image: cableCrossover,
    cues: ['High pulley setting','Slight forward lean','Bring hands together below chest','Squeeze pecs at centre'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'chest_dip', name: 'Chest Dip', muscle: 'Lower Chest · Triceps', category: 'push',
    image: chestDip,
    cues: ['Lean forward ~30°','Elbows flare slightly out','Lower until pecs stretch','Full lockout at top'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'overhead_press', name: 'Overhead Press', muscle: 'Shoulders · Triceps · Upper Chest', category: 'push',
    image: overheadPress,
    cues: ['Brace core like a plank','Bar path is perfectly vertical','Push head through at lockout','Re-rack by hinging at hips'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'arnold_press', name: 'Arnold Press', muscle: 'All Three Delt Heads', category: 'push',
    image: arnoldPress,
    cues: ['Start with palms facing you','Rotate palms out as you press','Reach full overhead lockout','Reverse rotation on the way down'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'lateral_raise', name: 'Lateral Raise', muscle: 'Side Deltoid', category: 'push',
    image: lateralRaise,
    cues: ['Slight forward torso lean','Lead movement with elbows','Stop exactly at shoulder height','Take 3s to lower the weight'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },
  {
    id: 'front_raise', name: 'Front Raise', muscle: 'Front Deltoid', category: 'push',
    image: frontRaise,
    cues: ['Arms extended, slight elbow bend','Raise to eye level only','Avoid swinging torso','Squeeze front delt at top'],
    defaultSets: 3, defaultReps: 12, rest: 45,
  },
  {
    id: 'tricep_dip', name: 'Tricep Dip', muscle: 'Triceps · Lower Chest', category: 'push',
    image: tricepDip,
    cues: ['Lean slightly forward for chest','Keep elbows tracking back','Lower until 90° elbow bend','Full lockout on the press'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'skull_crusher', name: 'Skull Crusher', muscle: 'Triceps (long head)', category: 'push',
    image: skullCrusher,
    cues: ['Bar above forehead, elbows vertical','Only forearms move','Lower bar behind head slightly','Extend explosively to lockout'],
    defaultSets: 3, defaultReps: 10, rest: 60,
  },
  {
    id: 'tricep_pushdown', name: 'Tricep Pushdown', muscle: 'Triceps (lateral head)', category: 'push',
    image: tricepPushdown,
    cues: ['Elbows glued to sides','Push bar to full lockout','Squeeze triceps hard at bottom','Slow 2s return to start'],
    defaultSets: 4, defaultReps: 12, rest: 60,
  },
  {
    id: 'overhead_tricep_extension', name: 'Overhead Tricep Extension', muscle: 'Triceps (long head)', category: 'push',
    image: overheadTricepExtension,
    cues: ['Arms vertical overhead','Lower dumbbell behind head slowly','Feel full long-head stretch','Press back to full lockout'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'close_grip_bench', name: 'Close-Grip Bench Press', muscle: 'Triceps · Inner Chest', category: 'push',
    image: closeGripBenchPress,
    cues: ['Grip shoulder-width or slightly narrower','Elbows stay tucked in','Bar to lower chest','Full tricep lockout at top'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'diamond_pushup', name: 'Diamond Push-Up', muscle: 'Triceps · Inner Chest', category: 'push',
    image: diamondPushup,
    cues: ['Form diamond shape with hands','Elbows flare backward not out','Chest touches thumbs at bottom','Squeeze triceps hard at top'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },

  /* ── PULL ─────────────────────────────────────────── */
  {
    id: 'pull_up', name: 'Pull-Up', muscle: 'Lats · Biceps · Rear Delts', category: 'pull',
    image: pullUp,
    cues: ['Start from a full dead hang','Depress shoulders first','Pull elbows to pockets','Chin clears the bar cleanly'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'chin_up', name: 'Chin-Up', muscle: 'Lats · Biceps (supinated grip)', category: 'pull',
    image: chinUp,
    cues: ['Underhand shoulder-width grip','Hang fully at the bottom','Pull until chin clears bar','Slow and controlled descent'],
    defaultSets: 3, defaultReps: 8, rest: 90,
  },
  {
    id: 'barbell_row', name: 'Barbell Row', muscle: 'Mid Back · Lats · Biceps', category: 'pull',
    image: barbellRow,
    cues: ['Hinge to ~45° torso angle','Pull bar to lower sternum','Squeeze shoulder blades hard','No hip drive — strict form'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'lat_pulldown', name: 'Lat Pulldown', muscle: 'Lats · Teres Major · Biceps', category: 'pull',
    image: latsPulldown,
    cues: ['Wide overhand grip','Slight backward lean','Pull bar to upper chest','Allow full stretch at top'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'seated_row', name: 'Seated Cable Row', muscle: 'Mid Back · Rhomboids · Lats', category: 'pull',
    image: seatedCableRow,
    cues: ['Sit tall with chest up','Pull handle to lower sternum','Retract shoulder blades fully','Reach forward for full stretch'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'one_arm_db_row', name: 'Single-Arm Dumbbell Row', muscle: 'Lats · Mid Back · Biceps', category: 'pull',
    image: singleArmDumbbellRow,
    cues: ['Brace on bench with opposite hand','Pull elbow to hip, not armpit','Rotate torso slightly at top','Lower with full lat stretch'],
    defaultSets: 4, defaultReps: 10, rest: 60,
  },
  {
    id: 't_bar_row', name: 'T-Bar Row', muscle: 'Mid Back · Lats · Erectors', category: 'pull',
    image: tBarRow,
    cues: ['Wide stance over bar','Hinge to 45° or lower','Row bar to lower chest','Squeeze shoulder blades at top'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'straight_arm_pulldown', name: 'Straight-Arm Pulldown', muscle: 'Lats (isolation)', category: 'pull',
    image: straightArmPulldown,
    cues: ['Arms straight throughout','Hinge slightly forward','Pull bar to hips using lats only','Squeeze lats fully at bottom'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },
  {
    id: 'face_pull', name: 'Face Pull', muscle: 'Rear Delts · Traps · Rotator Cuff', category: 'pull',
    image: facePull,
    cues: ['Set cable at eye level','Pull rope to face, elbows high','Externally rotate at end range','Slow and deliberate always'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },
  {
    id: 'shrug', name: 'Barbell Shrug', muscle: 'Upper Traps', category: 'pull',
    image: barbellShrug,
    cues: ['Arms fully straight','Shrug straight up — no rolling','Hold 1s squeeze at the top','Lower with control each rep'],
    defaultSets: 4, defaultReps: 15, rest: 60,
  },
  {
    id: 'rear_delt_fly', name: 'Rear Delt Fly', muscle: 'Rear Deltoid · Rhomboids', category: 'pull',
    image: rearDeltFly,
    cues: ['Hinge forward to 45°','Slight bend in elbows','Raise arms to shoulder height','Squeeze rear delts at top'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },
  {
    id: 'bicep_curl', name: 'Barbell Curl', muscle: 'Biceps · Brachialis', category: 'pull',
    image: barbellCurl,
    cues: ['Elbows pinned to sides','Supinate wrist fully at top','Squeeze hard for 1 second','3-second controlled eccentric'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'hammer_curl', name: 'Hammer Curl', muscle: 'Brachialis · Brachioradialis · Biceps', category: 'pull',
    image: hammerCurl,
    cues: ['Neutral grip throughout','Elbows stay at sides','Curl to shoulder height','Slow 3s eccentric always'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'incline_db_curl', name: 'Incline Dumbbell Curl', muscle: 'Biceps Long Head', category: 'pull',
    image: inclineDumbbellCurl,
    cues: ['Bench at 60°, arm hanging back','Full stretch at the bottom','Curl with supination','No swinging or momentum'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'preacher_curl', name: 'Preacher Curl', muscle: 'Biceps Short Head', category: 'pull',
    image: preacherCurl,
    cues: ['Upper arm flat on pad','Do not let elbow hyperextend','Squeeze bicep hard at top','Slow 3-4s lowering phase'],
    defaultSets: 3, defaultReps: 10, rest: 60,
  },
  {
    id: 'concentration_curl', name: 'Concentration Curl', muscle: 'Biceps (peak contraction)', category: 'pull',
    image: concentrationCurl,
    cues: ['Elbow braced against inner thigh','Full hang at the bottom','Supinate and squeeze at top','No body movement at all'],
    defaultSets: 3, defaultReps: 12, rest: 45,
  },
  {
    id: 'cable_curl', name: 'Cable Curl', muscle: 'Biceps · Brachialis', category: 'pull',
    image: cableCurl,
    cues: ['Constant tension from cable','Elbows pinned at sides','Curl to chin height','Controlled descent always'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },
  {
    id: 'reverse_curl', name: 'Reverse Curl', muscle: 'Brachioradialis · Biceps · Forearms', category: 'pull',
    image: reverseCurl,
    cues: ['Overhand (pronated) grip','Elbows stay at sides','Curl to shoulder height','Focus on forearm engagement'],
    defaultSets: 3, defaultReps: 15, rest: 45,
  },

  /* ── LEGS ─────────────────────────────────────────── */
  {
    id: 'squat', name: 'Back Squat', muscle: 'Quads · Glutes · Hamstrings · Core', category: 'legs',
   image: backSquat,
    cues: ['High or low bar position','Feet shoulder-width, toes out','Break parallel on every rep','Drive knees out over toes'],
    defaultSets: 4, defaultReps: 6, rest: 120,
  },
  {
    id: 'front_squat', name: 'Front Squat', muscle: 'Quads · Core · Upper Back', category: 'legs',
    image: frontSquat,
    cues: ['Bar rests on front delts','Elbows high throughout','Upright torso is essential','Drive knees out, heels flat'],
    defaultSets: 3, defaultReps: 6, rest: 120,
  },
  {
    id: 'goblet_squat', name: 'Goblet Squat', muscle: 'Quads · Glutes · Core', category: 'legs',
     image: gobletSquat,
    cues: ['Hold kettlebell at chest','Keep chest up and tall','Squat deep between elbows','Drive through heels to stand'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'bulgarian_split_squat', name: 'Bulgarian Split Squat', muscle: 'Quads · Glutes · Hip Flexors', category: 'legs',
     image: bulgarianSplitSquat,
    cues: ['Rear foot elevated on bench','Front foot 2 steps forward','Back knee descends to floor','Front knee tracks over toes'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'deadlift', name: 'Deadlift', muscle: 'Hamstrings · Glutes · Erectors · Traps', category: 'legs',
    image: deadliftImg,
    cues: ['Bar over mid-foot always','Big breath — brace hard','Think "push floor away"','Lock hips out at top fully'],
    defaultSets: 4, defaultReps: 5, rest: 180,
  },
  {
    id: 'sumo_deadlift', name: 'Sumo Deadlift', muscle: 'Glutes · Inner Thighs · Hamstrings', category: 'legs',
     image: sumoDeadlift,
    cues: ['Wide stance, toes out 45°','Grip inside of legs','Drive knees out as you pull','Hips and shoulders rise together'],
    defaultSets: 4, defaultReps: 5, rest: 180,
  },
  {
    id: 'lunge', name: 'Walking Lunge', muscle: 'Quads · Glutes · Hip Flexors', category: 'legs',
    image: walkingLunge,
    cues: ['Take a large forward step','Back knee nearly touches floor','Keep torso perfectly upright','Push through front heel to rise'],
    defaultSets: 3, defaultReps: 20, rest: 60,
  },
  {
    id: 'reverse_lunge', name: 'Reverse Lunge', muscle: 'Quads · Glutes · Hamstrings', category: 'legs',
    image: reverseLunge,
    cues: ['Step directly backward','Back knee drops to near floor','Front shin stays vertical','Drive through front foot to return'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'leg_press', name: 'Leg Press', muscle: 'Quads · Glutes · Calves', category: 'legs',
    image: legPress,
    cues: ['Feet mid-height on platform','Do NOT lock knees out','Full range every repetition','2-second controlled negative'],
    defaultSets: 3, defaultReps: 12, rest: 90,
  },
  {
    id: 'rdl', name: 'Romanian Deadlift', muscle: 'Hamstrings · Glutes · Erectors', category: 'legs',
    image: romanianDeadlift,
    cues: ['Slight soft bend in knees','Push hips back, not down','Bar stays close to legs','Feel hamstring stretch fully'],
    defaultSets: 3, defaultReps: 10, rest: 90,
  },
  {
    id: 'leg_extension', name: 'Leg Extension', muscle: 'Quads (isolation)', category: 'legs',
    image: legExtension,
    cues: ['Pad just above ankles','Extend to full lockout','Squeeze quads at top for 1s','Slow 3s lowering phase'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'leg_curl', name: 'Lying Leg Curl', muscle: 'Hamstrings (isolation)', category: 'legs',
    image: lyingLegCurl,
    cues: ['Hips stay flat on pad','Curl heels to glutes','Squeeze hamstrings at top','Slow and controlled return'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'hip_thrust', name: 'Hip Thrust', muscle: 'Glutes · Hamstrings', category: 'legs',
    image: hipThrust,
    cues: ['Upper back against bench','Bar padded across hips','Drive hips fully to ceiling','Squeeze glutes hard at top'],
    defaultSets: 4, defaultReps: 12, rest: 90,
  },
  {
    id: 'glute_bridge', name: 'Glute Bridge', muscle: 'Glutes · Hamstrings · Core', category: 'legs',
     image: gluteBridge,
    cues: ['Feet flat, knees at 90°','Drive hips up through heels','Hold for 2s at the top','Lower slowly with control'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'calf_raise', name: 'Calf Raise', muscle: 'Gastrocnemius · Soleus', category: 'legs',
    image: calfRaiseImg,
    imageStyle: { objectPosition: 'center top' },
    cues: ['Full stretch at the bottom','Pause 1s at the peak','4-second slow eccentric','No bouncing at the bottom'],
    defaultSets: 4, defaultReps: 20, rest: 45,
  },
  {
    id: 'step_up', name: 'Step-Up', muscle: 'Quads · Glutes · Hamstrings', category: 'legs',
    image: stepUp,
    cues: ['Step to a knee-high box','Drive through the front heel','Stand fully upright at top','Step down with control'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },

  /* ── CORE ─────────────────────────────────────────── */
  {
    id: 'plank', name: 'Plank', muscle: 'Transverse Abs · Obliques · Glutes', category: 'core',
    image: plankImg,
    cues: ['Forearms parallel, elbows under shoulders','Hips perfectly level — no sag','Squeeze abs, glutes, quads hard','Breathe steadily throughout'],
    defaultSets: 3, defaultReps: 1, rest: 60, isTime: true, duration: 45,
  },
  {
    id: 'side_plank', name: 'Side Plank', muscle: 'Obliques · Lateral Core', category: 'core',
    image: sidePlank,
    cues: ['Elbow directly under shoulder','Hips stacked perfectly','Squeeze obliques hard','Keep body in a straight line'],
    defaultSets: 3, defaultReps: 1, rest: 60, isTime: true, duration: 30,
  },
  {
    id: 'crunch', name: 'Crunch', muscle: 'Rectus Abdominis', category: 'core',
    image: crunchImg,
    cues: ['Hands lightly behind ears','Curl shoulders off the mat','Do NOT pull on neck at all','Squeeze abs hard at the top'],
    defaultSets: 3, defaultReps: 20, rest: 45,
  },
  {
    id: 'bicycle_crunch', name: 'Bicycle Crunch', muscle: 'Obliques · Rectus Abdominis', category: 'core',
    image: bicycleCrunch,
    cues: ['Opposite elbow to knee','Fully extend the other leg','Rotate through the core','Slow and deliberate pace'],
    defaultSets: 3, defaultReps: 30, rest: 45,
  },
  {
    id: 'leg_raise', name: 'Hanging Leg Raise', muscle: 'Lower Abs · Hip Flexors', category: 'core',
    image: hangingLegRaise,
    cues: ['Start from full dead hang','No kipping or swinging','Raise legs to 90° or beyond','Lower slowly and with control'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'russian_twist', name: 'Russian Twist', muscle: 'Obliques · Core', category: 'core',
    image: russianTwist,
    cues: ['Sit at 45°, feet off floor','Hold weight at chest','Rotate torso side to side','Touch ground beside each hip'],
    defaultSets: 3, defaultReps: 30, rest: 45,
  },
  {
    id: 'mountain_climber', name: 'Mountain Climber', muscle: 'Core · Cardio · Hip Flexors', category: 'core',
    image: mountainClimber,
    cues: ['High plank, wrists under shoulders','Drive alternating knees to chest','Move fast but keep hips stable','Breathe rhythmically throughout'],
    defaultSets: 3, defaultReps: 30, rest: 45,
  },
  {
    id: 'dead_bug', name: 'Dead Bug', muscle: 'Deep Core · Stability', category: 'core',
    image: deadBug,
    cues: ['Press lower back flat to floor','Extend opposite arm and leg slowly','Do not let low back arch at all','Exhale as you extend, inhale to return'],
    defaultSets: 3, defaultReps: 10, rest: 60,
  },

  /* ── CARDIO ───────────────────────────────────────── */
  {
    id: 'burpee', name: 'Burpee', muscle: 'Full Body · Cardiovascular', category: 'cardio',
    image: burpeeImg,
    cues: ['Squat down, hands to floor','Jump feet back to plank','Optional push-up at bottom','Explosive jump up, clap overhead'],
    defaultSets: 3, defaultReps: 10, rest: 60,
  },
  {
    id: 'jump_rope', name: 'Jump Rope', muscle: 'Calves · Cardio · Coordination', category: 'cardio',
    image: jumpRope,
    cues: ['Stay light on your toes','Make small, efficient jumps','Rotation comes from the wrists','Stay relaxed in shoulders and arms'],
    defaultSets: 3, defaultReps: 1, rest: 60, isTime: true, duration: 60,
  },
  {
    id: 'box_jump', name: 'Box Jump', muscle: 'Power · Quads · Glutes · Calves', category: 'cardio',
     image: boxJump,
    cues: ['Swing arms explosively forward','Jump from hip extension fully','Land softly, absorb with legs','Always step down — never jump'],
    defaultSets: 4, defaultReps: 8, rest: 90,
  },
  {
    id: 'jumping_jack', name: 'Jumping Jack', muscle: 'Cardiovascular · Coordination', category: 'cardio',
    image: jumpingJack,
    cues: ['Land softly on the balls of feet','Arms fully extend overhead','Keep core engaged throughout','Maintain a steady rhythm'],
    defaultSets: 3, defaultReps: 50, rest: 30,
  },
  {
    id: 'high_knee', name: 'High Knees', muscle: 'Hip Flexors · Cardio · Core', category: 'cardio',
    image: highKnees,
    cues: ['Drive knees to waist height','Pump arms in opposition','Stay on the balls of feet','Maintain tall posture throughout'],
    defaultSets: 3, defaultReps: 1, rest: 45, isTime: true, duration: 30,
  },

  /* ── MACHINES ─────────────────────────────────────── */
  {
    id: 'chest_press_machine',
    name: 'Chest Press Machine',
    muscle: 'Chest',
    category: 'push',
    image: chestPressMachineImg,
    cues: ['Keep shoulders back','Push slowly','Do not lock elbows','Control the negative'],
    defaultSets: 4, defaultReps: 12, rest: 60,
  },
  {
    id: 'shoulder_press_machine',
    name: 'Shoulder Press Machine',
    muscle: 'Shoulders',
    category: 'push',
     image: shoulderPressMachineImg,
    cues: ['Keep back flat','Press overhead slowly','Do not shrug shoulders','Control the movement'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'lat_pulldown_machine',
    name: 'Lat Pulldown Machine',
    muscle: 'Back',
    category: 'pull',
    image: latsPulldown,
    cues: ['Pull to upper chest','Keep chest up','Do not swing body','Squeeze lats'],
    defaultSets: 4, defaultReps: 12, rest: 60,
  },
  {
    id: 'seated_row_machine',
    name: 'Seated Row Machine',
    muscle: 'Back',
    category: 'pull',
    image: seatedRowMachine,
    cues: ['Keep chest up','Pull elbows back','Squeeze shoulder blades','Control return'],
    defaultSets: 3, defaultReps: 12, rest: 60,
  },
  {
    id: 'leg_press_machine',
    name: 'Leg Press Machine',
    muscle: 'Quads · Glutes',
    category: 'legs',
    image: legPressMachine,
    cues: ['Feet shoulder width apart','Lower slowly','Do not lock knees','Push through heels'],
    defaultSets: 4, defaultReps: 15, rest: 90,
  },
  {
    id: 'leg_extension_machine',
    name: 'Leg Extension Machine',
    muscle: 'Quads',
    category: 'legs',
    image: legExtensionMachineImg,
    cues: ['Lift slowly','Squeeze quads','Do not swing','Lower with control'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'leg_curl_machine',
    name: 'Leg Curl Machine',
    muscle: 'Hamstrings',
    category: 'legs',
    image: legCurlMachine,
    cues: ['Curl slowly','Keep hips down','Squeeze hamstrings','Control eccentric'],
    defaultSets: 3, defaultReps: 15, rest: 60,
  },
  {
    id: 'bicep_curl_machine',
    name: 'Bicep Curl Machine',
    muscle: 'Biceps',
    category: 'pull',
    image: bicepsCurlImg,
    cues: ['Keep elbows fixed','Curl fully','Squeeze biceps','Lower slowly'],
    defaultSets: 3, defaultReps: 12, rest: 45,
  },
  {
    id: 'tricep_pushdown_machine',
    name: 'Tricep Pushdown Machine',
    muscle: 'Triceps',
    category: 'push',
    image: tricepPushdown,
    cues: ['Keep elbows close','Push fully down','Squeeze triceps','Slow return'],
    defaultSets: 3, defaultReps: 12, rest: 45,
  },
  {
    id: 'treadmill_walk',
    name: 'Treadmill Walk',
    muscle: 'Cardio',
    category: 'cardio',
    image: treadmillWalk,
    cues: ['Maintain posture','Walk steadily','Breathe evenly','Keep core tight'],
    defaultSets: 1, defaultReps: 20, rest: 0, duration: 1200,
  },
]

export const PROGRAMS = [
  {
    id: 'beginner_machine_split',
    name: 'Beginner Machine Split',
    description:
      'Beginner-friendly weekly split with mix days, machine-based full body sessions, cardio, and recovery days.',
    difficulty: 'Beginner',
    schedule: [
      // Monday — Mix
      {
        label: 'Monday Mix',
        exercises: [
          { exerciseId: 'push_up', sets: 3, reps: 15 },
          { exerciseId: 'bench_press', sets: 3, reps: 10 },
          { exerciseId: 'lat_pulldown', sets: 3, reps: 12 },
          { exerciseId: 'seated_row', sets: 3, reps: 12 },
          { exerciseId: 'leg_press_machine', sets: 3, reps: 15 },
          { exerciseId: 'bodyweight_squat', sets: 3, reps: 20 },
          { exerciseId: 'plank', sets: 3, duration: 45, isTime: true },
          { exerciseId: 'mountain_climber', sets: 3, duration: 40, isTime: true },
        ]
      },
      // Tuesday — Mix
      {
        label: 'Tuesday Mix',
        exercises: [
          { exerciseId: 'incline_bench_press', sets: 3, reps: 10 },
          { exerciseId: 'shoulder_press_machine', sets: 3, reps: 12 },
          { exerciseId: 'lat_pulldown_machine', sets: 3, reps: 12 },
          { exerciseId: 'seated_row_machine', sets: 3, reps: 12 },
          { exerciseId: 'leg_extension_machine', sets: 3, reps: 15 },
          { exerciseId: 'leg_curl_machine', sets: 3, reps: 15 },
          { exerciseId: 'bicep_curl_machine', sets: 3, reps: 12 },
          { exerciseId: 'tricep_pushdown_machine', sets: 3, reps: 12 },
        ]
      },
      // Wednesday — Rest
      {
        label: 'Rest Day',
        exercises: []
      },
      // Thursday — Full Body Machines
      {
        label: 'Full Body Machine',
        exercises: [
          { exerciseId: 'chest_press_machine', sets: 4, reps: 12 },
          { exerciseId: 'incline_bench_press', sets: 3, reps: 10 },
          { exerciseId: 'lat_pulldown_machine', sets: 4, reps: 12 },
          { exerciseId: 'seated_row_machine', sets: 3, reps: 12 },
          { exerciseId: 'shoulder_press_machine', sets: 3, reps: 12 },
          { exerciseId: 'leg_press_machine', sets: 4, reps: 15 },
          { exerciseId: 'leg_extension_machine', sets: 3, reps: 15 },
          { exerciseId: 'leg_curl_machine', sets: 3, reps: 15 },
          { exerciseId: 'bicep_curl_machine', sets: 3, reps: 12 },
          { exerciseId: 'tricep_pushdown_machine', sets: 3, reps: 12 },
          { exerciseId: 'plank', sets: 3, duration: 60, isTime: true },
        ]
      },
      // Friday — Full Body Machines
      {
        label: 'Full Body Machine',
        exercises: [
          { exerciseId: 'push_up', sets: 3, reps: 15 },
          { exerciseId: 'chest_press_machine', sets: 4, reps: 12 },
          { exerciseId: 'lat_pulldown_machine', sets: 4, reps: 12 },
          { exerciseId: 'seated_row_machine', sets: 4, reps: 12 },
          { exerciseId: 'shoulder_press_machine', sets: 3, reps: 12 },
          { exerciseId: 'leg_press_machine', sets: 4, reps: 15 },
          { exerciseId: 'leg_extension_machine', sets: 3, reps: 15 },
          { exerciseId: 'leg_curl_machine', sets: 3, reps: 15 },
          { exerciseId: 'bicep_curl_machine', sets: 3, reps: 12 },
          { exerciseId: 'tricep_pushdown_machine', sets: 3, reps: 12 },
          { exerciseId: 'mountain_climber', sets: 3, duration: 45, isTime: true },
        ]
      },
      // Saturday — Cardio
      {
        label: 'Cardio Day',
        exercises: [
          { exerciseId: 'treadmill_walk', sets: 1, duration: 1200, isTime: true },
          { exerciseId: 'jumping_jack', sets: 4, duration: 45, isTime: true },
          { exerciseId: 'mountain_climber', sets: 4, duration: 40, isTime: true },
          { exerciseId: 'plank', sets: 3, duration: 60, isTime: true },
        ]
      },
      // Sunday — Rest
      {
        label: 'Rest Day',
        exercises: []
      },
    ]
  },
  {
    id: 'intermediate_split',
    name: 'Intermediate 6-Day Split',
    level: 'Intermediate',
    levelColor: '#3b82f6',
    duration: '12 Weeks',
    daysPerWeek: 6,
    goal: 'Muscle Growth + Strength',
    description:
      'An intermediate-level 6-day bodybuilding split focused on hypertrophy, strength, and muscle isolation with higher volume training.',
    schedule: [
      {
        day: 1, label: 'Chest',
        exercises: [
          { exerciseId: 'push_up',            sets: 3, reps: 15 },
          { exerciseId: 'bench_press',         sets: 4, reps: 8  },
          { exerciseId: 'incline_bench_press', sets: 4, reps: 10 },
          { exerciseId: 'dumbbell_fly',        sets: 3, reps: 12 },
          { exerciseId: 'cable_crossover',     sets: 3, reps: 12 },
          { exerciseId: 'chest_dip',           sets: 3, reps: 12 },
          { exerciseId: 'diamond_pushup',      sets: 3, reps: 12 },
        ],
      },
      {
        day: 2, label: 'Triceps',
        exercises: [
          { exerciseId: 'tricep_pushdown',           sets: 4, reps: 12 },
          { exerciseId: 'skull_crusher',             sets: 4, reps: 10 },
          { exerciseId: 'overhead_tricep_extension', sets: 3, reps: 10 },
          { exerciseId: 'tricep_dip',                sets: 3, reps: 12 },
          { exerciseId: 'close_grip_bench',          sets: 3, reps: 8  },
          { exerciseId: 'diamond_pushup',            sets: 2, reps: 15 },
        ],
      },
      {
        day: 3, label: 'Back',
        exercises: [
          { exerciseId: 'deadlift',              sets: 4, reps: 6  },
          { exerciseId: 'lat_pulldown',          sets: 4, reps: 10 },
          { exerciseId: 'seated_row',            sets: 4, reps: 10 },
          { exerciseId: 'barbell_row',           sets: 4, reps: 8  },
          { exerciseId: 'one_arm_db_row',        sets: 3, reps: 10 },
          { exerciseId: 'pull_up',               sets: 3, reps: 10 },
          { exerciseId: 'straight_arm_pulldown', sets: 3, reps: 12 },
        ],
      },
      {
        day: 4, label: 'Biceps',
        exercises: [
          { exerciseId: 'bicep_curl',         sets: 4, reps: 12 },
          { exerciseId: 'hammer_curl',        sets: 4, reps: 10 },
          { exerciseId: 'preacher_curl',      sets: 3, reps: 10 },
          { exerciseId: 'incline_db_curl',    sets: 3, reps: 10 },
          { exerciseId: 'concentration_curl', sets: 3, reps: 12 },
          { exerciseId: 'cable_curl',         sets: 3, reps: 12 },
          { exerciseId: 'reverse_curl',       sets: 2, reps: 15 },
        ],
      },
      {
        day: 5, label: 'Shoulders',
        exercises: [
          { exerciseId: 'overhead_press', sets: 4, reps: 8  },
          { exerciseId: 'arnold_press',   sets: 3, reps: 10 },
          { exerciseId: 'lateral_raise',  sets: 4, reps: 12 },
          { exerciseId: 'front_raise',    sets: 3, reps: 12 },
          { exerciseId: 'rear_delt_fly',  sets: 3, reps: 12 },
          { exerciseId: 'face_pull',      sets: 3, reps: 15 },
          { exerciseId: 'shrug',          sets: 4, reps: 15 },
        ],
      },
      {
        day: 6, label: 'Legs',
        exercises: [
          { exerciseId: 'squat',                 sets: 4, reps: 8  },
          { exerciseId: 'leg_press',             sets: 4, reps: 12 },
          { exerciseId: 'lunge',                 sets: 3, reps: 12 },
          { exerciseId: 'rdl',                   sets: 4, reps: 10 },
          { exerciseId: 'leg_extension',         sets: 3, reps: 15 },
          { exerciseId: 'leg_curl',              sets: 3, reps: 15 },
          { exerciseId: 'calf_raise',            sets: 5, reps: 20 },
          { exerciseId: 'bulgarian_split_squat', sets: 3, reps: 10 },
        ],
      },
      { day: 7, label: 'Rest', exercises: [] },
    ],
  },
  {
    id: 'hypertrophy',
    name: 'Hypertrophy Split',
    level: 'Intermediate', levelColor: '#3b82f6',
    duration: '12 Weeks', daysPerWeek: 4,
    goal: 'Muscle Growth',
    description: 'Push/Pull/Legs split optimized for maximal muscle hypertrophy. Requires 1+ year of consistent training experience.',
    schedule: [
      { day: 1, label: 'Push', exercises: [
        { exerciseId: 'bench_press',         sets: 4, reps: 8  },
        { exerciseId: 'overhead_press',      sets: 3, reps: 10 },
        { exerciseId: 'incline_bench_press', sets: 3, reps: 10 },
        { exerciseId: 'dumbbell_fly',        sets: 3, reps: 12 },
        { exerciseId: 'lateral_raise',       sets: 3, reps: 15 },
        { exerciseId: 'tricep_dip',          sets: 3, reps: 12 },
      ]},
      { day: 2, label: 'Pull', exercises: [
        { exerciseId: 'barbell_row',  sets: 4, reps: 8  },
        { exerciseId: 'pull_up',      sets: 4, reps: 8  },
        { exerciseId: 'lat_pulldown', sets: 3, reps: 12 },
        { exerciseId: 'bicep_curl',   sets: 3, reps: 12 },
        { exerciseId: 'hammer_curl',  sets: 3, reps: 12 },
        { exerciseId: 'face_pull',    sets: 3, reps: 15 },
      ]},
      { day: 3, label: 'Legs', exercises: [
        { exerciseId: 'squat',      sets: 4, reps: 8  },
        { exerciseId: 'rdl',        sets: 3, reps: 10 },
        { exerciseId: 'leg_press',  sets: 3, reps: 12 },
        { exerciseId: 'lunge',      sets: 3, reps: 20 },
        { exerciseId: 'leg_curl',   sets: 3, reps: 15 },
        { exerciseId: 'calf_raise', sets: 4, reps: 20 },
      ]},
      { day: 4, label: 'Rest', exercises: [] },
      { day: 5, label: 'Push + Core', exercises: [
        { exerciseId: 'bench_press',    sets: 4, reps: 6  },
        { exerciseId: 'overhead_press', sets: 4, reps: 8  },
        { exerciseId: 'lateral_raise',  sets: 4, reps: 15 },
        { exerciseId: 'plank',          sets: 3, reps: 1, isTime: true, duration: 45 },
        { exerciseId: 'leg_raise',      sets: 3, reps: 12 },
        { exerciseId: 'russian_twist',  sets: 3, reps: 20 },
      ]},
      { day: 6, label: 'Rest', exercises: [] },
      { day: 7, label: 'Rest', exercises: [] },
    ],
  },
  {
    id: 'strength',
    name: 'Powerlifting Base',
    level: 'Advanced', levelColor: '#ff5a1f',
    duration: '16 Weeks', daysPerWeek: 4,
    goal: 'Max Strength',
    description: 'Periodized program built around squat, bench, and deadlift. Pure strength development for experienced athletes only.',
    schedule: [
      { day: 1, label: 'Squat Day', exercises: [
        { exerciseId: 'squat',       sets: 5, reps: 5  },
        { exerciseId: 'bench_press', sets: 3, reps: 8  },
        { exerciseId: 'leg_press',   sets: 3, reps: 10 },
        { exerciseId: 'lunge',       sets: 3, reps: 12 },
        { exerciseId: 'plank',       sets: 3, reps: 1, isTime: true, duration: 60 },
      ]},
      { day: 2, label: 'Rest', exercises: [] },
      { day: 3, label: 'Bench Day', exercises: [
        { exerciseId: 'bench_press',      sets: 5, reps: 5  },
        { exerciseId: 'overhead_press',   sets: 4, reps: 6  },
        { exerciseId: 'close_grip_bench', sets: 3, reps: 8  },
        { exerciseId: 'dumbbell_fly',     sets: 3, reps: 10 },
        { exerciseId: 'tricep_dip',       sets: 4, reps: 10 },
        { exerciseId: 'lateral_raise',    sets: 3, reps: 15 },
      ]},
      { day: 4, label: 'Rest', exercises: [] },
      { day: 5, label: 'Deadlift Day', exercises: [
        { exerciseId: 'deadlift',    sets: 5, reps: 3  },
        { exerciseId: 'barbell_row', sets: 4, reps: 6  },
        { exerciseId: 'rdl',         sets: 3, reps: 8  },
        { exerciseId: 'pull_up',     sets: 4, reps: 6  },
        { exerciseId: 'face_pull',   sets: 3, reps: 15 },
      ]},
      { day: 6, label: 'Accessory', exercises: [
        { exerciseId: 'seated_row',       sets: 4, reps: 10 },
        { exerciseId: 'bicep_curl',       sets: 4, reps: 12 },
        { exerciseId: 'calf_raise',       sets: 5, reps: 20 },
        { exerciseId: 'leg_raise',        sets: 4, reps: 15 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 30 },
      ]},
      { day: 7, label: 'Rest', exercises: [] },
    ],
  },
  {
    id: 'hiit',
    name: 'HIIT Shred',
    level: 'Intermediate', levelColor: '#ffcc00',
    duration: '6 Weeks', daysPerWeek: 5,
    goal: 'Fat Loss + Cardio',
    description: 'High-intensity interval training fused with strength work. Maximum calorie burn while preserving hard-earned muscle.',
    schedule: [
      { day: 1, label: 'Upper HIIT', exercises: [
        { exerciseId: 'burpee',           sets: 4, reps: 12 },
        { exerciseId: 'push_up',          sets: 4, reps: 15 },
        { exerciseId: 'pull_up',          sets: 3, reps: 8  },
        { exerciseId: 'mountain_climber', sets: 4, reps: 30 },
        { exerciseId: 'bench_press',      sets: 3, reps: 10 },
      ]},
      { day: 2, label: 'Lower HIIT', exercises: [
        { exerciseId: 'box_jump',   sets: 4, reps: 10 },
        { exerciseId: 'squat',      sets: 4, reps: 12 },
        { exerciseId: 'lunge',      sets: 3, reps: 24 },
        { exerciseId: 'calf_raise', sets: 3, reps: 25 },
        { exerciseId: 'burpee',     sets: 3, reps: 10 },
      ]},
      { day: 3, label: 'Active Rest', exercises: [] },
      { day: 4, label: 'Full Body HIIT', exercises: [
        { exerciseId: 'burpee',           sets: 5, reps: 10 },
        { exerciseId: 'box_jump',         sets: 4, reps: 8  },
        { exerciseId: 'push_up',          sets: 3, reps: 20 },
        { exerciseId: 'jump_rope',        sets: 3, reps: 1, isTime: true, duration: 60 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 40 },
      ]},
      { day: 5, label: 'Cardio + Core', exercises: [
        { exerciseId: 'jump_rope',        sets: 5, reps: 1, isTime: true, duration: 60 },
        { exerciseId: 'plank',            sets: 4, reps: 1, isTime: true, duration: 45 },
        { exerciseId: 'crunch',           sets: 4, reps: 25 },
        { exerciseId: 'leg_raise',        sets: 4, reps: 15 },
        { exerciseId: 'mountain_climber', sets: 3, reps: 30 },
      ]},
      { day: 6, label: 'Rest', exercises: [] },
      { day: 7, label: 'Rest', exercises: [] },
    ],
  },
]

export const getExerciseById = (id) => EXERCISES.find(e => e.id === id)
export const getProgramById  = (id) => PROGRAMS.find(p => p.id === id)